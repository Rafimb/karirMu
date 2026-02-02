import { useState } from "react";
import AdminSuperLayout from "../../components/layout/AdminSuperLayout";

// ICON
import documentIcon from "../../assets/icons/ProfilAdminSuper/document-text-black.svg";
import userIcon from "../../assets/icons/users.svg";

const DetailPengajuanAum = () => {
  const profileData = {
    nama: "PT PERUSAHAAN",
    headline: "Jl. Kapas No. 9, Semaki, Kec. Umbulharjo, Kota Yogyakarta",
    photo: null,
  };

  // STATUS DOKUMEN
  const [dokumenStatus, setDokumenStatus] = useState({
    adart: null,
    sk: null,
    qaidah: null,
    npwp: null,
  });

  // ===== TAMBAHAN (MODAL) =====
  const [openModal, setOpenModal] = useState(null); // null | reject | approve

  const handleDokumenAction = (dokumenKey, action) => {
    setDokumenStatus((prev) => ({
      ...prev,
      [dokumenKey]: action,
    }));
  };

  return (
    <AdminSuperLayout>
      <div className="space-y-6">

        {/* ================= HEADER PROFIL ================= */}
        <div className="bg-white rounded-t-xl shadow overflow-hidden">
          <div
            className="flex rounded-t-xl overflow-hidden"
            style={{
              background: "linear-gradient(90deg, #004F8F 0%, #009B49 100%)",
            }}
          >
            <div className="flex items-center p-6 flex-[0.6] text-white gap-6">
              <div className="w-20 h-20 rounded-full bg-gray-400 flex items-center justify-center overflow-hidden">
                {profileData.photo ? (
                  <img
                    src={profileData.photo}
                    className="w-full h-full object-cover rounded-full"
                    alt="profile"
                  />
                ) : (
                  <img src={userIcon} className="w-10 h-10" alt="user" />
                )}
              </div>

              <div className="w-px bg-white h-20" />

              <div>
                <p className="font-bold text-lg">{profileData.nama}</p>
                <p className="text-sm opacity-90">{profileData.headline}</p>
              </div>
            </div>
          </div>
        </div>

        {/* ================= INFORMASI UMUM ================= */}
        <SectionTitle title="Informasi Umum" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-b-xl shadow p-6 space-y-3 text-sm">
            <Info label="Nama Perusahaan" value="Perusahaan" />
            <Info label="No Telepon" value="0274512345" />
            <Info label="Provinsi" value="Jawa Tengah" />
            <Info label="Bidang Industri" value="https://perusahaan.co.id" />
          </div>

          <div className="bg-white rounded-b-xl shadow p-6 space-y-3 text-sm">
            <Info label="Email Perusahaan" value="perusahaan@gmail.com" />
            <Info label="Website Resmi" value="www.perusahaan.com" />
            <Info label="Kota / Kabupaten" value="Magelang" />
            <Info label="Jumlah Karyawan" value="40 Karyawan" />
          </div>
        </div>

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

        {/* ================= DOKUMEN LEGALITAS ================= */}
        <SectionTitle title="Dokumen Legalitas" />

        <div className="space-y-4">
          <DokumenCard
            title="AD/ART Muhammadiyah"
            status={dokumenStatus.adart}
            onAction={(action) => handleDokumenAction("adart", action)}
          />
          <DokumenCard
            title="Surat Keputusan (SK)"
            status={dokumenStatus.sk}
            onAction={(action) => handleDokumenAction("sk", action)}
          />
          <DokumenCard
            title="Qaidah PPM"
            status={dokumenStatus.qaidah}
            onAction={(action) => handleDokumenAction("qaidah", action)}
          />
          <DokumenCard
            title="NPWP Perusahaan"
            status={dokumenStatus.npwp}
            onAction={(action) => handleDokumenAction("npwp", action)}
          />
        </div>

        {/* ================= AREA KEPUTUSAN ================= */}
        <SectionTitle title="Area Keputusan" />

        <div className="bg-white rounded-b-xl shadow p-6">
          <textarea
            rows={4}
            placeholder="Tuliskan Catatan untuk Admin AUM"
            className="w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#409144]"
          />
        </div>

        {/* ================= AKSI ================= */}
        <SectionTitle title="Aksi" />

        <div className="bg-white rounded-b-xl shadow p-4 flex justify-end gap-3">
          <button
            onClick={() => setOpenModal("reject")}
            className="px-6 py-2 rounded-lg bg-red-600 text-white text-sm font-medium"
          >
            Tolak
          </button>
          <button
            onClick={() => setOpenModal("approve")}
            className="px-6 py-2 rounded-lg bg-green-600 text-white text-sm font-medium"
          >
            Setujui & Aktifkan
          </button>
        </div>

        {/* ================= MODAL ================= */}
        {openModal && (
          <KonfirmasiModal
            type={openModal}
            onClose={() => setOpenModal(null)}
          />
        )}
      </div>
    </AdminSuperLayout>
  );
};

