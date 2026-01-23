import AdminAumLayout from "../../components/layout/AdminAumLayout";
import React, { useState } from "react";
import axios from "axios";
import searchIcon from "../../assets/icons/icon-search.svg"; // import icon
import { useNavigate } from "react-router-dom";


const BuatLowongan = () => {

  const navigate = useNavigate();
  const [bidang, setBidang] = useState("IT/Software");
  const [jobName, setJobName] = useState("");
  const [location, setLocation] = useState("");
  const [workType, setWorkType] = useState("Fulltime");
  const [jobType, setJobType] = useState("IT/Software");
  const [description, setDescription] = useState("");
  const [requirement, setRequirement] = useState("");
  const [salaryMin, setSalaryMin] = useState("");
  const [salaryMax, setSalaryMax] = useState("");
  const [dateJob, setDateJob] = useState("");

  const gajiOptions = Array.from({ length: 20 }, (_, i) => (i + 1) * 1000000); // 1 juta - 20 juta

  const [showConfirm, setShowConfirm] = useState(false);
  const handlePublish = () => {
  setShowConfirm(true);
  

};

const handleSubmit = async () => {
  try {
    const payload = {
      category: bidang,
      job_name: jobName,
      location,
      type: jobType,
      work_type: workType,
      salary_min: salaryMin,
      salary_max: salaryMax,
      description,
      requirement,
      date_job: dateJob,
      status: true,
    };

    const res = await axios.post(
      "http://localhost:5000/api/admin-aum/jobs",
      payload,
      {
        withCredentials: true, // ⬅️ penting kalau pakai auth
      }
    );

    console.log("Backend response:", res.data);

    setShowConfirm(false);

    navigate("/admin-aum/manajemen-lowongan", {
      state: { fromCreate: true },
    });
  } catch (err) {
    console.error("ERROR SUBMIT:", err);
    alert(err.response?.data?.message || "Terjadi kesalahan");
  }
};

  return (
    <AdminAumLayout>

{showConfirm && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
    <div className="bg-white w-623px h-439px rounded-xl shadow-lg overflow-hidden">

      {/* Judul */}
      <div className="px-6 py-5">
        <h2 className="text-xl font-bold text-center">Konfirmasi Publikasi Lowongan</h2>
      </div>

      <div className="px-6"><hr className="border-gray-200" /></div>

      {/* Isi */}
      <div className="px-10 py-4 text-sm text-gray-700 space-y-8">
        <p>Apakah Anda yakin ingin menerbitkan lowongan ini sekarang?</p>

        <div className="mt-2 space-y-1 text-gray-600">
          <p>Ringkasan Lowongan:</p>
          <p>Judul : {jobName || "[Nama Judul dari Input]"}</p>
          <p>Tipe : {workType || "[Tipe Kerja yang Dipilih]"}</p>
          <p>Deadline : {dateJob || "[Tanggal Deadline yang Diatur]"}</p>
        </div>
      </div>

            <div className="px-8"><hr className="border-gray-200" /></div>

      {/* Tombol */}
<div className="px-6 py-5 flex gap-4">
  <button
    onClick={() => setShowConfirm(false)}
    className="flex-1 border border-green-600 text-green-600 py-2.5 rounded-lg font-semibold hover:bg-green-50"
  >
    Periksa Kembali
  </button>

  <button
    onClick={handleSubmit}
    className="flex-1 bg-green-600 text-white py-2.5 rounded-lg font-semibold hover:bg-green-700"
  >
    Terbitkan
  </button>
</div>

    </div>
  </div>
)}


     <div className="space-y-6">
        <div className="w-full max-w-1124px flex flex-col gap-4">

          {/* HEADER */}
<div className="bg-white px-4 py-3 rounded-md shadow-sm text-sm flex items-center gap-2">
  <span className="text-gray-500">Manajemen Lowongan</span>
  <span className="text-gray-400">›</span>
  <span className="font-semibold">Buat Lowongan</span>
</div>

          {/* ROW ATAS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* KOLOM KIRI */}
            <div className="space-y-4">
              <div className="bg-white rounded-lg shadow-sm">
                <Header title="1. Informasi pekerjaan" />
              </div>

              <div className="bg-white rounded-lg shadow-sm min-h-220px">
                <div className="p-4 space-y-5 text-sm">
                  <Input
                    label="Judul Lowongan"
                    placeholder="UI UX Designer"
                    value={jobName}
                    onChange={(e) => setJobName(e.target.value)}
                  />

                  <div>
                    <label className="text-xs text-gray-600 mb-2 block">
                      Bidang
                    </label>
                    <div className="flex gap-2 flex-wrap">
                      {["IT/Software", "Education", "Medical", "Administration"].map(
                        (item) => (
                          <button
                            key={item}
                            type="button"
                            onClick={() => {
                              setBidang(item);
                              setJobType(item);
                            }}
                            className={`px-3 py-1 rounded-full text-xs border transition
                              focus:outline-none focus:ring-0 active:outline-none
                              ${
                                bidang === item
                                  ? "bg-green-600 text-white border-green-600"
                                  : "border-gray-300 text-gray-600 hover:bg-gray-100"
                              }
                            `}
                          >
                            {item}
                          </button>
                        )
                      )}
                    </div>
                  </div>

                </div>
              </div>

            </div>

            {/* KOLOM KANAN */}
            <div className="space-y-4">
              <div className="bg-white rounded-lg shadow-sm">
                <Header title="2. Rincian Pekerjaan" />
              </div>

              <div className="bg-white rounded-lg shadow-sm min-h-220px">
                <div className="p-4 space-y-6 text-sm">
                  <Input
                    label="Lokasi Kerja"
                    placeholder="Ketik lokasi..."
                    icon={<img src={searchIcon} alt="search" className="w-4 h-4" />}
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />

                  <div>
                    <label className="text-xs text-gray-600 mb-2 block">
                      Tipe Pekerjaan
                    </label>

                    <div className="flex gap-6 flex-wrap">
                      {["Fulltime", "Parttime", "Contract", "Intern"].map((item) => (
                        <label
                          key={item}
                          className="flex items-center gap-2 text-sm cursor-pointer"
                        >
                          <input
                            type="radio"
                            name="jobTypeRadio"
                            className="accent-green-600"
                            checked={workType === item}
                            onChange={() => setWorkType(item)}
                          />
                          {item}
                        </label>
                      ))}
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>

          {/* ADDITIONAL SETTINGS */}
          <div className="bg-white rounded-lg shadow-sm">
            <Header title="3. Additional Settings" />
          </div>

          {/* DESKRIPSI & KUALIFIKASI */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-4 space-y-4 text-sm">
              <Textarea
                label="Deskripsi Pekerjaan"
                placeholder="Deskripsi Pekerjaan"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <Textarea
                label="Kualifikasi / Persyaratan"
                placeholder="Deskripsi Persyaratan"
                value={requirement}
                onChange={(e) => setRequirement(e.target.value)}
              />

              <div>
                <label className="text-xs text-gray-600 mb-2 block">
                  Kisaran gaji & tenggat waktu
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <Select
                    placeholder="Rp Min"
                    className="h-10 box-border"
                    value={salaryMin}
                    onChange={(e) => setSalaryMin(e.target.value)}
                  >
                    {gajiOptions.map((gaji) => (
                      <option key={gaji} value={gaji}>{`Rp ${gaji.toLocaleString()}`}</option>
                    ))}
                  </Select>
                  <Select
                    placeholder="Rp Max"
                    className="h-10 box-border"
                    value={salaryMax}
                    onChange={(e) => setSalaryMax(e.target.value)}
                  >
                    {gajiOptions.map((gaji) => (
                      <option key={gaji} value={gaji}>{`Rp ${gaji.toLocaleString()}`}</option>
                    ))}
                  </Select>
                  <Input
                    type="date"
                    className="h-10 box-border appearance-none"
                    value={dateJob}
                    onChange={(e) => setDateJob(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* SIMPAN LOWONGAN */}
          <div className="bg-white rounded-lg shadow-sm p-4 flex justify-between">
<button
  onClick={() => navigate("/admin-aum/manajemen-lowongan")}
  className="px-4 py-2 border border-green-600 text-green-600 rounded hover:bg-green-50 transition"
>
  Batal
</button>

<button
  className="px-6 py-2 bg-green-600 text-white rounded"
  onClick={() => setShowConfirm(true)}
>
  Terbitkan
</button>

          </div>
                    </div>
        </div>
      
    </AdminAumLayout>
  );
};

/* ================== COMPONENT ================== */

const Header = ({ title }) => (
  <div
    className="px-4 py-3 rounded-t-lg font-medium text-white text-sm"
    style={{
      background: "linear-gradient(90deg, #004F8F 0%, #009B49 100%)",
    }}
  >
    {title}
  </div>
);

const Input = ({ label, placeholder, type = "text", icon, className, value, onChange }) => (
  <div>
    {label && <label className="text-xs text-gray-600">{label}</label>}
    <div className="relative mt-1">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-0 box-border ${className || ""}`}
      />
      {icon && <span className="absolute right-3 top-2.5">{icon}</span>}
    </div>
  </div>
);

const Textarea = ({ label, placeholder, value, onChange }) => (
  <div>
    <label className="text-xs text-gray-600">{label}</label>
    <textarea
      rows={4}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full border border-gray-300 rounded px-3 py-2 text-sm mt-1 focus:outline-none focus:ring-0"
    />
    <p className="text-right text-[11px] text-gray-400">0/200</p>
  </div>
);

const Select = ({ placeholder, className, value, onChange, children }) => (
  <select
    value={value}
    onChange={onChange}
    className={`w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-0 box-border ${className || ""}`}
  >
    <option>{placeholder}</option>
    {children}
  </select>
);

export default BuatLowongan;
