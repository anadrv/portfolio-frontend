const API_URL = "http://localhost:3000";

export async function getCourses() {
  const response = await fetch(`${API_URL}/courses`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Erro ao buscar cursos");
  }

  return await response.json();
}