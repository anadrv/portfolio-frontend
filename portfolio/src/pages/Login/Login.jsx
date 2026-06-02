import { loginMicrosoft as loginMicrosoftService } from "../../services/userService";

import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useMsal } from "@azure/msal-react";

import AuthLoading from "../../pages/AuthLoading/AuthLoading";

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

  const [authenticating, setAuthenticating] = useState(false);

  const navigate = useNavigate();

  const { login, user, loading } = useContext(AuthContext);

  const { instance } = useMsal();

  useEffect(() => {
    async function authenticateMicrosoftUser() {
      try {
        const account = instance.getActiveAccount();

        if (!account) {
          return;
        }

        setAuthenticating(true);

        const backendResponse = await loginMicrosoftService({
          microsoft_id: account.localAccountId,

          name_users: account.name,

          email_users:
            account.idTokenClaims?.email ||
            account.idTokenClaims?.preferred_username,
        });

        const userData = backendResponse.user;

        await login({
          token: backendResponse.token,
          user: userData,
        });

        navigate("/courses", { replace: true });
      } catch (error) {
        console.log(error);
      } finally {
        setAuthenticating(false);
      }
    }

    authenticateMicrosoftUser();
  }, [instance, login, navigate]);

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function loginMicrosoft() {
    try {
      await instance.loginRedirect({
        scopes: ["User.Read"],
        prompt: "select_account",
      });
    } catch (error) {
      console.log(error);
      alert("Erro ao fazer login com Microsoft");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      alert("Preencha todos os campos!");
      return;
    }

    setAuthenticating(true);

    try {
      await login({
        token: "token-local",

        user: {
          email: formData.email,
        },
      });

      alert("Login realizado com sucesso!");

      navigate("/", { replace: true });
    } catch (error) {
      console.log(error);
    } finally {
      setAuthenticating(false);
    }
  }

  useEffect(() => {
    if (user) {
      navigate("/courses", { replace: true });
    }
  }, [user, navigate]);

  if (loading || authenticating) {
    return <AuthLoading />;
  }

  return (
    <div className="relative min-h-screen w-full bg-sky-200 overflow-x-hidden">
      <img
        src={bgImage}
        alt="background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="relative z-10">
        <img
          src={unifacisa}
          alt="Unifacisa"
          className="hidden md:block absolute top-13 left-20 w-53 z-20"
        />

        <div className="min-h-screen flex items-center justify-center px-0 md:px-6">
          <div className="bg-background w-full max-w-3xl mx-auto rounded-none md:rounded-3xl shadow-2xl p-6 md:p-12 flex flex-col md:flex-row min-h-screen md:min-h-0 md:mt-5">
            <div className="hidden md:flex w-1/2 items-center justify-center relative">
              <img src={border} alt="" className="w-52 absolute left-12" />

              <img src={bo} alt="" className="w-45 absolute right-8" />

              <div className="bg-sky-200 border-3 border-slate-400 rounded-md w-70 h-80 flex items-center justify-center absolute z-20 right-13">
                <img src={jack} alt="Jack" className="w-56 mt-15" />
              </div>
            </div>

            <div className="w-full md:w-1/2 flex flex-col justify-center">
              <div className="md:hidden flex justify-center items-center gap-2 mb-10 mt-5">
                <img src={logo} alt="Unifacisa" className="w-8" />

                <span className="font-semibold text-2xl text-white font-sans">
                  Unifacisa
                </span>
              </div>

              <h1 className="hidden md:block text-4xl font-bold text-white mb-4">
                Entrar
              </h1>

              <form
                className="w-full flex flex-col gap-4 md:gap-3 mt-13 md:mt-0"
                onSubmit={handleSubmit}
              >
                <div className="max-w-[340px] mx-auto md:max-w-none md:mx-0 w-full">
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
                      className="w-full md:w-85 py-2 pl-5 pr-3 rounded-lg border border-gray-300 outline-none bg-white text-xl md:text-sm md:placeholder-transparent"
                    />
                  </div>
                </div>

                <div className="max-w-[340px] mx-auto md:max-w-none md:mx-0 w-full">
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
                      className="w-full md:w-85 py-2 pl-5 pr-3 rounded-lg border border-gray-300 outline-none bg-white text-xl md:text-sm md:placeholder-transparent"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-1 max-w-[340px] mx-auto md:mx-0 w-full">
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
                  className="w-full max-w-[340px] md:w-85 mx-auto md:mx-0 bg-accent text-background text-lg md:text-base font-semibold py-2 rounded-lg mt-1"
                >
                  Login
                </button>

                <div className="flex flex-col gap-1 text-center">
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      loginMicrosoft();
                    }}
                    className="text-white text-base md:text-xs hover:underline"
                  >
                    Entrar com Microsoft
                  </a>

                  <a
                    href="#"
                    className="text-white text-base md:text-xs hover:underline"
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
