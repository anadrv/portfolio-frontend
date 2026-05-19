import { useState, useEffect } from "react";
import { Pencil } from "lucide-react";

import {
  updateTrimestre,
  updateFlagCoordenacao,
  updateFlagCustomizar,
  updateFlagCanvas,
  updateFlagGestao,
} from "../services/competencyService";

import { hasPermission, hasRole } from "../utils/permissions";

import showFeedback from "../utils/showFeedback";

import FilterInfo from "./FilterInfo";
import PrimaryButton from "./PrimaryButton";
import FilterSelect from "./FilterSelect";

function InfoModal({
  id_academicD,
  onClose,
  title,
  icon,
  matriz,
  trimestre,

  flag_validacao_coordenacao,
  flag_liberado_customizar,
  flag_disponivel_canva,
  flag_integrado_rm,

  reload,
}) {
  const isProfessor = hasRole("PROFESSOR");
  const [isEditing, setIsEditing] = useState(false);

  const [selectedTrimestre, setSelectedTrimestre] = useState("");
  const [statuses, setStatuses] = useState({});

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    setSelectedTrimestre(trimestre || "");

    setStatuses({
      validado: !!flag_validacao_coordenacao,
      customizar: !!flag_liberado_customizar,
      canvas: !!flag_disponivel_canva,
      integracao: !!flag_integrado_rm,
    });
  }, [
    trimestre,
    flag_validacao_coordenacao,
    flag_liberado_customizar,
    flag_disponivel_canva,
    flag_integrado_rm,
    id_academicD,
  ]);

  async function handleSave() {
    try {
      await updateTrimestre(id_academicD, selectedTrimestre);

      await updateFlagCoordenacao(id_academicD, statuses.validado);
      await updateFlagCustomizar(id_academicD, statuses.customizar);
      await updateFlagCanvas(id_academicD, statuses.canvas);
      await updateFlagGestao(id_academicD, statuses.integracao);

      setIsEditing(false);
      setErrors({});

      showFeedback(setSuccessMessage, "Dados atualizados com sucesso!");
setTimeout(async () => {
  await reload?.();
  onClose?.();
}, 1000);
    } catch (error) {
      console.error("Erro ao salvar:", error);
      setErrors({ save: "Erro ao salvar dados" });
    }
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
            <img src={icon} alt="" className="w-8 h-8" />
            <h2 className="text-xl font-bold">{title}</h2>
          </div>
        </header>

        <section className="flex items-center gap-4 mb-6 justify-between">
          {isEditing && !isProfessor ? (
            <div className="w-full">
              <FilterSelect
                label="Trimestre"
                options={[
                  "1ª Trimestre",
                  "2ª Trimestre",
                  "3ª Trimestre",
                  "4ª Trimestre",
                ]}
                value={selectedTrimestre}
                onChange={setSelectedTrimestre}
                textSize="text-sm"
              />

              {errors.trimestre && (
                <p className="text-red-400 text-xs mt-2">{errors.trimestre}</p>
              )}
            </div>
          ) : (
            <div className="flex gap-4">
              <FilterInfo>{matriz}</FilterInfo>
              <FilterInfo>{selectedTrimestre}</FilterInfo>
            </div>
          )}
        </section>

        <section className="mb-8">
          <h3 className="text-sm font-semibold mb-3">Status</h3>

          <div className="bg-white rounded-xl p-4 text-background flex flex-col gap-4">
            {/* PROFESSOR */}
            {isProfessor ? (
              <label className="flex items-center gap-2 text-sm">
                {isEditing && (
                  <input
                    type="checkbox"
                    checked={statuses.integracao}
                    onChange={() =>
                      setStatuses((prev) => ({
                        ...prev,
                        integracao: !prev.integracao,
                      }))
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

                <p>
                  {statuses.integracao ? "Concluído" : "Marcar como concluído"}
                </p>
              </label>
            ) : (
              <>
                {/* ADMIN / GESTÃO */}

                <label className="flex items-center gap-2 text-sm">
                  {isEditing && (
                    <input
                      type="checkbox"
                      checked={statuses.validado}
                      onChange={() =>
                        setStatuses((prev) => ({
                          ...prev,
                          validado: !prev.validado,
                        }))
                      }
                    />
                  )}

                  <span
                    className={
                      statuses.validado ? "text-accent" : "text-gray-400"
                    }
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
                        setStatuses((prev) => ({
                          ...prev,
                          customizar: !prev.customizar,
                        }))
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
                        setStatuses((prev) => ({
                          ...prev,
                          canvas: !prev.canvas,
                        }))
                      }
                    />
                  )}

                  <span
                    className={
                      statuses.canvas ? "text-accent" : "text-gray-400"
                    }
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
                        setStatuses((prev) => ({
                          ...prev,
                          integracao: !prev.integracao,
                        }))
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
              </>
            )}
          </div>
        </section>

        <footer className="flex items-center justify-between gap-4">
          {isEditing ? (
            <>
              <button
                onClick={() => setIsEditing(false)}
                className="text-sm hover:underline"
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
              className="flex items-center justify-center gap-2 flex-1 text-sm border border-white py-2 rounded-lg hover:bg-white/10"
            >
              <Pencil size={16} />

              {hasRole("PROFESSOR") ? "Editar status" : "Editar informações"}
            </button>
          )}
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
