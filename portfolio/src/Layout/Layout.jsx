import bgImage from "../assets/images/background-image.png";
import Menu from "../components/Menu";

function Layout({ children }) {
  return (
    <div className="relative min-h-screen w-full bg-background px-4 py-4 md:px-10 lg:px-20 md:pt-12 3xl:px-72">
      
 
      <div className="fixed bottom-0 left-0 w-full z-10 top-40">
        <img
          src={bgImage}
          alt=""
          className="w-full object-cover"
        />
      </div>

      <div className="relative z-10">
        <Menu />
        <main>{children}</main>
      </div>
    </div>
  );
}

export default Layout;