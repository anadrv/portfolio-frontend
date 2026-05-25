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