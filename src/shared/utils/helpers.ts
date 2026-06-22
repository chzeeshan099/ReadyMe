export function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function formatRole(role) {
  if (!role) {
    return "Student";
  }

  return role.charAt(0).toUpperCase() + role.slice(1);
}

export function getInitials(name = "Ready Me") {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}

export function slugifyId(value = "") {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}
