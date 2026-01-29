const { client } = require("../config/database");
const { ObjectId } = require("mongodb");
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');

const {
  COMPANY_DOCUMENT_VALUES,
} = require("../constants/companyDocumenEnum");

const {
  DOCUMENT_STATUS_ENUM,
} = require("../constants/companyStatusEnum");

// ✅ KONFIGURASI CLOUDINARY - WAJIB ADA
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const users = client.db("karirMu").collection("users");

const companyDocuments = client
    .db("karirMu")
    .collection("company_documents");

const companies = client
    .db("karirMu")
    .collection("companies");

const companyHrd = client.db("karirMu").collection("company_hrd");

exports.createCompanyProfileWithDocuments = async (req, res) => {
  try {
    const userId = req.user.userId;

    // =======================
    // 0️⃣ Validasi userId
    // =======================
    if (!ObjectId.isValid(userId)) {
      return res.status(401).json({ message: "User tidak valid" });
    }
    const userObjectId = new ObjectId(userId);

    // =======================
    // 1️⃣ Ambil user dari DB (SUMBER KEBENARAN)
    // =======================
    const user = await users.findOne(
      { _id: userObjectId },
      { projection: { company_id: 1 } }
    );

    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    let companyId = user.company_id || new ObjectId();

    // jika user belum punya company
    if (!user.company_id) {
      await users.updateOne(
        { _id: userObjectId },
        { $set: { company_id: companyId } }
      );
    }

    // =======================
    // 2️⃣ Ambil body
    // =======================
    const {
      company_name,
      description,
      address,
      employee_range,
      industry,
      company_email,
      company_phone,
      company_url,
    } = req.body;

    const province = req.body.province || "";
    const city = req.body.city || "";

    let documentNames = [];
    try {
      documentNames = req.body.document_names
        ? JSON.parse(req.body.document_names)
        : [];
    } catch {
      return res.status(400).json({
        message: "Format document_names tidak valid",
      });
    }

    // =======================
    // 3️⃣ Validasi wajib
    // =======================
    if (!company_name || !company_email || !company_phone) {
      return res.status(400).json({
        message: "company_name, company_email, dan company_phone wajib diisi",
      });
    }

    if (!req.files?.logo?.length) {
      return res.status(400).json({ message: "Logo wajib diupload" });
    }

    if (!req.files?.documents?.length) {
      return res.status(400).json({ message: "Dokumen wajib diupload" });
    }

    // =======================
    // 4️⃣ Validasi enum dokumen
    // =======================
    for (const name of documentNames) {
      if (!COMPANY_DOCUMENT_VALUES.includes(name)) {
        return res.status(400).json({
          message: `Jenis dokumen tidak valid: ${name}`,
        });
      }
    }

    // =======================
    // 5️⃣ Ambil URL LOGO
    // =======================
    const logoUrl = req.files.logo[0].path;

    // =======================
    // 6️⃣ Simpan / update COMPANY
    // =======================
    await companies.updateOne(
      { _id: companyId },
      {
        $set: {
          company_name,
          description,
          address,
          city,
          province,
          industry,
          employee_range: Number(employee_range),
          company_email,
          company_phone,
          company_url,
          logo_url: logoUrl,
          updated_at: new Date(),
        },
        $setOnInsert: { created_at: new Date() },
      },
      { upsert: true }
    );

    // =======================
    // 7️⃣ Update company_hrd
    // =======================
    await companyHrd.updateOne(
      { user_id: userObjectId },
      { $set: { company_id: companyId } }
    );

    // =======================
    // 8️⃣ Simpan documents
    // =======================
    const insertedDocs = req.files.documents.map((file, index) => ({
      company_id: companyId,
      document_name: documentNames[index] || file.originalname,
      document_url: file.path,
      status: DOCUMENT_STATUS_ENUM.PENDING,
      validated_at: null,
      created_at: new Date(),
      updated_at: new Date(),
    }));

    await companyDocuments.insertMany(insertedDocs);

    // =======================
    // 9️⃣ Response
    // =======================
    return res.status(201).json({
      message: "Company profile & documents berhasil dikirim",
    });
  } catch (error) {
    console.error("ERROR createCompanyProfile:", error);
    return res.status(500).json({
      message: "Gagal memproses data company",
      error: error.message,
    });
  }
};


