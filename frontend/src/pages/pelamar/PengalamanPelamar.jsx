import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PelamarLayout from "../../components/layout/PelamarLayout";

// ICON
import plusIcon from "../../assets/icons/ProfilPelamar/add-circle.svg";
import deleteIcon from "../../assets/icons/ProfilPelamar/trash.svg";
import searchIcon from "../../assets/icons/ProfilPelamar/search.svg";
import checkIcon from "../../assets/icons/ProfilPelamar/check-circle.svg";


const PengalamanPelamar = () => {
  const navigate = useNavigate();

  const [showConfirm, setShowConfirm] = useState(false);

  const [pengalamanList, setPengalamanList] = useState([
    {
      id: 1,
      perusahaan: "PT Maju Jaya",
      posisi: "Frontend Developer",
      deskripsi: "",
      skills: ["React", "Tailwind"],
    },
  ]);

  const [aktifId, setAktifId] = useState(1);
  const [skillInput, setSkillInput] = useState("");

  const pengalamanAktif = pengalamanList.find(
    (item) => item.id === aktifId
  );

  const updateField = (field, value) => {
    setPengalamanList((prev) =>
      prev.map((item) =>
        item.id === aktifId ? { ...item, [field]: value } : item
      )
    );
  };

  const tambahPengalaman = () => {
    const newId = Date.now();
    setPengalamanList([
      ...pengalamanList,
      {
        id: newId,
        perusahaan: "",
        posisi: "",
        deskripsi: "",
        skills: [],
      },
    ]);
    setAktifId(newId);
  };

  const hapusPengalaman = (id) => {
    if (pengalamanList.length === 1) return;
    const filtered = pengalamanList.filter((item) => item.id !== id);
    setPengalamanList(filtered);
    setAktifId(filtered[0].id);
  };

  /* ===== SKILL ===== */
  const tambahSkill = (e) => {
    if (e.key === "Enter" && skillInput.trim()) {
      e.preventDefault();
      setPengalamanList((prev) =>
        prev.map((item) =>
          item.id === aktifId
            ? { ...item, skills: [...item.skills, skillInput] }
            : item
        )
      );
      setSkillInput("");
    }
  };

  const hapusSkill = (index) => {
    setPengalamanList((prev) =>
      prev.map((item) =>
        item.id === aktifId
          ? {
              ...item,
              skills: item.skills.filter((_, i) => i !== index),
            }
          : item
      )
    );
  };

  /* ===== SIMPAN ===== */
  const handleSimpan = () => {
    setShowConfirm(true);
  };

  const handleFinalSubmit = () => {
    console.log("DATA FINAL:", pengalamanList);
    setShowConfirm(false);
    navigate("/pelamar/detail-profil-pelamar");
  };

  return (
    <PelamarLayout>
      <div className="space-y-6">

        {/* ================= HEADER ================= */}
        <div
          className="px-6 py-4 rounded-t-2xl text-white font-semibold"
          style={{
            background: "linear-gradient(90deg, #0F5EA8 0%, #1E9E63 100%)",
          }}
        >
          Pengalaman & Skill
        </div>

        {/* ================= RIWAYAT ================= */}
        <div className="bg-white rounded-xl shadow px-6 py-4 space-y-4">
          {pengalamanList.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setAktifId(item.id)}
              className={`border rounded-xl px-6 py-4 cursor-pointer
              ${
                aktifId === item.id
                  ? "border-dashed border-blue-500"
                  : "border-gray-200"
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <p className="text-sm font-semibold">
                    Riwayat Pengalaman Kerja & Skill {index + 1}
                  </p>
                  <p className="text-sm">
                    {item.perusahaan || "PT / Nama Perusahaan"}
                  </p>
                  <p className="text-sm text-gray-600">
                    {item.posisi || "Jabatan / Posisi"}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-2">
                    {item.skills.length > 0 ? (
                      item.skills.map((skill, i) => (
                        <span
                          key={i}
                          className="bg-[#409144] text-white px-3 py-1 rounded-full text-xs flex items-center gap-2"
                        >
                          {skill}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-gray-400">
                        Keahlian belum diisi
                      </span>
                    )}
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    hapusPengalaman(item.id);
                  }}
                  className="flex items-center gap-2 text-red-600 text-sm"
                >
                  <img src={deleteIcon} className="w-4 h-4" />
                  Hapus
                </button>
              </div>
            </div>
          ))}

          <div className="flex justify-end">
            <button
              onClick={tambahPengalaman}
              className="flex items-center gap-2 border border-green-600 text-green-600 px-4 py-2 rounded-lg text-sm"
            >
              <img src={plusIcon} className="w-4 h-4" />
              Tambah Pengalaman Lain
            </button>
          </div>
        </div>

        {/* ================= FORM ================= */}
        {pengalamanAktif && (
          <div className="bg-white rounded-xl shadow px-8 py-8 space-y-6">
            <div>
              <label className="text-sm font-medium">Nama Perusahaan</label>
              <input
                value={pengalamanAktif.perusahaan}
                onChange={(e) =>
                  updateField("perusahaan", e.target.value)
                }
                className="mt-2 w-full bg-[#F2F4F8] px-4 py-3 rounded-md"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Jabatan / Posisi</label>
              <input
                value={pengalamanAktif.posisi}
                onChange={(e) =>
                  updateField("posisi", e.target.value)
                }
                className="mt-2 w-full bg-[#F2F4F8] px-4 py-3 rounded-md"
              />
            </div>

            {/* SKILL */}
            <div>
              <label className="text-sm font-medium">Keahlian</label>
              <div className="relative mt-2">
                <input
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={tambahSkill}
                  placeholder="Ketik skill lalu tekan Enter"
                  className="w-full bg-[#F2F4F8] px-4 py-3 pr-10 rounded-md"
                />
                <img
                  src={searchIcon}
                  className="absolute right-3 top-3.5 w-4 h-4 opacity-60"
                />
              </div>

              <div className="flex flex-wrap gap-2 mt-3">
                {pengalamanAktif.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-[#409144] text-white px-3 py-1 rounded-full text-xs flex items-center gap-2"
                  >
                    {skill}
                    <button
                      onClick={() => hapusSkill(index)}
                      className="text-white-500 font-bold"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* DESKRIPSI */}
            <div>
              <label className="text-sm font-medium">Deskripsi Pekerjaan</label>
              <textarea
                rows="4"
                value={pengalamanAktif.deskripsi}
                onChange={(e) =>
                  updateField("deskripsi", e.target.value)
                }
                className="mt-2 w-full bg-[#F2F4F8] px-4 py-3 rounded-md resize-none"
              />
            </div>
          </div>
        )}

        {/* ================= SIMPAN ================= */}
        <div className="bg-white rounded-xl shadow px-8 py-5 flex justify-end">
          <button
            onClick={handleSimpan}
            className="bg-[#409144] text-white px-8 py-2.5 rounded-md text-sm font-semibold"
          >
            Simpan Dan Selesai
          </button>
        </div>

{/* ================= POPUP ================= */}
{showConfirm && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
    <div className="bg-white w-623px rounded-xl shadow-lg overflow-hidden">

      {/* ===== JUDUL ===== */}
      <div className="px-6 py-6">
        <div className="flex items-center justify-center gap-3">
          <img
            src={checkIcon}
            alt="success"
            className="w-7 h-7"
          />
          <h2 className="text-xl font-bold">
            Profil Anda Siap Digunakan!
          </h2>
        </div>
      </div>

      {/* GARIS */}
      <div className="px-6">
        <hr className="border-gray-200" />
      </div>

      {/* ===== ISI ===== */}
      <div className="px-10 py-6 text-sm text-gray-700 space-y-4">
        <p className="text-center">
          Selamat! Anda telah melengkapi seluruh data profil:
        </p>

        <ul className="space-y-1 text-gray-600">
          <li>- Biodata Diri (Lengkap)</li>
          <li>- Riwayat Pendidikan (Lengkap)</li>
          <li>- Pengalaman & Keahlian (Lengkap)</li>
        </ul>
      </div>

      {/* GARIS */}
      <div className="px-8">
        <hr className="border-gray-200" />
      </div>

      {/* ===== TOMBOL ===== */}
      <div className="px-6 py-5 flex gap-4">
        <button
          onClick={() => setShowConfirm(false)}
          className="flex-1 border border-gray-400 text-gray-600 py-2.5 rounded-lg font-semibold hover:bg-gray-50"
        >
          Periksa Kembali
        </button>

        <button
          onClick={handleFinalSubmit}
          className="flex-1 bg-[#409144] text-white py-2.5 rounded-lg font-semibold hover:bg-[#357a34]"
        >
          Simpan & Selesai
        </button>
      </div>

    </div>
  </div>
)}


      </div>
    </PelamarLayout>
  );
};

export default PengalamanPelamar;
