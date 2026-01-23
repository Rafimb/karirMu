import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminAumLayout from "../../components/layout/AdminAumLayout";
import DokumenAum from "../../components/adminAum/DokumenAum";
import DataAum from "../../components/adminAum/DataAum";
import axios from "axios"; // Pastikan axios terinstall

const ProfilAum = () => {
  const navigate = useNavigate();

  // 1. Inisialisasi State Utama
  const [formData, setFormData] = useState({
    company_name: "",
    company_email: "",
    company_phone: "",
    company_url: "",
    province: "",
    city: "",
    industry: "",
    employee_range: "",
    description: "",
    address: "",
    logo: null, // Untuk file logo
    documents: [], // Array untuk menyimpan { file: File, name: string }
  });

  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(true);

  const role = localStorage.getItem("role");

useEffect(() => {
  const checkRoleAndProfile = async () => {
    if (role !== "company_hrd") {
      alert("Anda tidak memiliki akses ke halaman ini.");
      navigate("/auth/login", { replace: true });
      return;
    }

    try {
      const res = await axios.get(
        "http://localhost:5000/api/admin-aum/company/profile",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      const company = res.data.company; // <<< Ganti dari res.data.company
      console.log("Fetched company:", company);

      if (company?._id) {
        navigate("/admin-aum/detail");
        return;
      }

      setLoading(false);
    } catch (err) {
      console.error("Error fetching profile:", err);
      setLoading(false);
    }
  };

  checkRoleAndProfile();
}, [navigate, role]);


  // 2. Handler untuk Submit ke Backend
  const submitHandler = async (formattedData) => {
    try {
      // formattedData di sini adalah objek FormData yang dibuat di DataAum.jsx
      const response = await axios.post("http://localhost:5000/api/admin-aum/company/submit", formattedData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
        },
      });

      alert("Data berhasil disimpan!");
      console.log("Response:", response.data);

      navigate("/admin-aum/detail", {state: { formData } });
    } catch (error) {
      const serverMessage = error.response?.data?.message;
      console.error("Backend says:", serverMessage);
        console.error("Axios error full:", error);               // lihat semua error
  console.error("Response data:", error.response?.data);  // lihat message dari backend
  console.error("Status code:", error.response?.status);
    }

  };

  return (
    <AdminAumLayout>
       <div className="space-y-6">
    <div className="w-full flex flex-col gap-4">

          {/* PAGE TITLE */}
          <div className="bg-white px-4 py-3 rounded-md shadow-sm text-sm font-semibold">
            Profil & Legalitas AUM
          </div>

          <div className="grid grid-cols-1 gap-6">
            
            {/* KIRI — DOKUMEN LEGALITAS */}
            <div className="order-1">
              <DokumenAum 
                formData={formData} 
                setFormData={setFormData} 
              />
            </div>

            {/* KANAN — INFORMASI UMUM */}
            <div className="order-2">
              <DataAum 
                formData={formData} 
                setFormData={setFormData} 
                submitHandler={submitHandler}
                agree={agree}
                setAgree={setAgree}
              />
            </div>
          </div>
        </div>
      </div>
    </AdminAumLayout>
  );
};

export default ProfilAum;