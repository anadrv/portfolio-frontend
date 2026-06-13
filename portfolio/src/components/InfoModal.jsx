import { useState, useEffect } from "react";
import { Pencil } from "lucide-react";

import {
  updateTrimestre,
  updateFlagCoordenacao,
  updateFlagCustomizar,
  updateFlagCanvas,
  updateFlagGestao,
  updateFlagPreenchido,
  updateFlagNecessitaRevisao,
  updateFlagEmPreenchimento,
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

  flag_preenchido,
  flag_necessita_revisao,
  flag_validacao_coordenacao,
  flag_liberado_customizar,
  flag_disponivel_canva,
  flag_integrado_rm,
  flag_em_preenchimento,

  reload,
}) {
  const isProfessor = hasRole("TEACHER");
  const isCoordinator = hasRole("COORDINATOR");

  const [isEditing, setIsEditing] = useState(false);

  const [selectedTrimestre, setSelectedTrimestre] = useState("");
  const [statuses, setStatuses] = useState({});

  const [initialStatuses, setInitialStatuses] = useState({});

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    setSelectedTrimestre(trimestre || "");

    const currentStatuses = {
      em_preenchimento: !!flag_em_preenchimento,
      preenchido: !!flag_preenchido,
      revisao: !!flag_necessita_revisao,
      validado: !!flag_validacao_coordenacao,
      customizar: !!flag_liberado_customizar,
      canvas: !!flag_disponivel_canva,
      integracao: !!flag_integrado_rm,
    };

    setStatuses(currentStatuses);

    setInitialStatuses(currentStatuses);
  }, [
    trimestre,
    flag_em_preenchimento,
    flag_preenchido,
    flag_necessita_revisao,
    flag_validacao_coordenacao,
    flag_liberado_customizar,
    flag_disponivel_canva,
    flag_integrado_rm,
    id_academicD,
  ]);

  async function handleSave() {
    try {
      await updateTrimestre(id_academicD, selectedTrimestre);

      if (statuses.em_preenchimento !== initialStatuses.em_preenchimento) {
        await updateFlagEmPreenchimento(
          id_academicD,
          statuses.em_preenchimento,
        );
      }

      if (statuses.preenchido !== initialStatuses.preenchido) {
        await updateFlagPreenchido(id_academicD, statuses.preenchido);
      }

      if (statuses.revisao !== initialStatuses.revisao) {
        await updateFlagNecessitaRevisao(id_academicD, statuses.revisao);
      }

      if (statuses.validado !== initialStatuses.validado) {
        await updateFlagCoordenacao(id_academicD, statuses.validado);
      }

      if (statuses.customizar !== initialStatuses.customizar) {
        await updateFlagCustomizar(id_academicD, statuses.customizar);
      }

      if (statuses.canvas !== initialStatuses.canvas) {
        await updateFlagCanvas(id_academicD, statuses.canvas);
      }

      if (statuses.integracao !== initialStatuses.integracao) {
        await updateFlagGestao(id_academicD, statuses.integracao);
      }

      setIsEditing(false);

      setErrors({});

      showFeedback(setSuccessMessage, "Dados atualizados com sucesso!");

      setTimeout(async () => {
        await reload?.();
        onClose?.();
      }, 1000);
    } catch (error) {
      console.error("Erro ao salvar:", error);

      setErrors({
        save: "Erro ao salvar dados",
      });
    }
  }

  function renderStatus(key, label) {
    let canEdit = true;

    if (isProfessor) {
      canEdit = ["em_preenchimento", "preenchido"].includes(key);
    }

    if (isCoordinator) {
      canEdit = [
        "em_preenchimento",
        "preenchido",
        "revisao",
        "validado",
        "customizar",
      ].includes(key);
    }

    return (
      <label className="flex items-center gap-2 text-sm">
        {isEditing && canEdit && (
          <input
            type="checkbox"
            checked={statuses[key]}
            onChange={() =>
              setStatuses((prev) => ({
                ...prev,
                [key]: !prev[key],
              }))
            }
          />
        )}

        <span className={statuses[key] ? "text-accent" : "text-gray-400"}>
          {statuses[key] ? "✓" : "X"}
        </span>

        <p>{label}</p>
      </label>
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
                  {
                    label: "1° Trimestre",
                    value: "1",
                  },
                  {
                    label: "2° Trimestre",
                    value: "2",
                  },
                  {
                    label: "3° Trimestre",
                    value: "3",
                  },
                  {
                    label: "4° Trimestre",
                    value: "4",
                  },
                  {
                    label: "1° Semestre",
                    value: "5",
                  },
                  {
                    label: "2° Semestre",
                    value: "6",
                  },
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
              <FilterInfo>Matriz - {matriz}</FilterInfo>

              <FilterInfo>{selectedTrimestre}</FilterInfo>
            </div>
          )}
        </section>

        <section className="mb-8">
          <h3 className="text-sm font-semibold mb-3">Status</h3>

          <div className="bg-white rounded-xl p-4 text-background flex flex-col gap-4">
            {isProfessor && isEditing ? (
              <>
                {renderStatus("em_preenchimento", "Em andamento")}

                {renderStatus("preenchido", "Preenchido")}
              </>
            ) : (
              <>
                {renderStatus("em_preenchimento", "Em andamento")}

                {renderStatus("preenchido", "Preenchido")}

                {renderStatus("revisao", "Necessita revisão")}

                {renderStatus("validado", "Validado pela coordenação")}

                {renderStatus("customizar", "Liberado para customizar")}

                {renderStatus("canvas", "Disponível no Canvas")}

                {renderStatus("integracao", "Integrado ao RM-Canvas")}
              </>
            )}
          </div>
        </section>

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

              {hasRole("TEACHER") ? "Editar status" : "Editar informações"}
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
