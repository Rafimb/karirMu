import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../components/layout/AdminAumLayout";

// ICON
import iconText from "../../assets/icons/ProfilAum/icon-text.svg";
import iconProfile from "../../assets/icons/ProfilAum/icon-profile.svg";
import imageProfile from "../../assets/icons/ProfilAum/image-profile.svg";

const gradientStyle = {
  background: "linear-gradient(90deg, #004F8F 0%, #009B49 100%)",
};

const ManajemenPelamar = () => {
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  return (
    <AdminLayout>
      <div className="w-full flex justify-center px-4 py-6">
        <div className="w-full max-w-1124px flex flex-col gap-4">

          {/* PAGE TITLE */}
          <div className="bg-white px-4 py-3 rounded-md shadow-sm text-sm font-semibold">
            Manajemen Pelamar
          </div>
          {/* ================= RINGKASAN AKTIVITAS ================= */}
 <div
  className="px-4 py-3 rounded-t-lg mb-4 font-medium text-white"
  style={{
    background: "linear-gradient(90deg, #004F8F 0%, #009B49 100%)",
  }}
>
  Ringkasan Aktivitas
</div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            {[
              { icon: iconText, total: 12, label: "Total Lowongan" },
              { icon: iconText, total: 150, label: "Total Pelamar" },
              { icon: iconProfile, total: 15, label: "Perlu Ditinjau" },
              { icon: iconProfile, total: 50, label: "Diterima" },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-lg shadow-sm p-4 flex gap-4"
              >
                <img src={item.icon} className="w-10 h-10" alt="" />
                <div>
                  <h3 className="text-xl font-bold">{item.total}</h3>
                  <p className="text-gray-500 text-sm">{item.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* ================= HEADER PELAMAR ================= */}
 <div
  className="px-4 py-3 rounded-t-lg mb-4 font-medium text-white"
  style={{
    background: "linear-gradient(90deg, #004F8F 0%, #009B49 100%)",
  }}
>
  Daftar Pelamar Belum Ditinjau
</div>

{/* HEADER TABEL */}
<div
  className="grid grid-cols-6 px-4 py-3 rounded-t-lg text-sm font-semibold text-white"
  style={{
    background: "linear-gradient(90deg, #1D5F82 0%, #409144 100%)",
  }}
>
  <div>Foto</div>
  <div>Nama Pelamar</div>
  <div>Posisi</div>
  <div>Waktu Tunggu</div>
  <div>Status</div>
  <div>Aksi</div>
</div>

{/* BODY TABEL */}
<div className="bg-white rounded-b-lg shadow-sm overflow-x-auto">
  <table className="w-full text-sm border-collapse">
    <tbody>
      {[1, 2, 3].map((item) => (
        <tr
          key={item}
          className="border-b border-gray-200 hover:bg-gray-50 transition"
        >
          <td className="px-4 py-4">
            <img
              src={imageProfile}
              className="w-9 h-9 rounded-full border object-cover"
              alt="Foto Pelamar"
            />
          </td>

          <td className="px-4 py-4 font-medium">
            Budi Santoso
          </td>

          <td className="px-4 py-4">
            Backend Developer
          </td>

          <td className="px-4 py-4">
            1 Jam Lalu
          </td>

          <td className="px-4 py-4">
            <span className="bg-yellow-400 text-white px-3 py-1 rounded-full text-xs">
              Pending
            </span>
          </td>

          <td className="px-4 py-4">
            <button
              onClick={() =>
                navigate("/admin-aum/review-pelamar", {
                  state: { id: item },
                })
              }
              className="px-4 py-1.5 border border-green-600 text-green-600 rounded-full text-xs hover:bg-green-600 hover:text-white transition"
            >
              Review
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>


          {/* ================= PAGINATION PELAMAR ================= */}
          <div className="bg-white rounded-lg shadow-sm px-6 py-4 flex justify-between items-center text-sm">
            <span>
              Menampilkan <b>1–5</b> pelamar
            </span>

            <div className="flex gap-4">
              <button>&lt; Prev</button>
              {[1, 2, 3].map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={page === p ? "font-bold text-green-600" : ""}
                >
                  {p}
                </button>
              ))}
              <button>Next &gt;</button>
            </div>
          </div>

          {/* ================= HEADER LOWONGAN ================= */}
 <div
  className="px-4 py-3 rounded-t-lg mb-4 font-medium text-white"
  style={{
    background: "linear-gradient(90deg, #004F8F 0%, #009B49 100%)",
  }}
>
  Daftar Lowongan & Pelamar
</div>


{/* ================= CARD LOWONGAN ================= */}
<div className="bg-white rounded-b-lg shadow-sm p-4">
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    {[
      {
        title: "UI UX Designer",
        lokasi: "Yogyakarta",
        bidang: "IT",
        pelamar: 25,
      },
      {
        title: "Guru Matematika",
        lokasi: "Sleman",
        bidang: "Pendidikan",
        pelamar: 12,
      },
      {
        title: "Staff Administrasi",
        lokasi: "Bantul",
        bidang: "Administrasi",
        pelamar: 8,
      },
    ].map((job, i) => (
      <div
        key={i}
        className="
          bg-white
          rounded-xl
          p-4
          flex flex-col justify-between
          border border-gray-200
          shadow-sm
          hover:shadow-md
          transition
        "
      >
        {/* INFO LOWONGAN */}
        <div className="space-y-1">
          <h3 className="font-semibold text-base text-gray-800">
            {job.title}
          </h3>
          <p className="text-sm text-gray-500">Lokasi: {job.lokasi}</p>
          <p className="text-sm text-gray-500">Bidang: {job.bidang}</p>
        </div>

        {/* FOOTER CARD */}
        <div className="mt-4 pt-3 border-t border-gray-200 flex items-center justify-between">
          <span className="text-sm text-gray-600">
            👥 {job.pelamar} Pelamar
          </span>

          <button
            onClick={() =>
              navigate("/admin-aum/lihat-pelamar", {
                state: { job },
              })
            }
            className="
              border border-green-600
              text-green-600
              px-4 py-1.5
              rounded-full
              text-xs font-semibold
              hover:bg-green-600 hover:text-white
              transition
            "
          >
            Lihat Pelamar
          </button>
        </div>
      </div>
    ))}
  </div>
</div>


            {/* PAGINATION CARD */}
<div className="bg-white rounded-lg shadow-sm px-6 py-4 flex justify-between items-center text-sm text-gray-600">
  <span>
    Menampilkan <b>1–5</b> lowongan
  </span>

  <div className="flex gap-4">
    <button className="hover:underline">&lt; Prev</button>
    {[1, 2, 3].map((p) => (
      <button
        key={p}
        onClick={() => setPage(p)}
        className={page === p ? "font-bold text-green-600" : ""}
      >
        {p}
      </button>
    ))}
    <button className="hover:underline">Next &gt;</button>
  </div>
</div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ManajemenPelamar;
