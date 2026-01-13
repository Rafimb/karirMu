const crypto = require("crypto");
const bcrypt = require("bcrypt");
const { ObjectId } = require("mongodb");

const { client } = require("../config/database");
const { sendTokenActivation } = require("../config/mailer");
const { generateToken } = require("../config/jwt");

// ================= COLLECTIONS =================
const users = client.db("karirMu").collection("users");
const companyHrd = client.db("karirMu").collection("company_hrd");  

exports.register = async (req, res) => {
  try {
    const { email, register_as } = req.body;

    if (!email || !register_as) {
      return res.status(400).json({
        message: "Email dan role wajib diisi",
      });
    }

    if (!["pelamar", "company_hrd"].includes(register_as)) {
      return res.status(400).json({
        message: "Role tidak valid",
      });
    }

    const existingUser = await users.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: "Email sudah terdaftar",
      });
    }

    const token = crypto.randomBytes(32).toString("hex");

    const result = await users.insertOne({
      email,
      role: register_as,
      full_name: null,
      password: null,
      token,
      is_active: false,
      created_at: new Date(),
    });

    const userId = result.insertedId;

    if (register_as === "company_hrd") {
      await companyHrd.insertOne({
        user_id: userId, // ObjectId
        company_id: null,
        created_at: new Date(),
      });
    }

    const activationLink = `http://localhost:5173/auth/activate?token=${token}`;
    await sendTokenActivation(email, activationLink);

    return res.status(201).json({
      message: "Registrasi berhasil, silakan cek email untuk aktivasi",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
exports.activateAccount = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({
        message: "Token wajib dikirim",
      });
    }

    const user = await users.findOne({ token });
    if (!user) {
      return res.status(400).json({
        message: "Token tidak valid",
      });
    }

    await users.updateOne(
      { _id: user._id },
      {
        $set: { is_active: true },
      }
    );

    return res.json({
      message: "Akun berhasil diaktivasi, silakan login",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.setPassword = async (req, res) => {
  try {
    const { token, full_name, password } = req.body;

    if (!token || !full_name || !password) {
      return res.status(400).json({
        message: "Token, nama lengkap, dan password wajib diisi",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password minimal 6 karakter",
      });
    }

    const user = await users.findOne({ token });
    if (!user) {
      return res.status(400).json({
        message: "Token tidak valid atau sudah kedaluwarsa",
      });
    }

    if (!user.is_active) {
      return res.status(400).json({
        message: "Akun belum aktif",
      });
    }

    if (user.password) {
      return res.status(400).json({
        message: "Password sudah dibuat",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await users.updateOne(
      { _id: user._id },
      {
        $set: {
          full_name,
          password: hashedPassword,
        },
        $unset: {
          token: "",
        },
      }
    );

    const accessToken = generateToken({
      userId: user._id.toString(),
      role: user.role,
      email: user.email,
    });

    return res.status(200).json({
      message: "Password berhasil dibuat",
      accessToken,
      role: user.role,
      user: {
        id: user._id,
        full_name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email dan password wajib diisi",
      });
    }

    const user = await users.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "Email atau password salah",
      });
    }

    if (!user.is_active) {
      return res.status(403).json({
        message: "Akun belum diaktivasi",
      });
    }

    if (!user.password) {
      return res.status(403).json({
        message: "Password belum dibuat",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Email atau password salah",
      });
    }

    const accessToken = generateToken({
      userId: user._id.toString(),
      role: user.role,
      email: user.email,
    });

    return res.status(200).json({
      message: "Login berhasil",
      accessToken,
      role: user.role,
      user: {
        id: user._id,
        full_name: user.full_name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
