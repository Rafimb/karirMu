import { Link, useNavigate } from "react-router-dom";
import LoginImage from "../assets/img/login1.png";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // nanti bisa ditambah validasi / API
    navigate("/admin-aum/dashboard");
  };

  return (
    <div className="min-h-screen bg-linear-to-r from-[#C1C7CD] to-[#C1C7CD] flex items-center justify-center px-16">
      <div className="flex w-full max-w-360 bg-white rounded-lg overflow-hidden">

        {/* LEFT */}
        <div
          className=" w-150 h-150 bg-[#2e2d2d]
            flex
            items-center
            justify-center
            rounded-tr-[70px]
            rounded-br-[70px]
          "
        >
          <img
            src={LoginImage}
            alt="Login Illustration"
            className="w-full h-full object-cover rounded-tr-[70px] rounded-br-[70px]"
          />
        </div>

        {/* RIGHT */}
        <form
          onSubmit={handleLogin}
          className="
            w-180
            h-602px
            p-20
            flex
            flex-col
            justify-center
            gap-12
          "
        >
          <h1 className="text-2xl font-bold">Login Admin AUM</h1>

          <div className="flex flex-col gap-4">
            <div>
              <label className="text-sm text-gray-600">Email AUM</label>
              <input
                type="email"
                required
                placeholder="Masukkan email"
                className="w-full mt-1 px-4 py-2 bg-gray-100 rounded outline-none"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Password</label>
              <input
                type="password"
                required
                placeholder="Masukkan Password"
                className="w-full mt-1 px-4 py-2 bg-gray-100 rounded outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition"
            >
              Masuk
            </button>

            <p className="text-sm text-gray-600 text-center">
              Belum punya akun?{" "}
              <Link
                to="/auth/register"
                className="text-blue-600 font-medium hover:underline"
              >
                Daftar
              </Link>
            </p>
          </div>
        </form>

      </div>
    </div>
  );
};

export default Login;
