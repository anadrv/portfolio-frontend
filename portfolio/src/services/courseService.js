const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

function getAuthHeaders(isFormData = false) {
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  if (!isFormData) {
    headers["Content-Type"] = "application/json";
  }

  return headers;
}

export async function getCourses() {
  const response = await fetch(`${API_URL}/courses`, {
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error("Erro ao buscar cursos");
  }

  return await response.json();
}

export async function getCoursesByUser(userId) {
  const response = await fetch(`${API_URL}/courses/user/${userId}`, {
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    if (response.status === 404) return [];
    throw new Error("Erro ao buscar cursos do usuário");
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
    headers: getAuthHeaders(true),
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Erro ao criar curso");
  }

  return data;
}

export async function updateCourse(id, courseData) {
  const formData = new FormData();

  formData.append("name_courses", courseData.curso);
  formData.append("matrix_courses", courseData.matriz);

  if (courseData.image?.file) {
    formData.append("image", courseData.image.file);
  }

  const response = await fetch(`${API_URL}/courses/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(true),
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Erro ao atualizar curso");
  }

  return data;
}

export async function deleteCourse(id) {
  const response = await fetch(`${API_URL}/courses/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Erro ao excluir curso");
  }

  return data;
}
