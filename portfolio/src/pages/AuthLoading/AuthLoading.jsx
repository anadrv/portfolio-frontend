import { useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useMsal } from "@azure/msal-react";
import { AuthContext } from "../../context/AuthContext";
import { loginMicrosoft as loginMicrosoftService } from "../../services/userService";
import bgImage from "../../assets/images/background-image.png";

function AuthLoading() {
  const { instance } = useMsal();
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const authAttempted = useRef(false);

  useEffect(() => {
    async function authenticateMicrosoftUser() {
      if (authAttempted.current) return;
      authAttempted.current = true;

      try {
        let account = instance.getActiveAccount();

        if (!account) {
          const accounts = instance.getAllAccounts();
          if (accounts.length > 0) {
            instance.setActiveAccount(accounts[0]);
            account = accounts[0];
          } else {
            console.warn("Nenhuma conta encontrada, redirecionando para o login.");
            navigate("/", { replace: true });
            return;
          }
        }

        const tokenResponse = await instance.acquireTokenSilent({
          scopes: ["User.Read"],
          account: account,
        });

        const backendResponse = await loginMicrosoftService({
          accessToken: tokenResponse.accessToken,
        });

        await login({
          token: backendResponse.token,
          user: backendResponse.user,
        });

        navigate("/courses", { replace: true });
      } catch (error) {
        console.error("Erro na autenticação:", error);
        alert("Erro ao autenticar com a Microsoft. Redirecionando para o login...");
        navigate("/", { replace: true });
      }
    }

    authenticateMicrosoftUser();
  }, [instance, login, navigate]);

  return (
    <div className="relative min-h-screen w-full bg-background overflow-hidden">
      <div className="fixed bottom-0 left-0 w-full z-0 top-40">
        <img
          src={bgImage}
          alt=""
          className="w-full object-cover"
        />
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-5">
          <div className="w-14 h-14 border-4 border-white border-t-transparent rounded-full animate-spin"></div>

          <p className="text-white text-2xl font-semibold">
            Autenticando...
          </p>
        </div>
      </div>
    </div>
  );
}

export default AuthLoading;