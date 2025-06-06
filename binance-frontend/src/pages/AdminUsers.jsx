import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import UsersTable from "../components/UsersTable";
import { getUsers, updateUserRole } from "../services/userService";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  const loadUsers = async () => {
    const res = await getUsers();
    setUsers(res.data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleChangeRole = async (userId, newRole) => {
    await updateUserRole(userId, newRole);
    loadUsers();
  };

  return (
    <>
      <Navbar />
      <div className="container py-4">
        <h2 className="mb-4">Gestión de Usuarios y Permisos</h2>
        <UsersTable users={users} onChangeRole={handleChangeRole} />
      </div>
    </>
  );
};

export default AdminUsers;
