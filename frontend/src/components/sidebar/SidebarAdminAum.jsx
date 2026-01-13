import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

// ICONS
import homeIcon from "../../assets/icons/home.svg";
import profileIcon from "../../assets/icons/document-text.svg";
import tagsIcon from "../../assets/icons/tags.svg";
import usersIcon from "../../assets/icons/users.svg";
import settingIcon from "../../assets/icons/setting-2.svg";
import vectorIcon from "../../assets/icons/vector.svg";
import menuIcon from "../../assets/icons/menu.svg";
import closeIcon from "../../assets/icons/iconClose.svg";

const SidebarAdminAum = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [open, setOpen] = useState(true);
  const [openSetting, setOpenSetting] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsMobile(true);
        setOpen(false);
      } else {
        setIsMobile(false);
        setOpen(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

const isActive = (path) => {
  const currentPath = location.pathname.toLowerCase();

  /* ===============================
     PROFIL & DETAIL PROFIL AUM
  =============================== */
  if (path === "/admin-aum/profil") {
    return (
      currentPath === "/admin-aum/profil" ||
      currentPath.startsWith("/admin-aum/detail-profil")
    );
  }

  /* ===============================
     MANAJEMEN LOWONGAN & TURUNANNYA
  =============================== */
  if (path === "/admin-aum/manajemen-lowongan") {
    return (
      currentPath === "/admin-aum/manajemen-lowongan" ||
      currentPath.startsWith("/admin-aum/detail-lowongan") ||
      currentPath.startsWith("/admin-aum/buat-lowongan")
    );
  }

  /* ===============================
     MANAJEMEN PELAMAR & TURUNANNYA
  =============================== */
  if (path === "/admin-aum/manajemen-pelamar") {
    return (
      currentPath === "/admin-aum/manajemen-pelamar" ||
      currentPath.startsWith("/admin-aum/lihat-pelamar") ||
      currentPath.startsWith("/admin-aum/review-pelamar")
    );
  }

  /* ===============================
     MENU LAIN (DASHBOARD, DLL)
  =============================== */
  return currentPath === path.toLowerCase();
};


  const SidebarItem = ({ icon, text, active, onClick }) => (
    <li
      onClick={() => {
        onClick();
        if (isMobile) setOpen(false);
      }}
      className="px-1"
    >
<div
  className={`group flex items-center gap-3 h-12 px-3 cursor-pointer rounded-lg transition-all duration-200
    ${active ? "font-semibold" : ""}
  `}
  style={{
    background: active
      ? "linear-gradient(90deg, #009B49 0%, #004F8F 100%)"
      : undefined,
  }}
  onMouseEnter={(e) => {
    if (!active) {
      e.currentTarget.style.background =
        "linear-gradient(90deg, #009B49 0%, #004F8F 100%)";
    }
  }}
  onMouseLeave={(e) => {
    if (!active) {
      e.currentTarget.style.background = "transparent";
    }
  }}
>

        <img
          src={icon}
          className={`w-5 h-5 transition-all
            ${
              active
                ? "filter invert brightness-0"
                : "group-hover:filter group-hover:invert group-hover:brightness-0"
            }
          `}
          alt={text}
        />

        {open && (
          <span
            className={`text-sm transition-all
              ${
                active
                  ? "text-white"
                  : "text-gray-800 group-hover:text-white"
              }
            `}
          >
            {text}
          </span>
        )}
      </div>
    </li>
  );

  return (
    <>
      {isMobile && open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-40"
        />
      )}

      <aside
        className={`fixed lg:static z-50 ${
          open ? "w-64" : "w-16"
        } h-[calc(100vh-64px)] bg-white transition-all duration-300 ease-in-out overflow-y-auto`}
      >
        {/* TOGGLE BUTTON */}
        <div
          className={`flex items-center h-14 px-3 ${
            open ? "justify-end" : "justify-center"
          }`}
        >
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center justify-center rounded-lg transition hover:bg-gray-100 px-2 py-2"
          >
            <img
              src={open ? closeIcon : menuIcon}
              className={`transition-all duration-300 -ml-1 ${
                open ? "w-3 h-3" : "w-5 h-5"
              }`}
              alt="toggle"
            />
          </button>
        </div>

        {/* MENU */}
        <ul className="pt-2 pl-1">
          <SidebarItem
            icon={homeIcon}
            text="Dashboard"
            active={isActive("/admin-aum/dashboard")}
            onClick={() => navigate("/admin-aum/dashboard")}
          />

          <SidebarItem
            icon={profileIcon}
            text="Profil & Legalitas AUM"
            active={isActive("/admin-aum/profil")}
            onClick={() => navigate("/admin-aum/profil")}
          />

          <SidebarItem
            icon={tagsIcon}
            text="Manajemen Lowongan"
            active={isActive("/admin-aum/manajemen-lowongan")}
            onClick={() => navigate("/admin-aum/manajemen-lowongan")}
          />

          <SidebarItem
            icon={usersIcon}
            text="Manajemen Pelamar"
            active={isActive("/admin-aum/Manajemen-Pelamar")}
            onClick={() => navigate("/admin-aum/Manajemen-Pelamar")}
          />

          {/* PENGATURAN */}
          <li
            onClick={() => setOpenSetting(!openSetting)}
            className="px-1"
          >
            <div className="flex items-center justify-between h-12 px-3 rounded-lg cursor-pointer hover:bg-gray-100 transition">
              <div className="flex items-center gap-3">
                <img src={settingIcon} className="w-5 h-5" />
                {open && <span className="text-sm">Pengaturan</span>}
              </div>

              {open && (
                <img
                  src={vectorIcon}
                  className={`w-4 h-4 transition-transform duration-300 ${
                    openSetting ? "rotate-180" : ""
                  }`}
                />
              )}
            </div>
          </li>

          {/* SUB MENU */}
          <div
            className={`overflow-hidden transition-all duration-300 ${
              open && openSetting ? "max-h-40" : "max-h-0"
            }`}
          >
            <ul className="ml-10 mt-2 space-y-2">
              <li
                onClick={() => navigate("/admin-aum/akun")}
                className="text-sm cursor-pointer hover:text-blue-600"
              >
                Akun
              </li>
              <li
                onClick={() => navigate("/admin-aum/keamanan")}
                className="text-sm cursor-pointer hover:text-blue-600"
              >
                Keamanan
              </li>
              <li
                onClick={() => navigate("/admin-aum/notifikasi")}
                className="text-sm cursor-pointer hover:text-blue-600"
              >
                Notifikasi
              </li>
            </ul>
          </div>
        </ul>
      </aside>
    </>
  );
};

export default SidebarAdminAum;
