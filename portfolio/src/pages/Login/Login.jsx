import LoginLayout from "../../Layout/LoginLayout";
import unifacisa from "../../assets/images/name-image.png";
import border from "../../assets/images/border-image.png";
import bo from "../../assets/images/border2-image.png";
import jack from "../../assets/images/jack-image.png";

function Login() {
  return (
    <LoginLayout>

      <img
        src={unifacisa}
        alt="Unifacisa"
        className="absolute top-13 left-20 w-56 z-20"
      />

      <div className="min-h-screen flex items-center justify-center px-6">

        <div className="bg-blue-800 w-full max-w-3xl rounded-3xl shadow-2xl p-12 flex mt-5">

          <div className="w-1/2 flex items-center justify-center relative">

            <img
              src={border}
              alt=""
              className="w-52 absolute left-12"
            />

            <img
              src={bo}
              alt=""
              className="w-45 absolute  right-8 "
            />

            <div className="bg-sky-200 border-3 border-slate-400 rounded-md w-70 h-80 flex items-center justify-center absolute z-20 right-13">

              <img
                src={jack}
                alt="Jack"
                className="w-56 mt-15"
              />

            </div>

          </div>

          <div className="w-1/2 flex flex-col justify-center">

            <h1 className="text-4xl font-bold text-white mb-4 relative top-1">
              Entrar
            </h1>

            <form className="w-full flex flex-col gap-3">

              <div>
                <label className="block text-sm text-white mb-2">
                  E-mail:
                </label>

                <div className="relative">

                  <div className="absolute left-0 top-0 h-full w-3 bg-sky-400 rounded-l-2xl"></div>

                  <input
                    type="email"
                    name="email"
                    className="w-85 py-2 pl-5 pr-3 rounded-2xl border border-gray-300 outline-none focus:border-blue-400 bg-white"
                  />

                </div>
              </div>

              <div>
                <label className="block text-sm text-white mb-2">
                  Senha:
                </label>

                <div className="relative">

                  <div className="absolute left-0 top-0 h-full w-3 bg-sky-400 rounded-l-2xl"></div>

                  <input
                    type="password"
                    name="password"
                    className="w-85 py-2 pl-5 pr-3 rounded-2xl border border-gray-300 outline-none focus:border-blue-400 bg-white"
                  />

                </div>
              </div>

              <div className="flex items-center gap-2 mt-1">

                <input
                  type="checkbox"
                  id="remember"
                  className="w-4 h-4 accent-lime-300"
                />

                <label
                  htmlFor="remember"
                  className="text-white text-sm"
                >
                  Continuar conectado(a)
                </label>

              </div>

              <button
                type="submit"
                className="w-85 bg-lime-400 text-blue-800 text-base font-semibold py-2 rounded-2xl mt-1"
              >
                Login
              </button>

              <a
                href="#"
                className="text-white text-sm text-center mt-1 hover:underline"
              >
                Esqueceu a senha?
              </a>

            </form>
          </div>

        </div>
      </div>
    </LoginLayout>
  );
}

export default Login;