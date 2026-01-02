const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer"); // Gunakan instance yang sama
const authMiddleware = require("../middleware/authMiddleware");
const companyMiddleware = require("../middleware/companyMiddleware");
const {
    createCompanyDocument,
    createCompanyProfile,
    getDocumentsByCompany,
    createCompanyProfileWithDocuments,
    validateDocument,
} = require("../controllers/companyController");

// Definisi upload untuk beberapa field (Logo & Documents)
const companyUploadFields = upload.fields([
  { name: 'logo', maxCount: 1 },
  { name: 'documents', maxCount: 10 }
]);

router.post(
  "/company/submit",
  authMiddleware,
  companyMiddleware,
  upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "documents", maxCount: 10 }
  ]),
  createCompanyProfileWithDocuments
);

// router.post(
//   "/company/submit",
//   authMiddleware,
//   companyMiddleware,
//   companyUploadFields, // Gunakan fields yang sudah didefinisikan
//   createCompanyProfileWithDocuments
// );

// Sisa rute lainnya...
router.post("/uploads", authMiddleware, upload.array("documents", 4), createCompanyDocument);
router.post("/profile", authMiddleware, upload.single("logo"), createCompanyProfile); // Tambahkan "/" di depan "profile"

router.get("/company/profile", authMiddleware, companyMiddleware, getDocumentsByCompany);

module.exports = router;