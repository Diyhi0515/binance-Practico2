import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { loginService } from "../services/authService.js";
import { useNavigate, Link } from "react-router-dom";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const { access_token, user } = await loginService(form);
      login(access_token, user);
      navigate(user.role === "admin" ? "/admin" : "/user");
    } catch (err) {
      setError("Credenciales incorrectas. Inténtalo de nuevo.");
        console.error("Error de inicio de sesión:", err);
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center vh-100 bg-light bg-gradient"
      style={{
        background: "linear-gradient(to right, #667eea, #764ba2)",
      }}
    >
      <div className="card shadow-lg p-4" style={{ width: "100%", maxWidth: "400px" }}>
        <h3 className="text-center mb-4 text-primary">Bienvenido</h3>
        <form onSubmit={handleSubmit}>
          {error && <div className="alert alert-danger">{error}</div>}
          <div className="mb-3">
            <label className="form-label">Correo electrónico</label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="bi bi-envelope-fill"></i>
              </span>
              <input
                type="email"
                name="email"
                className="form-control"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="bi bi-lock-fill"></i>
              </span>
              <input
                type="password"
                name="password"
                className="form-control"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button className="btn btn-primary w-100 mb-3">Iniciar Sesión</button>
        </form>

        <div className="text-center">
          <span>¿No tienes una cuenta? </span>
          <Link to="/register" className="text-decoration-none fw-bold">
            Regístrate aquí
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
