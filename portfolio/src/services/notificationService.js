const API_URL = "http://localhost:3000";

export async function getNotifications() {

  const response = await fetch(
    `${API_URL}/notifications`
  );

  if (!response.ok) {
    throw new Error("Erro ao buscar notificações");
  }

  return response.json();
}

export async function deleteNotification(id) {
  const response = await fetch(
    `${API_URL}/notifications/${id}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw new Error("Erro ao deletar notificação");
  }

  return response.json();
}