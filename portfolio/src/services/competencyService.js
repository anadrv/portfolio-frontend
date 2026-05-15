export async function getCompetenciesByCourse(courseId) {
  try {
    const API_URL = "http://localhost:3000";
    const response = await fetch(
      `${API_URL}/competency/course/${courseId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar competências:", error);
    return [];
  }
}

