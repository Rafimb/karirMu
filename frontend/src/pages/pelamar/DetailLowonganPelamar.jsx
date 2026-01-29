import PelamarLayout from "../../components/layout/PelamarLayout";
import { useNavigate } from "react-router-dom";
import JobCardList from "../../components/pelamar/JobCardApplicant";

/* ICONSAX */
import {
  User,
  ArrowLeft,
  Share,
} from "iconsax-react";

const DetailLowonganPelamar = () => {
  const navigate = useNavigate();

  return (
    <PelamarLayout>
      <div className="space-y-6">

        {/* ================= HEADER ================= */}
        <div
          className="rounded-xl px-6 py-5 text-white"
          style={{
            background: "linear-gradient(90deg, #004F8F 0%, #009B49 100%)",
          }}
        >
          <div className="flex items-center gap-5">
            {/* ICON USER */}
            <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
              <User size="28" color="#fff" variant="Bold" />
            </div>

            {/* GARIS VERTIKAL */}
            <div className="h-12 w-px bg-white/40" />

            {/* INFO */}
            <div>
              <h2 className="text-xl font-bold">UI/UX Designer</h2>
              <p className="text-sm opacity-90">PT. SURYA MEDIA UTAMA</p>
              <p className="text-sm">IT Software | Sleman Jogja | Full Time</p>
              <p className="text-sm">Rp 2.000.000 – Rp 3.000.000</p>
              <p className="text-sm">Tenggat Waktu: 10 Januari 2025</p>
            </div>
          </div>
        </div>

        {/* ================= DESKRIPSI ================= */}
        <div className="bg-white rounded-xl shadow-sm">
          <div
            className="px-4 py-3 rounded-t-xl text-white font-medium"
            style={{
              background: "linear-gradient(90deg, #004F8F 0%, #009B49 100%)",
            }}
          >
            Deskripsi Pekerjaan
          </div>

          <div className="p-5 text-sm text-gray-700 leading-relaxed">
            Kami mencari UI/UX Designer yang kreatif dan berorientasi pada
            pengguna untuk bergabung dengan tim kami. Anda akan bertanggung
            jawab membangun seluruh siklus desain produk, mulai dari riset
            pengguna, wireframing, hingga UI visual yang fungsional.
          </div>
        </div>

        {/* ================= PERSYARATAN ================= */}
        <div className="bg-white rounded-xl shadow-sm">
          <div
            className="px-4 py-3 rounded-t-xl text-white font-medium"
            style={{
              background: "linear-gradient(90deg, #004F8F 0%, #009B49 100%)",
            }}
          >
            Persyaratan
          </div>

          <div className="p-5 text-sm text-gray-700 space-y-2">
            <p>• Menguasai Figma atau Adobe XD</p>
            <p>• Memahami prinsip UI/UX</p>
            <p>• Kerja di kantor</p>
            <p>• Minimal SMA/SMK</p>
            <p>• Umur 21–45 Tahun</p>
          </div>
        </div>

        {/* ================= ACTION ================= */}
        <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-4 py-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-50"
          >
            <ArrowLeft size="18" />
            Kembali
          </button>

          <div className="flex items-center gap-5">
            <Share size="20" className="text-gray-600 cursor-pointer" />
            <button className="px-6 py-2 bg-green-600 text-white rounded-lg">
              Lamar
            </button>
          </div>
        </div>

        {/* ================= LOWONGAN LAINNYA ================= */}
        <div
          className="px-4 py-3 rounded-t-xl text-white font-medium"
          style={{
            background: "linear-gradient(90deg, #004F8F 0%, #009B49 100%)",
          }}
        >
          Lowongan Lainnya Untukmu
        </div>

        {/* KOMPONEN DENGAN DATA DUMMY */}
        <JobCardList />

      </div>
    </PelamarLayout>
  );
};

export default DetailLowonganPelamar;