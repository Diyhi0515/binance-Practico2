import React from "react";

const CurrencyForm = ({ form, handleChange, handleSubmit, editingId }) => {
  return (
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
  );
};

export default CurrencyForm;