exports.getDocumentsByCompany = async (req, res) => {
  try {
    const userId = req.user.userId;

    // =======================
    // 0️⃣ Validasi userId
    // =======================
    if (!ObjectId.isValid(userId)) {
      return res.status(401).json({ message: "User tidak valid" });
    }
    const userObjectId = new ObjectId(userId);

    // =======================
    // 1️⃣ Ambil company_hrd
    // =======================
    const companyHrdData = await companyHrd.findOne({
      user_id: userObjectId,
    });

    if (!companyHrdData) {
      return res.status(404).json({
        message: "Company HRD tidak ditemukan",
      });
    }

    const companyId = companyHrdData.company_id;

    if (!companyId || !ObjectId.isValid(companyId)) {
      return res.status(200).json({
        message: "Company belum dibuat",
        company: null,
        documents: [],
      });
    }

    const companyObjectId = new ObjectId(companyId);

    // =======================
    // 2️⃣ Ambil company
    // =======================
    const company = await companies.findOne({
      _id: companyObjectId,
    });

    if (!company) {
      return res.status(404).json({
        message: "Perusahaan tidak ditemukan",
      });
    }

    // =======================
    // 3️⃣ Ambil documents
    // =======================
    const documents = await companyDocuments
      .find({ company_id: companyObjectId })
      .toArray();

    // =======================
    // 4️⃣ Response
    // =======================
    return res.json({
      message: "List company documents",
      company,
      documents,
    });
  } catch (error) {
    console.error("ERROR getDocumentsByCompany:", error);
    return res.status(500).json({
      message: "Gagal mengambil data",
      error: error.message,
    });
  }
};


exports.ValidateDocument = async (req, res) => {
    try {
        const {documentId} = req.params;
        const { status } = req.body;

        if(!["approved", "rejected"].includes(status)) {
            return res.status(400).json({
                message: "status harus approved atau rejected",
            });
        }

        const result = await companyDocuments.updateOne(
            {_id: new ObjectId(documentId)},
            {
                $set: {
                    status,
                    validated_at : new Date(),
                    updated_at: new Date(),
                },
            }
        );

        if(result.matchedCount === 0 ) {
            return res.status(404).json({
                message: "Document tidak ditemukan",
            })
        }

        res.json({
            message: "document berhasil divalidasi",
        });
    } catch (error) {
        res.status(500).json({
            message: "gagal validasi document",
            error : error.message,
        })
    }
}

