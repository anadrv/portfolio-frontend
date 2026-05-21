const API_URL = "http://localhost:3000";

export async function getCourses() {
  const response = await fetch(`${API_URL}/courses`);

  if (!response.ok) {
    throw new Error("Erro ao buscar cursos");
  }

  return await response.json();
}

export async function createCourse(courseData) {
  const formData = new FormData();

  formData.append("name_courses", courseData.curso);
  formData.append("matrix_courses", courseData.matriz);
  formData.append("image", courseData.image.file);

  const response = await fetch(`${API_URL}/courses`, {
    method: "POST",
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Erro ao criar curso");
  }

  return data;
}
