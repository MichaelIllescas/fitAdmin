import React, { useState } from "react";
import { CircularProgress, Typography } from "@mui/material";
import PaymentSearchForm from "../components/PaymentSearchForm";
import DataTable from "../../../components/tables/DataTable";
import usePaymentHistory from "../hooks/usePaymentHistory";
import PaymentCard from "../components/MemberPaymentCard";

const PaymentHistoryPage = () => {
  const {
    query,
    setQuery,
    payments,
    setPayments,
    loading,
    error,
    fetchPayments,
  } = usePaymentHistory();

  const [searched, setSearched] = useState(false); // 🔑 nuevo estado

  const handleSearch = async () => {
    setSearched(true); // marcar que hubo búsqueda
    await fetchPayments();
  };

  const handleClear = () => {
    setQuery("");
    setPayments([]);
    setSearched(false); // resetear búsqueda
  };

  const getExpirationDate = (paymentDate, durationInDays) => {
    const date = new Date(paymentDate);
    date.setDate(date.getDate() + durationInDays);
    return date.toLocaleDateString("es-AR");
  };

  const columns = [
    { key: "id", label: "ID" },
    {
      key: "paymentDate",
      label: "Fecha",
      render: (row) => {
        const date = new Date(row.paymentDate);
        return new Date(
          date.getTime() + date.getTimezoneOffset() * 60000
        ).toLocaleDateString("es-AR");
      },
    },
    {
      key: "expirationDate",
      label: "Vencimiento",
      render: (row) =>
        getExpirationDate(row.paymentDate, row.feeType?.durationInDays || 0),
    },
    { key: "amountPaid", label: "Monto" },
    { key: "paymentMethod", label: "Método" },
    {
      key: "FeeType",
      label: "Servicio",
      render: (row) => row.feeType?.name,
    },
  ];

  return (
    <div>
      <Typography variant="h5" className="mb-4">
        Historial de Pagos
      </Typography>

      <PaymentSearchForm
        query={query}
        setQuery={setQuery}
        onSearch={handleSearch}
        onClear={handleClear}
      />

      {loading && <CircularProgress />}
      {error && <p className="text-danger">{error}</p>}

      {payments.length > 0 && <PaymentCard payment={payments[0]} />}

      {!loading && payments.length > 0 && (
        <DataTable data={payments} columns={columns} itemsPerPage={5} />
      )}

      {!loading && searched && payments.length === 0 && !error && (
        <Typography variant="body1" className="mt-3">
          No se encontraron pagos.
        </Typography>
      )}
    </div>
  );
};

export default PaymentHistoryPage;
