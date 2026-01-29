import { User, Location, Save2 } from "iconsax-react";
import iconCheckCirclePelamar from "../../assets/icons/ProfilPelamar/check-circle.svg";
import { useNavigate } from "react-router-dom";

const JobCardApplicant = ({ jobs }) => {
  const navigate = useNavigate();
  
  // Data dummy default jika tidak ada props jobs
  const defaultJobs = [
    {
      title: "UI/UX Designer",
      salary: "Rp 4jt–6 jt",
      tags: ["Fulltime", "IT Software", "Minimal S1", "+10"],
      company: "PT. SURYA MEDIA UTAMA",
      location: "Sleman, Jogja",
      postedAt: "14 hari yang lalu"
    },
    {
      title: "Frontend Developer",
      salary: "Rp 5jt–8 jt",
      tags: ["Fulltime", "IT Software", "Minimal S1", "+5"],
      company: "Tech Innovate Indonesia",
      location: "Jakarta Selatan",
      postedAt: "7 hari yang lalu"
    },
    {
      title: "Backend Developer",
      salary: "Rp 6jt–9 jt",
      tags: ["Fulltime", "IT Software", "Minimal S1", "+8"],
      company: "Digital Nusantara",
      location: "Bandung, Jawa Barat",
      postedAt: "3 hari yang lalu"
    },
    {
      title: "Mobile Developer",
      salary: "Rp 5jt–7 jt",
      tags: ["Fulltime", "IT Software", "Minimal S1", "+6"],
      company: "App Solutions Co",
      location: "Surabaya, Jawa Timur",
      postedAt: "5 hari yang lalu"
    }
  ];

  // Gunakan props jobs jika ada, jika tidak gunakan defaultJobs
  const jobsToDisplay = jobs || defaultJobs;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {jobsToDisplay.map((job, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow p-6 flex flex-col"
        >
          {/* HEADER */}
          <div className="flex justify-between">
            <h4 className="font-semibold text-lg">{job.title}</h4>
            <span className="text-sm" style={{ color: "#0F62FE" }}>{job.salary}</span>
          </div>

          {/* TAG */}
          <div className="flex flex-wrap gap-2 mt-4">
            {job.tags.map((tag, i) => (
              <span
                key={i}
                className="px-3 py-1 text-sm rounded-full text-gray-600"
                style={{ backgroundColor: "rgba(64, 145, 68, 0.2)" }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* INFO PT */}
          <div className="flex gap-5 mt-5">
            {/* ICON USER + GARIS VERTIKAL */}
            <div className="flex items-start gap-6">
              <div className="w-15 h-15 rounded-full bg-gray-100 flex items-center justify-center">
                <User size="28" color="#9CA3AF" variant="Bold" />
              </div>
              <div className="h-14 w-px bg-gray-300" />
            </div>

            {/* TEKS */}
            <div className="space-y-1">
              {/* NAMA PT + CHECK CIRCLE SVG */}
              <div 
                className="flex items-center gap-2 font-medium cursor-pointer hover:underline"
                style={{ color: "#0F62FE" }}
                onClick={() => navigate("/pelamar/detail-lowongan-pelamar")}
              >
                <img
                  src={iconCheckCirclePelamar}
                  alt="verified"
                  className="w-5 h-5"
                />
                <span>{job.company}</span>
              </div>

              {/* LOKASI ICONSAX */}
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Location size="21" color="#000000" variant="Outline" />
                <span>{job.location}</span>
              </div>
            </div>
          </div>

          {/* GARIS HORIZONTAL */}
          <hr className="border-gray-200 my-4" />

          {/* FOOTER */}
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-500">{job.postedAt}</span>

            {/* SAVE ICON POJOK KANAN BAWAH */}
            <Save2
              size="20"
              color="#000000"
              variant="Outline"
              className="cursor-pointer"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default JobCardApplicant;