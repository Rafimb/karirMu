import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminAumLayout from "../../components/layout/AdminAumLayout";

const dummyJobs = [
  {
    id: 1,
    title: "Backend Developer",
    field: "IT/Software",
    location: "Yogyakarta",
    type: "Full/time",
    date: "18 Des 2025",
    status: "active",
  },
  {
    id: 2,
    title: "Guru Matematika",
    field: "Pendidikan",
    location: "Temanggung",
    type: "Full/time",
    date: "10 Des 2025",
    status: "active",
  },
  {
    id: 3,
    title: "Staff Keuangan",
    field: "Finance",
    location: "Magelang",
    type: "Full/time",
    date: "05 Des 2025",
    status: "inactive",
  },
];

export default function ManajemenLowongan() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  return (
    <AdminAumLayout>
        <div className="space-y-6">
    <div className="flex flex-col gap-4">

          {/* PAGE TITLE */}
          <div className="bg-white px-4 py-3 rounded-md shadow-sm text-sm font-semibold">
            Manajemen Lowongan
          </div>

          {/* ================= FILTER ================= */}
          <div
            className="px-4 py-2.5 rounded-t-lg font-medium text-white"
            style={{
              background: "linear-gradient(90deg, #004F8F 0%, #009B49 100%)",
            }}
          >
            Filter Lowongan
          </div>

          <div className="bg-white p-4 rounded-b-lg shadow-sm flex gap-3">
            <input
              type="text"
              placeholder="Cari Lowongan"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 border rounded px-3 py-2 text-sm"
            />
            <select className="border rounded px-3 py-2 text-sm w-40">
              <option>Status: Semua</option>
            </select>
            <select className="border rounded px-3 py-2 text-sm w-40">
              <option>Bidang: Semua</option>
            </select>
            <select className="border rounded px-3 py-2 text-sm w-40">
              <option>Lokasi: Semua</option>
            </select>
          </div>

{/* ================= DAFTAR LOWONGAN ================= */}
<div
  className="px-4 py-3 rounded-t-lg font-medium text-white"
  style={{
    background: "linear-gradient(90deg, #004F8F 0%, #009B49 100%)",
  }}
>
  Daftar Lowongan
</div>

{/* CARD TABLE */}
<div className="bg-white rounded-b-lg shadow-sm p-6">

  {/* HEADER KOLOM */}
  <div
    className="grid grid-cols-5 px-4 py-3 rounded-md text-sm font-semibold text-white mb-4"
    style={{
      background: "linear-gradient(90deg, #1D5F82 0%, #409144 100%)",
    }}
  >
    <div>Judul & Bidang</div>
    <div>Lokasi & Tipe</div>
    <div>Tanggal Dibuat</div>
    <div>Status</div>
    <div>Aksi</div>
  </div>

  {/* TABLE */}
  <div className="overflow-x-auto">
    <table className="w-full text-sm border-l border-r border-gray-200">
      <tbody>
        {dummyJobs.map((job) => (
          <tr
            key={job.id}
            className="border-b border-gray-200"
          >
            <td className="px-4 py-4 w-1/5">
              <p className="font-semibold">{job.title}</p>
              <p className="text-xs text-gray-500">{job.field}</p>
            </td>

            <td className="px-4 py-4 w-1/5">
              <p>{job.location}</p>
              <p className="text-xs text-gray-500">{job.type}</p>
            </td>

            <td className="px-4 py-4 w-1/5">
              {job.date}
            </td>

            <td className="px-4 py-4 w-1/5">
              {job.status === "active" ? (
                <span className="px-3 py-1 text-xs rounded-full bg-green-600 text-white">
                  Aktif
                </span>
              ) : (
                <span className="px-3 py-1 text-xs rounded-full bg-red-500 text-white">
                  Non-Aktif
                </span>
              )}
            </td>

            <td className="px-4 py-4 w-1/5">
<button
  onClick={() =>
    navigate("/admin-aum/detail-lowongan", {
      state: { job },
    })
  }
  className="
    px-4 py-1.5
    border border-green-600
    text-green-600
    rounded-full
    text-xs
    hover:bg-green-600
    hover:text-white
    transition
  "
>
  Lihat Detail
</button>

            </td>
          </tr>
        ))}
      </tbody>
    </table>
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

{/* BUTTON CARD */}
<div className="bg-white rounded-lg shadow-sm px-6 py-4 flex justify-end">
  <button
    onClick={() => navigate("/admin-aum/buat-lowongan")}
    className="
      bg-green-600
      text-white
      px-5
      py-2
      rounded-lg
      text-sm
      font-semibold
      hover:bg-green-700
      transition
    "
  >
    + Buat Lowongan Baru
  </button>
</div>


        </div>
      </div>
    </AdminAumLayout>
  );
}
