import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import AdminAumLayout from "../../components/layout/AdminAumLayout";

// ICONS
import checkIcon from "../../assets/icons/ProfilAum/check.svg";
import pieIcon from "../../assets/icons/ProfilAum/pie-chart-alt.svg";
import folderIcon from "../../assets/icons/ProfilAum/folder-open.svg";

/* ================= REUSABLE COMPONENTS ================= */

const Input = ({ label, placeholder }) => (
  <div className="flex flex-col gap-1">
    <label className="text-[13px] font-medium text-gray-700">{label}</label>
    <div className="flex items-center h-10.5 bg-[#F2F4F8] rounded-sm px-4">
      <input
        type="text"
        placeholder={placeholder}
        className="w-full bg-transparent text-sm outline-none text-gray-800 placeholder:text-[#A8A8A8]"
      />
    </div>
  </div>
);

const FileUpload = ({ label, file, fileRef, onUpload, onRemove, icon }) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-[13px] font-medium text-gray-700">
        {label}
      </label>

      <div className="flex items-stretch h-10.5 overflow-hidden rounded-sm">
        {/* Sisi Kiri: Tombol Pilih File */}
        <button
          type="button"
          onClick={() => fileRef.current.click()}
          className="bg-[#DDE1E6] px-6 text-sm font-medium text-[#0062FF] hover:bg-[#ced2d9] transition-colors"
        >
          Pilih File
        </button>

        {/* Sisi Kanan: Area Nama File / Placeholder */}
        <div className="flex flex-1 items-center gap-3 bg-[#F2F4F8] px-4">
          {/* Menggunakan folderIcon dari assets */}
          <img src={icon} alt="folder" className="w-5 h-5 opacity-70" />

          {/* Teks Placeholder atau Nama File */}
          <span className={`text-sm truncate ${file ? "text-gray-800" : "text-[#A8A8A8]"}`}>
            {file ? file.name : "Placeholder"}
          </span>

          {/* Tombol Hapus */}
          {file && (
            <button 
              type="button" 
              onClick={onRemove} 
              className="ml-auto text-red-500 text-xs hover:underline font-medium"
            >
              Hapus
            </button>
          )}
        </div>

        {/* Hidden Input File */}
        <input
          ref={fileRef}
          type="file"
          accept=".pdf"
          className="hidden"
          onChange={onUpload}
        />
      </div>
    </div>
  );
};

/* ================= MAIN PAGE ================= */

const LegalitasAum = () => {
  const navigate = useNavigate();
  const adArtRef = useRef(null);
  const kaidahRef = useRef(null);

  const [adArtFile, setAdArtFile] = useState(null);
  const [kaidahFile, setKaidahFile] = useState(null);
  const [agree, setAgree] = useState(false);

  const handleUpload = (e, setFile) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File maksimal 5MB!");
        e.target.value = "";
        return;
      }
      setFile(file);
    }
  };

  const handleRemove = (setFile, ref) => {
    setFile(null);
    if (ref.current) ref.current.value = "";
  };

const handleSimpan = () => {
  // 1. Ambil data atau siapkan object data (Contoh simulasi)
  const dataProfil = {
    nama: "PT. SURYA MEDIA UTAMA",
    bidang: "Pengembang Software & Edukasi Digital",
    sk: "123/SK/PP/2024",
    npwp: "00.000.000.0-000.000",
    // Tambahkan field lainnya sesuai kebutuhan
  };

  // 2. Navigasi ke halaman detail sambil membawa state data
  navigate("/admin-aum/detail", { state: { data: dataProfil } });
};

  return (
    <AdminAumLayout>
      <div className="w-full flex justify-center px-4 py-6">
        <div className="w-full max-w-1124px flex flex-col gap-4">

          {/* HEADER BREADCRUMB */}
          <div className="bg-white flex items-center text-sm font-medium text-gray-700 h-10 px-4 rounded-sm">
            Profil Legalitas Aum &gt; Informasi Umum &gt; Dokumen Legalitas
          </div>

          {/* STEP INDICATOR */}
          <div className="bg-white flex overflow-hidden border border-gray-200 rounded-sm">
            <div
              onClick={() => navigate("/admin-aum/profil")}
              className="relative flex-1 px-4 py-3 cursor-pointer bg-gray-100 hover:bg-gray-200 transition"
            >
              <div className="absolute top-0 left-0 w-full h-0.5 bg-blue-600"></div>
              <div className="flex items-center gap-2">
                <img src={checkIcon} alt="step-1" className="w-5 h-5" />
                <div>
                  <p className="text-sm font-semibold text-blue-600 leading-none">1. Informasi Umum</p>
                  <p className="text-[10px] text-gray-500 mt-1">Optional Label</p>
                </div>
              </div>
            </div>

            <div className="w-px bg-gray-300"></div>

            <div className="relative flex-1 px-4 py-3 cursor-default bg-white">
              <div className="absolute top-0 left-0 w-full h-0.5 bg-blue-600"></div>
              <div className="flex items-center gap-2">
                <img src={pieIcon} alt="step-2" className="w-5 h-5" />
                <div>
                  <p className="text-sm font-semibold text-blue-600 leading-none">2. Dokumen Legalitas</p>
                  <p className="text-[10px] text-gray-500 mt-1">Optional Label</p>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION TITLE */}
          <div className="text-black font-medium bg-[#A2A9B0] px-4 py-3 rounded-t-lg">
            Dokumen Legalitas
          </div>

          {/* FORM CARD */}
          <div className="bg-white rounded-b-lg flex flex-col gap-6 p-6 shadow-sm">
            <Input label="Nomor SK Pendirian/Izin Operasional" placeholder="Placeholder" />
            <Input label="Nomor NPWP Instansi" placeholder="Placeholder" />

            <FileUpload
              label="Unggah Dokumen AD/ART (PDF, Maks 5MB)"
              file={adArtFile}
              fileRef={adArtRef}
              icon={folderIcon} // Memanggil icon folder-open.svg
              onUpload={(e) => handleUpload(e, setAdArtFile)}
              onRemove={() => handleRemove(setAdArtFile, adArtRef)}
            />

            <FileUpload
              label="Unggah Dokumen Kaidah PP (PDF, Maks 5MB)"
              file={kaidahFile}
              fileRef={kaidahRef}
              icon={folderIcon} // Memanggil icon folder-open.svg
              onUpload={(e) => handleUpload(e, setKaidahFile)}
              onRemove={() => handleRemove(setKaidahFile, kaidahRef)}
            />

            {/* Agreement */}
            <label className="flex items-center gap-2 text-sm text-gray-500 mt-2 cursor-pointer">
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                className="w-4 h-4 accent-blue-600"
              />
              "Saya menyatakan bahwa data yang diunggah adalah benar dan valid."
            </label>

            {/* ACTION BUTTON */}
            <div className="flex justify-end mt-4">
              <button
                onClick={handleSimpan}
                disabled={!agree}
                className={`px-8 py-2.5 rounded text-sm font-semibold transition-all ${
                  agree ? "bg-blue-600 text-white cursor-pointer" : "bg-gray-300 text-gray-500"
                }`}
              >
                Simpan & Ajukan Verifikasi
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminAumLayout>
  );
};

export default LegalitasAum;