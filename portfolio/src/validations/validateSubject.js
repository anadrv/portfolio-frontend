function validateSubject({ trimestre, statuses }) {
  const errors = {};

  if (!trimestre) {
    errors.trimestre = "Selecione um trimestre";
  }

  const hasOneStatus = Object.values(statuses).some(
    (status) => status === true
  );

  if (!hasOneStatus) {
    errors.status = "Selecione pelo menos um status";
  }

  return errors;
}

export default validateSubject;