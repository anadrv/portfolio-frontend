import bgImage from "../assets/images/background-image.png";
import Menu from "../components/Menu";

function Layout({ children }) {
  return (
    <div className="relative min-h-screen w-full bg-background p-8 py-4 md:px-24 md:pt-12">
      <div
        className="absolute inset-0 bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundPosition: "center top 180px",
        }}
      ></div>

      <div className="relative z-10">
        <Menu />
        <main>{children}</main>
      </div>
    </div>
  );
}

export default Layout;
