import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginImage from "../assets/img/login2.png";
import EyeIcon from "../assets/icons/eye.svg";
import EyeSlashIcon from "../assets/icons/eye-slash.svg";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (error) {
      const t = setTimeout(() => setError(""), 3000);
      return () => clearTimeout(t);
    }
  }, [error]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Email dan password wajib diisi");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login gagal");
        return;
      }

      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("role", data.role);

      if (data.role === "company_hrd") {
        navigate("/admin-aum/dashboard");
      } else if (data.role === "pelamar") {
        navigate("/pelamar/dashboard");
      } else {
        setError("Role tidak valid");
      }
    } catch (err) {
      setError("Terjadi kesalahan server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#ffffff] flex items-center justify-center relative ">
      <div className="flex flex-col md:flex-row w-full max-w-360 bg-white rounded-[48px] overflow-hidden px-4">

        {/* IMAGE */}
        <div className="hidden md:block md:w-150 bg-white rounded-tr-[70px] rounded-br-[70px] overflow-hidden">
          <img src={LoginImage} alt="Login" className="w-full h-full object-cover" />
        </div>

        {/* FORM */}
        <div className="w-full md:w-180 p-8 md:p-16 flex flex-col gap-6 justify-center">

          <h1 className="text-xl md:text-2xl font-bold text-center md:text-left">
            Login Akun
          </h1>

          {error && (
            <div className="text-sm text-center text-red-600 bg-red-50 border border-red-200 rounded-md py-2 px-3">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="flex flex-col gap-4">

            {/* EMAIL */}
            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-600">Email</label>
              <input
                type="email"
                placeholder="Masukkan email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-4 py-3 bg-gray-100 rounded outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* PASSWORD */}
            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-600">Password</label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Masukkan password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 bg-gray-100 rounded outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <img
                    src={showPassword ? EyeSlashIcon : EyeIcon}
                    alt="toggle"
                    className="w-5 h-5 opacity-70"
                  />
                </button>
              </div>

              <Link
                to="/auth/forgot-password"
                className="text-sm text-blue-600 hover:underline text-left mt-1"
              >
                Lupa Kata Sandi?
              </Link>
            </div>

            {/* BUTTON */}
            <button
              style={{
                background: "linear-gradient(90deg, #004F8F 0%, #009B49 100%)",
              }}
              disabled={loading}
              className="mt-2 w-full text-white py-3 rounded font-semibold hover:opacity-90 transition"
            >
              {loading ? "Masuk..." : "Masuk"}
            </button>

            <div className="my-4 border-t border-gray-300"></div>
          </form>

          {/* REGISTER */}
          <p className="text-sm text-gray-600 text-center">
            Belum punya akun?{" "}
            <Link to="/auth/register" className="text-blue-600 font-medium hover:underline">
              Daftar
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
