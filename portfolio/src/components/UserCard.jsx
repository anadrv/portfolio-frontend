import { Pencil } from "lucide-react";

function UserCard({ name, role, active, onEdit, onClick, isAdmin }) {
  const roleLabels = {
    ADMIN: "Administrador",
    TEACHER: "Professor",
    COORDINATOR: "Coordenador",
    NITE: "NITE",
  };

  return (
    <div
      onClick={onClick}
      className={`bg-linear-to-r from-blue-500 to-blue-400 rounded-xl shadow-[0_4px_0_#d1d5db] p-5 h-20 w-full flex items-center justify-between transition-transform duration-300 hover:scale-[1.02] cursor-pointer ${
        !active ? "opacity-50" : ""
      }`}
    >
      <div className="min-w-0">
        <h2 className="text-white text-md font-semibold truncate">{name}</h2>
        <p className="text-white/80 text-xs mt-1">
          {roleLabels[role] || role}
          {!active && " · Inativo"}
        </p>
      </div>

      {isAdmin && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit?.();
          }}
          className="p-2 rounded-full hover:bg-white/15 transition cursor-pointer"
        >
          <Pencil size={17} className="text-white" />
        </button>
      )}
    </div>
  );
}

export default UserCard;