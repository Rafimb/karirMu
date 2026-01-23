import PelamarLayout from "../../components/layout/PelamarLayout";

// ICON
import userIcon from "../../assets/icons/ProfilPelamar/user-profile.svg";
import iconDocument from "../../assets/icons/ProfilPelamar/document-text.svg";
import iconDownload from "../../assets/icons/ProfilPelamar/document-download.svg";
import iconLink from "../../assets/icons/ProfilPelamar/link.svg";
import iconEdit from "../../assets/icons/ProfilPelamar/edit.svg";


const DetailProfilPelamar = () => {
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
                <img src={userIcon} className="w-10 h-10" alt="user" />
              </div>

              <div className="w-px bg-white h-20"></div>

              <div>
                <p className="font-bold text-lg">Rafi Barrok</p>
                <p className="text-sm opacity-90">
                  Pengembang Software & Edukasi Digital
                </p>
              </div>
            </div>
          </div>
        </div>

{/* ================= BIODATA ================= */}
<div className="space-y-6">

  {/* ===== RINGKASAN AKTIVITAS ===== */}
    <div
  className="text-white font-medium px-4 py-3 rounded-t-xl"
  style={{ background: "linear-gradient(90deg, #004F8F 0%, #009B49 100%)" }}
>
  Biodata
</div>

  {/* ===== DESKRIPSI SINGKAT ===== */}
  <div className="bg-white rounded-xl shadow p-6 text-sm text-gray-700">
    <p className="font-medium mb-2">Deskripsi Singkat</p>
    <p>
      Pengembang software dengan ketertarikan pada pengembangan web modern,
      UI/UX, dan sistem berbasis React.
    </p>
  </div>

  {/* ===== GRID BIODATA ===== */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

    {/* ===== CARD KIRI ===== */}
    <div className="bg-white rounded-xl shadow p-6 text-sm text-gray-700 space-y-4">
      <div>
        <p className="font-medium">Domisili</p>
        <p>Magelang</p>
      </div>

      <div>
        <p className="font-medium">Jenis Kelamin</p>
        <p>Laki-laki</p>
      </div>
    </div>

    {/* ===== CARD KANAN ===== */}
    <div className="bg-white rounded-xl shadow p-6 text-sm text-gray-700 space-y-4">
      <div>
        <p className="font-medium">No Telepon</p>
        <p>08239171908</p>
      </div>

      <div>
        <p className="font-medium">Usia</p>
        <p>23 Tahun</p>
      </div>
    </div>

  </div>

</div>


{/* ================= PENDIDIKAN 1 ================= */}
<div className="space-y-4">
     <div
  className="text-white font-medium px-4 py-3 rounded-t-xl"
  style={{ background: "linear-gradient(90deg, #004F8F 0%, #009B49 100%)" }}
>
  Pendidikan 1
</div>

  <div className="bg-white rounded-xl shadow p-6 space-y-3 text-sm text-gray-700">
    <p><span className="font-medium">Jenjang</span> : S1</p>
    <p><span className="font-medium">Institusi</span> : Universitas Muhammadiyah Magelang</p>
    <p><span className="font-medium">Jurusan</span> : Teknologi Informasi</p>
    <p><span className="font-medium">Status</span> : <span className="text-green-600 font-semibold">Lulus</span></p>
    <p><span className="font-medium">Tahun</span> : 2026</p>
  </div>
</div>

        {/* ================= PENDIDIKAN 2 ================= */}
<div className="space-y-4">

    <div
  className="text-white font-medium px-4 py-3 rounded-t-xl"
  style={{ background: "linear-gradient(90deg, #004F8F 0%, #009B49 100%)" }}
>
  Pendidikan 2
</div>

  <div className="bg-white rounded-xl shadow p-6 space-y-3 text-sm text-gray-700">
    <p><span className="font-medium">Jenjang</span> : S2</p>
    <p><span className="font-medium">Institusi</span> : Universitas Muhammadiyah Magelang</p>
    <p><span className="font-medium">Jurusan</span> : Teknologi Informasi</p>
    <p><span className="font-medium">Status</span> : Belum Lulus</p>
  </div>
</div>


        {/* ================= PENGALAMAN 1 ================= */}
<div className="space-y-4">
 
     <div
  className="text-white font-medium px-4 py-3 rounded-t-xl"
  style={{ background: "linear-gradient(90deg, #004F8F 0%, #009B49 100%)" }}
>
  Pengalaman & Keahlian 1
</div>

  <div className="bg-white rounded-xl shadow p-6 space-y-3 text-sm text-gray-700">
    <p><span className="font-medium">Perusahaan</span> : PT Teknologi Maju Bersama</p>
    <p><span className="font-medium">Posisi</span> : Frontend Developer</p>
    <p><span className="font-medium">Keahlian</span> : React, Tailwind, Figma</p>
  </div>
</div>


        {/* ================= PENGALAMAN 2 ================= */}
<div className="space-y-4">
     <div
  className="text-white font-medium px-4 py-3 rounded-t-xl"
  style={{ background: "linear-gradient(90deg, #004F8F 0%, #009B49 100%)" }}
>
  Pengalaman & Keahlian 2
</div>

  <div className="bg-white rounded-xl shadow p-6 space-y-3 text-sm text-gray-700">
    <p><span className="font-medium">Perusahaan</span> : PT Teknologi Digital</p>
    <p><span className="font-medium">Posisi</span> : UI Engineer</p>
    <p><span className="font-medium">Keahlian</span> : React, UX, Design System</p>
  </div>
</div>


        {/* ================= CV & PORTOFOLIO ================= */}
<div className="space-y-4">
  {/* HEADER */}

    <div
  className="text-white font-medium px-4 py-3 rounded-t-xl"
  style={{ background: "linear-gradient(90deg, #004F8F 0%, #009B49 100%)" }}
>
  CV & Portofolio
</div>

  {/* CARD ISI */}
  <div className="bg-white rounded-xl shadow p-6 space-y-4 text-sm text-gray-700">
    
    {/* CV / RESUME */}
    <div className="flex items-center justify-between">
      <p className="font-medium">CV / Resume : </p>

      <div className="flex gap-3">
        <button className="flex items-center gap-2 border border-[#409144] text-[#409144] px-3 py-1.5 rounded-md text-xs font-medium">
          <img src={iconDocument} alt="Lihat File" className="w-4 h-4" />
          Lihat File
        </button>

        <button className="flex items-center gap-2 bg-[#409144] border border-[#ffffff] text-[#ffffff] px-3 py-1.5 rounded-md text-xs font-medium">
          <img src={iconDownload} alt="Unduh" className="w-4 h-4" />
          Unduh
        </button>
      </div>
    </div>

    {/* PORTOFOLIO ONLINE */}
    <div className="flex items-center justify-between">
      <p className="font-medium">Portofolio Online : </p>

      <a
        href="https://www.instagram.com/_rafibarock/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 text-[#409144] px-3 py-1.5 rounded-md text-xs font-medium"
      >
        Link Portofolio
        <img src={iconLink} alt="Link" className="w-4 h-4" />
      </a>
    </div>
  </div>

  {/* CARD EDIT TERPISAH */}
  <div className="bg-white rounded-xl shadow p-4 flex justify-end">
    <button className="flex items-center gap-2 border border-[#409144] text-[#409144] px-3 py-1.5 rounded-md text-xs font-medium">
      <img src={iconEdit} alt="Edit" className="w-4 h-4" />
      Edit/Update?
    </button>
  </div>
</div>




      </div>
    </PelamarLayout>
  );
};

export default DetailProfilPelamar;
