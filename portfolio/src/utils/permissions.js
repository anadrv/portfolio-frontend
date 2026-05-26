export function getUser() {
  return JSON.parse(localStorage.getItem("user"));
}

export function hasPermission(permission) {
  const user = getUser();

  if (!user?.permissions) return false;

  return user.permissions.includes(permission);
}

export function hasRole(roleName) {
  const user = getUser();

  return user?.role === roleName;
}

