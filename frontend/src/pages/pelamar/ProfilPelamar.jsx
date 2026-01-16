import PelamarLayout from "../../components/layout/PelamarLayout";
import userIcon from "../../assets/icons/ProfilPelamar/user-profile.svg";

// ICONS
import iconSavePelamar from "../../assets/icons/ProfilPelamar/save.svg";

/* ===== Reusable UI Components ===== */
const Input = ({ label, placeholder }) => (
  <div className="w-full">
    <label className="text-[13px] font-medium text-gray-700">{label}</label>
    <div className="h-10.5 bg-[#F2F4F8] rounded-sm px-4 mt-1 flex items-center">
      <input
        placeholder={placeholder}
        className="w-full bg-transparent text-sm outline-none"
      />
    </div>
  </div>
);

const Select = ({ label, placeholder }) => (
  <div className="w-full">
    <label className="text-[13px] font-medium text-gray-700">{label}</label>
    <div className="h-10.5 bg-[#F2F4F8] rounded-sm px-4 mt-1 flex items-center">
      <select className="w-full bg-transparent text-sm outline-none">
        <option>{placeholder}</option>
      </select>
    </div>
  </div>
);

const Textarea = ({ label, placeholder }) => (
  <div className="w-full">
    <label className="text-[13px] font-medium text-gray-700">{label}</label>
    <textarea
      rows={4}
      placeholder={placeholder}
      className="mt-1 w-full bg-[#F2F4F8] px-4 py-3 rounded-sm text-sm resize-none outline-none"
    />
  </div>
);

/* ===== Main UI ===== */
const ProfilPelamar = () => {
  return (
    <PelamarLayout>
      <div className=" space-y-6">

        {/* ================= BIODATA ================= */}
        <div>
          {/* HEADER */}
         <div
  className="px-4 py-3 rounded-t-2xl font-medium text-white"
  style={{
    background: "linear-gradient(90deg, #004F8F 0%, #009B49 100%)",
  }}
>
  Biodata
</div>


          {/* BODY */}
          <div className="bg-white rounded-2xl shadow-sm mt-4 px-8 py-10 space-y-10 p-6">
            {/* FOTO PROFIL */}
            <div className="flex items-center gap-10">
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 rounded-full bg-[#F2F4F8] flex items-center justify-center border">
                  <img src={userIcon} alt="user" className="w-10 opacity-30" />
                </div>
                <div className="flex flex-col gap-3">
                  <button className="border border-blue-600 text-blue-600 px-5 py-2 text-sm rounded-md hover:bg-blue-50">
                    Upload Photo
                  </button>
                  <button className="text-sm text-red-600 hover:underline text-center">
                    Hapus
                  </button>
                </div>
              </div>
              <div className="h-24 w-px bg-gray-300" />
              <div className="text-sm text-gray-500 leading-relaxed space-y-1">
                <p className="font-medium text-gray-700">Profil Pelamar</p>
                <p>1. Min. 400 × 400px</p>
                <p>2. Max. 2MB</p>
                <p>3. Your face or company logo</p>
              </div>
            </div>

            {/* HEADLINE */}
            <Input label="Headline" placeholder="Headline" />

            {/* TENTANG SAYA */}
            <Textarea label="Tentang Saya" placeholder="Tuliskan profil singkat Anda" />

            {/* DOMISILI & TELP */}
            <div className="grid md:grid-cols-2 gap-6">
              <Select label="Domisili" placeholder="Pilih Kota" />
              <Input label="Nomor Telepon (Whatsapp)" placeholder="+62" />
            </div>

            {/* JENIS KELAMIN & USIA */}
            <div className="grid md:grid-cols-2 gap-6">
              <Select label="Jenis Kelamin" placeholder="Jenis Kelamin" />
              <Input label="Usia" placeholder="Usia / Umur" />
            </div>

            {/* ALAMAT */}
            <Textarea label="Alamat Lengkap" placeholder="Detail jalan, nomor gedung, dan RT/RW" />

            {/* BUTTON SIMPAN */}
            <div className="flex justify-end">
              <button className="bg-[#409144] text-white px-8 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90">
                Simpan
              </button>
            </div>
          </div>
        </div>

        {/* ================= CV & PORTOFOLIO ================= */}
        <div>
<div
  className="px-4 py-3 rounded-t-2xl font-medium text-white"
  style={{
    background: "linear-gradient(90deg, #004F8F 0%, #009B49 100%)",
  }}
>
  CV & Portofolio
</div>


          <div className="bg-white rounded-2xl shadow-sm mt-4 px-8 py-6 space-y-6">
            <div>
              <label className="text-[13px] font-medium text-gray-700">
                Unggah Dokumen (CV, Portofolio)
              </label>
              <div className="flex gap-3 mt-2">
                <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded text-sm">
                  Pilih File
                </button>
                <span className="text-sm text-gray-500 self-center">Belum ada file dipilih</span>
              </div>
            </div>

            <Input label="Link Portofolio" placeholder="https://portfolio.com" />

            <div className="flex justify-end">
              <button className="bg-[#2DA44E] text-white px-6 py-2 rounded text-sm font-semibold">
                Simpan
              </button>
            </div>
          </div>
        </div>

        {/* ================= PENDIDIKAN ================= */}
        <div>
<div
  className="px-4 py-3 rounded-t-2xl font-medium text-white"
  style={{
    background: "linear-gradient(90deg, #004F8F 0%, #009B49 100%)",
  }}
>
  Pendidikan
</div>


          <div className="bg-white rounded-2xl shadow-sm mt-4 px-8 py-6 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Select label="Jenjang Pendidikan" placeholder="Pilih jenjang" />
              <Input label="Nama Institusi" placeholder="Nama universitas" />
              <Input label="Jurusan" placeholder="Jurusan" />
              <Select label="Status Pendidikan" placeholder="Belum lulus / Lulus" />
              <Input label="Tahun Lulus" placeholder="2024" />
            </div>

            <div className="flex justify-end">
              <button className="bg-[#2DA44E] text-white px-6 py-2 rounded text-sm font-semibold">
                Simpan
              </button>
            </div>
          </div>
        </div>

        {/* ================= PENGALAMAN & KEAHLIAN ================= */}
        <div>
    <div
  className="px-4 py-3 rounded-t-2xl font-medium text-white"
  style={{
    background: "linear-gradient(90deg, #004F8F 0%, #009B49 100%)",
  }}
>
  Pengalaman & Keahlian
</div>


          <div className="bg-white rounded-2xl shadow-sm mt-4 px-8 py-6 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Input label="Nama Perusahaan" placeholder="Nama perusahaan" />
              <Input label="Jabatan / Posisi" placeholder="Posisi" />
              <Input label="Tahun Masuk" placeholder="2023" />
              <Input label="Tahun Keluar" placeholder="2025" />
            </div>

            <Textarea label="Deskripsi Pekerjaan" placeholder="Deskripsi pekerjaan" />

            <div className="flex justify-end">
              <button className="bg-[#2DA44E] text-white px-6 py-2 rounded text-sm font-semibold">
                Simpan
              </button>
            </div>
          </div>
        </div>

      </div>
    </PelamarLayout>
  );
};

export default ProfilPelamar;
