import { useEffect, useState } from "react";
import { Pencil } from "lucide-react";
import FilterSelect from "./FilterSelect";
import PrimaryButton from "./PrimaryButton";
import validateSubject from "../validations/validateSubject";

function CreateSubjectModal({ onClose }) {
  const [curso, setCurso] = useState("");
  const [trimestre, setTrimestre] = useState("");
  const [nomeCompetencia, setNomeCompetencia] = useState("");
  const [linkPlanner, setLinkPlanner] = useState("");
  const [teachingPlanLink, setTeachingPlanLink] = useState("");
  const [errors, setErrors] = useState({});

  function handleSave() {
    const validationErrors = validateSubject({
      course: curso,
      trimester: trimestre,
      subjectName: nomeCompetencia,
      plannerLink: linkPlanner,
      teachingPlanLink,
      statuses: {},
    });

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    console.log({
      course: curso,
      trimester,
      subjectName: nomeCompetencia,
      plannerLink: linkPlanner,
      teachingPlanLink,
    });
  }

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Classes
  const inputClass = "w-full mt-1 p-2 rounded bg-white text-background text-sm";
  const labelClass = "block text-md font-semibold";
  const subLabelClass = "text-xs text-gray-200";
  const fieldWrapper = "mb-4";
  const errorClass = "text-red-200 text-xs mt-1";

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <article
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="relative bg-background max-w-lg w-full m-4 md:m-0 rounded-lg p-6 md:p-12 text-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2
          id="modal-title"
          className="text-xl font-semibold mb-6 flex items-center gap-2"
        >
          <Pencil size={18} />
          CADASTRAR COMPETÊNCIA
        </h2>

        {/* selects */}
        <section className="flex gap-2 w-full mb-6 font-semibold">
          <div className="flex-2">
            <FilterSelect
              label="Selecionar curso"
              options={["Sistemas de Informação", "Arquitetura e Urbanismo"]}
              value={curso}
              onChange={setCurso}
            />
          </div>

          <div className="flex-1">
            <FilterSelect
              label="Trimestre"
              options={["1º", "2º", "3º", "4º"]}
              value={trimestre}
              onChange={setTrimestre}
            />
          </div>
        </section>

        {/* Nome da competência */}
        <div className={fieldWrapper}>
          <label htmlFor="competencia" className="block text-sm mb-2">
            Nome da competência:
          </label>

          <input
            id="competencia"
            name="competencia"
            type="text"
            value={nomeCompetencia}
            onChange={(e) => {
              setNomeCompetencia(e.target.value);

              setErrors((prev) => ({
                ...prev,
                subjectName: "",
              }));
            }}
            className={inputClass}
          />

          {errors.subjectName && (
            <p className={errorClass}>{errors.subjectName}</p>
          )}
        </div>

        {/* Planner */}
        <div className={fieldWrapper}>
          <label htmlFor="planner" className={labelClass}>
            Planner
          </label>

          <span className={subLabelClass}>Link de acesso:</span>

          <input
            id="planner"
            name="planner"
            type="url"
            value={linkPlanner}
            onChange={(e) => {
              setLinkPlanner(e.target.value);

              setErrors((prev) => ({
                ...prev,
                plannerLink: "",
              }));
            }}
            className={inputClass}
          />

          {errors.plannerLink && (
            <p className={errorClass}>{errors.plannerLink}</p>
          )}
        </div>

        {/* Plano de ensino */}
        <div className={fieldWrapper}>
          <label htmlFor="plano" className={labelClass}>
            Plano de ensino
          </label>

          <span className={subLabelClass}>Link de acesso:</span>

          <input
            id="plano"
            name="plano"
            type="url"
            value={teachingPlanLink}
            onChange={(e) => {
              setTeachingPlanLink(e.target.value);

              setErrors((prev) => ({
                ...prev,
                teachingPlanLink: "",
              }));
            }}
            className={inputClass}
          />

          {errors.teachingPlanLink && (
            <p className={errorClass}>{errors.teachingPlanLink}</p>
          )}
        </div>

        {/* ações */}
        <div className="flex justify-between items-center mt-6">
          <button onClick={onClose} className="text-sm hover:underline cursor-pointer">
            Cancelar
          </button>

          <PrimaryButton textSize="text-sm" onClick={handleSave}>
            Confirmar
          </PrimaryButton>
        </div>
      </article>
    </div>
  );
}

export default CreateSubjectModal;
