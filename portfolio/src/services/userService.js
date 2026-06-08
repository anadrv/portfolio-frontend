const API_URL = "http://localhost:3000";

export async function loginMicrosoft(data) {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data.accessToken}`
      },
    });

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Erro no login Microsoft:", error);
    throw error;
  }
}

// Buscar usuários
export async function getUsers(token) {
  try {

    const response = await fetch(
      `${API_URL}/users`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        `Erro HTTP: ${response.status}`
      );
    }

    return await response.json();

  } catch (error) {

    console.error(
      "Erro ao buscar usuários:",
      error
    );

    return [];
  }
}

// Atualizar usuário
export async function updateUserRole(
  userId,
  roleId,
  token
) {
  try {

    const response = await fetch(
      `${API_URL}/users/${userId}/role`,
      {
        method: "PATCH",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          role_id: roleId,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(
        `Erro HTTP: ${response.status}`
      );
    }

    return await response.json();

  } catch (error) {

    console.error(
      "Erro ao atualizar role:",
      error
    );

    throw error;
  }
}

// Desativar usuário
export async function deactivateUser(
  userId,
  token
) {
  try {

    const response = await fetch(
      `${API_URL}/users/${userId}`,
      {
        method: "DELETE",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        `Erro HTTP: ${response.status}`
      );
    }

    return await response.json();

  } catch (error) {

    console.error(
      "Erro ao desativar usuário:",
      error
    );

    throw error;
  }
}

