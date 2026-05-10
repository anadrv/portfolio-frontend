function validateSubject({
  course,
  trimester,
  subjectName,
  plannerLink,
  teachingPlanLink,
  statuses,
}) {
  const errors = {};

  if (!course) {
    errors.course = "Selecione um curso";
  }

  if (!trimester) {
    errors.trimester = "Selecione um trimestre";
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

  const hasOneStatus = Object.values(statuses || {}).some(
    (status) => status === true
  );

  if (!hasOneStatus) {
    errors.status = "Selecione pelo menos um status";
  }

  return errors;
}

export default validateSubject;