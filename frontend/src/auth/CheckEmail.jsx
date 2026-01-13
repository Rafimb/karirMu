import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import CheckEmailIcon from "../assets/icons/Icons-Check-Email1.svg";
import Logo from "../assets/img/logoz.png";

const CheckEmail = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;

  const [counter, setCounter] = useState(60);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // ⏳ Countdown timer
  useEffect(() => {
    if (counter === 0) return;

    const timer = setInterval(() => {
      setCounter((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [counter]);

  const handleResend = async () => {
    if (!email) {
      setError("Email tidak ditemukan, silakan daftar ulang");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setMessage("");

      const res = await fetch(
        "http://localhost:5000/api/auth/resend-activation",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Gagal mengirim ulang email");
        return;
      }

      setMessage(
        "Email aktivasi berhasil dikirim ulang. Silakan cek email Anda."
      );
      setCounter(60);
    } catch {
      setError("Terjadi kesalahan server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#ffffff] flex items-center justify-center px-4 sm:px-6">
      <div
        style={{
          background: "linear-gradient(to bottom, #004F8F, #009B49)",
        }}
        className="
          w-full
          max-w-sm
          sm:max-w-md
          rounded-[48px]
          p-6
          sm:p-10
          text-center
          shadow-lg
          text-white
        "
      >


        {/* LOGO */}
        <div
          className="flex justify-center mb-4 sm:mb-6 cursor-pointer"
          onClick={() => navigate("/auth/register")}
        >
          <img
            src={Logo}
            alt="Logoz"
            className="h-8 sm:h-10 object-contain"
          />
        </div>

        {/* TITLE */}
        <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
          Cek Email Anda!
        </h1>

        {/* ICON */}
        <div className="flex justify-center mb-4 sm:mb-6">
          <img
            src={CheckEmailIcon}
            alt="Check Email"
            className="w-24 h-24 sm:w-32 sm:h-32 object-contain"
          />
        </div>

        {/* DESCRIPTION */}
        <p className="text-white text-sm sm:text-base mb-4">
          Permintaan registrasi berhasil.
          <br />
          Link aktivasi telah dikirim ke email Anda.
        </p>

        {/* MESSAGE */}
        {message && (
          <div className="text-sm text-green-600 bg-green-50 border border-green-200 rounded-md py-2 px-3 mb-3">
            {message}
          </div>
        )}

        {/* ERROR */}
        {error && (
          <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md py-2 px-3 mb-3">
            {error}
          </div>
        )}

        {/* BACK */}
{/* BACK */}
<Link
  to="/auth/register"
  className="
    inline-flex items-center justify-center gap-2
    border border-white text-white
    px-5 py-2 rounded font-medium
    hover:bg-[#004F8F]
    transition-colors duration-200 ease-in-out
    text-sm sm:text-base
  "
>

          ← Kembali ke Register
        </Link>

        {/* RESEND */}
        <p className="text-xs sm:text-sm text-white mt-5 sm:mt-6">
          Belum menerima email?{" "}
          {counter > 0 ? (
            <>Tunggu {counter} detik</>
          ) : (
            <button
              onClick={handleResend}
              disabled={loading}
              className="text-blue-600 hover:underline font-medium"
            >
              {loading ? "Mengirim..." : "Kirim Ulang"}
            </button>
          )}
        </p>
      </div>
    </div>
  );
};

export default CheckEmail;
