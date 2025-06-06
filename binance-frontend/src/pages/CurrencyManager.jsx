import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import CurrencyForm from "../components/CurrencyForm";
import CurrencyTable from "../components/CurrencyTable";
import {
  getCurrencies,
  createCurrency,
  updateCurrency,
  deleteCurrency,
} from "../services/currencyService";

const CurrencyManager = () => {
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

        <CurrencyForm
          form={form}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          editingId={editingId}
        />

        <CurrencyTable
          currencies={currencies}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      </div>
    </>
  );
};

export default CurrencyManager;
