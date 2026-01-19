import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginImage from "../assets/img/login2.png";
import EyeIcon from "../assets/icons/eye.svg";
import EyeSlashIcon from "../assets/icons/eye-slash.svg";

const LoginAdminSuper = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    // UI ONLY → langsung masuk dashboard
    navigate("/admin-super/dashboard");
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="flex flex-col md:flex-row w-full max-w-360 bg-white rounded-[48px] overflow-hidden px-4">

        {/* IMAGE */}
        <div className="hidden md:block md:w-150 bg-white rounded-tr-[70px] rounded-br-[70px] overflow-hidden">
          <img
            src={LoginImage}
            alt="Login Admin Super"
            className="w-full h-full object-cover"
          />
        </div>

        {/* FORM */}
        <div className="w-full md:w-180 p-8 md:p-16 flex flex-col gap-6 justify-center">

          <h1 className="text-xl md:text-2xl font-bold text-center md:text-left">
            Login Admin Super
          </h1>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">

            {/* EMAIL */}
            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-600">Email</label>
              <input
                type="email"
                placeholder="Masukkan email admin"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-4 py-3 bg-gray-100 rounded outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* PASSWORD */}
            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-600">Password</label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Masukkan password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 bg-gray-100 rounded outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <img
                    src={showPassword ? EyeSlashIcon : EyeIcon}
                    alt="toggle"
                    className="w-5 h-5 opacity-70"
                  />
                </button>
              </div>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              style={{
                background:
                  "linear-gradient(90deg, #004F8F 0%, #009B49 100%)",
              }}
              className="mt-2 w-full text-white py-3 rounded font-semibold hover:opacity-90 transition"
            >
              Masuk
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginAdminSuper;
