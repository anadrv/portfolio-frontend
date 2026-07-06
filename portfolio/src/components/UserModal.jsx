import { useEffect, useState } from "react";
import { Pencil, User } from "lucide-react";


import PrimaryButton from "./PrimaryButton";
import showFeedback from "../utils/showFeedback";
import { updateUserRole } from "../services/userService";

function UserModal({ id, name, role, onClose, reload }) {
  const [isEditing, setIsEditing] = useState(false);

  const [selectedRole, setSelectedRole] = useState("");
  const [initialRole, setInitialRole] = useState("");

  const [successMessage, setSuccessMessage] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setSelectedRole(role || "");
    setInitialRole(role || "");
  }, [role]);

  async function handleSave() {
    try {
      const token = localStorage.getItem("token");
      const roleIdMap = {
        ADMIN: 1,
        NITE: 2,
        COORDINATOR: 3,
        TEACHER: 4,
      };

      const roleId = roleIdMap[selectedRole];
      if (!roleId) {
        throw new Error("Cargo inválido selecionado");
      }

      await updateUserRole(id, roleId, token);

      setInitialRole(selectedRole);
      setIsEditing(false);
      setErrors({});

      showFeedback(setSuccessMessage, "Usuário atualizado com sucesso!");

      setTimeout(() => {
        reload?.();
        onClose?.();
      }, 1000);
    } catch (error) {
      console.error(error);

      setErrors({
        save: "Erro ao salvar usuário",
      });
    }
  }

  function translateRole(role) {
    const roles = {
      ADMIN: "Administrador",
      TEACHER: "Professor",
      COORDINATOR: "Coordenador",
      NITE: "NITE",
    };

    return roles[role] || role;
  }

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <article
        onClick={(e) => e.stopPropagation()}
        className="bg-background w-md rounded-lg p-12 text-white shadow-2xl"
      >
        {/* HEADER */}
        <header className="flex items-center mb-8 gap-6">
            <User size={24} />
          <h2 className="text-xl font-bold">Colaborador</h2>
        </header>

        {/* COLABORADOR */}
        <section className="mb-6">
          <p className="text-sm text-gray-300">Nome:</p>
          <p className="text-lg font-semibold">{name}</p>
        </section>

        {/* ROLE */}
        <section className="mb-8">
          <h3 className="text-sm text-gray-300 mb-3">Papel:</h3>{" "}
          {/* aqui pode ver outro nome em vez de papel*/}
          <div className="bg-white rounded-xl p-4 text-background flex items-center justify-between">
            {isEditing ? (
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm"
              >
                <option value="ADMIN">Administrador</option>
                <option value="TEACHER">Professor</option>
                <option value="COORDINATOR">Coordenador</option>
                <option value="NITE">NITE</option>
              </select>
            ) : (
              <p className="font-semibold">{translateRole(selectedRole)}</p>
            )}
          </div>
        </section>

        {/* FOOTER */}
        <footer className="flex items-center justify-between gap-4">
          {isEditing ? (
            <>
              <button
                onClick={() => setIsEditing(false)}
                className="text-sm hover:underline cursor-pointer"
              >
                Cancelar
              </button>

              <PrimaryButton onClick={handleSave}>
                Salvar alterações
              </PrimaryButton>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center justify-center gap-2 flex-1 text-sm border border-white py-2 rounded-lg hover:bg-white/10 cursor-pointer"
            >
              <Pencil size={16} />
              Editar
            </button>
          )}
        </footer>

        {/* FEEDBACK */}
        {successMessage && (
          <p className="text-green-400 text-sm mt-4 text-center font-semibold">
            {successMessage}
          </p>
        )}

        {errors.save && (
          <p className="text-red-400 text-sm mt-4 text-center font-semibold">
            {errors.save}
          </p>
        )}
      </article>
    </div>
  );
}

export default UserModal;
