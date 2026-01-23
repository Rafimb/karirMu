import AdminSuperLayout from "../../components/layout/AdminSuperLayout";

// ICON
import documentIcon from "../../assets/icons/ProfilAdminSuper/document-text-black.svg";

const DetailPengajuanAum = () => {
  return (
    <AdminSuperLayout>
      <div className="space-y-6">

        {/* ===============================
            INFORMASI UMUM
        =============================== */}
        <div
          className="px-4 py-3 rounded-t-lg font-medium text-white"
          style={{
            background: "linear-gradient(90deg, #004F8F 0%, #009B49 100%)",
          }}
        >
          Informasi Umum
        </div>

        {/* CARD INFORMASI UMUM */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* KIRI */}
          <div className="bg-white rounded-b-xl shadow p-6 space-y-3 text-sm">
            <Info label="Nama Perusahaan" value="Perusahaan" />
            <Info label="No Telepon" value="0274512345" />
            <Info label="Provinsi" value="Jawa Tengah" />
            <Info label="Bidang Industri" value="https://perusahaan.co.id" />
          </div>

          {/* KANAN */}
          <div className="bg-white rounded-b-xl shadow p-6 space-y-3 text-sm">
            <Info label="Email Perusahaan" value="perusahaan@gmail.com" />
            <Info label="Website Resmi" value="www.perusahaan.com" />
            <Info label="Kota / Kabupaten" value="Magelang" />
            <Info label="Jumlah Karyawan" value="40 Karyawan" />
          </div>
        </div>

        {/* ===============================
            DESKRIPSI & ALAMAT
        =============================== */}

        <div className="bg-white rounded-b-xl shadow p-6 space-y-4 text-sm">
          <Info
            label="Deskripsi"
            value="Perusahaan pengembang software untuk mendukung kemajuan Amal Usaha."
          />
          <Info
            label="Alamat Lengkap"
            value="Jl. Kapas No. 9, Semaki, Kec. Umbulharjo, Kota Yogyakarta"
          />
        </div>

        {/* ===============================
            DOKUMEN LEGALITAS
        =============================== */}
        <div
          className="px-4 py-3 rounded-t-lg font-medium text-white"
          style={{
            background: "linear-gradient(90deg, #004F8F 0%, #009B49 100%)",
          }}
        >
          Dokumen Legalitas
        </div>

        {/* CARD DOKUMEN */}
        <div className="space-y-4">
          <DokumenCard title="AD/ART Muhammadiyah" />
          <DokumenCard title="Surat Keputusan (SK)" />
          <DokumenCard title="Qaidah PPM" />
          <DokumenCard title="NPWP Perusahaan" />
        </div>

        {/* ===============================
            AREA KEPUTUSAN
        =============================== */}
        <div
          className="px-4 py-3 rounded-t-lg font-medium text-white"
          style={{
            background: "linear-gradient(90deg, #004F8F 0%, #009B49 100%)",
          }}
        >
          Area Keputusan
        </div>

        <div className="bg-white rounded-b-xl shadow p-6">
          <textarea
            rows={4}
            placeholder="Tuliskan Catatan untuk Admin AUM"
            className="w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#409144]"
          />
        </div>

        {/* ===============================
            AKSI
        =============================== */}
        <div
          className="px-4 py-3 rounded-t-lg font-medium text-white"
          style={{
            background: "linear-gradient(90deg, #004F8F 0%, #009B49 100%)",
          }}
        >
          Aksi
        </div>

        <div className="bg-white rounded-b-xl shadow p-4 flex justify-end gap-3">
          <button className="px-6 py-2 rounded-lg bg-red-600 text-white text-sm font-medium">
            Tolak
          </button>
          <button className="px-6 py-2 rounded-lg bg-green-600 text-white text-sm font-medium">
            Setujui & Aktifkan
          </button>
        </div>

      </div>
    </AdminSuperLayout>
  );
};

export default DetailPengajuanAum;

/* ===============================
   KOMPONEN BANTUAN
================================ */

const Info = ({ label, value }) => (
  <div className="flex gap-2">
    <span className="w-44 text-gray-600">{label}</span>
    <span className="font-medium text-gray-800">: {value}</span>
  </div>
);

const DokumenCard = ({ title }) => (
  <div className="bg-white rounded-xl shadow p-5 space-y-4">

    {/* JUDUL DOKUMEN */}
    <div className="flex items-center gap-3 text-sm font-medium text-gray-800">
      <span>{title}</span>
    </div>

    {/* AKSI DOKUMEN */}
    <div className="flex items-center justify-between">
      
      {/* BUTTON LIHAT FILE */}
      <button
        className="
          flex items-center gap-2
          text-sm font-medium
          text-[#409144]
          hover:underline
        "
      >
        <img src={documentIcon} className="w-6 h-6" />
        Lihat File
      </button>

      {/* BUTTON SETUJU / TOLAK */}
      <div className="flex gap-2">
        <button className="px-4 py-1.5 rounded-lg bg-green-600 text-white text-sm">
          Setujui
        </button>
        <button className="px-4 py-1.5 rounded-lg bg-red-600 text-white text-sm">
          Tolak
        </button>
      </div>

    </div>
  </div>
);

