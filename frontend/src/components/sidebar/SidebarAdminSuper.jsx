import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

// ICONS
import homeIcon from "../../assets/icons/home.svg";
import pengajuanIcon from "../../assets/icons/ProfilAdminSuper/document-copy.svg";
import usersIcon from "../../assets/icons/ProfilAdminSuper/users.svg";
import menuIcon from "../../assets/icons/menu.svg";
import closeIcon from "../../assets/icons/iconClose.svg";

const SidebarAdminSuper = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [open, setOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  /* ===============================
     RESPONSIVE HANDLER
  =============================== */
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

  /* ===============================
     ACTIVE MENU HANDLER
  =============================== */
  const isActive = (path) =>
    location.pathname.toLowerCase().startsWith(path.toLowerCase());

  /* ===============================
     SIDEBAR ITEM (SAMA PERSIS AUM)
  =============================== */
  const SidebarItem = ({ icon, text, onClick, active }) => (
    <li
      className="px-1"
      onClick={() => {
        onClick();
        if (isMobile) setOpen(false);
      }}
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
      {/* OVERLAY MOBILE */}
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
              className={`transition-all duration-300 ${
                open ? "w-3 h-3" : "w-5 h-5"
              }`}
              alt="toggle"
            />
          </button>
        </div>

        {/* MENU */}
        <ul className="pt-2 pl-1 space-y-1">
          <SidebarItem
            icon={homeIcon}
            text="Dashboard"
            active={isActive("/admin-super/dashboard")}
            onClick={() => navigate("/admin-super/dashboard")}
          />

          <SidebarItem
            icon={pengajuanIcon}
            text="Pengajuan AUM"
            active={isActive("/admin-super/pengajuan-aum")}
            onClick={() => navigate("/admin-super/pengajuan-aum")}
          />

          <SidebarItem
            icon={usersIcon}
            text="Manajemen User"
            active={isActive("/admin-super/manajemen-user")}
            onClick={() => navigate("/admin-super/manajemen-user")}
          />
        </ul>
      </aside>
    </>
  );
};

export default SidebarAdminSuper;
