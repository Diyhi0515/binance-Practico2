import React from "react";

const UsersTable = ({ users, onChangeRole }) => {
  return (
    <div className="table-responsive shadow-sm">
      <table className="table table-striped table-hover align-middle">
        <thead className="table-dark">
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name || user.username || "N/A"}</td>
              <td>{user.email}</td>
              <td>
                <span
                  className={`badge ${
                    user.role === "admin" ? "bg-success" : "bg-secondary"
                  }`}
                >
                  {user.role}
                </span>
              </td>
              <td>
                {user.role !== "admin" ? (
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => onChangeRole(user.id, "admin")}
                  >
                    Dar admin
                  </button>
                ) : (
                  <button
                    className="btn btn-sm btn-warning"
                    onClick={() => onChangeRole(user.id, "user")}
                  >
                    Quitar admin
                  </button>
                )}
              </td>
            </tr>
          ))}
          {users.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center text-muted">
                No hay usuarios registrados.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
