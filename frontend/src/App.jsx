import { Routes, Route, useLocation } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./routes/ProtectedRoute";

// Pages
import Home from "./public/Home";

// Auth
import Login from "./auth/Login";
import Register from "./auth/Register";
import CheckEmail from "./auth/CheckEmail";
import ActivateAccount from "./auth/ActivateAccount";
import SetPassword from "./auth/SetPassword";

import LoginAdminSuper from "./auth/LoginAdminSuper";

// AdminAUM
import DashboardAdminAum from "./pages/adminAum/DashboardAdminAum";
import ProfilAum from "./pages/adminAum/ProfilAum";
import DetailProfilAum from "./pages/adminAum/DetailProfilAum";

import DataAum from "./components/adminAum/DataAum";
import DokumenAum from "./components/adminAum/DokumenAum";
import BuatLowongan from "./pages/adminAum/BuatLowongan";
import ManajemenLowongan from "./pages/adminAum/ManajemenLowongan";
import DetailLowongan from "./pages/adminAum/DetailLowongan";
import ManajemenPelamar from "./pages/adminAum/ManajemenPelamar";
import LihatPelamar from "./pages/adminAum/LihatPelamar";
import ReviewPelamar from "./pages/adminAum/ReviewPelamar";

// PAGES PELAMAR
import DashboardPelamar from "./pages/pelamar/DashboardPelamar";
import ProfilPelamar from "./pages/pelamar/ProfilPelamar";
import CariLowongan from "./pages/pelamar/CariLowongan";
import RiwayatLamaran from "./pages/pelamar/RiwayatLamaran";
import LowonganSimpan from "./pages/pelamar/LowonganSimpan";
import PendidikanPelamar from "./pages/pelamar/PendidikanPelamar";
import PengalamanPelamar from "./pages/pelamar/PengalamanPelamar";
import DetailProfilPelamar from "./pages/pelamar/DetailProfilPelamar";
import DetailLowonganPelamar from "./pages/pelamar/DetailLowonganPelamar";


// PAGES SUPER ADMIN
import AdminSuper from "./pages/adminSuper/DashboardAdminSuper";
import PengajuanAum from "./pages/adminSuper/PengajuanAum";
import ManajemenUser from "./pages/adminSuper/ManajemenUser";
import DetailPengajuanAum from "./pages/adminSuper/DetailPengajuanAum";



function App() {
  const location = useLocation();

const hideNavbarFooter =
  location.pathname.startsWith("/admin-aum") ||
  location.pathname.startsWith("/auth") ||
  location.pathname.startsWith("/pelamar") ||
  location.pathname.startsWith("/admin-super");


  return (
    <>
      {!hideNavbarFooter && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />

        {/* AUTH */}
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/check-email" element={<CheckEmail />} />
        <Route path="/auth/activate" element={<ActivateAccount />} />
        <Route path="/auth/set-password" element={<SetPassword />} />

        <Route path="/auth/login-admin-super" element={<LoginAdminSuper />} />

        {/* ADMIN AUM (PROTECTED) */}
        <Route element={<ProtectedRoute allowedRole={["company_hrd"]} />}>
          <Route path="/admin-aum/dashboard" element={<DashboardAdminAum />} />
          <Route path="/admin-aum/profil" element={<ProfilAum />} />
          <Route path="/admin-aum/detail" element={<DetailProfilAum />} />
          <Route path="/admin-aum/data" element={<DataAum />} />
          <Route path="/admin-aum/dokumen" element={<DokumenAum />} />
          <Route path="/admin-aum/buat-lowongan" element={<BuatLowongan />} />
          <Route path="/admin-aum/manajemen-lowongan" element={<ManajemenLowongan />} />
          <Route path="/admin-aum/detail-lowongan" element={<DetailLowongan />} />
          <Route path="/admin-aum/manajemen-pelamar" element={<ManajemenPelamar />} />
          <Route path="/admin-aum/lihat-pelamar" element={<LihatPelamar />} />
          <Route path="/admin-aum/review-pelamar" element={<ReviewPelamar />} />
        </Route>

        {/* PELAMAR */}
        <Route path="/pelamar/dashboard" element={<DashboardPelamar />} />
        <Route path="/pelamar/profil" element={<ProfilPelamar />} />
        <Route path="/pelamar/cari-lowongan" element={<CariLowongan />} />
        <Route path="/pelamar/riwayat-lamaran" element={<RiwayatLamaran />} />
        <Route path="/pelamar/lowongan-simpan" element={<LowonganSimpan />} />
        <Route path="/pelamar/pendidikan-pelamar" element={<PendidikanPelamar />} />
        <Route path="/pelamar/pengalaman-pelamar" element={<PengalamanPelamar />} />
        <Route path="/pelamar/detail-profil-pelamar" element={<DetailProfilPelamar />} />
        <Route path="/pelamar/detail-lowongan-pelamar" element= {<DetailLowonganPelamar />} />
        {/* ADMIN SUPER */}
        <Route path="/admin-super/dashboard" element={<AdminSuper />} />
        <Route path="/admin-super/pengajuan-aum" element={<PengajuanAum />} />
        <Route path="/admin-super/manajemen-user" element={<ManajemenUser />} />
        <Route path="/admin-super/detail-pengajuan-aum" element={<DetailPengajuanAum />} />


      </Routes>

      {!hideNavbarFooter && <Footer />}
    </>
  );
}

export default App;
