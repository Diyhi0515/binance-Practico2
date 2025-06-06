import React from "react";

const CurrencyTable = ({ currencies, handleEdit, handleDelete }) => {
  return (
    <div className="table-responsive shadow-sm">
      <table className="table table-striped table-hover align-middle">
        <thead className="table-dark">
          <tr>
            <th>Nombre</th>
            <th>Símbolo</th>
            <th>Código</th>
            <th>Valor en SUS</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currencies.map((c) => (
            <tr key={c.id}>
              <td>{c.name}</td>
              <td>{c.symbol}</td>
              <td>{c.code}</td>
              <td>{c.valorEnSus}</td>
              <td>
                <span className={`badge ${c.isActive ? "bg-success" : "bg-secondary"}`}>
                  {c.isActive ? "Activo" : "Inactivo"}
                </span>
              </td>
              <td>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => handleEdit(c)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(c.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
          {currencies.length === 0 && (
            <tr>
              <td colSpan="6" className="text-center text-muted">
                No hay monedas registradas.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CurrencyTable;
