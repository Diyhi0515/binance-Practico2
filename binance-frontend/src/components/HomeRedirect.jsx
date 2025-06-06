import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const HomeRedirect = () => {
  const { role } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (role === "admin") {
      navigate("/admin", { replace: true });
    } else if (role === "user") {
      navigate("/user", { replace: true });
    }
  }, [role, navigate]);

  return null;
};
