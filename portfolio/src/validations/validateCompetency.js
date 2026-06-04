function validateCompetency({
  trimester,
  matriz,
  competencyCode,
  subjectName,
  plannerLink,
  teachingPlanLink,
}) {
  const errors = {};

  if (!trimester) {
    errors.trimester = "Selecione um trimestre";
  }

  if (!matriz) {
    errors.matriz = "Selecione uma matriz";
  }

  if (!competencyCode || competencyCode.trim() === "") {
    errors.competencyCode = "Informe o código da competência";
  }

  if (!subjectName || subjectName.trim() === "") {
    errors.subjectName = "Informe o nome da competência";
  }

  if (!plannerLink || plannerLink.trim() === "") {
    errors.plannerLink = "Informe o link do planner";
  }

  if (!teachingPlanLink || teachingPlanLink.trim() === "") {
    errors.teachingPlanLink = "Informe o link do plano de ensino";
  }

  return errors;
}

export default validateCompetency;