export default DetailPengajuanAum;

/* ================= KOMPONEN ================= */

const SectionTitle = ({ title }) => (
  <div
    className="px-4 py-3 rounded-t-lg font-medium text-white"
    style={{
      background: "linear-gradient(90deg, #004F8F 0%, #009B49 100%)",
    }}
  >
    {title}
  </div>
);

const Info = ({ label, value }) => (
  <div className="flex gap-2">
    <span className="w-44 text-gray-600">{label}</span>
    <span className="font-medium text-gray-800">: {value}</span>
  </div>
);

const DokumenCard = ({ title, status, onAction }) => {
  const isApproved = status === "approved";
  const isRejected = status === "rejected";

  if (status) {
    return (
      <div
        className={`rounded-xl shadow p-5 border-2 border-dashed
          ${isApproved && "bg-[#25A249]/15 border-[#25A249]"}
          ${isRejected && "bg-[#DA1E28]/15 border-[#DA1E28]"}
        `}
      >
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-gray-800">{title}</span>
          <span
            className={`font-medium ${
              isApproved ? "text-[#25A249]" : "text-[#DA1E28]"
            }`}
          >
            {isApproved ? "✓ Di Setujui" : "✕ Di Tolak"}
          </span>
        </div>

        <div className="mt-3 flex items-center gap-2 text-sm font-medium text-[#409144] cursor-pointer hover:underline">
          <img src={documentIcon} className="w-5 h-5" alt="dokumen" />
          Lihat File
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow p-5 space-y-4">
      <div className="flex items-center gap-3 text-sm font-medium text-gray-800">
        <span>{title}</span>
      </div>

      <div className="flex items-center justify-between">
        <button className="flex items-center gap-2 text-sm font-medium text-[#409144] hover:underline">
          <img src={documentIcon} className="w-6 h-6" alt="dokumen" />
          Lihat File
        </button>

        <div className="flex gap-2">
          <button
            onClick={() => onAction("approved")}
            className="px-4 py-1.5 rounded-lg bg-green-600 text-white text-sm"
          >
            Setujui
          </button>
          <button
            onClick={() => onAction("rejected")}
            className="px-4 py-1.5 rounded-lg bg-red-600 text-white text-sm"
          >
            Tolak
          </button>
        </div>
      </div>
    </div>
  );
};

/* ================= MODAL ================= */

const KonfirmasiModal = ({ type, onClose }) => {
  const isReject = type === "reject";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
  <div className="bg-white rounded-xl w-full max-w-lg shadow-lg border border-gray-200">

    {/* HEADER */}
    <div className="p-6 text-center">
      <h2 className="text-lg font-bold text-gray-800">
        Validasi Dokumen Instansi:
      </h2>
      <p className="text-sm font-medium text-gray-600">
        Universitas Ahmad Dahlan
      </p>
    </div>

    {/* GARIS (TIDAK NYAMBUNG) */}
    <div className="h-px bg-gray-200 mx-6" />

    {/* BODY */}
    <div className="p-6 space-y-4 text-sm text-gray-700">
      <p className="text-center">
        Apakah Anda yakin ingin{" "}
        <b>{isReject ? "Menolak" : "Menyetujui"} & Mengaktifkan</b>{" "}
        Admin AUM tersebut?
      </p>

      <div className="border border-gray-200 rounded-lg p-4 space-y-2">
        <div className="flex">
          <span className="w-32 text-gray-500">Nama Instansi</span>
          <span>: Perusahaan</span>
        </div>
        <div className="flex">
          <span className="w-32 text-gray-500">Alamat</span>
          <span>: Magelang</span>
        </div>
      </div>

      {isReject && (
        <textarea
          rows={3}
          placeholder="Tuliskan Catatan untuk Admin AUM"
          className="w-full border border-gray-300 rounded-lg px-3 py-2
                     focus:outline-none focus:ring-1 focus:ring-red-500"
        />
      )}
    </div>

    {/* GARIS (TIDAK NYAMBUNG) */}
    <div className="h-px bg-gray-200 mx-6" />

    {/* FOOTER */}
    <div className="flex justify-end gap-3 p-4">
      <button
        onClick={onClose}
        className="px-5 py-2 rounded-lg border border-gray-300
                   text-sm text-gray-700 hover:bg-gray-50"
      >
        Periksa Kembali
      </button>

      <button
        className={`px-5 py-2 rounded-lg text-white text-sm ${
          isReject ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"
        }`}
      >
        {isReject ? "Tolak dan Aktifkan" : "Setujui & Aktifkan"}
      </button>
    </div>
  </div>
</div>

  );
};
