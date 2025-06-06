import React from "react";
import Navbar from "../components/Navbar";

const UserDashboard = () => {
  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h1>Panel de Usuario</h1>
        <p>Contenido exclusivo para usuarios.</p>
      </div>
    </>
  );
};

export default UserDashboard;
