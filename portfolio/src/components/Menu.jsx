import { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { User, X } from "lucide-react";

import SearchBar from "./SearchBar";

import logo from "../assets/icons/unifacisa-icon.png";



function Menu() {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const navigate = useNavigate();

  const profileRef = useRef(null);

  const user = JSON.parse(localStorage.getItem("user"));

  const isProfessor = user?.role === "PROFESSOR";

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setProfileOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

function handleLogout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  sessionStorage.clear();

  window.location.href = "/login";
}
  return (
    <header className="bg-primary text-white rounded-lg relative">
      <nav className="w-full px-8 py-5 flex items-center justify-between">
        {/* Logo */}
        <h1 className="text-lg font-bold">
          <NavLink
            to="/"
            className="flex items-center gap-2"
          >
            <img
              src={logo}
              alt="Logo do site"
              className="w-8 h-8 object-contain"
            />

            <span className="hidden font-semibold text-xl font-sans md:hidden lg:block">
              Unifacisa
            </span>
          </NavLink>
        </h1>

        <div className="flex-1 max-w-lg px-6 md:px-4">
          <SearchBar />
        </div>

        {/* DESKTOP MENU */}
        <ul className="hidden md:flex items-center font-semibold gap-10 md:gap-4 md:text-sm lg:text-lg lg:gap-10">
          <li>
            <NavLink to="/">Cursos</NavLink>
          </li>

          {!isProfessor && (
            <li>
              <NavLink to="/notifications">
                Notificações
              </NavLink>
            </li>
          )}

          <li
            className="relative"
            ref={profileRef}
          >
            <button
              onClick={() =>
                setProfileOpen(!profileOpen)
              }
              className="p-2 rounded-full hover:bg-white/20 transition flex items-center cursor-pointer"
            >
              <User size={24} />
            </button>

            {profileOpen && (
              <div className="absolute -right-8 top-16 w-56 rounded-lg bg-white p-1 shadow-lg text-background z-20">
                <div className="p-2 border-b border-primary mb-2">
                  <p className="text-sm">
                    Olá, {user?.name || "Usuário"}!
                  </p>
                </div>

                <button
                  onClick={handleLogout}
                  className="w-full text-left bg-text p-2 rounded hover:bg-primary hover:text-text transition cursor-pointer text-base"
                >
                  Sair
                </button>
              </div>
            )}
          </li>
        </ul>

        <button
          className="md:hidden flex flex-col gap-1 p-2 cursor-pointer"
          onClick={() => setOpen(!open)}
          aria-label="Abrir menu"
        >
          {open ? (
            <X />
          ) : (
            <>
              <div className="w-6 h-0.5 bg-white rounded"></div>
              <div className="w-6 h-0.5 bg-white rounded"></div>
              <div className="w-6 h-0.5 bg-white rounded"></div>
            </>
          )}
        </button>
      </nav>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden absolute top-full mt-2 left-0 w-full rounded-lg bg-primary">
          <ul className="flex flex-col p-2 gap-2 font-semibold text-md">
            <li>
              <NavLink
                to="/"
                onClick={() => setOpen(false)}
                className="block p-2 rounded hover:bg-white/20 transition"
              >
                Cursos
              </NavLink>
            </li>

            {!isProfessor && (
              <li>
                <NavLink
                  to="/notifications"
                  onClick={() => setOpen(false)}
                  className="block p-2 rounded hover:bg-white/20 transition"
                >
                  Notificações
                </NavLink>
              </li>
            )}

            <li>
              <NavLink
                to="/profile"
                onClick={() => setOpen(false)}
                className="block p-2 rounded hover:bg-white/20 transition"
              >
                Conta
              </NavLink>
            </li>

            <li>
              <button
                onClick={handleLogout}
                className="w-full text-left p-2 rounded hover:bg-white/20 transition cursor-pointer"
              >
                Sair
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

export default Menu;