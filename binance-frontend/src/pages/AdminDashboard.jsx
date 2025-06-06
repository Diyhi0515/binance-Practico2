import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import {
  getCurrencies,
  createCurrency,
  updateCurrency,
  deleteCurrency,
} from "../services/currencyService";

const AdminDashboard = () => {
  const [currencies, setCurrencies] = useState([]);
  const [form, setForm] = useState({
    name: "",
    symbol: "",
    code: "",
    valorEnSus: 0,
    isActive: true,
  });
  const [editingId, setEditingId] = useState(null);

  const loadCurrencies = async () => {
    const res = await getCurrencies();
    setCurrencies(res.data);
  };

  useEffect(() => {
    loadCurrencies();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...form, valorEnSus: parseFloat(form.valorEnSus) };

    if (editingId) {
      await updateCurrency(editingId, payload);
    } else {
      await createCurrency(payload);
    }

    setForm({
      name: "",
      symbol: "",
      code: "",
      valorEnSus: 0,
      isActive: true,
    });
    setEditingId(null);
    loadCurrencies();
  };

  const handleEdit = (currency) => {
    setForm(currency);
    setEditingId(currency.id);
  };

  const handleDelete = async (id) => {
    if (confirm("¿Seguro que quieres eliminar esta moneda?")) {
      await deleteCurrency(id);
      loadCurrencies();
    }
  };

  return (
    <>
      <Navbar />
      <div className="container py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="mb-0">Gestión de Monedas</h2>
          {editingId && (
            <button
              className="btn btn-secondary"
              onClick={() => {
                setForm({ name: "", symbol: "", code: "", valorEnSus: 0, isActive: true });
                setEditingId(null);
              }}
            >
              Cancelar edición
            </button>
          )}
        </div>

        <div className="card shadow-sm mb-4">
          <div className="card-body">
            <form onSubmit={handleSubmit} className="row g-3">
              <div className="col-md-4">
                <label className="form-label">Nombre</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-2">
                <label className="form-label">Símbolo</label>
                <input
                  type="text"
                  name="symbol"
                  className="form-control"
                  value={form.symbol}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-2">
                <label className="form-label">Código</label>
                <input
                  type="text"
                  name="code"
                  className="form-control"
                  value={form.code}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-2">
                <label className="form-label">Valor en SUS</label>
                <input
                  type="number"
                  name="valorEnSus"
                  className="form-control"
                  value={form.valorEnSus}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  required
                />
              </div>
              <div className="col-md-2 d-flex align-items-end">
                <div className="form-check">
                  <input
                    type="checkbox"
                    name="isActive"
                    className="form-check-input"
                    checked={form.isActive}
                    onChange={handleChange}
                    id="activeCheckbox"
                  />
                  <label className="form-check-label" htmlFor="activeCheckbox">
                    Activo
                  </label>
                </div>
              </div>
              <div className="col-12 d-flex justify-content-end">
                <button type="submit" className="btn btn-success">
                  {editingId ? "Actualizar" : "Agregar"}
                </button>
              </div>
            </form>
          </div>
        </div>

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
      </div>
    </>
  );
};

export default AdminDashboard;
