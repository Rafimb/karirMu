import React from "react";
import PelamarLayout from "../../components/layout/PelamarLayout";
import JobCardList from "../../components/pelamar/JobCardApplicant";

const LowonganSimpan = () => {
  // Data lowongan yang tersimpan
  const savedJobs = [
    {
      title: "UI/UX Designer",
      salary: "Rp 4jt-6 jt",
      tags: ["Fulltime", "IT Software", "Minimal S1", "+10"],
      company: "PT. SURYA MEDIA UTAMA",
      location: "Sleman, Jogja",
      postedAt: "14 hari yang lalu",
    },
    {
      title: "UI/UX Designer",
      salary: "Rp 2 jt-4 jt",
      tags: ["Partime", "IT Software", "Minimal S1", "+10"],
      company: "LAZENDA",
      location: "Medan, Sumatra Utara",
      postedAt: "12 hari yang lalu",
    },
    {
      title: "UI/UX Designer",
      salary: "Rp 4jt-6 jt",
      tags: ["Partime", "IT Software", "Minimal S1", "+10"],
      company: "PT. MENJADI UTAMA",
      location: "Sleman, Jogja",
      postedAt: "14 hari yang lalu",
    },
    {
      title: "UI/UX Designer",
      salary: "Rp 2 jt-4 jt",
      tags: ["Intern", "IT Software", "Minimal S1", "+10"],
      company: "MAJU SEMUA",
      location: "Medan, Sumatra Utara",
      postedAt: "12 hari yang lalu",
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

        {/* KOMPONEN JOB CARD LIST */}
        <JobCardList jobs={savedJobs} />
      </div>
    </PelamarLayout>
  );
};

export default LowonganSimpan;