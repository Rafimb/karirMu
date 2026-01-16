import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../components/layout/AdminAumLayout";
import imageProfile from "../../assets/icons/ProfilAum/image-profile.svg";

const LihatPelamar = () => {
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  return (
    <AdminLayout>
      <div className="w-full flex justify-center px-4 py-6">
        <div className="w-full max-w-1124px flex flex-col gap-4">

          {/* PAGE TITLE */}
              <div className="bg-white px-4 py-3 rounded-md shadow-sm text-sm flex items-center gap-2">
            <span className="text-gray-500">Manajemen Pelamar</span>
            <span className="text-gray-400">›</span>
            <span className="font-semibold">Lihat Pelamar</span>
          </div>

          {/* ================= RINGKASAN PEKERJAAN ================= */}
          <SectionHeader title="Ringkasan Pekerjaan" />
          <div className="bg-white rounded-lg shadow-sm p-6 text-sm space-y-3">
            <p className="font-semibold text-base">UI/UX Designer</p>

            <Info label="Kategori" value="IT / Medical / dll" />
            <Info label="Lokasi" value="Sleman, Jogja" />
            <Info label="Tipe Pekerjaan" value="Full Time" />
          </div>

          {/* ================= FILTER ================= */}
          <SectionHeader title="Filter Pelamar" />
          <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col md:flex-row gap-3">
            <input
              className="w-full border rounded-md px-4 py-2 text-sm bg-gray-100"
              placeholder="Cari Pelamar"
            />

            <select className="border rounded-md px-3 py-2 text-sm bg-gray-100">
              <option>Status: Semua</option>
              <option>Pending</option>
              <option>Lolos</option>
              <option>Ditolak</option>
            </select>

            <select className="border rounded-md px-3 py-2 text-sm bg-gray-100">
              <option>Urutkan: Terbaru</option>
              <option>Terlama</option>
            </select>
          </div>

          {/* ================= TAB ================= */}
          <div className="bg-white rounded-lg shadow-sm p-4 flex gap-3 flex-wrap">
            <Tab text="Semua (15)" active />
            <Tab text="Pending (5)" />
            <Tab text="Lolos (4)" />
            <Tab text="Ditolak (3)" />
          </div>

          {/* ================= TABLE PELAMAR ================= */}
          <SectionHeader title="Daftar Pelamar" />
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <table className="w-full text-sm border-collapse">
              <thead
                className="text-white"
                style={{
                  background: "linear-gradient(90deg, #1D5F82 0%, #409144 100%)",
                }}
              >
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Foto & Nama</th>
                  <th className="px-4 py-3 text-left font-semibold">Tanggal Masuk</th>
                  <th className="px-4 py-3 text-left font-semibold">Status</th>
                  <th className="px-4 py-3 text-left font-semibold">Aksi</th>
                </tr>
              </thead>

              <tbody>
                <PelamarRow
                  name="Budi Santoso"
                  status="lolos"
                  onReview={() => navigate("/admin-aum/review-pelamar")}
                />
                <PelamarRow
                  name="Rafi Mubarock"
                  status="pending"
                  onReview={() => navigate("/admin-aum/review-pelamar")}
                />
                <PelamarRow
                  name="Arsya YKC"
                  status="ditolak"
                  onReview={() => navigate("/admin-aum/review-pelamar")}
                />
              </tbody>
            </table>
          </div>

          {/* ================= PAGINATION ================= */}
          <div className="bg-white rounded-lg shadow-sm px-6 py-4 flex justify-between items-center text-sm text-gray-600">
            <span>
              Menampilkan <b>1–5</b> pelamar
            </span>

            <div className="flex gap-4 items-center">
              <button onClick={() => setPage((p) => Math.max(p - 1, 1))}>
                &lt; Prev
              </button>

              {[1, 2, 3].map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={page === p ? "font-bold text-green-600" : ""}
                >
                  {p}
                </button>
              ))}

              <button onClick={() => setPage((p) => Math.min(p + 1, 3))}>
                Next &gt;
              </button>
            </div>
          </div>

        </div>
      </div>
    </AdminLayout>
  );
};

export default LihatPelamar;

/* ================= KOMPONEN BANTUAN ================= */

const SectionHeader = ({ title }) => (
  <div
    className="px-4 py-3 rounded-lg font-medium text-white shadow-sm"
    style={{
      background: "linear-gradient(90deg, #004F8F 0%, #009B49 100%)",
    }}
  >
    {title}
  </div>
);

const Info = ({ label, value }) => (
  <div>
    <p className="text-gray-500">{label}</p>
    <p>{value}</p>
  </div>
);

const Tab = ({ text, active }) => (
  <button
    className={`px-4 py-2 rounded-full text-sm border transition ${
      active
        ? "bg-green-100 border-green-400 text-green-700"
        : "bg-white border-gray-300 text-gray-600 hover:bg-gray-100"
    }`}
  >
    {text}
  </button>
);

const PelamarRow = ({ name, status, onReview }) => {
  const statusMap = {
    lolos: "bg-green-600",
    pending: "bg-yellow-400",
    ditolak: "bg-red-500",
  };

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50 transition">
      <td className="px-4 py-4">
        <div className="flex items-center gap-3">
          <img
            src={imageProfile}
            alt="Foto Pelamar"
            className="w-9 h-9 rounded-full object-cover border"
          />
          <div>
            <p className="font-semibold">{name}</p>
            <p className="text-xs text-gray-500">Pelamar</p>
          </div>
        </div>
      </td>

      <td className="px-4 py-4">18 Des 2025</td>

      <td className="px-4 py-4">
        <span
          className={`px-3 py-1 text-xs rounded-full text-white ${statusMap[status]}`}
        >
          {status}
        </span>
      </td>

      <td className="px-4 py-4">
        <button
          onClick={onReview}
          className="px-4 py-1.5 border border-green-600 text-green-600 rounded-full text-xs hover:bg-green-600 hover:text-white transition"
        >
          Review
        </button>
      </td>
    </tr>
  );
};
