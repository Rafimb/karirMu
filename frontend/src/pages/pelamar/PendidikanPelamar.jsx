import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PelamarLayout from "../../components/layout/PelamarLayout";

// ICON
import deleteIcon from "../../assets/icons/ProfilPelamar/trash.svg";
import plusIcon from "../../assets/icons/ProfilPelamar/add-circle.svg";

const PendidikanPelamar = () => {
    const navigate = useNavigate();
  const [pendidikanList, setPendidikanList] = useState([
    {
      id: 1,
      jenjang: "Kuliah",
      institusi: "Universitas Muhammadiyah Magelang",
      jurusan: "Teknologi Informasi",
      status: "Lulus",
      tahunMulai: "2020",
      tahunLulus: "2024",
    },
  ]);

  const [aktifId, setAktifId] = useState(1);

  const pendidikanAktif = pendidikanList.find(
    (item) => item.id === aktifId
  );

  const updateField = (field, value) => {
    setPendidikanList((prev) =>
      prev.map((item) =>
        item.id === aktifId ? { ...item, [field]: value } : item
      )
    );
  };

  const tambahPendidikan = () => {
    const newId = Date.now();
    const newItem = {
      id: newId,
      jenjang: "",
      institusi: "",
      jurusan: "",
      status: "Belum Lulus",
      tahunMulai: "",
      tahunLulus: "",
    };
    setPendidikanList([...pendidikanList, newItem]);
    setAktifId(newId);
  };

  const hapusPendidikan = (id) => {
    if (pendidikanList.length === 1) return;
    const filtered = pendidikanList.filter((item) => item.id !== id);
    setPendidikanList(filtered);
    setAktifId(filtered[0].id);
  };

  const handleSimpan = () => {
  // di sini nanti bisa ditambah API save
  navigate("/pelamar/pengalaman-pelamar");
};


  return (
    <PelamarLayout>
      <div className="space-y-6">

        {/* ================= HEADER ================= */}
        <div
          className="px-4 py-3 rounded-t-2xl font-medium text-white"
          style={{
            background: "linear-gradient(90deg, #004F8F 0%, #009B49 100%)",
          }}
        >
          Pendidikan
        </div>

        {/* ================= RIWAYAT ================= */}
        <div className="bg-white rounded-2xl shadow-sm px-6 py-4 space-y-4">
          {pendidikanList.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setAktifId(item.id)}
              className={`border rounded-xl px-6 py-4 flex justify-between cursor-pointer
              ${
                aktifId === item.id
                  ? "border-dashed border-blue-400"
                  : "border-gray-200"
              }`}
            >
              <div className="space-y-1">
                <p className="text-sm font-semibold">
                  Riwayat Pendidikan {index + 1}
                </p>

                <p className="text-sm font-medium text-gray-800">
                  {item.jurusan || "-"}
                </p>

                <p className="text-sm text-gray-700">
                  {item.institusi || "-"}
                </p>

                <p className="text-xs text-gray-500">
                  {item.tahunMulai || "—"} –{" "}
                  {item.status === "Lulus"
                    ? item.tahunLulus || "—"
                    : "Sekarang"}
                </p>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  hapusPendidikan(item.id);
                }}
                className="flex items-center gap-2 text-red-600 text-sm"
              >
                <img src={deleteIcon} className="w-4 h-4" />
                Hapus
              </button>
            </div>
          ))}

          {/* TAMBAH */}
          <div className="flex justify-end">
            <button
              onClick={tambahPendidikan}
              className="flex items-center gap-2 border border-green-600 text-green-600 px-4 py-2 rounded-lg text-sm hover:bg-green-50"
            >
              <img src={plusIcon} className="w-4 h-4" />
              Tambah Pendidikan Lain
            </button>
          </div>
        </div>

        {/* ================= FORM ================= */}
        {pendidikanAktif && (
          <div className="bg-white rounded-2xl shadow-sm px-8 py-8 space-y-6">

            {/* Jenjang */}
            <div>
              <label className="text-sm font-medium">
                Jenjang Pendidikan
              </label>
              <select
                value={pendidikanAktif.jenjang}
                onChange={(e) =>
                  updateField("jenjang", e.target.value)
                }
                className="mt-2 w-full bg-[#F2F4F8] px-4 py-2 rounded-md"
              >
                <option value="">Pilih Jenjang</option>
                <option value="Kerja">Kerja</option>
                <option value="Kuliah">Kuliah</option>
                <option value="Sekolah">Sekolah</option>
              </select>
            </div>

            {/* Institusi */}
            <div>
              <label className="text-sm font-medium">
                Nama Institusi
              </label>
              <input
                value={pendidikanAktif.institusi}
                onChange={(e) =>
                  updateField("institusi", e.target.value)
                }
                className="mt-2 w-full bg-[#F2F4F8] px-4 py-2 rounded-md"
              />
            </div>

            {/* Jurusan */}
            <div>
              <label className="text-sm font-medium">
                Jurusan
              </label>
              <input
                value={pendidikanAktif.jurusan}
                onChange={(e) =>
                  updateField("jurusan", e.target.value)
                }
                className="mt-2 w-full bg-[#F2F4F8] px-4 py-2 rounded-md"
              />
            </div>

            {/* Status */}
            <div>
              <label className="text-sm font-medium block mb-2">
                Status Pendidikan
              </label>
              <div className="flex gap-6 text-sm">
                {["Belum Lulus", "Lulus"].map((s) => (
                  <label key={s} className="flex gap-2">
                    <input
                      type="radio"
                      checked={pendidikanAktif.status === s}
                      onChange={() =>
                        updateField("status", s)
                      }
                    />
                    {s}
                  </label>
                ))}
              </div>
            </div>

            {/* Tahun */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium">
                  Tahun Mulai
                </label>
                <input
                  value={pendidikanAktif.tahunMulai}
                  onChange={(e) =>
                    updateField("tahunMulai", e.target.value)
                  }
                  className="mt-2 w-full bg-[#F2F4F8] px-4 py-2 rounded-md"
                />
              </div>

              {pendidikanAktif.status === "Lulus" && (
                <div>
                  <label className="text-sm font-medium">
                    Tahun Lulus
                  </label>
                  <input
                    value={pendidikanAktif.tahunLulus}
                    onChange={(e) =>
                      updateField("tahunLulus", e.target.value)
                    }
                    className="mt-2 w-full bg-[#F2F4F8] px-4 py-2 rounded-md"
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================= SIMPAN ================= */}
        <div className="flex justify-end bg-white rounded-xl shadow px-8 py-5">
          <button 
          onClick={handleSimpan}
          className="bg-[#409144] text-white px-8 py-2.5 rounded-md text-sm font-semibold">
            Simpan
          </button>
        </div>

      </div>
    </PelamarLayout>
  );
};

export default PendidikanPelamar;
