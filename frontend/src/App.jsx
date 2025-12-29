import { Routes, Route, useLocation } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import Home from "./public/Home";

// Auth
import Login from "./auth/Login";
import Register from "./auth/Register";
import LoginPelamar from "./auth/LoginPelamar";
import RegisterPelamar from "./auth/RegisterPelamar";

// AdminAUM
import DashboardAdminAum from "./pages/adminAum/DashboardAdminAum";
import ProfilAum from "./pages/adminAum/ProfilAum";
import LegalitasAum from "./pages/adminAum/LegalitasAum";
import DetailProfilAum from "./pages/adminAum/DetailProfilAum";

// Pelamar
import DashboardPelamar from "./pages/pelamar/DashboardPelamar";

function App() {
  const location = useLocation();

  // ❌ SEMBUNYIKAN Navbar & Footer untuk AUTH, ADMIN, PELAMAR
  const hideNavbarFooter =
    location.pathname.startsWith("/admin-aum") ||
    location.pathname.startsWith("/auth") ||
    location.pathname.startsWith("/pelamar");

  return (
    <>
      {!hideNavbarFooter && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />

        {/* AUTH */}
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/loginPelamar" element={<LoginPelamar />} />
        <Route path="/auth/registerPelamar" element={<RegisterPelamar />} />

        {/* ADMIN AUM */}
        <Route path="/admin-aum/dashboard" element={<DashboardAdminAum />} />
        <Route path="/admin-aum/profil" element={<ProfilAum />} />
        <Route path="/admin-aum/legalitas" element={<LegalitasAum />} />
        <Route path="/admin-aum/detail" element={<DetailProfilAum />} />

        {/* PELAMAR */}
        <Route path="/pelamar/dashboard" element={<DashboardPelamar />} />
      </Routes>

      {!hideNavbarFooter && <Footer />}
    </>
  );
}

export default App;
