function validateCourse({ curso, matriz, image }) {
  const errors = {};

  if (!curso || curso.trim() === "") {
    errors.curso = "Digite o nome do curso";
  }

  if (!matriz) {
    errors.matriz = "Selecione uma matriz";
  }

  if (!image) {
    errors.image = "Selecione uma imagem";
  }

  return errors;
}

export default validateCourse;
