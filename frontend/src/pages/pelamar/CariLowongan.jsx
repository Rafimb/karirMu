import React from "react";

/* ICONS */
import iconSearch from "../../assets/icons/ProfilPelamar/search.svg";
import iconClose from "../../assets/icons/ProfilPelamar/close-circle.svg";
import iconLocationGray from "../../assets/icons/ProfilPelamar/location.svg";
import iconUserProfile from "../../assets/icons/ProfilPelamar/user-profile.svg";
import iconLocationBlack from "../../assets/icons/ProfilPelamar/location.svg";
import iconSave from "../../assets/icons/ProfilPelamar/save.svg";
import iconChecCircle from "../../assets/icons/ProfilPelamar/check-circle.svg";

import PelamarLayout from "../../components/layout/PelamarLayout";

const jobsData = [
  {
    title: "UI/UX Designer",
    salary: "Rp 4jt-6 jt",
    tags: ["UI/UX", "Fulltime", "Minimal (S1)", "2 jt-3 jt", "+10"],
    company: "PT. SURYA MEDIA UTAMA",
    location: "Sleman, Jogja",
    posted: "14 hari yang lalu",
  },
  {
    title: "Frontend Developer",
    salary: "Rp 5jt-8 jt",
    tags: ["Frontend", "Fulltime", "Minimal (S1)", "3 jt-4 jt", "+5"],
    company: "PT. MAJU TERUS",
    location: "Bantul, Jogja",
    posted: "7 hari yang lalu",
  },
  {
    title: "Backend Developer",
    salary: "Rp 6jt-9 jt",
    tags: ["Backend", "Fulltime", "Minimal (S1)", "4 jt-5 jt", "+3"],
    company: "PT. TEKNOLOGI NUSANTARA",
    location: "Yogyakarta",
    posted: "10 hari yang lalu",
  },
  {
    title: "Data Analyst",
    salary: "Rp 5jt-7 jt",
    tags: ["Data", "Fulltime", "Minimal (S1)", "2 jt-3 jt", "+8"],
    company: "PT. DATA INSIGHT",
    location: "Sleman, Jogja",
    posted: "5 hari yang lalu",
  },
];

const CariLowongan = () => {
  return (
    <PelamarLayout>
      <div className="space-y-6">

        {/* HEADER SEARCH */}
        <div
          className="px-4 py-3 rounded-t-2xl font-medium text-white"
          style={{
            background: "linear-gradient(90deg, #004F8F 0%, #009B49 100%)",
          }}
        >
          Opsi Pencarian & Filter Lowongan
        </div>

        {/* SEARCH & FILTER */}
        <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">

          <h2 className="font-semibold text-gray-700">Opsi Pencarian Lowongan</h2>

          {/* PENCARIAN UTAMA */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-6 items-end">
            {/* Cari Pekerjaan */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-600">Cari Pekerjaan</label>
              <div className="relative">
                <img
                  src={iconSearch}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 opacity-70"
                />
                <input
                  type="text"
                  placeholder="UI/UX Designer"
                  className="w-full h-10 pl-10 pr-10 border border-gray-300 rounded-lg text-sm
                             focus:outline-none focus:ring-1 focus:ring-green-500"
                />
                <img
                  src={iconClose}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-4 cursor-pointer opacity-70"
                />
              </div>
            </div>

            {/* Cari Kota */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-600">Cari Kota / Provinsi</label>
              <div className="relative">
                <img
                  src={iconLocationGray}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 opacity-60"
                />
                <input
                  type="text"
                  placeholder="Magelang"
                  className="w-full h-10 pl-10 pr-10 border border-gray-300 rounded-lg text-sm
                             focus:outline-none focus:ring-1 focus:ring-green-500"
                />
                <img
                  src={iconClose}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-4 cursor-pointer opacity-70"
                />
              </div>
            </div>

            {/* Tombol Cari */}
            <div className="flex items-end">
              <button className="bg-green-600 hover:bg-green-700 text-white px-6 h-10 rounded-lg text-sm font-medium whitespace-nowrap">
                Cari
              </button>
            </div>
          </div>



          {/* FILTER TAMBAHAN */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_2fr] gap-6 items-end">
            {/* Gaji Min */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-600">Rp Min</label>
              <select className="w-full h-10 border border-gray-300 rounded-lg px-3 text-sm
                                 focus:outline-none focus:ring-1 focus:ring-green-500">
                <option value="">Min</option>
                <option>1.000.000</option>
                <option>2.000.000</option>
                <option>3.000.000</option>
                <option>5.000.000</option>
              </select>
            </div>

            {/* Gaji Max */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-600">Rp Max</label>
              <select className="w-full h-10 border border-gray-300 rounded-lg px-3 text-sm
                                 focus:outline-none focus:ring-1 focus:ring-green-500">
                <option value="">Max</option>
                <option>3.000.000</option>
                <option>5.000.000</option>
                <option>7.000.000</option>
                <option>10.000.000</option>
              </select>
            </div>

            {/* Tipe Pekerjaan */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-600">Tipe Pekerjaan</label>
              <div className="flex flex-wrap justify-between h-10 items-center">
                {["Fulltime", "Parttime", "Contract", "Intern"].map((item) => (
                  <label
                    key={item}
                    className="flex items-center gap-2 cursor-pointer text-gray-700"
                  >
                    <input type="radio" name="jobType" className="accent-green-600" />
                    {item}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* DAFTAR LOWONGAN */}
        <div className="space-y-6">
          <div
            className="px-4 py-3 rounded-t-2xl font-medium text-white"
            style={{ background: "linear-gradient(90deg, #004F8F 0%, #009B49 100%)" }}
          >
            Daftar Lowongan Hasil Pencarian
          </div>

          {/* GRID CARD */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {jobsData.map((job, index) => (
    <div
      key={index}
      className="bg-white rounded-xl shadow p-5 flex flex-col"
    >
      {/* === ISI CARD (GAP ±20px) === */}
      <div className="space-y-5 flex-1">

        {/* HEADER */}
        <div className="flex justify-between items-start">
          <h4 className="text-sm font-semibold text-gray-800">
            {job.title}
          </h4>
          <span className="text-blue-600 text-sm font-medium">
            {job.salary}
          </span>
        </div>

        {/* TAG */}
        <div className="flex flex-wrap gap-5">
          {job.tags.map((tag, idx) => (
            <span
              key={idx}
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
        ring-1 ring-black/30 ring-offset-1 ring-offset-white
        shrink-0
      "
    >
      <img
        src={job.logo || iconUserProfile}  // pakai logo kalau ada, fallback ke icon
        alt="Company"
        className="w-8 h-8"
      />
    </div>
    <div className="border-l border-gray-300 h-14" />
  </div>

  {/* TEKS */}
  <div className="space-y-1">
    {/* PERUSAHAAN */}
    <div className="flex items-center gap-2 text-lg text-blue-600 font-medium">
      <img src={iconChecCircle} alt="Verified" className="w-5 h-5" />
      <span>{job.company}</span>
    </div>

    {/* LOKASI */}
    <div className="flex items-center gap-2 text-sm text-gray-600">
      <img src={iconLocationBlack} alt="Lokasi" className="w-5 h-5" />
      <span>{job.location}</span>
    </div>
  </div>
</div>


        <hr className="border-gray-200" />
      </div>

      {/* FOOTER */}
      <div className="flex justify-between items-center pt-5">
        <span className="text-xs text-gray-500">
          {job.posted}
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
      </div>
    </PelamarLayout>
  );
};

export default CariLowongan;
