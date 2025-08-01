import React from "react";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";

const months = [
  { value: "01", label: "Enero" },
  { value: "02", label: "Febrero" },
  { value: "03", label: "Marzo" },
  { value: "04", label: "Abril" },
  { value: "05", label: "Mayo" },
  { value: "06", label: "Junio" },
  { value: "07", label: "Julio" },
  { value: "08", label: "Agosto" },
  { value: "09", label: "Septiembre" },
  { value: "10", label: "Octubre" },
  { value: "11", label: "Noviembre" },
  { value: "12", label: "Diciembre" },
];

const ExpenseHeader = ({ month, setMonth, year, setYear, currentYear, onApply, onClear }) => {
  const yearsRange = Array.from({ length: 7 }, (_, i) => currentYear - 3 + i); // 3 atrás, actual, 3 adelante

  return (
    <Box display="flex" gap={2} mb={3} alignItems="center">
      <FormControl size="small" sx={{ minWidth: 150 }}>
        <InputLabel>Mes</InputLabel>
        <Select value={month} label="Mes" onChange={(e) => setMonth(e.target.value)}>
          <MenuItem value="">Todos</MenuItem>
          {months.map((m) => (
            <MenuItem key={m.value} value={m.value}>
              {m.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl size="small" sx={{ minWidth: 120 }}>
        <InputLabel>Año</InputLabel>
        <Select value={year} label="Año" onChange={(e) => setYear(e.target.value)}>
          {yearsRange.map((y) => (
            <MenuItem key={y} value={y.toString()}>
              {y}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button variant="contained" color="primary" onClick={onApply}>
        Seleccionar
      </Button>
      <Button variant="outlined" color="secondary" onClick={onClear}>
        Limpiar
      </Button>
    </Box>
  );
};

export default ExpenseHeader;
