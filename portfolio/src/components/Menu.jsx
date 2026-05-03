import { NavLink } from "react-router-dom";
import { User } from "lucide-react";

function Menu() {
  return (
    <header className="bg-primary text-white rounded-lg">
      <nav
        className="max-w-7xl mx-auto p-5 flex items-center justify-between"
        aria-label="Navegação principal"
      >
      
        <h1 className="text-lg font-bold">
          <NavLink to="/">Logo</NavLink>
        </h1>

        
        <ul className="hidden md:flex items-center font-semibold text-lg gap-10">
          <li>
            <NavLink to="/courses">Cursos</NavLink>
          </li>

          <li>
            <NavLink to="/notifications">Notificações</NavLink>
          </li>

          <li>
            <NavLink to="/subjects">Configurações</NavLink>
          </li>

          <li>
            <NavLink
              to="/profile"
              aria-label="Perfil do usuário"
              className="p-2 rounded-full hover:bg-white/20 transition flex items-center"
            >
              <User size={24} />
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Menu;