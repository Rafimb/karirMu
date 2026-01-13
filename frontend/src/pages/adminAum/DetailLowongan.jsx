import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminAumLayout from "../../components/layout/AdminAumLayout";

// ICON
import closeIcon from "../../assets/icons/iconClose.svg";
import userIcon from "../../assets/icons/iconUser.svg";

export default function DetailLowongan() {
  const navigate = useNavigate();

  const [showEditModal, setShowEditModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Contoh state form edit
  const [formData, setFormData] = useState({
    title: "UI/UX Designer",
    tipeKerja: "IT / Medical / dll",
    lokasi: "Sleman Jogja",
    tipePekerjaan: "Full Time",
    deskripsi: "Kami mencari UI/UX Designer yang kreatif...",
    persyaratan: [
      "Menguasai Figma atau Adobe XD",
      "Memahami prinsip-prinsip UI/UX",
      "Bersedia kerja di kantor",
      "Minimal pendidikan SMA / SMK",
      "Usia 21 – 45 Tahun",
    ],
    gaji: "Rp 2.000.000 – Rp 4.000.000",
    tenggat: "10 Januari 2025",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    // Simulasikan save
    setShowEditModal(false);
    alert("Data disimpan!");
  };

  const handleNonaktifkan = () => {
    setShowConfirm(false);
    alert("Lowongan dinonaktifkan!");
  };

  return (
    <AdminAumLayout>
      <div className="w-full flex justify-center px-4 py-6">
        <div className="w-full max-w-1124px flex flex-col gap-4">

          {/* HEADER */}
          <div className="bg-white px-4 py-3 rounded-md shadow-sm text-sm flex items-center gap-2">
            <span className="text-gray-500">Manajemen Lowongan</span>
            <span className="text-gray-400">›</span>
            <span className="font-semibold">Detail Lowongan</span>
          </div>

          {/* INFORMASI UTAMA */}
          <div className="px-4 py-3 rounded-t-lg font-medium text-white"
            style={{ background: "linear-gradient(90deg, #004F8F 0%, #009B49 100%)" }}
          >
            Informasi Utama
          </div>
          <div className="bg-white rounded-b-lg p-6 shadow-sm text-sm space-y-4">
            <div>
              <p className="font-semibold">{formData.title}</p>
            </div>
            <div className="grid grid-cols-1 gap-y-2 gap-x-6">
              <p><span className="text-gray-500">Tipe Kerja</span> : {formData.tipeKerja}</p>
              <p><span className="text-gray-500">Lokasi</span> : {formData.lokasi}</p>
              <p><span className="text-gray-500">Tipe Pekerjaan</span> : {formData.tipePekerjaan}</p>
            </div>
          </div>

          {/* DESKRIPSI */}
          <div className="px-4 py-3 rounded-t-lg font-medium text-white"
            style={{ background: "linear-gradient(90deg, #004F8F 0%, #009B49 100%)" }}
          >
            Deskripsi Pekerjaan
          </div>
          <div className="bg-white rounded-b-lg p-4 shadow-sm text-sm leading-relaxed space-y-4">
            {formData.deskripsi}
          </div>

          {/* PERSYARATAN */}
          <div className="px-4 py-3 rounded-t-lg font-medium text-white"
            style={{ background: "linear-gradient(90deg, #004F8F 0%, #009B49 100%)" }}
          >
            Persyaratan
          </div>
          <div className="bg-white rounded-b-lg p-4 shadow-sm text-sm space-y-2">
            {formData.persyaratan.map((item, i) => (
              <p key={i}>• {item}</p>
            ))}
          </div>

          {/* RENTANG GAJI */}
          <div className="px-4 py-3 rounded-t-lg font-medium text-white"
            style={{ background: "linear-gradient(90deg, #004F8F 0%, #009B49 100%)" }}
          >
            Rentang Gaji & Tenggat Waktu
          </div>
          <div className="bg-white rounded-b-lg p-4 shadow-sm text-sm space-y-2">
            <p><span className="text-gray-500">Rentang Gaji</span> : {formData.gaji}</p>
            <p><span className="text-gray-500">Tenggat Waktu</span> : {formData.tenggat}</p>
          </div>

          {/* BUTTON ACTION */}
          <div className="bg-white rounded-md p-4 shadow-sm flex justify-between items-center">
            <button
              onClick={() => navigate(-1)}
              className="border border-green-600 text-green-600 px-4 py-2 rounded-md text-sm font-semibold hover:bg-green-600 hover:text-white transition"
            >
              Kembali
            </button>

            <div className="flex gap-3">
              <button
                onClick={() => setShowEditModal(true)}
                className="border border-blue-600 text-blue-600 px-4 py-2 rounded-md text-sm font-semibold hover:bg-blue-600 hover:text-white transition"
              >
                Edit Lowongan
              </button>
              <button
                onClick={() => setShowConfirm(true)}
                className="border border-red-600 text-red-600 px-4 py-2 rounded-md text-sm font-semibold hover:bg-red-600 hover:text-white transition"
              >
                Nonaktifkan
              </button>
            </div>
          </div>
        </div>

        {/* ================= MODAL EDIT ================= */}
{showEditModal && (
  <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4">
    <div className="bg-white w-full max-w-2xl max-h-[90vh] rounded-xl shadow-lg grid grid-rows-[auto_1fr_auto] overflow-hidden">

      {/* HEADER */}
      <div
        className="px-5 py-3 text-white font-semibold flex justify-between items-center"
        style={{ background: "linear-gradient(90deg, #004F8F, #009B49)" }}
      >
        Edit Lowongan
        <img
          src={closeIcon}
          className="w-4 h-4 cursor-pointer filter invert"
          onClick={() => setShowEditModal(false)}
          alt="close"
        />
      </div>

      {/* BODY */}
      <div className="overflow-y-auto px-6 py-4 space-y-4 text-sm">

        {/* INFO DASAR */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Judul Lowongan" name="title" value={formData.title} onChange={handleChange} />
          <Input label="Tipe Kerja" name="tipeKerja" value={formData.tipeKerja} onChange={handleChange} />
          <Input label="Lokasi" name="lokasi" value={formData.lokasi} onChange={handleChange} />
          <Input label="Tipe Pekerjaan" name="tipePekerjaan" value={formData.tipePekerjaan} onChange={handleChange} />
          <Input label="Rentang Gaji" name="gaji" value={formData.gaji} onChange={handleChange} />
          <Input label="Tenggat Waktu" name="tenggat" value={formData.tenggat} onChange={handleChange} />
        </div>

        {/* DESKRIPSI */}
        <div>
          <label className="text-gray-500 text-xs">Deskripsi</label>
          <textarea
            name="deskripsi"
            value={formData.deskripsi}
            onChange={handleChange}
            rows={4}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400"
          />
        </div>

        {/* PERSYARATAN */}
        {/* <div>
          <label className="text-gray-500 text-xs mb-1 block">Persyaratan</label>
          <div className="space-y-2 max-h-40 overflow-y-auto border border-gray-200 rounded p-2">
            {formData.persyaratan.map((item, index) => (
              <div key={index} className="flex gap-2 items-center">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => {
                    const newPersyaratan = [...formData.persyaratan];
                    newPersyaratan[index] = e.target.value;
                    setFormData({ ...formData, persyaratan: newPersyaratan });
                  }}
                  className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
                />
                <button
                  onClick={() => {
                    const newPersyaratan = formData.persyaratan.filter((_, i) => i !== index);
                    setFormData({ ...formData, persyaratan: newPersyaratan });
                  }}
                  className="text-red-500 font-bold px-2"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={() => setFormData({ ...formData, persyaratan: [...formData.persyaratan, ""] })}
            className="mt-2 text-green-600 text-sm font-semibold hover:underline"
          >
            + Tambah Persyaratan
          </button>
        </div> */}
{/* PERSYARATAN */}
<div>
  <label className="text-gray-500 text-xs mb-1 block">Persyaratan</label>
  <textarea
    name="persyaratan"
    value={formData.persyaratan}
    onChange={(e) => setFormData({ ...formData, persyaratan: e.target.value })}
    rows={6}
    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
    placeholder="Tuliskan persyaratan, pisahkan baris jika perlu"
  />
</div>

      </div>

      {/* FOOTER */}
      <div className="px-6 pb-4 bg-white">
        <div className="border-t border-gray-200/70 my-4"></div>
        <div className="flex justify-end gap-3">
          <button
            onClick={() => setShowEditModal(false)}
            className="px-4 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50 transition"
          >
            Batal
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-[#409144] text-white rounded text-sm font-semibold hover:bg-[#367a3a] transition"
          >
            Simpan
          </button>
        </div>
      </div>

    </div>
  </div>
)}


        {/* ================= POPUP KONFIRMASI NONAKTIFKAN ================= */}
        {showConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white w-full max-w-md rounded-xl shadow-lg overflow-hidden">
              {/* Judul */}
              <div className="px-6 py-5">
                <h2 className="text-xl font-bold text-center">Konfirmasi Perubahan</h2>
              </div>
              <div className="px-6"><hr className="border-gray-200" /></div>
              {/* Isi */}
              <div className="px-10 py-4 text-sm text-gray-700 space-y-4">
                <p>Apakah Anda yakin ingin menonaktifkan lowongan "{formData.title}"?</p>
                <p className="text-gray-500 text-xs">
                  Pelamar tidak akan bisa melihat atau melamar pada lowongan ini setelah dinonaktifkan.
                </p>
              </div>
              <div className="px-6"><hr className="border-gray-200" /></div>
              {/* Tombol */}
              <div className="px-6 py-4 flex gap-4">
                <button onClick={() => setShowConfirm(false)}
                        className="flex-1 border border-green-600 text-green-600 py-2.5 rounded-lg font-semibold hover:bg-green-50">
                  Batal
                </button>
                <button onClick={handleNonaktifkan}
                        className="flex-1 bg-red-600 text-white py-2.5 rounded-lg font-semibold hover:bg-red-700">
                  Nonaktifkan
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </AdminAumLayout>
  );
}

// ===================== Input Component =====================
const Input = ({ label, name, value, onChange }) => (
  <div className="flex flex-col">
    <label className="text-gray-500 text-xs">{label}</label>
    <input type="text" name={name} value={value} onChange={onChange}
           className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400 text-sm"/>
  </div>
);
