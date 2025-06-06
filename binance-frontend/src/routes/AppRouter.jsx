import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

import LoginPage from "../pages/Login";
import RegisterPage from "../pages/Register";
//import AdminDashboard from "../pages/AdminDashboard";
import UserDashboard from "../pages/UserDashboard";
import { HomeRedirect } from "../components/HomeRedirect";
import CurrencyManager from "../pages/CurrencyManager";
import AdminUsers from "../pages/AdminUsers";

export const AppRouter = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<HomeRedirect />} />
      <Route path="/admin" element={<CurrencyManager />} />
      <Route path="/admin/usuarios" element={<AdminUsers />} />

      <Route path="/user" element={<UserDashboard />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
