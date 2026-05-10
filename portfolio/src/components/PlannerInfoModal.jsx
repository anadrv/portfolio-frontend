import { useState } from "react";
import { Pencil } from "lucide-react";
import plannerIcon from "../assets/icons/planner-white-icon.png";
import FilterInfo from "./FilterInfo";
import PrimaryButton from "./PrimaryButton";
import FilterSelect from "./FilterSelect";

function PlannerInfoModal({ onClose }) {
  const [isEditing, setIsEditing] = useState(false);

  const [trimestre, setTrimestre] = useState("1º Trimestre");

  const [statuses, setStatuses] = useState({
    validado: true,
    customizar: false,
    canvas: false,
    integracao: false,
  });

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <article
        onClick={(e) => e.stopPropagation()}
        className="bg-background w-md rounded-lg p-12 text-white shadow-2xl"
      >
        <header className="flex items-center justify-between mb-8 gap-6">
          <div className="flex items-center gap-3">
            <img src={plannerIcon} alt="Ícone do planner" className="w-8 h-8" />

            <h2 className="text-xl font-bold">PLANNER</h2>
          </div>
        </header>

        <section className="flex items-center gap-4 mb-6 justify-between">
          {isEditing ? (
            <FilterSelect
              label="Trimestre"
              options={[
                "1º Trimestre",
                "2º Trimestre",
                "3º Trimestre",
                "4º Trimestre",
              ]}
              value={trimestre}
              onChange={setTrimestre}
              textSize="text-sm"
            />
          ) : (
            <FilterInfo>{trimestre}</FilterInfo>
          )}
        </section>

        <section className="mb-8">
          <h3 className="text-sm font-semibold mb-3">Status</h3>

          <div className="bg-white rounded-xl p-4 text-background flex flex-col gap-4">
            <label className="flex items-center gap-2 text-sm">
              {isEditing && (
                <input
                  type="checkbox"
                  checked={statuses.validado}
                  onChange={() =>
                    setStatuses({
                      ...statuses,
                      validado: !statuses.validado,
                    })
                  }
                />
              )}

              <span
                className={statuses.validado ? "text-accent" : "text-gray-400"}
              >
                {statuses.validado ? "✓" : "X"}
              </span>

              <p>Validado pela coordenação</p>
            </label>

            <label className="flex items-center gap-2 text-sm">
              {isEditing && (
                <input
                  type="checkbox"
                  checked={statuses.customizar}
                  onChange={() =>
                    setStatuses({
                      ...statuses,
                      customizar: !statuses.customizar,
                    })
                  }
                />
              )}

              <span
                className={
                  statuses.customizar ? "text-accent" : "text-gray-400"
                }
              >
                {statuses.customizar ? "✓" : "X"}
              </span>

              <p>Liberado para customizar</p>
            </label>

            <label className="flex items-center gap-2 text-sm">
              {isEditing && (
                <input
                  type="checkbox"
                  checked={statuses.canvas}
                  onChange={() =>
                    setStatuses({
                      ...statuses,
                      canvas: !statuses.canvas,
                    })
                  }
                />
              )}

              <span
                className={statuses.canvas ? "text-accent" : "text-gray-400"}
              >
                {statuses.canvas ? "✓" : "X"}
              </span>

              <p>Disponível no Canvas</p>
            </label>

            <label className="flex items-center gap-2 text-sm">
              {isEditing && (
                <input
                  type="checkbox"
                  checked={statuses.integracao}
                  onChange={() =>
                    setStatuses({
                      ...statuses,
                      integracao: !statuses.integracao,
                    })
                  }
                />
              )}

              <span
                className={
                  statuses.integracao ? "text-accent" : "text-gray-400"
                }
              >
                {statuses.integracao ? "✓" : "X"}
              </span>

              <p>Integrado ao RM-Canvas</p>
            </label>
          </div>
        </section>

        <footer className="flex items-center justify-between gap-4">
          {isEditing ? (
            <>
              <button
                onClick={() => setIsEditing(false)}
                className="text-sm hover:underline underline-offset-4 transition cursor-pointer"
              >
                Cancelar
              </button>
              <PrimaryButton
                textSize="text-sm"
                onClick={() => setIsEditing(false)}
              >
                Salvar alterações
              </PrimaryButton>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center justify-center gap-2 flex-1 text-sm border border-white py-2 rounded-lg hover:bg-white/10 transition cursor-pointer"
            >
              <Pencil size={16} />
              Editar status ou trimestre
            </button>
          )}
        </footer>
      </article>
    </div>
  );
}

export default PlannerInfoModal;
