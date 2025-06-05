import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000", 
});


api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const status = error.response.status;

      if (status === 401) {
        alert("No autorizado. Iniciá sesión nuevamente.");
        window.location.href = "/login";
      } else if (status === 403) {
        alert("Acceso denegado.");
      } else if (status >= 500) {
        alert("Error del servidor. Intenta más tarde.");
      }
    } else {
      alert("No se pudo conectar al servidor.");
    }


    return Promise.reject(error);
  }
);

export default api;
