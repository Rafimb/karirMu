const multer = require("multer");

// Gunakan memoryStorage karena controller Anda menggunakan buffer & streamifier
const storage = multer.memoryStorage();

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 } // Contoh limit 5MB
});

// PASTIKAN YANG DIEXPORT ADALAH INSTANCE 'upload'
module.exports = upload;