import { useState } from "react";
import { Pencil } from "lucide-react";

import validateSubject from "../validations/validateSubject";
import showFeedback from "../utils/showFeedback";

import FilterInfo from "./FilterInfo";
import PrimaryButton from "./PrimaryButton";
import FilterSelect from "./FilterSelect";

import currentUser from "../mock/currentUser";

function InfoModal({
  onClose,
  title,
  icon,
  matriz,
  trimestre,
}) {
  const [isEditing, setIsEditing] = useState(false);

  const [selectedTrimestre, setSelectedTrimestre] =
    useState(trimestre);

  const [statuses, setStatuses] = useState({
    validado: true,
    customizar: false,
    canvas: false,
    integracao: false,
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

 const canEditInfo =
  currentUser.permissions.includes(
    "editar_documentos"
  );

const canEditStatus =
  currentUser.permissions.includes(
    "editar_status"
  ) ||
  currentUser.permissions.includes(
    "validar_documentos"
  );

  function handleSave() {
    const validationErrors = validateSubject({
      trimestre: selectedTrimestre,
      statuses,
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsEditing(false);

    showFeedback(
      setSuccessMessage,
      "Dados atualizados com sucesso!"
    );
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
        <header className="flex items-center justify-between mb-8 gap-6">
          <div className="flex items-center gap-3">
            <img
              src={icon}
              alt={`Ícone do ${title}`}
              className="w-8 h-8"
            />

            <h2 className="text-xl font-bold">
              {title}
            </h2>
          </div>
        </header>

        <section className="flex items-center gap-4 mb-6 justify-between">
          {isEditing && canEditInfo ? (
            <div className="w-full">
              <FilterSelect
                label="Trimestre"
                options={[
                  "1º",
                  "2º",
                  "3º",
                  "4º",
                ]}
                value={selectedTrimestre}
                onChange={setSelectedTrimestre}
                textSize="text-sm"
              />

              {errors.trimestre && (
                <p className="text-red-400 text-xs mt-2">
                  {errors.trimestre}
                </p>
              )}
            </div>
          ) : (
            <div className="flex gap-4">
              <FilterInfo>
                Matriz {matriz}
              </FilterInfo>

              <FilterInfo>
                {selectedTrimestre} Trimestre
              </FilterInfo>
            </div>
          )}
        </section>

        <section className="mb-8">
          <h3 className="text-sm font-semibold mb-3">
            Status
          </h3>

          <div className="bg-white rounded-xl p-4 text-background flex flex-col gap-4">
            <label className="flex items-center gap-2 text-sm">
              {isEditing && canEditStatus && (
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
                className={
                  statuses.validado
                    ? "text-accent"
                    : "text-gray-400"
                }
              >
                {statuses.validado ? "✓" : "X"}
              </span>

              <p>Validado pela coordenação</p>
            </label>

            <label className="flex items-center gap-2 text-sm">
              {isEditing && canEditStatus && (
                <input
                  type="checkbox"
                  checked={statuses.customizar}
                  onChange={() =>
                    setStatuses({
                      ...statuses,
                      customizar:
                        !statuses.customizar,
                    })
                  }
                />
              )}

              <span
                className={
                  statuses.customizar
                    ? "text-accent"
                    : "text-gray-400"
                }
              >
                {statuses.customizar ? "✓" : "X"}
              </span>

              <p>Liberado para customizar</p>
            </label>

            <label className="flex items-center gap-2 text-sm">
              {isEditing && canEditStatus && (
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
                className={
                  statuses.canvas
                    ? "text-accent"
                    : "text-gray-400"
                }
              >
                {statuses.canvas ? "✓" : "X"}
              </span>

              <p>Disponível no Canvas</p>
            </label>

            <label className="flex items-center gap-2 text-sm">
              {isEditing && canEditStatus && (
                <input
                  type="checkbox"
                  checked={statuses.integracao}
                  onChange={() =>
                    setStatuses({
                      ...statuses,
                      integracao:
                        !statuses.integracao,
                    })
                  }
                />
              )}

              <span
                className={
                  statuses.integracao
                    ? "text-accent"
                    : "text-gray-400"
                }
              >
                {statuses.integracao ? "✓" : "X"}
              </span>

              <p>Integrado ao RM-Canvas</p>
            </label>
          </div>
        </section>

        <footer className="flex items-center justify-between gap-4">
          {(canEditInfo || canEditStatus) &&
            (isEditing ? (
              <>
                <button
                  onClick={() =>
                    setIsEditing(false)
                  }
                  className="text-sm hover:underline underline-offset-4 transition cursor-pointer"
                >
                  Cancelar
                </button>

                <PrimaryButton
                  textSize="text-sm"
                  onClick={handleSave}
                >
                  Salvar alterações
                </PrimaryButton>
              </>
            ) : (
              <button
                onClick={() =>
                  setIsEditing(true)
                }
                className="flex items-center justify-center gap-2 flex-1 text-sm border border-white py-2 rounded-lg hover:bg-white/10 transition cursor-pointer"
              >
                <Pencil size={16} />

                {canEditInfo
                  ? "Editar status ou trimestre"
                  : "Editar status"}
              </button>
            ))}
        </footer>

        {successMessage && (
          <p className="text-green-400 text-sm mt-4 text-center font-semibold">
            {successMessage}
          </p>
        )}
      </article>
    </div>
  );
}

export default InfoModal;