import {
  loginMicrosoft as loginMicrosoftService
} from "../../services/userService";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useMsal } from "@azure/msal-react";
import bgImage from "../../assets/images/bg-image.png";
import unifacisa from "../../assets/images/name-image.png";
import logo from "../../assets/icons/unifacisa-icon.png";
import border from "../../assets/images/border-image.png";
import bo from "../../assets/images/border2-image.png";
import jack from "../../assets/images/jack-image.png";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const { instance } = useMsal();

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function loginMicrosoft() {
    try {
      const response =
        await instance.loginPopup({
          scopes: ["User.Read"],
        });

      console.log(
        "Microsoft:",
        response
      );

      const backendResponse =
        await loginMicrosoftService(
          response.accessToken
        );

      console.log(
        "Backend:",
        backendResponse
      );

      login({
        token: backendResponse.token,

        user: {
          name: response.account.name,
          email: response.account.username,
        },
      });

      localStorage.setItem(
        "token",
        backendResponse.token
      );

      alert(
        "Login Microsoft realizado com sucesso!"
      );

      navigate("/");

    } catch (error) {

      console.log(error);

      alert(
        "Erro ao fazer login com Microsoft"
      );
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      alert("Preencha todos os campos!");
      return;
    }

    login({
      token: "token-local",

      user: {
        email: formData.email,
      },
    });

    alert("Login realizado com sucesso!");

    navigate("/");
  }

  return (
    <div className="relative min-h-screen w-full bg-sky-200 overflow-hidden">

      <img
        src={bgImage}
        alt="background"
        className="absolute top-20 left-0 w-full h-[89%]"
      />

      <div className="relative z-10">

        <img
          src={unifacisa}
          alt="Unifacisa"
          className="hidden md:block absolute top-13 left-20 w-53 z-20"
        />

        <div className="min-h-screen flex items-center justify-center px-0 md:px-6">

          <div className="bg-background w-full max-w-3xl rounded-none md:rounded-3xl shadow-2xl p-6 md:p-12 flex flex-col md:flex-row min-h-screen md:min-h-0 md:mt-5">

            <div className="hidden md:flex w-1/2 items-center justify-center relative">

              <img
                src={border}
                alt=""
                className="w-52 absolute left-12"
              />

              <img
                src={bo}
                alt=""
                className="w-45 absolute right-8"
              />

              <div className="bg-sky-200 border-3 border-slate-400 rounded-md w-70 h-80 flex items-center justify-center absolute z-20 right-13">

                <img
                  src={jack}
                  alt="Jack"
                  className="w-56 mt-15"
                />

              </div>
            </div>

            <div className="w-full md:w-1/2 flex flex-col justify-center">

              <div className="md:hidden flex mb-10">

                <img
                  src={logo}
                  alt="Unifacisa"
                  className="w-8 ml-30 mt-3"
                />

                <span className="font-semibold text-2xl text-white font-sans mt-4 ml-2">
                  Unifacisa
                </span>

              </div>

              <h1 className="hidden md:block text-4xl font-bold text-white mb-4">
                Entrar
              </h1>

              <form
                className="w-full flex flex-col gap-4 md:gap-3 ml-8 md:ml-0 mt-10 md:mt-0"
                onSubmit={handleSubmit}
              >

                <div>

                  <label className="block text-base md:text-sm text-white mb-2">
                    E-mail:
                  </label>

                  <div className="relative">

                    <div className="absolute left-0 top-0 h-full w-3 bg-primary rounded-l-lg"></div>

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-80 md:w-85 py-2 pl-5 pr-3 rounded-lg border border-gray-300 outline-none bg-white text-xl md:text-sm md:placeholder-transparent"
                    />

                  </div>
                </div>

                <div>

                  <label className="block text-base md:text-sm text-white mb-2">
                    Senha:
                  </label>

                  <div className="relative">

                    <div className="absolute left-0 top-0 h-full w-3 bg-primary rounded-l-lg"></div>

                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-80 md:w-85 py-2 pl-5 pr-3 rounded-lg border border-gray-300 outline-none bg-white text-xl md:text-sm md:placeholder-transparent"
                    />

                  </div>
                </div>

                <div className="flex items-center gap-2 mt-1">

                  <input
                    type="checkbox"
                    id="remember"
                    className="w-4 h-4 accent-accent"
                  />

                  <label
                    htmlFor="remember"
                    className="text-white text-base md:text-sm"
                  >
                    Continuar conectado(a)
                  </label>

                </div>

                <button
                  type="submit"
                  className="w-80 md:w-85 bg-accent text-background text-xl md:text-base font-semibold py-2 rounded-lg mt-1"
                >
                  Login
                </button>

                <div className="flex flex-col gap-1">
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      loginMicrosoft();
                    }}
                    className="text-white text-base md:text-sm ml-20 md:ml-0 md:text-center hover:underline"
                  >
                    Entrar com Microsoft
                  </a>
                  <a
                    href="#"
                    className="text-white text-base md:text-sm ml-20 md:ml-0 md:text-center hover:underline"
                  >
                    Esqueceu a senha?
                  </a>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;