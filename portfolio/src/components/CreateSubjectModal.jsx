import { useEffect, useState } from "react";
import { Pencil } from "lucide-react";

import { getCourses } from "../services/courseService";
import { createCompetency } from "../services/competencyService";

import FilterSelect from "./FilterSelect";
import PrimaryButton from "./PrimaryButton";
import validateSubject from "../validations/validateSubject";

function CreateSubjectModal({ onClose, onSuccess }) {
  const [courses, setCourses] = useState([]);
  const [cursoSelecionado, setCursoSelecionado] = useState("");

  const [codigoCompetencia, setCodigoCompetencia] = useState("");
  const [trimestre, setTrimestre] = useState("");
  const [nomeCompetencia, setNomeCompetencia] = useState("");
  const [linkPlanner, setLinkPlanner] = useState("");
  const [teachingPlanLink, setTeachingPlanLink] = useState("");

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadCourses() {
      try {
        const data = await getCourses();
        setCourses(data);
      } catch (err) {
        console.error("Erro ao carregar cursos:", err);
      }
    }

    loadCourses();
  }, []);

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

    const validationErrors = validateSubject({
      course: cursoSelecionado,
      trimester: trimestre,
      subjectName: nomeCompetencia,
      plannerLink: linkPlanner,
      teachingPlanLink,
      statuses: {},
    });

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setErrorMessage("Preencha todos os campos obrigatórios");
      return;
    }

    try {
      await createCompetency({
        name_competency: nomeCompetencia,
        course_id: cursoSelecionado,
        code_competency: codigoCompetencia,

        planner_link: linkPlanner,
        teaching_plan_link: teachingPlanLink,

        trimestre,
        matriz: "Matriz - 62",
      });

      setSuccessMessage("Competência criada com sucesso!");
      onSuccess?.();

      setTimeout(() => {
        onClose();
      }, 800);
    } catch (error) {
      console.error(error);
      setErrorMessage("Erro ao criar competência no servidor");
    }
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

        {/* CURSO + TRIMESTRE */}
        <section className="flex gap-2 mb-6">
          <div className="flex-1">
            <FilterSelect
              label="Selecionar curso"
              options={courses.map((c) => ({
                label: c.name_courses,
                value: c.id_courses,
              }))}
              value={cursoSelecionado}
              onChange={setCursoSelecionado}
            />
          </div>

          <div className="flex-1">
            <FilterSelect
              label="Trimestre"
              options={[
                "1ª Trimestre",
                "2ª Trimestre",
                "3ª Trimestre",
                "4ª Trimestre",
              ]}
              value={trimestre}
              onChange={setTrimestre}
            />
          </div>
        </section>

        {/* NOME COMPETÊNCIA */}
        <div className={fieldWrapper}>
          <label className="text-sm">Nome da competência</label>
          <input
            className={inputClass}
            value={nomeCompetencia}
            onChange={(e) => setNomeCompetencia(e.target.value)}
          />
          {errors.subjectName && (
            <p className={errorClass}>{errors.subjectName}</p>
          )}
        </div>

        {/* CÓDIGO */}
        <div className={fieldWrapper}>
          <label className="text-sm">Código da competência</label>
          <input
            className={inputClass}
            value={codigoCompetencia}
            onChange={(e) => setCodigoCompetencia(e.target.value)}
          />
        </div>

        {/* PLANNER */}
        <div className={fieldWrapper}>
          <label className="text-sm">Planner</label>
          <input
            className={inputClass}
            value={linkPlanner}
            onChange={(e) => setLinkPlanner(e.target.value)}
          />
        </div>

        {/* PLANO ENSINO */}
        <div className={fieldWrapper}>
          <label className="text-sm">Plano de ensino</label>
          <input
            className={inputClass}
            value={teachingPlanLink}
            onChange={(e) => setTeachingPlanLink(e.target.value)}
          />
        </div>

        {/* AÇÕES */}
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
        <p className="text-red-400 text-sm mt-4 text-center">{errorMessage}</p>
      )}
      </article>
      
    </div>
  );
}

export default CreateSubjectModal;
