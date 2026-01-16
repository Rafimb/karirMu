import PelamarLayout from "../../components/layout/PelamarLayout";

// ICONS
import iconTextPelamar from "../../assets/icons/ProfilPelamar/icon-text.svg";
import iconSecurityPelamar from "../../assets/icons/ProfilPelamar/icon-security.svg";
import iconChecklistPelamar from "../../assets/icons/ProfilPelamar/icon-checklist.svg";
import iconCheckCirclePelamar from "../../assets/icons/ProfilPelamar/check-circle.svg";
import iconLocationPelamar from "../../assets/icons/ProfilPelamar/location.svg";
import iconUserPelamar from "../../assets/icons/ProfilPelamar/user-profile.svg";
import iconArrowRight from "../../assets/icons/ProfilPelamar/arrow-right.svg";
import iconSavePelamar from "../../assets/icons/ProfilPelamar/save.svg";


const DashboardPelamar = () => {
  return (
    <PelamarLayout>
      <div className="space-y-6">

        {/* ================= HEADER ================= */}
        <div
          className="px-6 py-4 rounded-t-2xl text-white text-3xl font-semibold min-h-75px"
          style={{
            background: "linear-gradient(90deg, #004F8F 0%, #009B49 100%)",
          }}
        >
          SELAMAT DATANG PELAMAR!
        </div>

        {/* ================= STATISTIK ================= */}
<div
  className="px-4 py-3 rounded-t-2xl font-medium text-white"
  style={{
    background: "linear-gradient(90deg, #004F8F 0%, #009B49 100%)",
  }}
>
  Statistik Lamaran
</div>

<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
  {/* TOTAL LAMARAN */}
  <div className="bg-white rounded-xl shadow-sm w-full max-w-361px h-216px mx-auto p-6 flex flex-col">
    
    {/* ICON */}
    <div className="flex">
      <div
        className="ml-8 w-11 h-11 rounded-full flex items-center justify-center"
        style={{ backgroundColor: "#409144" }}
      >
        <img
          src={iconTextPelamar}
          alt="total"
          className="w-5 h-5"
        />
      </div>
    </div>

    {/* CONTENT */}
    <div className="mt-4 ml-6 text-left">
      <h3 className="text-3xl font-bold text-gray-800">
        12
      </h3>
      <p className="text-sm font-medium text-gray-700 mt-1">
        Total Lamaran
      </p>
      <span className="text-xs text-blue-600">
        +12% from yesterday
      </span>
    </div>
  </div>

  {/* SEDANG DITINJAU */}
  <div className="bg-white rounded-xl shadow-sm w-full max-w-361px h-216px mx-auto p-6 flex flex-col">
    <div className="flex">
      <div
        className="ml-8 w-11 h-11 rounded-full flex items-center justify-center"
        style={{ backgroundColor: "#409144" }}
      >
        <img
          src={iconSecurityPelamar}
          alt="review"
          className="w-5 h-5"
        />
      </div>
    </div>

    <div className="mt-4 ml-6 text-left">
      <h3 className="text-3xl font-bold text-gray-800">
        5
      </h3>
      <p className="text-sm font-medium text-gray-700 mt-1">
        Sedang Ditinjau
      </p>
      <span className="text-xs text-blue-600">
        +5% from yesterday
      </span>
    </div>
  </div>

  {/* LOLOS SELEKSI */}
  <div className="bg-white rounded-xl shadow-sm w-full max-w-361px h-216px mx-auto p-6 flex flex-col">
    <div className="flex">
      <div
        className="ml-8 w-11 h-11 rounded-full flex items-center justify-center"
        style={{ backgroundColor: "#409144" }}
      >
        <img
          src={iconChecklistPelamar}
          alt="accepted"
          className="w-5 h-5"
        />
      </div>
    </div>

    <div className="mt-4 ml-6 text-left">
      <h3 className="text-3xl font-bold text-gray-800">
        2
      </h3>
      <p className="text-sm font-medium text-gray-700 mt-1">
        Lolos Seleksi
      </p>
      <span className="text-xs text-blue-600">
        +8% from yesterday
      </span>
    </div>
  </div>
</div>


        {/* ================= TIPS ================= */}
<div
  className="px-4 py-3 rounded-t-2xl font-medium text-white"
  style={{
    background: "linear-gradient(90deg, #004F8F 0%, #009B49 100%)",
  }}
>
  Tips Karir & Persiapan Tes
</div>

<div className="bg-white shadow-sm overflow-hidden rounded-b-xl">
  {/* ITEM 1 */}
  <div className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-50">
    {/* ICON */}
    <div className="w-4 h-4">
      <img
        src={iconArrowRight}
        alt="arrow"
        className="w-full h-full opacity-70"
      />
    </div>

    {/* TEXT */}
    <span className="text-sm text-gray-700">
      Cara sukses menghadapi Tes Psikotes di Kantor AUM.
    </span>
  </div>

  {/* SOFT DIVIDER */}
  <div className="mx-4 border-t border-gray-100" />

  {/* ITEM 2 */}
  <div className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-50">
    <div className="w-4 h-4">
      <img
        src={iconArrowRight}
        alt="arrow"
        className="w-full h-full opacity-70"
      />
    </div>

    <span className="text-sm text-gray-700">
      Panduan Interview Tatap Muka bagi Pemula.
    </span>
  </div>
</div>


        {/* ================= REKOMENDASI ================= */}
<div
  className="px-4 py-3 rounded-t-2xl font-medium text-white"
  style={{
    background: "linear-gradient(90deg, #004F8F 0%, #009B49 100%)",
  }}
>
  Rekmendasi Lamaran Terbaru Sesuai Keahlianmu
</div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  {/* CARD */}
  <div className="bg-white rounded-b-2xl shadow-sm p-5 flex flex-col justify-between min-h-307px">
    
    {/* HEADER */}
    <div className="flex justify-between items-start">
      <h3 className="font-semibold text-gray-800">UI/UX Designer</h3>
      <span className="text-sm text-blue-600 font-medium">
        Rp 4jt-6 jt
      </span>
    </div>

    {/* TAGS */}
    <div className="flex flex-wrap gap-4 text-xs mt-2">
      <span className="px-3 py-1 bg-gray-100 rounded-full">UI/UX</span>
      <span className="px-3 py-1 bg-gray-100 rounded-full">Fulltime</span>
      <span className="px-3 py-1 bg-gray-100 rounded-full">Minimal (S1)</span>
      <span className="px-3 py-1 bg-gray-100 rounded-full">2 jt-3 jt</span>
      <span className="px-3 py-1 bg-gray-100 rounded-full">+10</span>
    </div>

    {/* COMPANY & LOCATION */}
    <div className="flex items-start gap-4 mt-4">
      {/* ICON KIRI */}
      <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
        <img src={iconUserPelamar} className="w-4" />
      </div>

      {/* GARIS VERTIKAL */}
      <div className="w-px bg-gray-200 self-stretch" />

      {/* INFO */}
      <div className="space-y-2">
        <div className="flex items-center gap-4 text-sm">
          <img src={iconCheckCirclePelamar} className="w-4" />
          <span className="text-blue-600 font-medium">
            PT. SURYA MEDIA UTAMA
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs text-gray-500">
          <img src={iconLocationPelamar} className="w-4" />
          Sleman, Jogja
        </div>
      </div>
    </div>

    {/* GARIS HORIZONTAL */}
    <div className="border-t border-gray-100 mt-4 pt-3 flex justify-between items-center">
      <span className="text-xs text-gray-400">
        14 hari yang lalu
      </span>

      <img
        src={iconSavePelamar}
        alt="save"
        className="w-4 opacity-70 hover:opacity-100 cursor-pointer"
      />
    </div>
  </div>

  {/* CARD 2 (tinggal ganti data) */}
  <div className="bg-white rounded-b-2xl shadow-sm p-5 flex flex-col justify-between min-h-307px">
    <div className="flex justify-between items-start">
      <h3 className="font-semibold text-gray-800">UI/UX Designer</h3>
      <span className="text-sm text-blue-600 font-medium">
        Rp 2jt-4 jt
      </span>
    </div>

    <div className="flex flex-wrap gap-4 text-xs mt-2">
      <span className="px-3 py-1 bg-gray-100 rounded-full">UI/UX</span>
      <span className="px-3 py-1 bg-gray-100 rounded-full">Fulltime</span>
      <span className="px-3 py-1 bg-gray-100 rounded-full">Minimal (SMK)</span>
      <span className="px-3 py-1 bg-gray-100 rounded-full">+5</span>
    </div>

    <div className="flex items-start gap-4 mt-4">
      <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
        <img src={iconUserPelamar} className="w-4" />
      </div>

      <div className="w-px bg-gray-200 self-stretch" />

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm">
          <img src={iconCheckCirclePelamar} className="w-4" />
          <span className="text-blue-600 font-medium">
            LAZENDA
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs text-gray-500">
          <img src={iconLocationPelamar} className="w-4" />
          Medan, Sumatra Utara
        </div>
      </div>
    </div>

    <div className="border-t border-gray-100 mt-4 pt-3 flex justify-between items-center">
      <span className="text-xs text-gray-400">
        12 hari yang lalu
      </span>

      <img
        src={iconSavePelamar}
        className="w-4 opacity-70 hover:opacity-100 cursor-pointer"
      />
    </div>
  </div>
</div>


        
      </div>
    </PelamarLayout>
  );
};

export default DashboardPelamar;
