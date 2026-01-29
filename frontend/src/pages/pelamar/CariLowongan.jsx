import React from "react";
import PelamarLayout from "../../components/layout/PelamarLayout";
import JobCardList from "../../components/pelamar/JobCardApplicant";

/* ICONS */
import iconSearch from "../../assets/icons/ProfilPelamar/search.svg";
import iconClose from "../../assets/icons/ProfilPelamar/close-circle.svg";
import iconLocationGray from "../../assets/icons/ProfilPelamar/location.svg";

const CariLowongan = () => {
  const [showFilter, setShowFilter] = React.useState(false);

  // Data lowongan hasil pencarian
  const searchResults = [
    { 
      title: "UI/UX Designer", 
      salary: "Rp 4jt-6 jt", 
      tags: ["UI/UX", "Fulltime", "Minimal (S1)", "2 jt-3 jt", "+10"], 
      company: "PT. SURYA MEDIA UTAMA", 
      location: "Sleman, Jogja", 
      postedAt: "14 hari yang lalu" 
    },
    { 
      title: "Frontend Developer", 
      salary: "Rp 5jt-8 jt", 
      tags: ["Frontend", "Fulltime", "Minimal (S1)", "3 jt-4 jt", "+5"], 
      company: "PT. MAJU TERUS", 
      location: "Bantul, Jogja", 
      postedAt: "7 hari yang lalu" 
    },
    { 
      title: "Backend Developer", 
      salary: "Rp 6jt-9 jt", 
      tags: ["Backend", "Fulltime", "Minimal (S1)", "4 jt-5 jt", "+3"], 
      company: "PT. TEKNOLOGI NUSANTARA", 
      location: "Yogyakarta", 
      postedAt: "10 hari yang lalu" 
    },
    { 
      title: "Data Analyst", 
      salary: "Rp 5jt-7 jt", 
      tags: ["Data", "Fulltime", "Minimal (S1)", "2 jt-3 jt", "+8"], 
      company: "PT. DATA INSIGHT", 
      location: "Sleman, Jogja", 
      postedAt: "5 hari yang lalu" 
    },
  ];

  return (
    <PelamarLayout>
      <div className="space-y-6">
        {/* HEADER SEARCH */}
        <div 
          className="px-4 py-3 rounded-t-2xl font-medium text-white" 
          style={{ background: "linear-gradient(90deg, #004F8F 0%, #009B49 100%)" }}
        >
          Opsi Pencarian & Filter Lowongan
        </div>

        {/* SEARCH & FILTER */}
        <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
          <h2 className="font-semibold text-gray-700">Opsi Pencarian Lowongan</h2>

          <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-6 items-end">
            {/* Cari Pekerjaan */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-600">Cari Pekerjaan</label>
              <div className="relative">
                <img 
                  src={iconSearch} 
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 opacity-70" 
                  alt="search"
                />
                <input 
                  type="text" 
                  placeholder="UI/UX Designer" 
                  onFocus={() => setShowFilter(true)}
                  className="w-full h-10 pl-10 pr-10 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-green-500" 
                />
                <img 
                  src={iconClose} 
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-4 cursor-pointer opacity-70" 
                  alt="close"
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
                  alt="location"
                />
                <input 
                  type="text" 
                  placeholder="Magelang" 
                  onFocus={() => setShowFilter(true)}
                  className="w-full h-10 pl-10 pr-10 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-green-500" 
                />
                <img 
                  src={iconClose} 
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-4 cursor-pointer opacity-70" 
                  alt="close"
                />
              </div>
            </div>

            <div className="flex items-end">
              <button 
                onClick={() => setShowFilter(true)} 
                className="bg-green-600 hover:bg-green-700 text-white px-6 h-10 rounded-lg text-sm font-medium whitespace-nowrap"
              >
                Cari
              </button>
            </div>
          </div>

          {showFilter && (
            <div className="grid grid-cols-1 md:grid-cols-[46%_50%] gap-6 items-end">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-600">Range Gaji (Rp)</label>
                <input 
                  type="text" 
                  placeholder="Contoh: 2.000.000 - 5.000.000"
                  className="w-full h-10 border border-gray-300 rounded-lg px-3 text-sm focus:outline-none focus:ring-1 focus:ring-green-500" 
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-600">Tipe Pekerjaan</label>
                <div className="flex flex-wrap justify-between h-10 items-center">
                  {["Fulltime", "Parttime", "Contract", "Intern"].map((item) => (
                    <label key={item} className="flex items-center gap-2 cursor-pointer text-gray-700">
                      <input type="radio" name="jobType" className="accent-green-600" />
                      {item}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* DAFTAR LOWONGAN */}
        <div className="space-y-6">
          <div 
            className="px-4 py-3 rounded-t-2xl font-medium text-white" 
            style={{ background: "linear-gradient(90deg, #004F8F 0%, #009B49 100%)" }}
          >
            Daftar Lowongan Hasil Pencarian
          </div>

          {/* KOMPONEN JOB CARD LIST */}
          <JobCardList jobs={searchResults} />
        </div>
      </div>
    </PelamarLayout>
  );
};

export default CariLowongan;