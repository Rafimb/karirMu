import AdminSuperLayout from "../../components/layout/AdminSuperLayout";
import documentIcon from "../../assets/icons/ProfilAdminSuper/document-text-black.svg";

import { useNavigate } from "react-router-dom";



const PengajuanAum = () => {

  const navigate = useNavigate();

    const data = [
  {
    name: "Universitas Maju Satu",
    status: "Pending",
    badge: "bg-[#F1C21B]",
    message: "Tuliskan profil singkat perusahaan Anda",
  },
  {
    name: "Universitas Maju Semua",
    status: "Diterima",
    badge: "bg-[#25A249]",
    message:
      "Selamat bergabung! Akun Anda telah aktif dan dapat digunakan.",
  },
  {
    name: "Universitas Mundur Semua",
    status: "Ditolak",
    badge: "bg-[#DA1E28]",
    message:
      "Pengajuan ditolak. Silakan perbaiki data dan ajukan kembali.",
  },
];



  return (
    <AdminSuperLayout>
      <div className="space-y-6">

        {/* ================= FILTER STATUS ================= */}
        <div
          className="px-4 py-3 rounded-t-lg text-white text-sm font-medium"
          style={{
            background: "linear-gradient(90deg, #004F8F 0%, #009B49 100%)",
          }}
        >
          Filter Status
        </div>

        <div className="bg-white rounded-b-xl shadow p-4">
          <div className="flex gap-3 flex-wrap">
            {["Semua (12)", "Pending (5)", "Diterima (4)", "Ditolak (3)"].map(
              (item) => (
                <button
                  key={item}
                  className="
                    px-5 py-2
                    rounded-full
                    border border-[#409144]
                    text-[#409144]
                    text-sm font-medium
                    hover:bg-[#409144]/10
                    transition
                  "
                >
                  {item}
                </button>
              )
            )}
          </div>
        </div>

        {/* ================= TITLE LIST ================= */}
        <div
          className="px-4 py-3 rounded-t-lg text-white text-sm font-medium"
          style={{
            background: "linear-gradient(90deg, #004F8F 0%, #009B49 100%)",
          }}
        >
          Daftar Pengajuan Akun AUM
        </div>

        {/* ================= LIST CARD ================= */}
        {data.map((item, index) => (
          <div key={index} className="bg-white rounded-b-xl shadow p-5 space-y-4">

            {/* TITLE */}
            <h3 className="font-semibold text-gray-800">
              {item.name}
            </h3>

            {/* INFO */}
            <p className="text-xs text-gray-500">
              Kategori Pendidikan | Tanggal Pengajuan: 22 Desember 2025
            </p>

            <div className="h-px bg-gray-200" />


{/* DOKUMEN */}
<div className="flex items-center justify-between text-sm">
  <span className="text-gray-600">Dokumen</span>

  <div className="flex gap-6">
    <div className="flex items-center gap-2 cursor-pointer">
      <img
        src={documentIcon}
        alt="Profil Instansi"
        className="w-4 h-4"
      />
      <span className="text-gray-700 hover:underline">
        Profil_Instansi.pdf
      </span>
    </div>

    <div className="flex items-center gap-2 cursor-pointer">
      <img
        src={documentIcon}
        alt="Legalitas AUM"
        className="w-4 h-4"
      />
      <span className="text-gray-700 hover:underline">
        Legalitas_aum.pdf
      </span>
    </div>
  </div>
</div>



            <div className="h-px bg-gray-200" />


            {/* STATUS */}
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Status</span>
              <span
                className={`px-3 py-1 text-xs rounded-full text-white ${item.badge}`}
              >
                {item.status}
              </span>
            </div>

            
{/* PESAN */}
<div>
  <p className="text-sm text-gray-600 mb-1">
    Alasan / Pesan (Opsional)
  </p>

  <div className="bg-gray-100 p-3 rounded-md text-sm text-gray-700 h-24">
    {item.message}
  </div>
</div>

            {/* ACTION */}
            <div className="flex justify-end">
            <button
  onClick={() =>
    navigate("/admin-super/detail-pengajuan-aum")
  }
  className="
    px-4 py-1.5
    border border-[#409144]
    text-[#409144]
    rounded-full
    text-sm
    hover:bg-[#409144]/10
    transition
  "
>
  Lihat Detail
</button>

            </div>
          </div>
        ))}

{/* ================= PAGINATION ================= */}
<div className="bg-white rounded-lg shadow-sm px-6 py-4 flex justify-between items-center text-sm text-gray-600">
  
  {/* INFO */}
  <span>
    Menampilkan <b>1–3</b> dari <b>12</b> AUM
  </span>

  {/* PAGE CONTROL */}
  <div className="flex items-center gap-4">
    <button className="hover:underline">&lt; Prev</button>

    {[1, 2, 3].map((p) => (
      <button
        key={p}
        className={`
          w-7 h-7 flex items-center justify-center rounded
          ${p === 1
            ? "border border-[#409144] text-[#409144] font-semibold"
            : "hover:underline"
          }
        `}
      >
        {p}
      </button>
    ))}

    <button className="hover:underline">Next &gt;</button>
  </div>
  
</div>

      </div>
    </AdminSuperLayout>
  );
};

export default PengajuanAum;
