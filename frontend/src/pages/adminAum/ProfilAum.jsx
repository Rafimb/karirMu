import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import AdminAumLayout from "../../components/layout/AdminAumLayout";

// ICONS
import checkIcon from "../../assets/icons/ProfilAum/check.svg";
import pieIcon from "../../assets/icons/ProfilAum/pie-chart-alt.svg";
import userIcon from "../../assets/icons/ProfilAum/user.svg";

/* ================= REUSABLE COMPONENTS (Consistent Style) ================= */

const Input = ({ label, placeholder, full }) => (
  <div className={full ? "w-full" : "w-full"}>
    <label className="text-[13px] font-medium text-gray-700">{label}</label>
    <div className="flex items-center h-10.5 bg-[#F2F4F8] rounded-sm px-4 mt-1">
      <input
        type="text"
        placeholder={placeholder}
        className="w-full bg-transparent text-sm outline-none text-gray-800 placeholder:text-[#A8A8A8]"
      />
    </div>
  </div>
);

const Select = ({ label, placeholder }) => (
  <div className="w-full">
    <label className="text-[13px] font-medium text-gray-700">{label}</label>
    <div className="flex items-center h-10.5 bg-[#F2F4F8] rounded-sm px-4 mt-1">
      <select className="w-full bg-transparent text-sm outline-none text-gray-800 appearance-none cursor-pointer">
        <option value="" disabled selected>{placeholder}</option>
        <option value="1">Opsi 1</option>
      </select>
      {/* Icon Dropdown Simple */}
      <div className="pointer-events-none">
        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
      </div>
    </div>
  </div>
);

const Textarea = ({ label, placeholder }) => (
  <div className="w-full">
    <label className="text-[13px] font-medium text-gray-700">{label}</label>
    <textarea
      rows={4}
      placeholder={placeholder}
      className="mt-1 w-full bg-[#F2F4F8] px-4 py-3 rounded-sm text-sm outline-none text-gray-800 placeholder:text-[#A8A8A8] resize-none"
    />
  </div>
);

/* ================= MAIN PAGE ================= */

const ProfilAum = () => {
  const navigate = useNavigate();
  const fileRef = useRef(null);
  const [photo, setPhoto] = useState(null);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(URL.createObjectURL(file));
    }
  };

  const handleRemove = () => {
    setPhoto(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  
  return (
    <AdminAumLayout>
      <div className="w-full flex justify-center px-4 py-6">
        <div className="w-full max-w-1124px flex flex-col gap-4">

          {/* HEADER BREADCRUMB */}
          <div className="bg-white flex items-center text-sm font-medium text-gray-700 h-10 px-4 rounded-sm">
            Profil Legalitas Aum &gt; Informasi Umum
          </div>

          {/* STEP INDICATOR */}
          <div className="bg-white flex overflow-hidden border border-gray-200 rounded-sm">
            {/* STEP 1 - AKTIF */}
            <div className="relative flex-1 px-4 py-3 cursor-default bg-white">
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

            {/* STEP 2 - INACTIVE (Can navigate to Legalitas) */}
            <div 
              onClick={() => navigate("/admin-aum/legalitas")}
              className="relative flex-1 px-4 py-3 cursor-pointer group hover:bg-gray-50 transition"
            >
              <div className="flex items-center gap-2">
                <img src={pieIcon} alt="step-2" className="w-5 h-5 opacity-50 group-hover:opacity-100" />
                <div>
                  <p className="text-sm font-semibold text-gray-400 group-hover:text-blue-600 leading-none">2. Dokumen Legalitas</p>
                  <p className="text-[10px] text-red-500 mt-1 font-medium">Incomplete step</p>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION TITLE */}
          <div className="text-black font-medium bg-[#A2A9B0] px-4 py-3 rounded-t-lg">
            Informasi Umum
          </div>

          {/* FORM CARD */}
          <div className="bg-white rounded-b-lg p-8 flex flex-col gap-8 shadow-sm">
            
            {/* UPLOAD FOTO AREA */}
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 rounded-full bg-[#F2F4F8] overflow-hidden flex items-center justify-center border border-gray-100">
                  {photo ? (
                    <img src={photo} alt="preview" className="w-full h-full object-cover" />
                  ) : (
                    <img src={userIcon} alt="user" className="w-12 h-12 opacity-30" />
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => fileRef.current.click()}
                    className="border border-[#0062FF] text-[#0062FF] px-5 py-2 rounded text-sm font-semibold hover:bg-blue-50 transition-colors"
                  >
                    Upload Photo
                  </button>
                  {photo && (
                    <button onClick={handleRemove} className="text-xs text-red-500 font-medium hover:underline text-center">
                      Remove
                    </button>
                  )}
                  <input ref={fileRef} type="file" accept="image/*" hidden onChange={handleUpload} />
                </div>
              </div>

              <div className="hidden md:block w-px bg-gray-200 self-stretch"></div>

              <div className="text-sm text-gray-500">
                <p className="font-bold text-gray-700 mb-2">Logo Perusahaan</p>
                <ul className="list-disc ml-4 space-y-1 text-[13px]">
                  <li>Min. 400 x 400px</li>
                  <li>Max. 2MB</li>
                  <li>Your face or company logo</li>
                </ul>
              </div>
            </div>

            <hr className="border-gray-100" />

            {/* FORM GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <Input label="Nama Perusahaan" placeholder="Masukkan nama perusahaan" />
              <Input label="Email Perusahaan" placeholder="hrd@perusahaan.com" />
              <Input label="Nomor Telepon" placeholder="+62" />
              <Input label="Website Resmi" placeholder="https://www.perusahaan.com" />
              <Select label="Bidang Industri" placeholder="Pilih Bidang Industri" />
              <Select label="Jumlah Karyawan" placeholder="Pilih Jumlah Karyawan" />
            </div>

            <Input label="Kota/Provinsi" placeholder="Masukkan Kota atau Provinsi" full />

            <div className="flex flex-col gap-6">
              <Textarea label="Deskripsi" placeholder="Tuliskan profil singkat perusahaan Anda" />
              <Textarea label="Alamat Lengkap" placeholder="Detail jalan, nomor gedung, dan RT/RW" />
            </div>

            {/* ACTION BUTTON */}
            <div className="flex justify-end pt-4">
              <button
                onClick={() => navigate("/admin-aum/legalitas")}
                className="bg-blue-600 text-white px-8 py-2.5 rounded text-sm font-semibold hover:bg-blue-700 transition-all shadow-md"
              >
                Simpan & Lanjutkan
              </button>
            </div>
          </div>

        </div>
      </div>
    </AdminAumLayout>
  );
};

export default ProfilAum;