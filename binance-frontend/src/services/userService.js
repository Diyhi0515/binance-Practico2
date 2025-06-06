import api from "./api";

export const getUsers = () => api.get("/users");
export const updateUserRole = (id, role) => api.patch(`/users/${id}/role`, { role });
