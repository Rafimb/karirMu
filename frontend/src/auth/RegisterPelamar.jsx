import { Link } from "react-router-dom";
import RegisterImage from "../assets/img/login1.png";

const RegisterPelamar = () => {
  return (
    <div className="min-h-screen bg-[#C1C7CD] flex items-center justify-center px-16">
      <div className="flex w-full max-w-360 bg-white rounded-lg overflow-hidden">

        {/* LEFT - IMAGE */}
        <div className=" w-150 h-150 bg-[#2e2d2d]
            flex
            items-center
            justify-center
            rounded-tr-[70px]
            rounded-br-[70px]
          "
        >
          <img src={RegisterImage}
            alt="Registrasi Admin AUM"
            className="w-full h-full object-cover rounded-tr-[70px] rounded-br-[70px]"
          />
        </div>

        {/* RIGHT - FORM */}
        <div className="
            w-180
            p-20
            flex
            flex-col
            gap-8
            justify-center
          "
        >
          <h1 className="text-2xl font-bold">Daftar Pelamar</h1>

          <form className="flex flex-col gap-4">
            {/* Nama AUM */}
            <div>
              <label className="text-sm text-gray-600">
                Email </label>
              <input type="text"
                placeholder="masukkan email"
                className="w-full mt-1 px-4 py-2 bg-gray-100 rounded outline-none"
              />
            </div>

            {/* BUTTON */}
            <button type="submit" className="
                mt-2
                w-full
                bg-blue-600
                text-white
                py-2
                rounded
                font-semibold
                hover:bg-blue-700
                transition
              "
            >
              Daftar
            </button>
          </form>

          <p className="text-sm text-gray-600 text-center">
            Sudah punya akun?{" "}
            <Link to="/auth/loginPelamar"
              className="text-blue-600 font-medium hover:underline"
            >
              Login
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default RegisterPelamar;
