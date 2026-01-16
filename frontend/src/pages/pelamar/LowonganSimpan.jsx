import React from "react";
import PelamarLayout from "../../components/layout/PelamarLayout";

// ICONS
import iconChecklistPelamar from "../../assets/icons/ProfilPelamar/check-circle.svg";
import iconLocation from "../../assets/icons/ProfilPelamar/location.svg";
import iconSave from "../../assets/icons/ProfilPelamar/save.svg";
import iconUserProfile from "../../assets/icons/ProfilPelamar/user-profile.svg";

const LowonganSimpan = () => {
  const dataLowongan = [
    {
      posisi: "UI/UX Designer",
      gaji: "Rp 4jt-6 jt",
      tipe: ["Fulltime", "IT Software", "Minimal S1", "+10"],
      perusahaan: "PT. SURYA MEDIA UTAMA",
      lokasi: "Sleman, Jogja",
      waktu: "14 hari yang lalu",
    },
    {
      posisi: "UI/UX Designer",
      gaji: "Rp 2 jt-4 jt",
      tipe: ["Partime", "IT Software", "Minimal S1", "+10"],
      perusahaan: "LAZENDA",
      lokasi: "Medan, Sumatra Utara",
      waktu: "12 hari yang lalu",
    },
    {
      posisi: "UI/UX Designer",
      gaji: "Rp 4jt-6 jt",
      tipe: ["Partime", "IT Software", "Minimal S1", "+10"],
      perusahaan: "PT. MENJADI UTAMA",
      lokasi: "Sleman, Jogja",
      waktu: "14 hari yang lalu",
    },
    {
      posisi: "UI/UX Designer",
      gaji: "Rp 2 jt-4 jt",
      tipe: ["Intern", "IT Software", "Minimal S1", "+10"],
      perusahaan: "MAJU SEMUA",
      lokasi: "Medan, Sumatra Utara",
      waktu: "12 hari yang lalu",
    },
  ];

  return (
    <PelamarLayout>
      <div className="space-y-6">
        {/* HEADER */}
           <div
          className="px-4 py-3 rounded-t-2xl font-medium text-white"
          style={{
            background: "linear-gradient(90deg, #004F8F 0%, #009B49 100%)",
          }}
        >
          Lowongan Tersimpan
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {dataLowongan.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow p-5 flex flex-col"
            >
              {/* === ISI CARD (GAP 20px) === */}
              <div className="space-y-5 flex-1">
                {/* HEADER */}
                <div className="flex justify-between items-start">

                          <h4 className="font-semibold text-gray-800">{item.posisi}</h4>

                  <span className="text-blue-600 text-sm font-medium">
                    {item.gaji}
                  </span>
                </div>

                {/* TAG */}
<div className="flex flex-wrap gap-5">
  {item.tipe.map((tag, i) => (
    <span
      key={i}
      className="
        px-5 py-2
        bg-[#409144]/15
        text-[#409144]
        text-sm font-medium
        rounded-full
        cursor-default
      "
    >
      {tag}
    </span>
  ))}
</div>



                {/* INFO PERUSAHAAN */}
<div className="flex gap-5">
  {/* AVATAR + GARIS */}
  <div className="flex items-start gap-5">
    <div
      className="
        w-14 h-14 rounded-full bg-gray-100
        flex items-center justify-center
        ring-2 ring-gray-200 ring-offset-1 ring-offset-white
        shrink-0
      "
    >
      <img
        src={iconUserProfile}
        alt="Company Profile"
        className="w-8 h-8"
      />
    </div>
    <div className="border-l border-gray-300 h-14" />
  </div>

  {/* TEKS */}
  <div className="space-y-1">
    {/* PERUSAHAAN */}
    <div className="flex items-center gap-2 text-lg text-blue-600 font-medium">
      <img src={iconChecklistPelamar} className="w-5 h-5" alt="Verified" />
      <span>{item.perusahaan}</span>
    </div>

    {/* LOKASI */}
    <div className="flex items-center gap-2 text-sm text-gray-600">
      <img src={iconLocation} className="w-5 h-5" alt="Lokasi" />
      <span>{item.lokasi}</span>
    </div>
  </div>
</div>


                <hr className="border-gray-200" />
              </div>

              {/* FOOTER */}
              <div className="flex justify-between items-center pt-5">
                <span className="text-xs text-gray-500">
                  {item.waktu}
                </span>
                <img
                  src={iconSave}
                  alt="save"
                  className="w-5 h-5 cursor-pointer"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </PelamarLayout>
  );
};

export default LowonganSimpan;
