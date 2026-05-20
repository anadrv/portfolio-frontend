import { useEffect, useState } from "react";
import { Pencil, Plus } from "lucide-react";

import { getCourses } from "../services/courseService";
import {
  createCompetency,
  updateTrimestre,
  updateFlagCustomizar,
  updateFlagCanvas,
  updateCompetencyCore,
} from "../services/competencyService";

import FilterSelect from "./FilterSelect";
import PrimaryButton from "./PrimaryButton";
import validateSubject from "../validations/validateSubject";

function CompetencyModal({
  mode = "create",
  onClose,
  onSuccess,
  existingData,
}) {
  const isEdit = mode === "edit";

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
      const data = await getCourses();
      setCourses(data);
    }

    loadCourses();
  }, []);

  // preencher dados no EDIT
useEffect(() => {
  if (!isEdit || !existingData) return;

  setCursoSelecionado(String(existingData.course_id || ""));
  setCodigoCompetencia(existingData.code_competency || "");
  setTrimestre(existingData.trimestre || "");
  setNomeCompetencia(existingData.name_competency || "");
  setLinkPlanner(existingData.planner_link || "");
  setTeachingPlanLink(existingData.teaching_plan_link || "");
}, [isEdit, existingData]);

  function resetForm() {
    setCursoSelecionado("");
    setCodigoCompetencia("");
    setTrimestre("");
    setNomeCompetencia("");
    setLinkPlanner("");
    setTeachingPlanLink("");
  }


async function handleSave() {
  setSuccessMessage("");
  setErrorMessage("");

  try {
    if (isEdit) {
      const id = existingData.id_competency;

      const promises = [];

      if (nomeCompetencia || cursoSelecionado || codigoCompetencia) {
        promises.push(
          updateCompetencyCore({
            id_competency: id,
            name_competency: nomeCompetencia,
            course_id: cursoSelecionado,
            code_competency: codigoCompetencia,
          })
        );
      }

      
      if (trimestre) {
        promises.push(updateTrimestre(id, trimestre));
      }

     
      if (linkPlanner) {
        promises.push(updateFlagCustomizar(id, linkPlanner));
      }

      if (teachingPlanLink) {
        promises.push(updateFlagCanvas(id, teachingPlanLink));
      }

      await Promise.all(promises);

      setSuccessMessage("Competência atualizada com sucesso!");
    } else {

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
      resetForm();
    }

    onSuccess?.();

    setTimeout(() => {
      onClose();
    }, 800);
  } catch (error) {
    console.error(error);
    setErrorMessage(
      isEdit
        ? "Erro ao atualizar competência"
        : "Erro ao criar competência"
    );
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
        className="bg-background max-w-lg w-full m-4 rounded-lg p-6 md:p-12 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          {isEdit ? <Pencil size={18} /> : <Plus size={18} />}

          {isEdit ? "EDITAR COMPETÊNCIA" : "CADASTRAR COMPETÊNCIA"}
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
              value={String(cursoSelecionado)}
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

        {/* NOME */}
        <div className={fieldWrapper}>
          <label className="text-sm">Nome da competência</label>
          <input
            className={inputClass}
            value={nomeCompetencia}
            onChange={(e) => setNomeCompetencia(e.target.value)}
          />
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

          <PrimaryButton onClick={handleSave}>
            {isEdit ? "Salvar alterações" : "Confirmar"}
          </PrimaryButton>
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

export default CompetencyModal;