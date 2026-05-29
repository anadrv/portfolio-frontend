const API_URL = "http://localhost:3000";

function getAuthHeaders() {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

export async function getCompetenciesByCourse(courseId) {
  try {
    const response = await fetch(`${API_URL}/competency/course/${courseId}`, {
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar competências:", error);

    return [];
  }
}

// Atualiza trimestre
export async function updateTrimestre(documentId, trimestre) {
  try {
    const response = await fetch(
      `${API_URL}/academic-documents/${documentId}/trimestre`,
      {
        method: "PATCH",

        headers: getAuthHeaders(),

        body: JSON.stringify({
          trimestre,
        }),
      },
    );

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Erro ao atualizar trimestre:", error);

    throw error;
  }
}

// Flag coordenação
export async function updateFlagCoordenacao(documentId, status) {
  try {
    const response = await fetch(
      `${API_URL}/academic-documents/${documentId}/flag/coordenacao`,
      {
        method: "PATCH",

        headers: getAuthHeaders(),

        body: JSON.stringify({
          status,
        }),
      },
    );

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Erro ao atualizar coordenação:", error);

    throw error;
  }
}

// Flag customizar
export async function updateFlagCustomizar(documentId, status) {
  try {
    const response = await fetch(
      `${API_URL}/academic-documents/${documentId}/flag/customizar`,
      {
        method: "PATCH",

        headers: getAuthHeaders(),

        body: JSON.stringify({
          status,
        }),
      },
    );

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Erro ao atualizar customização:", error);

    throw error;
  }
}

// Flag canvas
export async function updateFlagCanvas(documentId, status) {
  try {
    const response = await fetch(
      `${API_URL}/academic-documents/${documentId}/flag/canvas`,
      {
        method: "PATCH",

        headers: getAuthHeaders(),

        body: JSON.stringify({
          status,
        }),
      },
    );

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Erro ao atualizar canvas:", error);

    throw error;
  }
}

// Flag RM
export async function updateFlagGestao(documentId, status) {
  try {
    const response = await fetch(
      `${API_URL}/academic-documents/${documentId}/flag/gestao`,
      {
        method: "PATCH",

        headers: getAuthHeaders(),

        body: JSON.stringify({
          status,
        }),
      },
    );

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Erro ao atualizar integração RM:", error);

    throw error;
  }
}

export async function createCompetency(data) {
  const response = await fetch(`${API_URL}/academic-documents`, {
    method: "POST",

    headers: getAuthHeaders(),

    body: JSON.stringify({
      name_competency: data.name_competency,
      course_id: data.course_id,
      code_competency: data.code_competency,

      planner_link: data.planner_link,
      teaching_plan_link: data.teaching_plan_link,

      trimestre: data.trimestre,
      matriz_competency: data.matriz_competency,
    }),
  });

  if (!response.ok) {
    throw new Error("Erro ao criar competência");
  }

  return response.json();
}

export async function updateFlagPreenchido(documentId, status) {
  try {
    const response = await fetch(
      `${API_URL}/academic-documents/${documentId}/flag/preenchido`,
      {
        method: "PATCH",

        headers: getAuthHeaders(),

        body: JSON.stringify({
          status,
        }),
      },
    );

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Erro ao atualizar preenchimento:", error);

    throw error;
  }
}

// Flag necessita revisão
export async function updateFlagNecessitaRevisao(documentId, status) {
  try {
    const response = await fetch(
      `${API_URL}/academic-documents/${documentId}/flag/necessita-revisao`,
      {
        method: "PATCH",

        headers: getAuthHeaders(),

        body: JSON.stringify({
          status,
        }),
      },
    );

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Erro ao atualizar revisão:", error);

    throw error;
  }
}

export async function updateFlagEmPreenchimento(documentId, status) {
  try {
    const response = await fetch(
      `${API_URL}/academic-documents/${documentId}/flag/em-preenchimento`,
      {
        method: "PATCH",

        headers: getAuthHeaders(),

        body: JSON.stringify({
          status,
        }),
      },
    );

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Erro ao atualizar em preenchimento:", error);

    throw error;
  }
}

export async function updateCompetencyCore(data) {
  const response = await fetch(
    `${API_URL}/academic-documents/${data.id_competency}`,
    {
      method: "PATCH",

      headers: getAuthHeaders(),

      body: JSON.stringify({
        name_competency: data.name_competency,
        code_competency: data.code_competency,
      }),
    },
  );

  if (!response.ok) {
    throw new Error(`Erro HTTP: ${response.status}`);
  }

  return response.json();
}

export async function updateCompetencyDocuments(data) {
  const response = await fetch(
    `${API_URL}/academic-documents/${data.id_competency}/documents`,
    {
      method: "PATCH",

      headers: getAuthHeaders(),

      body: JSON.stringify({
        planner_link: data.planner_link,
        teaching_plan_link: data.teaching_plan_link,
        trimestre: data.trimestre,
      }),
    },
  );

  if (!response.ok) {
    throw new Error(`Erro HTTP: ${response.status}`);
  }

  return response.json();
}

export async function updateDriveLink(documentId, link) {
  const response = await fetch(
    `${API_URL}/academic-documents/${documentId}/drive-link`,
    {
      method: "PATCH",

      headers: getAuthHeaders(),

      body: JSON.stringify({
        link,
      }),
    },
  );

  if (!response.ok) {
    throw new Error(`Erro HTTP: ${response.status}`);
  }

  return response.json();
}

export async function deleteCompetency(id) {
  const response = await fetch(
    `${API_URL}/academic-documents/competency/${id}`,
    {
      method: "DELETE",
      headers: getAuthHeaders(),
    },
  );

  if (!response.ok) {
    throw new Error(`Erro ao deletar competência: ${response.status}`);
  }

  return response.json();
}
