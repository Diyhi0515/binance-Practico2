import api from "./api";

export const getCurrencies = () => api.get("/currencies");
export const getCurrency = (id) => api.get(`/currencies/${id}`);
export const createCurrency = (data) => api.post("/currencies", data);
export const updateCurrency = (id, data) => api.patch(`/currencies/${id}`, data);
export const deleteCurrency = (id) => api.delete(`/currencies/${id}`);
