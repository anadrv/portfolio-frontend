import { useState } from "react";
import { NavLink } from "react-router-dom";
import { User, X } from "lucide-react";
import logo from "../assets/icons/unifacisa-icon.png";

function Menu() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-primary text-white rounded-lg relative">
      <nav
        className="max-w-7xl mx-auto p-5 flex items-center justify-between"
        aria-label="Navegação principal"
      >
        {/* Logo */}
        <h1 className="text-lg font-bold">
          <NavLink to="/" className="flex items-center gap-2">
            <img
              src={logo}
              alt="Logo do site"
              className="w-8 h-8 object-contain"
            />
            <span className="font-semibold text-xl font-sans">
              Unifacisa
            </span>
          </NavLink>
        </h1>

        {/* DESKTOP MENU */}
        <ul className="hidden md:flex items-center font-semibold text-lg gap-10">
          <li>
            <NavLink to="/">Cursos</NavLink>
          </li>

          <li>
            <NavLink to="/notifications">Notificações</NavLink>
          </li>

          <li>
            <NavLink
              to="/profile"
              className="p-2 rounded-full hover:bg-white/20 transition flex items-center"
            >
              <User size={24} />
            </NavLink>
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

      <li>
        <NavLink
          to="/notifications"
          onClick={() => setOpen(false)}
          className="block p-2 rounded hover:bg-white/20 transition"
        >
          Notificações
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/profile"
          onClick={() => setOpen(false)}
          className="block p-2 rounded hover:bg-white/20 transition"
        >
          Conta
        </NavLink>
      </li>
    </ul>
  </div>
)}
    </header>
  );
}

export default Menu;