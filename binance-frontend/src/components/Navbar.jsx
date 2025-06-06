import React from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">Mi App</Link>

        <div className="d-flex align-items-center">
          {user ? (
            <>
              <span className="me-3 text-white">
                Hola, <strong>{user.name}</strong>
              </span>

              {/* Links solo para admin */}
              {user.role === "admin" && (
                <>
                  <Link to="/admin" className="btn btn-link text-white me-2">
                    Monedas
                  </Link>
                  <Link to="/admin/usuarios" className="btn btn-link text-white me-2">
                    Usuarios
                  </Link>
                </>
              )}

              <button className="btn btn-outline-light" onClick={handleLogout}>
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline-light me-2">
                Iniciar sesión
              </Link>
              <Link to="/register" className="btn btn-outline-light">
                Registrarse
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
