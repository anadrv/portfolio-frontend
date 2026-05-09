import bgImage from "../assets/images/bg-image.png";


function LoginLayout({ children }) {
  return (
    <div className="relative min-h-screen w-full bg-sky-200 overflow-hidden">
      
      <img
        src={bgImage}
        alt="background"
        className="absolute top-20 left-0 w-full h-[89%]"
      />

      <div className="relative z-10">
        <main>{children}</main>
      </div>

    </div>
  );
}

export default LoginLayout;