exports.updateCompanyProfile = async (req, res) => {
  try {
    console.log('╔════════════════════════════════════════╗');
    console.log('║   UPDATE COMPANY PROFILE - START      ║');
    console.log('╚════════════════════════════════════════╝');
    
    const userId = req.user.userId;
    console.log('📌 User ID:', userId);

    // Validasi userId
    if (!userId || !ObjectId.isValid(userId)) {
      console.log('❌ Invalid User ID');
      return res.status(401).json({
        message: "User ID tidak valid",
      });
    }

    const userObjectId = new ObjectId(userId);

    // Cari HRD berdasarkan user_id
    const hrd = await companyHrd.findOne({ user_id: userObjectId });
    console.log('👤 HRD Data:', hrd ? 'Found' : 'Not Found');

    if (!hrd?.company_id) {
      console.log('❌ Company ID not found in HRD');
      return res.status(404).json({
        message: "Company belum ada",
      });
    }

    const companyId = new ObjectId(hrd.company_id);
    console.log('🏢 Company ID:', companyId);

    // Inisialisasi updateData
    const updateData = { updated_at: new Date() };

    // Copy semua field dari body ke updateData
    console.log('📝 Request Body Fields:');
    Object.keys(req.body).forEach((key) => {
      if (req.body[key] !== undefined && req.body[key] !== null && req.body[key] !== '') {
        updateData[key] = req.body[key];
        console.log(`   ✓ ${key}: ${req.body[key]}`);
      }
    });

    // HANDLE LOGO UPLOAD
    if (req.file) {
      console.log('');
      console.log('📸 Processing Logo Upload...');
      console.log('   File Name:', req.file.originalname);
      console.log('   File Type:', req.file.mimetype);
      console.log('   File Size:', (req.file.size / 1024).toFixed(2), 'KB');

      try {
        // Upload ke Cloudinary
        const upload = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              folder: `karirMu/companies/logo/${companyId}`,
              resource_type: "image",
              public_id: `logo_${Date.now()}`,
              overwrite: true,
              invalidate: true,
            },
            (err, result) => {
              if (err) {
                console.error('❌ Cloudinary Upload Error:', err);
                return reject(err);
              }
              console.log('✅ Cloudinary Upload Success');
              console.log('   URL:', result.secure_url);
              resolve(result);
            }
          );
          
          streamifier.createReadStream(req.file.buffer).pipe(stream);
        });

        updateData.logo_url = upload.secure_url;
        console.log('✅ Logo URL added to update data');
      } catch (uploadError) {
        console.error('❌ Error uploading to Cloudinary:', uploadError);
        return res.status(500).json({
          message: "Gagal upload logo",
          error: uploadError.message,
        });
      }
    } else {
      console.log('ℹ️  No logo file to upload');
    }

    console.log('');
    console.log('💾 Final Update Data:', JSON.stringify(updateData, null, 2));

    // Update company di database
    const updateResult = await companies.updateOne(
      { _id: companyId },
      { $set: updateData }
    );

    console.log('');
    console.log('📊 Update Result:');
    console.log('   Matched:', updateResult.matchedCount);
    console.log('   Modified:', updateResult.modifiedCount);

    if (updateResult.matchedCount === 0) {
      console.log('❌ Company not found in database');
      return res.status(404).json({
        message: "Company tidak ditemukan",
      });
    }

    // Ambil data company yang sudah diupdate
    const updatedCompany = await companies.findOne({ _id: companyId });
    
    if (!updatedCompany) {
      console.log('❌ Failed to retrieve updated company');
      return res.status(500).json({
        message: "Gagal mengambil data company yang diupdate",
      });
    }

    console.log('');
    console.log('✅ Company Updated Successfully');
    console.log('   Company Name:', updatedCompany.company_name);
    console.log('   Logo URL:', updatedCompany.logo_url || 'No logo');
    console.log('');
    console.log('╔════════════════════════════════════════╗');
    console.log('║   UPDATE COMPANY PROFILE - END        ║');
    console.log('╚════════════════════════════════════════╝');

    // Return response
    res.json({
      message: "Company profile berhasil diperbarui",
      company: updatedCompany,
    });

  } catch (error) {
    console.error('');
    console.error('╔════════════════════════════════════════╗');
    console.error('║   ERROR - UPDATE COMPANY PROFILE      ║');
    console.error('╚════════════════════════════════════════╝');
    console.error('Error Message:', error.message);
    console.error('Error Stack:', error.stack);
    
    res.status(500).json({
      message: "Gagal update company",
      error: error.message,
    });
  }
};

exports.getAllCompanies = async (req, res) => {
  try {
    const companiesList = await companies.find({}).toArray();
    
    res.json({
      message: "List of all companies",
      total: companiesList.length,
      companies: companiesList,
    });
  } catch (error) {
    console.error("ERROR getAllCompanies:", error);
    res.status(500).json({
      message: "Gagal mengambil data companies",
      error: error.message,
    });
  }
};

exports.getCompanyById = async (req, res) => {
  try {
    const { companyId } = req.params;

    if (!ObjectId.isValid(companyId)) {
      return res.status(400).json({
        message: "Company ID tidak valid",
      });
    }

    const company = await companies.findOne({
      _id: new ObjectId(companyId),
    });

    if (!company) {
      return res.status(404).json({
        message: "Company tidak ditemukan",
      });
    }

    const documents = await companyDocuments
      .find({ company_id: new ObjectId(companyId) })
      .toArray();

    res.json({
      message: "Company details",
      company,
      documents,
    });
  } catch (error) {
    console.error("ERROR getCompanyById:", error);
    res.status(500).json({
      message: "Gagal mengambil data company",
      error: error.message,
    });
  }
};

exports.deleteCompany = async (req, res) => {
  try {
    const { companyId } = req.params;

    if (!ObjectId.isValid(companyId)) {
      return res.status(400).json({
        message: "Company ID tidak valid",
      });
    }

    const companyObjectId = new ObjectId(companyId);

    // Hapus company
    const deleteResult = await companies.deleteOne({
      _id: companyObjectId,
    });

    if (deleteResult.deletedCount === 0) {
      return res.status(404).json({
        message: "Company tidak ditemukan",
      });
    }

    // Hapus semua documents terkait
    await companyDocuments.deleteMany({
      company_id: companyObjectId,
    });

    // Update company_hrd (set company_id ke null)
    await companyHrd.updateMany(
      { company_id: companyObjectId },
      { $unset: { company_id: "" } }
    );

    res.json({
      message: "Company berhasil dihapus",
    });
  } catch (error) {
    console.error("ERROR deleteCompany:", error);
    res.status(500).json({
      message: "Gagal menghapus company",
      error: error.message,
    });
  }
};