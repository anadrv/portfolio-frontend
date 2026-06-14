import { useEffect, useState } from "react";
import { Pencil } from "lucide-react";

import { createCompetency } from "../services/competencyService";

import FilterSelect from "./FilterSelect";
import PrimaryButton from "./PrimaryButton";
import validateCompetency from "../validations/validateCompetency";

function CreateCompetencyModal({ courseId, onClose, onSuccess }) {
  const [codigoCompetencia, setCodigoCompetencia] = useState("");
  const [trimestre, setTrimestre] = useState("");
  const [matriz, setMatriz] = useState("");
  const [nomeCompetencia, setNomeCompetencia] = useState("");
  const [linkPlanner, setLinkPlanner] = useState("");
  const [teachingPlanLink, setTeachingPlanLink] = useState("");

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") onClose();
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  async function handleSave() {
    setSuccessMessage("");
    setErrorMessage("");

    const validationErrors = validateCompetency({
      trimester: trimestre,
      matriz: matriz,
      competencyCode: codigoCompetencia,
      subjectName: nomeCompetencia,
      plannerLink: linkPlanner,
      teachingPlanLink,
    });

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setErrorMessage("Preencha todos os campos obrigatórios");
      return;
    }

    try {
      await createCompetency({
        name_competency: nomeCompetencia,
        course_id: courseId,
        code_competency: codigoCompetencia,

        planner_link: linkPlanner,
        teaching_plan_link: teachingPlanLink,

        trimestre,
        matriz_competency: matriz,
      });

      setSuccessMessage("Competência criada com sucesso!");

      onSuccess?.();

      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (error) {
      console.error(error);

      setErrorMessage("Erro ao criar competência no servidor");
    }
  }

  function clearFieldError(field) {
    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));

    setErrorMessage("");
  }

  const inputClass = "w-full mt-1 p-2 rounded bg-white text-background text-sm";

  const fieldWrapper = "mb-4";

  const errorClass = "text-red-200 text-xs mt-1";

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <article
        role="dialog"
        className="bg-background max-w-lg w-full m-4 rounded-lg p-6 md:p-12 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <Pencil size={18} />
          CADASTRAR COMPETÊNCIA
        </h2>

        <section className="flex gap-2 mb-4">
          <div className="flex-1">
            <FilterSelect
              label="Trimestre"
              options={[
                {
                  label: "1ª Trimestre",
                  value: "1ª Trimestre",
                },
                {
                  label: "2ª Trimestre",
                  value: "2ª Trimestre",
                },
                {
                  label: "3ª Trimestre",
                  value: "3ª Trimestre",
                },
                {
                  label: "4ª Trimestre",
                  value: "4ª Trimestre",
                },
                {
                  label: "1ª Semestre",
                  value: "1ª Semestre",
                },
                {
                  label: "2ª Semestre",
                  value: "2ª Semestre",
                },
              ]}
              value={trimestre}
              onChange={(value) => {
                setTrimestre(value);
                clearFieldError("trimester");
              }}
            />

            {errors.trimester && (
              <p className={errorClass}>{errors.trimester}</p>
            )}
          </div>

          <div className="mb-2">
            <FilterSelect
              label="Matriz"
              options={[
                {
                  label: "Matriz 62",
                  value: "62",
                },
                {
                  label: "Matriz 63",
                  value: "63",
                },
              ]}
              value={matriz}
              onChange={(value) => {
                setMatriz(value);
                clearFieldError("matriz");
              }}
            />

            {errors.matriz && <p className={errorClass}>{errors.matriz}</p>}
          </div>
        </section>

        <div className={fieldWrapper}>
          <label className="text-sm">Nome da competência:</label>

          <input
            className={inputClass}
            value={nomeCompetencia}
            onChange={(e) => {
              setNomeCompetencia(e.target.value);
              clearFieldError("subjectName");
            }}
          />

          {errors.subjectName && (
            <p className={errorClass}>{errors.subjectName}</p>
          )}
        </div>

        <div className={fieldWrapper}>
          <label className="text-sm">Código da competência:</label>

          <input
            className={inputClass}
            value={codigoCompetencia}
            onChange={(e) => {
              setCodigoCompetencia(e.target.value);
              clearFieldError("competencyCode");
            }}
          />

          {errors.competencyCode && (
            <p className={errorClass}>{errors.competencyCode}</p>
          )}
        </div>

        <div className={fieldWrapper}>
          <label className="text-sm">Link do Planner:</label>

          <input
            className={inputClass}
            value={linkPlanner}
            onChange={(e) => {
              setLinkPlanner(e.target.value);
              clearFieldError("plannerLink");
            }}
          />

          {errors.plannerLink && (
            <p className={errorClass}>{errors.plannerLink}</p>
          )}
        </div>

        <div className={fieldWrapper}>
          <label className="text-sm">Link do Plano de ensino:</label>

          <input
            className={inputClass}
            value={teachingPlanLink}
            onChange={(e) => {
              setTeachingPlanLink(e.target.value);
              clearFieldError("teachingPlanLink");
            }}
          />

          {errors.teachingPlanLink && (
            <p className={errorClass}>{errors.teachingPlanLink}</p>
          )}
        </div>

        <div className="flex justify-between mt-6">
          <button onClick={onClose} className="hover:underline">
            Cancelar
          </button>

          <PrimaryButton onClick={handleSave}>Confirmar</PrimaryButton>
        </div>

        {successMessage && (
          <p className="text-green-400 text-sm mt-4 text-center">
            {successMessage}
          </p>
        )}

        {errorMessage && (
          <p className="text-red-400 text-sm mt-4 text-center">
            {errorMessage}
          </p>
        )}
      </article>
    </div>
  );
}

export default CreateCompetencyModal;
