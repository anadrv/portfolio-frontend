export function getUser() {
  return JSON.parse(localStorage.getItem("user"));
}

export function hasPermission(permission) {
  const user = getUser();

  if (!user?.permissions) return false;

  return user.permissions.includes(permission);
}

export function hasRole(role) {
  const user = getUser();

  return user?.role === role;
}