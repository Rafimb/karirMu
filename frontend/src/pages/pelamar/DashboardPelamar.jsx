import PelamarLayout from "../../components/layout/PelamarLayout";
import JobCardList from "../../components/pelamar/JobCardApplicant";

// ICONS
import iconTextPelamar from "../../assets/icons/ProfilPelamar/icon-text.svg";
import iconSecurityPelamar from "../../assets/icons/ProfilPelamar/icon-security.svg";
import iconChecklistPelamar from "../../assets/icons/ProfilPelamar/icon-checklist.svg";
import iconArrowRight from "../../assets/icons/ProfilPelamar/arrow-right.svg";

import { useNavigate } from "react-router-dom";
import { useState } from "react";

const DashboardPelamar = () => {
  const navigate = useNavigate();
  const [openTips, setOpenTips] = useState(null);
  
  return (
    <PelamarLayout>
      <div className="space-y-6 bg-[#E0EAE7]">

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
            <div className=" mt-4 ml-6 text-left">
              <h3 className="text-3xl font-bold text-gray-800">
                12
              </h3>
              <p className="text-lg font-medium text-gray-700 mt-1">
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
              <p className="text-lg font-medium text-gray-700 mt-1">
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
              <p className="text-lg font-medium text-gray-700 mt-1">
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

        <div className="bg-white shadow-sm overflow-hidden rounded-b-xl divide-y divide-gray-100">

          {/* === ITEM 1 === */}
          <div>
            <button
              onClick={() => setOpenTips(openTips === 1 ? null : 1)}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition"
            >
              <img
                src={iconArrowRight}
                alt="arrow"
                className={`w-4 h-4 opacity-70 transition-transform duration-300 ${
                  openTips === 1 ? "rotate-90" : ""
                }`}
              />
              <span className="text-lg text-gray-700 text-left">
                Cara sukses menghadapi Tes Psikotes di Kantor AUM.
              </span>
            </button>

            {openTips === 1 && (
              <div className="mx-4 mb-4 rounded-lg bg-[#409144]/10 px-4 py-3 text-sm text-gray-700">
                <ul className="list-disc list-inside space-y-1">
                  <li>
                    <b>Persiapan Fisik & Mental:</b> Istirahat cukup dan sarapan agar fokus
                    terjaga selama tes yang berdurasi lama.
                  </li>
                  <li>
                    <b>Pahami Instruksi:</b> Baca atau dengarkan instruksi dengan teliti;
                    kesalahan teknis adalah penyebab gagal paling umum.
                  </li>
                  <li>
                    <b>Manajemen Waktu:</b> Jangan terpaku pada satu soal sulit. Kerjakan
                    yang mudah terlebih dahulu secara efisien.
                  </li>
                  <li>
                    <b>Konsistensi adalah Kunci:</b> Pada tes kepribadian, jawablah dengan
                    jujur. Sistem akan mendeteksi jika jawaban Anda tidak konsisten.
                  </li>
                  <li>
                    <b>Tunjukkan Ketahanan:</b> Pada tes angka (seperti tes koran), jaga
                    ritme kerja agar tetap stabil dari awal hingga akhir.
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* === ITEM 2 === */}
          <div>
            <button
              onClick={() => setOpenTips(openTips === 2 ? null : 2)}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition"
            >
              <img
                src={iconArrowRight}
                alt="arrow"
                className={`w-4 h-4 opacity-70 transition-transform duration-300 ${
                  openTips === 2 ? "rotate-90" : ""
                }`}
              />
              <span className="text-lg text-gray-700 text-left">
                Panduan Interview Tatap Muka bagi Pemula.
              </span>
            </button>

            {openTips === 2 && (
              <div className="mx-4 mb-4 rounded-lg bg-[#409144]/10 px-4 py-3 text-sm text-gray-700">
                <ul className="list-disc list-inside space-y-1">
                  <li>
                    <b>Riset Perusahaan:</b> Pahami profil perusahaan dan deskripsi
                    pekerjaan yang dilamar agar jawaban Anda relevan.
                  </li>
                  <li>
                    <b>Kesan Pertama (First Impression):</b> Gunakan pakaian profesional
                    yang rapi, datang 15 menit lebih awal, dan berikan jabat tangan yang
                    mantap serta senyuman.
                  </li>
                  <li>
                    <b>Komunikasi Non-Verbal:</b> Jaga kontak mata, duduk dengan tegak, dan
                    hindari gerakan gelisah (seperti memainkan pulpen atau kaki) untuk
                    menunjukkan kepercayaan diri.
                  </li>
                  <li>
                    <b>Teknik Menjawab (STAR):</b> Gunakan metode Situation, Task, Action,
                    Result saat menceritakan pengalaman agar jawaban terstruktur dan
                    solutif.
                  </li>
                  <li>
                    <b>Siapkan Pertanyaan:</b> Di akhir sesi, ajukan pertanyaan tentang
                    budaya kerja atau tantangan posisi tersebut untuk menunjukkan
                    antusiasme Anda.
                  </li>
                </ul>
              </div>
            )}
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

        {/* KOMPONEN DENGAN DATA DUMMY */}
        <JobCardList />

      </div>
    </PelamarLayout>
  );
};

export default DashboardPelamar;