import AdminSuperLayout from "../../components/layout/AdminSuperLayout";

// ICON
import userIcon from "../../assets/icons/ProfilAdminSuper/users.svg";
import userTickIcon from "../../assets/icons/ProfilAdminSuper/user-tick.svg";
import documentIcon from "../../assets/icons/ProfilAdminSuper/document-text.svg";
import warningIcon from "../../assets/icons/ProfilAdminSuper/warning-2.svg";

const DashboardAdminSuper = () => {
  return (
    <AdminSuperLayout>
      <div className="space-y-6">

        {/* ===============================
            RINGKASAN AKTIVITAS SISTEM
        =============================== */}
<div
  className="px-4 py-3 rounded-t-lg font-medium text-white"
  style={{
    background: "linear-gradient(90deg, #004F8F 0%, #009B49 100%)",
  }}
>
  Ringkasan Aktifitas Sistem
</div>

{/* CARD FILTER */}
<div className="bg-white rounded-b-xl shadow p-4">
  <div className="flex gap-3">
    {["Semua", "Admin Aum", "Pelamar"].map((item) => (
      <button
        key={item}
        className="
          px-6 py-2
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
    ))}
  </div>
</div>


        {/* ===============================
            INDIKATOR UTAMA
        =============================== */}
<div
  className="px-4 py-3 rounded-t-lg font-medium text-white"
  style={{
    background: "linear-gradient(90deg, #004F8F 0%, #009B49 100%)",
  }}
>
  Indikator Utama
</div>

        {/* CARD INDIKATOR */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* CARD 1 */}
          <div className="bg-white p-6 rounded-b-xl shadow space-y-3">
            <div className="w-10 h-10 bg-[#409144] rounded-full flex items-center justify-center">
              <img src={userIcon} className= "w-5 h-5 brightness-0 invert" />
            </div>
            <p className="text-2xl font-bold">12</p>
            <p className="text-sm text-gray-600">
              Menunggu Persetujuan
            </p>
          </div>

          {/* CARD 2 */}
          <div className="bg-white p-6 rounded-b-xl shadow space-y-3">
            <div className="w-10 h-10 bg-[#409144] rounded-full flex items-center justify-center">
              <img src={userTickIcon} className= "w-5 h-5 brightness-0 invert" />
            </div>
            <p className="text-2xl font-bold">25</p>
            <p className="text-sm text-gray-600">
              Total AUM Aktif
            </p>
          </div>

          {/* CARD 3 */}
          <div className="bg-white p-6 rounded-b-xl shadow space-y-3">
            <div className="w-10 h-10 bg-[#409144] rounded-full flex items-center justify-center">
              <img src={documentIcon} className= "w-5 h-5 brightness-0 invert" />
            </div>
            <p className="text-2xl font-bold">55</p>
            <p className="text-sm text-gray-600">
              Total Lowongan
            </p>
          </div>

          {/* CARD 4 */}
          <div className="bg-white p-6 rounded-b-xl shadow space-y-3">
            <div className="w-10 h-10 bg-[#409144] rounded-full flex items-center justify-center">
              <img src={userTickIcon} className= "w-5 h-5 brightness-0 invert" />
            </div>
            <p className="text-2xl font-bold">150</p>
            <p className="text-sm text-gray-600">
              Total Pelamar
            </p>
          </div>
        </div>

        {/* ===============================
            PEMBERITAHUAN TERBARU
        =============================== */}
<div
  className="px-4 py-3 rounded-t-lg font-medium text-white"
  style={{
    background: "linear-gradient(90deg, #004F8F 0%, #009B49 100%)",
  }}
>
  Pemberitahuan Terbaru
</div>

        {/* CARD DENGAN GARIS TITIK-TITIK */}
<div className="border-2 border-dashed border-[#409144] bg-green-50 rounded-b-xl p-6 space-y-4">
  {[
    "3 Instansi AUM baru sedang menunggu validasi AUM.",
    "10 Lowongan baru telah diterbitkan oleh Admin AUM yang berizin.",
    "50 Pelamar baru mendaftar di sistem hari ini.",
  ].map((text, i) => (
    <div key={i} className="flex items-start gap-3">
      <img
        src={warningIcon}
        alt="warning"
        className="w-5 h-5 mt-0.5"
      />
      <p className="text-sm text-gray-700">{text}</p>
    </div>
  ))}
</div>

      </div>
    </AdminSuperLayout>
  );
};

export default DashboardAdminSuper;
