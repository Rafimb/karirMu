import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PelamarLayout from "../../components/layout/PelamarLayout";

// ICON
import userIcon from "../../assets/icons/ProfilPelamar/user-profile.svg";
import iconDocument from "../../assets/icons/ProfilPelamar/document-text.svg";
import iconDownload from "../../assets/icons/ProfilPelamar/document-download.svg";
import iconLink from "../../assets/icons/ProfilPelamar/link.svg";
import iconEdit from "../../assets/icons/ProfilPelamar/edit.svg";

// ICON SAX
import { Teacher, Briefcase } from "iconsax-react";

const DetailProfilPelamar = () => {
  const navigate = useNavigate();

  // State untuk expand/collapse deskripsi pengalaman
  const [expandedPengalaman, setExpandedPengalaman] = useState({});

  // State untuk edit portofolio
  const [isEditingPortfolio, setIsEditingPortfolio] = useState(false);
  const [portfolioLink, setPortfolioLink] = useState("https://portfolio.rafibarock.com");

  // Data dummy - nanti akan diambil dari context/state management
  const profileData = {
    nama: "Rafi Barrok",
    headline: "Pengembang Software & Edukasi Digital",
    photo: null,
    deskripsi:
      "Pengembang software dengan ketertarikan pada pengembangan web modern, UI/UX, dan sistem berbasis React.",
    domisili: "Magelang",
    jenisKelamin: "Laki-laki",
    noTelepon: "08239171908",
    usia: "23 Tahun",
  };

  const pendidikanData = [
    {
      id: 1,
      jenjang: "Kuliah S1",
      institusi: "Universitas Muhammadiyah Magelang",
      jurusan: "Teknologi Informasi",
      status: "Lulus",
      tahunMulai: "2019",
      tahunSelesai: "2019",
    },
    {
      id: 2,
      jenjang: "Kuliah S2",
      institusi: "Universitas Muhammadiyah Magelang",
      jurusan: "Teknologi Informasi",
      status: "Lulus",
      tahunMulai: "2019",
      tahunSelesai: "2023",
    },
    {
      id: 3,
      jenjang: "Kuliah S3",
      institusi: "Universitas Gadjah Mada",
      jurusan: "Teknologi Informasi",
      status: "Belum Lulus",
      tahunMulai: "2023",
      tahunSelesai: null,
    },
  ];

  const pengalamanData = [
    {
      id: 1,
      perusahaan: "PT Percasi Karya",
      posisi: "Front-end Developer",
      skills: ["Php", "Css", "Figma", "React Js", "Laravel"],
      tahunMulai: "2025",
      deskripsi:
        "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard. Deception Types.Lorem is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard. Deception Types.Lorem is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard. Deception Types.Lorem is simply dummy text of the printing and typesetting industry.",
    },
    {
      id: 2,
      perusahaan: "PT Hekel",
      posisi: "Back-end Developer",
      skills: ["Php", "Css", "Figma", "React Js", "Laravel"],
      tahunMulai: "2023",
      deskripsi:
        "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard. Deception Types.Lorem is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard. Deception Types.Lorem is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard. Deception Types.Lorem is simply dummy text of the printing and typesetting industry.",
    },
  ];

  // Toggle expand/collapse deskripsi
  const toggleDeskripsi = (id) => {
    setExpandedPengalaman((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Handle edit - navigasi ke halaman edit
  const handleEdit = (section) => {
    // Simpan data ke localStorage atau context untuk digunakan di halaman edit
    if (section === "biodata") {
      navigate("/pelamar/profil-pelamar");
    } else if (section === "pendidikan") {
      navigate("/pelamar/pendidikan-pelamar");
    } else if (section === "pengalaman") {
      navigate("/pelamar/pengalaman-pelamar");
    }
  };

  // Handle save portfolio link
  const handleSavePortfolio = () => {
    // Simpan ke backend/state management
    console.log("Portfolio link saved:", portfolioLink);
    setIsEditingPortfolio(false);
  };

  return (
    <PelamarLayout>
      <div className="space-y-6">
        {/* ================= HEADER PROFIL ================= */}
        <div className="bg-white rounded-t-xl shadow overflow-hidden">
          <div
            className="flex rounded-t-xl overflow-hidden"
            style={{
              background: "linear-gradient(90deg, #004F8F 0%, #009B49 100%)",
            }}
          >
            {/* KIRI */}
            <div className="flex items-center p-6 flex-[0.6] text-white gap-6">
              <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center">
                {profileData.photo ? (
                  <img
                    src={profileData.photo}
                    className="w-full h-full object-cover rounded-full"
                    alt="profile"
                  />
                ) : (
                  <img src={userIcon} className="w-10 h-10" alt="user" />
                )}
              </div>

              <div className="w-px bg-white h-20"></div>

              <div>
                <p className="font-bold text-lg">{profileData.nama}</p>
                <p className="text-sm opacity-90">{profileData.headline}</p>
              </div>
            </div>
          </div>
        </div>

        {/* ================= BIODATA ================= */}
        <div className="space-y-6">
          {/* ===== HEADER BIODATA ===== */}
          <div
            className="text-white font-medium px-4 py-3 rounded-t-xl"
            style={{
              background: "linear-gradient(90deg, #004F8F 0%, #009B49 100%)",
            }}
          >
            Biodata
          </div>

          {/* ===== DESKRIPSI SINGKAT ===== */}
          <div className="bg-white rounded-xl shadow p-6 text-sm text-gray-700">
            <p className="font-medium mb-2">Deskripsi Singkat</p>
            <p>{profileData.deskripsi}</p>
          </div>

          {/* ===== GRID BIODATA ===== */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* ===== CARD KIRI ===== */}
            <div className="bg-white rounded-xl shadow p-6 text-sm text-gray-700 space-y-4">
              <div>
                <p className="font-medium">Domisili</p>
                <p>{profileData.domisili}</p>
              </div>

              <div>
                <p className="font-medium">Jenis Kelamin</p>
                <p>{profileData.jenisKelamin}</p>
              </div>
            </div>

            {/* ===== CARD KANAN ===== */}
            <div className="bg-white rounded-xl shadow p-6 text-sm text-gray-700 space-y-4">
              <div>
                <p className="font-medium">No Telepon</p>
                <p>{profileData.noTelepon}</p>
              </div>

              <div>
                <p className="font-medium">Usia</p>
                <p>{profileData.usia}</p>
              </div>
            </div>
          </div>

          {/* BUTTON EDIT BIODATA */}
          <div className="bg-white rounded-xl shadow p-4 flex justify-end">
            <button
              onClick={() => handleEdit("biodata")}
              className="flex items-center gap-2 border border-[#409144] text-[#409144] px-4 py-2 rounded-md text-sm font-medium hover:bg-green-50"
            >
              <img src={iconEdit} alt="Edit" className="w-4 h-4" />
              Edit Biodata
            </button>
          </div>
        </div>

        {/* ================= PENDIDIKAN ================= */}
        <div className="space-y-4">
          {/* HEADER */}
          <div
            className="text-white font-medium px-4 py-3 rounded-t-xl"
            style={{
              background: "linear-gradient(90deg, #004F8F 0%, #009B49 100%)",
            }}
          >
            Pendidikan
          </div>

          {/* GRID 3 KOLOM PENDIDIKAN */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {pendidikanData.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow p-6">
                <div className="flex items-start gap-3">
                  <div className="shrink-0">
                    <Teacher size="24" color="#9CA3AF" variant="Bold" />
                  </div>
                  <div className="text-sm text-gray-700 space-y-1 flex-1">
                    <p className="font-semibold">{item.institusi}</p>
                    
                    {/* GARIS HORIZONTAL */}
                    <div className="border-t border-gray-300 my-2"></div>
                    
                    <p className="text-xs">
                      Jenjang Studi:{" "}
                      <span className="font-medium">{item.jenjang}</span>
                    </p>
                    <p className="text-xs">
                      Jurusan:{" "}
                      <span className="font-medium">{item.jurusan}</span>
                    </p>
                    <p className="text-xs">
                      Status Pendidikan:{" "}
                      <span
                        className={`font-medium ${
                          item.status === "Lulus"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {item.status}
                      </span>
                    </p>
                    <p className="text-xs">
                      Tahun Mulai & Selesai:{" "}
                      <span className="font-medium">
                        {item.tahunMulai}{" "}
                        {item.tahunSelesai ? `- ${item.tahunSelesai}` : ""}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* BUTTON EDIT PENDIDIKAN */}
          <div className="bg-white rounded-xl shadow p-4 flex justify-end">
            <button
              onClick={() => handleEdit("pendidikan")}
              className="flex items-center gap-2 border border-[#409144] text-[#409144] px-4 py-2 rounded-md text-sm font-medium hover:bg-green-50"
            >
              <img src={iconEdit} alt="Edit" className="w-4 h-4" />
              Edit Pendidikan
            </button>
          </div>
        </div>

        {/* ================= PENGALAMAN & KEAHLIAN ================= */}
        <div className="space-y-4">
          {/* HEADER */}
          <div
            className="text-white font-medium px-4 py-3 rounded-t-xl"
            style={{
              background: "linear-gradient(90deg, #004F8F 0%, #009B49 100%)",
            }}
          >
            Pengalaman & Keahlian
          </div>

          {/* LIST PENGALAMAN */}
          {pengalamanData.map((item, index) => (
            <div key={item.id} className="bg-white rounded-xl shadow">
              <div
                className={`p-6 ${
                  index < pengalamanData.length - 1 ? "border-b border-gray-200" : ""
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="shrink-0">
                    <Briefcase size="24" color="#9CA3AF" variant="Bold" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm text-gray-800 mb-1">
                      {item.perusahaan}
                    </p>
                    
                    {/* GARIS HORIZONTAL */}
                    <div className="border-t border-gray-300 my-2"></div>
                    
                    <div className="text-xs text-gray-600 space-y-1">
                      <p>
                        <span className="font-medium">Jabatan / Posisi:</span>{" "}
                        {item.posisi}
                      </p>
                      <p>
                        <span className="font-medium">Keahlian:</span>{" "}
                        {item.skills.join(", ")}
                      </p>
                    </div>
                  </div>
                  <div className="text-right text-xs text-gray-600">
                    <p className="font-medium">Tahun Mulai</p>
                    <p>{item.tahunMulai}</p>
                  </div>
                </div>

                {/* DESKRIPSI - COLLAPSIBLE */}
                <div className="mt-3 text-xs text-gray-600 leading-relaxed">
                  {expandedPengalaman[item.id] ? (
                    // Tampilan lengkap
                    <>
                      <p>{item.deskripsi}</p>
                      <button
                        onClick={() => toggleDeskripsi(item.id)}
                        className="text-blue-600 hover:underline mt-2 font-medium"
                      >
                        Tampilkan Lebih Ringkas
                      </button>
                    </>
                  ) : (
                    // Tampilan ringkas (3 baris)
                    <>
                      <p className="line-clamp-3">{item.deskripsi}</p>
                      <button
                        onClick={() => toggleDeskripsi(item.id)}
                        className="text-blue-600 hover:underline mt-1 font-medium"
                      >
                        ...Lihat Rincian
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* BUTTON EDIT PENGALAMAN */}
          <div className="bg-white rounded-xl shadow p-4 flex justify-end">
            <button
              onClick={() => handleEdit("pengalaman")}
              className="flex items-center gap-2 border border-[#409144] text-[#409144] px-4 py-2 rounded-md text-sm font-medium hover:bg-green-50"
            >
              <img src={iconEdit} alt="Edit" className="w-4 h-4" />
              Edit Pengalaman
            </button>
          </div>
        </div>

        {/* ================= CV & PORTOFOLIO ================= */}
        <div className="space-y-4">
          {/* HEADER */}
          <div
            className="text-white font-medium px-4 py-3 rounded-t-xl"
            style={{
              background: "linear-gradient(90deg, #004F8F 0%, #009B49 100%)",
            }}
          >
            CV & Portofolio
          </div>

          {/* CARD ISI */}
          <div className="bg-white rounded-xl shadow p-6 space-y-4 text-sm text-gray-700">
            {/* CV / RESUME */}
            <div className="flex items-center justify-between">
              <p className="font-medium">CV / Resume :</p>

              <div className="flex gap-3">
                <button className="flex items-center gap-2 border border-[#409144] text-[#409144] px-3 py-1.5 rounded-md text-xs font-medium hover:bg-green-50">
                  <img src={iconDocument} alt="Lihat File" className="w-4 h-4" />
                  Lihat File
                </button>

                <button className="flex items-center gap-2 bg-[#409144] text-white px-3 py-1.5 rounded-md text-xs font-medium hover:bg-green-700">
                  <img
                    src={iconDownload}
                    alt="Unduh"
                    className="w-4 h-4 brightness-0 invert"
                  />
                  Unduh
                </button>
              </div>
            </div>

            {/* PORTOFOLIO ONLINE */}
            <div className="flex items-center justify-between">
              <p className="font-medium">Portofolio Online :</p>

              {isEditingPortfolio ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={portfolioLink}
                    onChange={(e) => setPortfolioLink(e.target.value)}
                    className="border border-gray-300 px-3 py-1.5 rounded-md text-xs w-64 outline-none focus:border-[#409144]"
                    placeholder="https://portfolio.com"
                  />
                  <button
                    onClick={handleSavePortfolio}
                    className="bg-[#409144] text-white px-3 py-1.5 rounded-md text-xs font-medium hover:bg-green-700"
                  >
                    Simpan
                  </button>
                  <button
                    onClick={() => setIsEditingPortfolio(false)}
                    className="border border-gray-400 text-gray-600 px-3 py-1.5 rounded-md text-xs font-medium hover:bg-gray-50"
                  >
                    Batal
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <a
                    href={portfolioLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[#409144] px-3 py-1.5 rounded-md text-xs font-medium hover:underline"
                  >
                    Portofolio Online
                    <img src={iconLink} alt="Link" className="w-4 h-4" />
                  </a>
                  <button
                    onClick={() => setIsEditingPortfolio(true)}
                    className="flex items-center gap-1 text-blue-600 text-xs font-medium hover:underline"
                  >
                    <img src={iconEdit} alt="Edit" className="w-3 h-3" />
                    Edit
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </PelamarLayout>
  );
};

export default DetailProfilPelamar;