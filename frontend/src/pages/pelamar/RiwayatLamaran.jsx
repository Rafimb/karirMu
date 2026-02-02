import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// ICONS
import iconChecklistPelamar from "../../assets/icons/ProfilPelamar/check-circle.svg";
import iconLocation from "../../assets/icons/ProfilPelamar/location.svg";
import iconCalendar from "../../assets/icons/ProfilPelamar/calendar.svg";
import infoIcon from "../../assets/icons/ProfilAdminSuper/information.svg";

import PelamarLayout from "../../components/layout/PelamarLayout";

const RiwayatLowongan = () => {
  const [showCatatanModal, setShowCatatanModal] = useState(false);
  const [selectedCatatan, setSelectedCatatan] = useState("");

  const dataLamaran = [
    {
      posisi: "UI/UX Designer",
      gaji: "Rp 4jt–6 jt",
      perusahaan: "PT. SURYA MEDIA UTAMA",
      lokasi: "Sleman, Jogja",
      tanggal: "22 Desember 2025",
      status: "Lolos",
      pesan:
        "Selamat! Anda dinyatakan lolos tahap seleksi berkas. Mohon kesediaannya untuk mengikuti wawancara User pada tanggal 28 Desember 2025 pukul 10.00 WIB.",
    },
    {
      posisi: "Social Media Specialist",
      gaji: "Rp 2 jt–4 jt",
      perusahaan: "Global Agency",
      lokasi: "Temanggung, Jateng",
      tanggal: "12 Desember 2025",
      status: "Ditolak",
      pesan:
        "Terima kasih atas minat Anda. Setelah meninjau portofolio Anda, kami memutuskan untuk belum bisa melanjutkan proses lamaran.",
      catatanAdmin:
        "Portofolio kurang sesuai dengan kebutuhan perusahaan. Pengalaman di bidang social media masih terbatas. Kami menyarankan untuk lebih memperdalam skill content creation dan analytics.",
    },
    {
      posisi: "Graphic Desain",
      gaji: "Rp 2 jt–4 jt",
      perusahaan: "PT. Kembar Digital Indonesia",
      lokasi: "Surabaya, Jawa Timur",
      tanggal: "14 Desember 2025",
      status: "Lolos",
      pesan:
        "Kami tertarik dengan portofolio Anda. Tim HR akan menghubungi Anda untuk tahap seleksi berikutnya.",
    },
    {
      posisi: "UI/UX Designer",
      gaji: "Rp 2 jt–4 jt",
      perusahaan: "PT. TEKNOLOGI MAJU",
      lokasi: "Wonosobo, Jateng",
      tanggal: "18 Desember 2025",
      status: "Ditinjau",
      pesan:
        "Lamaran Anda sedang kami tinjau. Mohon menunggu informasi lebih lanjut.",
    },
  ];

  const statusStyle = (status) => {
    switch (status) {
      case "Lolos":
        return "bg-[#409144] text-white";
      case "Ditolak":
        return "bg-[#DA1E28] text-white";
      case "Ditinjau":
        return "bg-[#F1C21B] text-white";
      default:
        return "bg-gray-400 text-white";
    }
  };

  const navigate = useNavigate();

  const handleLihatCatatan = (catatan) => {
    setSelectedCatatan(catatan);
    setShowCatatanModal(true);
  };

  return (
    <PelamarLayout>
      <div className="space-y-6">
        {/* FILTER STATUS HEADER */}
        <div
          className="px-4 py-3 rounded-t-2xl font-medium text-white"
          style={{
            background: "linear-gradient(90deg, #004F8F 0%, #009B49 100%)",
          }}
        >
          Filter Status
        </div>

        {/* FILTER STATUS */}
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="font-semibold mb-3">Filter Status</h3>
          <div className="flex flex-wrap gap-3">
            {["Semua (12)", "Pending (5)", "Diterima (4)", "Tolak (3)"].map(
              (item, i) => (
                <button
                  key={i}
                  className="px-4 py-1.5 border border-green-600 text-green-600 rounded-full text-sm hover:bg-green-50"
                >
                  {item}
                </button>
              )
            )}
          </div>
        </div>

        {/* DAFTAR LAMARAN HEADER */}
        <div
          className="px-4 py-3 rounded-t-2xl font-medium text-white"
          style={{
            background: "linear-gradient(90deg, #004F8F 0%, #009B49 100%)",
          }}
        >
          Daftar Lamaran
        </div>

        {/* GRID CARD */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
          {dataLamaran.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow p-5 w-552px h-472px flex flex-col"
            >
              {/* HEADER */}
              <div className="space-y-6">
                {/* POSISI & GAJI */}
                <div className="flex justify-between items-start">
                  <h4 className="text-sm text-gray-800 font-semibold">
                    {item.posisi}
                  </h4>
                  <span className="text-sm text-gray-600 font-medium">
                    {item.gaji}
                  </span>
                </div>

                {/* PERUSAHAAN */}
                <div className="flex items-center gap-3 text-blue-600 font-medium">
                  <img src={iconChecklistPelamar} alt="" className="w-5 h-5" />
                  <span className="text-lg leading-tight">
                    {item.perusahaan}
                  </span>
                </div>

                {/* LOKASI */}
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <img src={iconLocation} alt="" className="w-5 h-5" />
                  {item.lokasi}
                </div>

                {/* TANGGAL */}
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <img src={iconCalendar} alt="" className="w-5 h-5" />
                  Tanggal Melamar: {item.tanggal}
                </div>
              </div>

              {/* GARIS */}
              <hr className="my-4 border-gray-200" />

              {/* STATUS */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Status</span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyle(
                    item.status
                  )}`}
                >
                  {item.status}
                </span>
              </div>

              {/* CATATAN ADMIN */}
              {item.status === "Ditolak" && item.catatanAdmin && (
                <div className="mt-3">
                  <button
                    onClick={() => handleLihatCatatan(item.catatanAdmin)}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium hover:underline"
                  >
                    Lihat Catatan dari Admin
                  </button>
                </div>
              )}

              {/* DETAIL */}
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => navigate("/pelamar/detail-lowongan-pelamar")}
                  className="px-4 py-1.5 border border-green-600 text-green-600 rounded-full text-sm hover:bg-green-50"
                >
                  Detail Lowongan
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

 {/* ================= POPUP CATATAN ADMIN ================= */}
{showCatatanModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
    <div className="bg-white rounded-xl w-full max-w-2xl mx-4 shadow-lg border border-gray-200">

      {/* HEADER */}
      <div className="pt-8 pb-4 px-6 flex flex-col items-center">

        {/* ICON + TITLE */}
        <div className="flex items-center gap-2">
          <img
            src={infoIcon}
            alt="info"
            className="w-6 h-6"
          />

          <h2 className="text-lg font-semibold text-[#1A1A1A]">
            Catatan dari Admin AUM
          </h2>
        </div>

        {/* GARIS ATAS */}
        <div className="w-full h-px bg-gray-200 mt-4"></div>
      </div>

      {/* BODY */}
      <div className="px-6 pb-6 pt-2">
        <div className="bg-[#E6E9EE] rounded-xl p-4 border border-gray-300">
          <p className="text-sm text-gray-800 leading-relaxed text-center">
            {selectedCatatan}
          </p>
        </div>

        {/* GARIS BAWAH */}
        <div className="w-full h-px bg-gray-200 mt-6"></div>

        {/* FOOTER */}
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setShowCatatanModal(false)}
            className="px-6 py-2 rounded-full border border-red-500 text-red-500 font-medium text-sm flex items-center gap-2 hover:bg-red-50 transition"
          >
            <span className="text-base">⨯</span>
            Tutup
          </button>
        </div>
      </div>
    </div>
  </div>
)}


    </PelamarLayout>
  );
};

export default RiwayatLowongan;
