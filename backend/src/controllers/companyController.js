const { client } = require("../config/database");
const { ObjectId } = require("mongodb");
const cloudinary =require("../config/cloudinary");
const streamifier = require("streamifier");


const {
  COMPANY_DOCUMENT_VALUES,
} = require("../constants/companyDocumenEnum");

const {
  DOCUMENT_STATUS_ENUM,
} = require("../constants/companyStatusEnum");

const users = client.db("karirMu").collection("users")

const companyDocuments = client
    .db("karirMu")
    .collection("company_documents");

const companies = client
    .db("karirMu")
    .collection("companies");

const companyHrd = client.db("karirMu").collection("company_hrd");

exports.createCompanyDocument = async (req, res) => {
    try {
        const companyId = req.user.id;
        const files = req.files;
        const documentName = JSON.parse(req.body.document_names);

        for(const name of documentName) {
            if (!COMPANY_DOCUMENT_VALUES.includes(name)) {
                return res.status(400).json({
                message: "Jenis dokumen tidak valid",
                });
            }
        }

        const insertedDocs = [];

        for(let i=0; i < files.length; i++) {
            const uploadResult = await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    {
                        folder: `karirMu/companies/documents/${companyId}`,
                        resource_type : "raw",
                    },
    
                    (error, result) => {
                        if(error) reject(error);
                        else resolve(result);
                    }
                );
    
                streamifier.createReadStream(req.file[i].buffer).pipe(stream);
            });

            insertedDocs.push({
                company_id: new ObjectId(companyId),
                document_name: documentName[i],
                document_url : uploadResult.secure_url,
                status: DOCUMENT_STATUS_ENUM.PENDING,
                validated_at: null,
                created_at: new Date(),
                updated_at: new Date(),
                });
        }
        
        await companyDocuments.insertMany(insertedDocs);

        res.status(201).json({
        message: "Company document berhasil ditambahkan",
        data: result,
        });

    } catch(error) {
        res.status(500).json({
        message: "Gagal menambahkan company document",
        error: error.message,
        });
        }
}

exports.createCompanyProfile = async (req, res) => {
    try {
        const companyId = new ObjectId(req.user.company_id);

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

        const city = JSON.parse(req.body.city);
        const province = JSON.parse(req.body.province);

        const uploadResult = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                {
                    folder : `karirMu/companies/logo/${companyId}`,
                    resource_type : "image",
                },
                (error, result) => {
                    if(error) reject(error);
                    else resolve(result);
                }
            );

            streamifier.creaateReadStream(req.file(buffer).pipe(stream));
        })

        const companyData = {
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
            logo_url: uploadResult.secure_url, // 🔒 WAJIB ADA
            updated_at: new Date(),
        };

        if (!company_name || !company_email || !company_phone) {
            return res.status(400).json({
                message: "company_name, company_email, dan company_phone wajib diisi",
            });
        }

        if (!companyId) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }

        await companies.updateOne(
            { _id: companyId },
            {
                $set: companyData,
                $setOnInsert: {
                created_at: new Date(),
                },
            },
            { upsert: true }
        );

        res.status(201).json({
        message: "Company profile berhasil dibuat",
        });
    } catch(error) {
        res.status(500).json({
            message: "gagal membuat company profile"
        });
    }
}

exports.getDocumentsByCompany = async (req, res) => {
    try {

      const userId = req.user.userId;

      const companyHrdData = await companyHrd.findOne({ user_id: userId });

      if (!companyHrdData) {
        return res.status(404).json({
          message: "Admin AUM tidak ditemukan",
        });
      }
      
      const{ company_id } = companyHrdData;

            if (!company_id) {
                return res.json({
                  message: "Company belum dibuat",
                  company: null,
                  documents: [],
                });
              }

        // Validasi companyId
        if (!company_id || !ObjectId.isValid(company_id)) {
          return res.status(400).json({
            message: "ID perusahaan tidak valid",
          });
        }


        const documents = await companyDocuments.find({company_id : new ObjectId(company_id)}).toArray();
        const company = await companies.findOne({_id: new ObjectId(company_id)});

        if (!company) {
            return res.status(404).json({
                message: "Perusahaan tidak ditemukan",
            });
        }


        res.json({
            message: "list company documents",
            data : documents,
            company: company,
        });

    } catch (error) {
        res.status(500).json({
            message: "Gagal mengambil data",
            error: error.message,
        });
    }
}

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

exports.createCompanyProfileWithDocuments = async (req, res) => {
  try {

    const userId = req.user.userId;
    // =======================
    // 1️⃣ Ambil companyId
    // =======================
    let companyId = req.user?.company_id ? new ObjectId(req.user.company_id) : new ObjectId();

    if (!req.user?.company_id) {
      await users.updateOne(
        { _id: new ObjectId(req.user.id) },
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

    // Parse dengan aman
    const province = req.body.province || "";
    const city = req.body.city || "";
    let documentNames = [];
    try {
      documentNames = req.body.document_names ? JSON.parse(req.body.document_names) : [];
    } catch (err) {
      return res.status(400).json({ message: "Format document_names tidak valid" });
    }

    // =======================
    // 3️⃣ Validasi wajib
    // =======================
    if (!company_name || !company_email || !company_phone) {
      return res.status(400).json({
        message: "company_name, company_email, dan company_phone wajib diisi",
      });
    }

    if (!req.files?.logo || !req.files.logo.length) {
      return res.status(400).json({ message: "Logo wajib diupload" });
    }

    if (!req.files?.documents || !req.files.documents.length) {
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
    // 5️⃣ Upload LOGO ke Cloudinary
    // =======================
    const logoUpload = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: `karirMu/companies/logo/${companyId}`,
          resource_type: "image",
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      streamifier.createReadStream(req.files.logo[0].buffer).pipe(stream);
    });

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
          logo_url: logoUpload.secure_url,
          updated_at: new Date(),
        },
        $setOnInsert: { created_at: new Date() },
      },
      { upsert: true }
    );

   const updateResult = await companyHrd.updateOne(
  { user_id: userId },
  { $set: { company_id: companyId}}
  );

  console.log(updateResult);

    // =======================
    // 7️⃣ Upload DOCUMENTS ke Cloudinary
    // =======================
    const insertedDocs = [];

    for (let i = 0; i < req.files.documents.length; i++) {
      const file = req.files.documents[i];
      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: `karirMu/companies/documents/${companyId}`,
            resource_type: "raw",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        streamifier.createReadStream(file.buffer).pipe(stream);
      });

      insertedDocs.push({
        company_id: companyId,
        document_name: documentNames[i] || file.originalname,
        document_url: uploadResult.secure_url,
        status: DOCUMENT_STATUS_ENUM.PENDING,
        validated_at: null,
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    await companyDocuments.insertMany(insertedDocs);

    // =======================
    // 8️⃣ Response sukses
    // =======================
    res.status(201).json({
      message: "Company profile & documents berhasil dikirim",
    });
  } catch (error) {
    console.error("ERROR on backend:", error);   // log lengkap
    res.status(500).json({
      message: "Gagal memproses data company",
      error: error.message,
      stack: error.stack  // optional, untuk debug lebih detail
    });
  }
};