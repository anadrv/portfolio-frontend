import bgImage from "../../assets/images/background-image.png";

function AuthLoading() {
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