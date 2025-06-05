import { Button, Container } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Container style={{ marginTop: "2rem" }}>
      <h2>Bienvenido a Binance P2P</h2>
      <p>¡Estás logueado!</p>
      <Button variant="danger" onClick={handleLogout}>
        Cerrar sesión
      </Button>
    </Container>
  );
}
