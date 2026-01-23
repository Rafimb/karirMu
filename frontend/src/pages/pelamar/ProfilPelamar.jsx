import { useState } from "react";
import { useNavigate } from "react-router-dom";

import PelamarLayout from "../../components/layout/PelamarLayout";
import userIcon from "../../assets/icons/ProfilPelamar/user-profile.svg";

// ICONS
import folderOpenIcon from "../../assets/icons/ProfilPelamar/folder-open.svg";
import linkIcon from "../../assets/icons/ProfilPelamar/link.svg";

/* ===== Reusable UI Components ===== */
const Input = ({ label, placeholder }) => (
  <div className="w-full">
    <label className="text-[13px] font-medium text-gray-700">{label}</label>
    <div className="h-10.5 bg-[#F2F4F8] rounded-sm px-4 mt-1 flex items-center">
      <input
        placeholder={placeholder}
        className="w-full bg-transparent text-sm outline-none"
      />
    </div>
  </div>
);

const Select = ({ label, placeholder }) => (
  <div className="w-full">
    <label className="text-[13px] font-medium text-gray-700">{label}</label>
    <div className="h-10.5 bg-[#F2F4F8] rounded-sm px-4 mt-1 flex items-center">
      <select className="w-full bg-transparent text-sm outline-none">
        <option>{placeholder}</option>
      </select>
    </div>
  </div>
);

const Textarea = ({ label, placeholder }) => (
  <div className="w-full">
    <label className="text-[13px] font-medium text-gray-700">{label}</label>
    <textarea
      rows={4}
      placeholder={placeholder}
      className="mt-1 w-full bg-[#F2F4F8] px-4 py-3 rounded-sm text-sm resize-none outline-none"
    />
  </div>
);

/* ===== Main Component ===== */
const ProfilPelamar = () => {
  const navigate = useNavigate();

  /* FOTO PROFIL */
  const [photo, setPhoto] = useState(null);

  /* FILE CV */
  const [isUploaded, setIsUploaded] = useState(false);

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("File harus berupa gambar");
      return;
    }

    setPhoto(URL.createObjectURL(file));
  };

  const handlePhotoDelete = () => {
    setPhoto(null);
  };

  const onUploadFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setIsUploaded(true);
    }
  };

  const handleSave = () => {
    navigate("/pelamar/pendidikan-pelamar"); // ⬅️ arahkan ke PendidikanPelamar.jsx
  };

  return (
    <PelamarLayout>
      <div className="space-y-6">

        {/* ================= BIODATA ================= */}
        <div>
          <div
            className="px-4 py-3 rounded-t-2xl font-medium text-white"
            style={{
              background: "linear-gradient(90deg, #004F8F 0%, #009B49 100%)",
            }}
          >
            Biodata
          </div>

          <div className="bg-white rounded-2xl shadow-sm mt-4 px-8 py-10 space-y-10">

            {/* FOTO PROFIL */}
            <div className="flex items-center gap-10">
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 rounded-full bg-[#F2F4F8] flex items-center justify-center border overflow-hidden">
                  {photo ? (
                    <img
                      src={photo}
                      alt="preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img src={userIcon} alt="user" className="w-10 opacity-30" />
                  )}
                </div>

                <div className="flex flex-col gap-3">
                  <label className="border border-blue-600 text-blue-600 px-5 py-2 text-sm rounded-md hover:bg-blue-50 cursor-pointer text-center">
                    Upload Photo
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                    />
                  </label>

               <button
  onClick={handlePhotoDelete}
  className={`text-sm text-red-600 hover:underline text-center ${
    !photo ? "opacity-50 cursor-not-allowed" : ""
  }`}
>
  Hapus
</button>

                </div>
              </div>

              <div className="h-24 w-px bg-gray-300" />

              <div className="text-sm text-gray-500 space-y-1">
                <p className="font-medium text-gray-700">Profil Pelamar</p>
                <p>1. Min. 400 × 400px</p>
                <p>2. Max. 2MB</p>
                <p>3. Format JPG / PNG</p>
              </div>
            </div>

            <Input label="Headline" placeholder="Headline" />
            <Textarea label="Tentang Saya" placeholder="Tuliskan profil singkat Anda" />

            <div className="grid md:grid-cols-2 gap-6">
              <Select label="Domisili" placeholder="Pilih Kota" />
              <Input label="Nomor Telepon (Whatsapp)" placeholder="+62" />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Select label="Jenis Kelamin" placeholder="Jenis Kelamin" />
              <Input label="Usia" placeholder="Usia / Umur" />
            </div>

            <Textarea label="Alamat Lengkap" placeholder="Detail jalan, nomor gedung, dan RT/RW" />
          </div>
        </div>

        {/* ================= CV & PORTOFOLIO ================= */}
        <div>
          <div
            className="px-4 py-3 rounded-t-2xl font-medium text-white"
            style={{
              background: "linear-gradient(90deg, #004F8F 0%, #009B49 100%)",
            }}
          >
            CV & Portofolio
          </div>

          <div className="bg-white rounded-2xl shadow-sm mt-4 px-8 py-6 space-y-6">
            <div>
              <label className="text-[13px] font-medium text-gray-700">
                Unggah Dokumen (CV, Portofolio)
              </label>

              <div className="flex items-center bg-[#F2F4F8] rounded-sm mt-2 overflow-hidden">
                <label className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 cursor-pointer text-blue-600 font-medium">
                  Pilih File
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={onUploadFile}
                  />
                </label>

                <div className="flex items-center gap-2 px-4 py-2 text-sm flex-1">
                  {isUploaded ? (
                    <span className="text-green-600 font-medium">
                      Terunggah
                    </span>
                  ) : (
                    <>
                      <img src={folderOpenIcon} className="w-4 h-4 opacity-60" />
                      <span className="text-gray-500">Belum ada file dipilih!</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div>
              <label className="text-[13px] font-medium text-gray-700">
                Link Portofolio
              </label>
              <div className="h-10.5 bg-[#F2F4F8] rounded-sm px-4 mt-1 flex items-center justify-between">
                <input
                  placeholder="https://portfolio.com"
                  className="w-full bg-transparent text-sm outline-none"
                />
                <img src={linkIcon} className="w-4 h-4 opacity-60" />
              </div>
            </div>
          </div>
        </div>

        {/* ================= SIMPAN ================= */}
        <div className="flex justify-end bg-white rounded-xl shadow px-8 py-5">
          <button
            onClick={handleSave}
            className="bg-[#409144] text-white px-8 py-2.5 rounded-md text-sm font-semibold"
          >
            Simpan
          </button>
        </div>

      </div>
    </PelamarLayout>
  );
};

export default ProfilPelamar;
