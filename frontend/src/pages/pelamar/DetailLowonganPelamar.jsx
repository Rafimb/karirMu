import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PelamarLayout from "../../components/layout/PelamarLayout";
/* Catatan: Share2 dan BookmarkSimple sering menyebabkan error di beberapa versi iconsax.
  Gunakan Share dan ArchiveAdd agar lebih aman.
*/
import { 
  User, 
  Share, 
  ArchiveAdd, 
  DocumentUpload, 
  TickCircle 
} from "iconsax-react";

const DetailLowonganPelamar = () => {
  const navigate = useNavigate();
  const mainGradient = "linear-gradient(90deg, #004F8F 0%, #009B49 100%)";

  // State untuk mengontrol Modal
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // State Data CV (Contoh)
  const [uploadedCV, setUploadedCV] = useState({
    name: "CV.pdf",
    size: "0.11 MB",
    date: "24 Des 2025, 10.09"
  });

  // Handler Fungsi
  const handleLamarClick = () => setShowApplyModal(true);
  const handleNextToSuccess = () => {
    setShowApplyModal(false);
    setShowUploadModal(false);
    setShowSuccessModal(true);
  };
  const handleGoToUpload = () => {
    setShowApplyModal(false);
    setShowUploadModal(true);
  };

  return (
    <PelamarLayout>
      <div className="p-4 max-w-7xl mx-auto space-y-6 bg-[#E0EAE7] min-h-screen">
        
        {/* ================= HEADER ATAS ================= */}
        <div className="rounded-t-2xl px-6 py-5 text-white shadow-md" style={{ background: mainGradient }}>
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center overflow-hidden">
              <div className="bg-[#004F8F] w-full h-full flex items-center justify-center">
                <User size="32" color="#fff" variant="Bold" />
              </div>
            </div>
            <div className="h-10 w-px bg-white/40" />
            <div>
              <h2 className="text-xl font-bold tracking-wide">UI/UX Designer</h2>
              <p className="text-sm opacity-90 font-medium uppercase">PT. SURYA MEDIA UTAMA</p>
            </div>
          </div>
        </div>

        {/* ================= INFORMASI UTAMA ================= */}
        <div className="rounded-2xl shadow-md overflow-hidden bg-white">
          <div className="px-4 py-3 font-bold text-white text-sm" style={{ background: mainGradient }}>
            Informasi Utama
          </div>
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-5 gap-x-12">
              <div className="space-y-4">
                <div className="flex text-sm"><span className="w-36 text-gray-500 font-semibold">Bidang</span><span className="font-bold">: IT Software</span></div>
                <div className="flex text-sm"><span className="w-36 text-gray-500 font-semibold">Lokasi</span><span className="font-bold">: Sleman Jogja</span></div>
                <div className="flex text-sm"><span className="w-36 text-gray-500 font-semibold">Tipe Kerjaan</span><span className="font-bold">: Full Time</span></div>
              </div>
              <div className="space-y-4">
                <div className="flex text-sm"><span className="w-36 text-gray-500 font-semibold">Rentang Gaji</span><span className="font-bold">: Rp 2.000.000 - Rp 4.000.000</span></div>
                <div className="flex text-sm"><span className="w-36 text-gray-500 font-semibold">Tenggat Waktu</span><span className="font-bold">: 10 Januari 2025</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= DESKRIPSI ================= */}
        <div className="rounded-2xl shadow-md overflow-hidden bg-white">
          <div className="px-4 py-3 font-bold text-white text-sm" style={{ background: mainGradient }}>
            Deskripsi Pekerjaan
          </div>
          <div className="p-8 text-sm text-gray-800 leading-relaxed font-medium">
            Kami mencari UI/UX Designer yang kreatif dan berorientasi pada pengguna untuk bergabung dengan tim kami.
          </div>
        </div>

        {/* ================= PERSYARATAN ================= */}
        <div className="rounded-2xl shadow-md overflow-hidden bg-white">
          <div className="px-4 py-3 font-bold text-white text-sm" style={{ background: mainGradient }}>
            Persyaratan
          </div>
          <div className="p-8 text-sm text-gray-800 space-y-3 font-medium">
            <p>• Menguasai Figma atau Adobe XD.</p>
            <p>• Memahami prinsip-prinsip UI/UX.</p>
            <p>• Kerja di kantor</p>
          </div>
        </div>

        {/* ================= ACTION BAR ================= */}
        <div className="bg-white rounded-2xl shadow-md p-5 flex justify-between items-center">
          <button onClick={() => navigate(-1)} className="px-10 py-2.5 border-2 border-[#43934B] text-[#43934B] font-bold rounded-xl">
            Kembali
          </button>
          <div className="flex items-center gap-4">
            <button onClick={handleLamarClick} className="px-14 py-2.5 bg-[#43934B] text-white font-bold rounded-xl uppercase">
              Lamar
            </button>
            <div className="flex items-center gap-4 ml-2">
              <Share size="26" color="#000" variant="Outline" className="cursor-pointer" />
              <ArchiveAdd size="26" color="#000" variant="Outline" className="cursor-pointer" />
            </div>
          </div>
        </div>

      </div>

      {/* ================= MODAL 1: KONFIRMASI CV ================= */}
      {showApplyModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-xl max-w-lg w-full overflow-hidden">
            <div className="p-6 border-b text-center">
              <h2 className="text-2xl font-black text-gray-900">Lamar Posisi UI/UX Designer</h2>
            </div>
            <div className="p-8 space-y-6">
              <p className="text-gray-600 text-sm leading-relaxed">
                Kami mendeteksi CV yang sudah tersimpan. Anda bisa langsung menggunakannya atau menggantinya.
              </p>
              <div className="border-2 border-dashed border-blue-400 rounded-2xl p-5 bg-blue-50 flex items-center gap-4">
                <DocumentUpload size="40" color="#2563eb" variant="Bold" />
                <div>
                  <p className="font-bold text-blue-700 text-lg">{uploadedCV.name}</p>
                  <p className="text-xs text-gray-500">{uploadedCV.size} . Diupload pada {uploadedCV.date}</p>
                </div>
              </div>
              <p className="text-sm">
                Apakah anda ingin <button onClick={handleGoToUpload} className="text-blue-600 font-bold hover:underline">Mengganti CV Lain?</button>
              </p>
            </div>
            <div className="p-6 flex justify-end">
              <button onClick={handleNextToSuccess} className="px-10 py-3 bg-[#43934B] text-white font-bold rounded-xl shadow-lg">
                Selanjutnya
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL 2: UPLOAD CV BARU ================= */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-xl max-w-lg w-full overflow-hidden">
            <div className="p-6 border-b text-center">
              <h2 className="text-2xl font-black text-gray-900">Upload CV Terbaru</h2>
            </div>
            <div className="p-10 space-y-6 flex flex-col items-center">
              <label className="w-full border-2 border-dashed border-blue-400 rounded-3xl p-12 bg-blue-50 flex flex-col items-center justify-center cursor-pointer hover:bg-blue-100 transition">
                <input type="file" className="hidden" accept=".pdf" />
                <DocumentUpload size="64" color="#2563eb" variant="Bold" />
                <p className="mt-4 font-bold text-blue-600">Klik untuk upload CV Mu</p>
              </label>
              <p className="text-xs text-gray-400 italic text-center">Maksimal ukuran dokumen 5 MB dalam format PDF</p>
            </div>
            <div className="p-6 flex justify-between gap-4">
              <button onClick={() => setShowUploadModal(false)} className="flex-1 py-3 border-2 border-gray-300 font-bold rounded-xl">Batal</button>
              <button onClick={handleNextToSuccess} className="flex-1 py-3 bg-[#43934B] text-white font-bold rounded-xl shadow-lg">Kirim</button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL 3: SUKSES ================= */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-xl max-w-md w-full p-10 text-center space-y-6">
            <div className="flex justify-center">
              <TickCircle size="100" color="#43934B" variant="Bold" />
            </div>
            <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Lamaran Berhasil Dikirim!</h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              Lamaran Anda telah diterima. Silakan cek menu "Riwayat Lamaran" untuk memantau status lamaran Anda.
            </p>
            <div className="space-y-3 pt-4">
              <button onClick={() => navigate("/pelamar/riwayat-lamaran")} className="w-full py-3 border-2 border-[#43934B] text-[#43934B] font-bold rounded-xl">Lihat Riwayat</button>
              <button onClick={() => setShowSuccessModal(false)} className="w-full py-3 bg-[#43934B] text-white font-bold rounded-xl">Kembali ke Beranda</button>
            </div>
          </div>
        </div>
      )}

    </PelamarLayout>
  );
};

export default DetailLowonganPelamar;