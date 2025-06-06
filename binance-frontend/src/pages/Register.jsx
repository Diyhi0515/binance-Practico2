import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerService } from "../services/authService";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    console.log("Datos enviados:", form); 
    try {
        await registerService(form);
        navigate("/login");
    } catch (err) {
        setError(err.response?.data?.message || err.message || "Error en el registro");
    } finally {
        setLoading(false);
    }
    };


  return (
    <div
      className="d-flex align-items-center justify-content-center vh-100 bg-light bg-gradient"
      style={{
        background: "linear-gradient(to right, #667eea, #764ba2)",
      }}
    >
      <div
        className="card shadow-lg p-4"
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <h3 className="text-center mb-4 text-primary">Crear cuenta</h3>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Nombre completo
            </label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="bi bi-person-fill"></i>
              </span>
              <input
                type="text"
                id="name"
                name="name"
                className="form-control"
                placeholder="Juan Pérez"
                value={form.name}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Correo electrónico
            </label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="bi bi-envelope-fill"></i>
              </span>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                placeholder="ejemplo@mail.com"
                value={form.email}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="form-label">
              Contraseña
            </label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="bi bi-lock-fill"></i>
              </span>
              <input
                type="password"
                id="password"
                name="password"
                className="form-control"
                placeholder="Tu contraseña"
                value={form.password}
                onChange={handleChange}
                required
                disabled={loading}
                minLength={6}
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-success w-100 mb-3"
            disabled={loading}
          >
            {loading ? "Registrando..." : "Registrarse"}
          </button>
        </form>

        <div className="text-center">
          <span>¿Ya tienes cuenta? </span>
          <Link to="/login" className="text-decoration-none fw-bold">
            Inicia sesión
          </Link>
        </div>
      </div>
    </div>
  );
}
