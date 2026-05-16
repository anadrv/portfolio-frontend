const API_URL = "http://localhost:3000";

export async function getCompetenciesByCourse(courseId) {
  try {
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
    console.error(
      "Erro ao buscar competências:",
      error
    );

    return [];
  }
}

// Atualiza trimestre
export async function updateTrimestre(
  documentId,
  trimestre
) {
  try {
    const response = await fetch(
      `${API_URL}/academic-documents/${documentId}/trimestre`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          trimestre,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(
      "Erro ao atualizar trimestre:",
      error
    );

    throw error;
  }
}

// Flag coordenação
export async function updateFlagCoordenacao(
  documentId,
  status
) {
  try {
    const response = await fetch(
      `${API_URL}/academic-documents/${documentId}/flag/coordenacao`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(
      "Erro ao atualizar coordenação:",
      error
    );

    throw error;
  }
}

// Flag customizar
export async function updateFlagCustomizar(
  documentId,
  status
) {
  try {
    const response = await fetch(
      `${API_URL}/academic-documents/${documentId}/flag/customizar`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(
      "Erro ao atualizar customização:",
      error
    );

    throw error;
  }
}

// Flag canvas
export async function updateFlagCanvas(
  documentId,
  status
) {
  try {
    const response = await fetch(
      `${API_URL}/academic-documents/${documentId}/flag/canvas`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(
      "Erro ao atualizar canvas:",
      error
    );

    throw error;
  }
}

// Flag RM
export async function updateFlagGestao(
  documentId,
  status
) {
  try {
    const response = await fetch(
      `${API_URL}/academic-documents/${documentId}/flag/gestao`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(
      "Erro ao atualizar integração RM:",
      error
    );

    throw error;
  }
}