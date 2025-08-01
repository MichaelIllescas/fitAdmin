import React, { useState } from "react";
import ExpenseHeader from "./ExpenseHeader";
import ExpenseTable from "./ExpenseTable";
import useFetchExpenses from "../hooks/useFetchExpenses";
import { CircularProgress, Typography } from "@mui/material";

const ExpenseList = () => {
  const { expenses, loading, error, setExpenses, setLoading, setError } = useFetchExpenses();

  const currentYear = new Date().getFullYear();
  const [month, setMonth] = useState("");
  const [year, setYear] = useState(currentYear.toString());
  const [appliedFilters, setAppliedFilters] = useState({ month: "", year: currentYear.toString() });

  const handleApplyFilters = () => {
    setAppliedFilters({ month, year });
  };

  const handleClearFilters = () => {
    setMonth("");
    setYear(currentYear.toString());
    setAppliedFilters({ month: "", year: currentYear.toString() });
  };

  const filteredExpenses = expenses.filter((e) => {
    const date = new Date(e.date);
    const expenseMonth = (date.getMonth() + 1).toString().padStart(2, "0");
    const expenseYear = date.getFullYear().toString();

    return (
      (!appliedFilters.month || expenseMonth === appliedFilters.month) &&
      (!appliedFilters.year || expenseYear === appliedFilters.year)
    );
  });

  return (
    <div>
      <Typography variant="h5" className="mb-3">
        Lista de Gastos
      </Typography>

      <ExpenseHeader
        month={month}
        setMonth={setMonth}
        year={year}
        setYear={setYear}
        currentYear={currentYear}
        onApply={handleApplyFilters}
        onClear={handleClearFilters}
      />

      {loading && <CircularProgress />}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && (
        <ExpenseTable
          expenses={filteredExpenses}
          setExpenses={setExpenses}
          setLoading={setLoading}
          setError={setError}
        />
      )}
    </div>
  );
};

export default ExpenseList;
