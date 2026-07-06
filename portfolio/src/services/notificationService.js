const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

function getAuthHeaders() {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

export async function getNotifications() {
  const response = await fetch(`${API_URL}/notifications`, {
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error("Erro ao buscar notificações");
  }

  return response.json();
}

export async function deleteNotification(id) {
  const response = await fetch(`${API_URL}/notifications/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error("Erro ao deletar notificação");
  }

  return response.json();
}

export async function getNotificationsByCourse(courseId) {
  const response = await fetch(`${API_URL}/notifications/course/${courseId}`, {
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error("Erro ao buscar notificações");
  }

  return response.json();
}