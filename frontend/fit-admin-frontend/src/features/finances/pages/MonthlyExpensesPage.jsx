import React from 'react'
import {
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  CircularProgress
} from '@mui/material'
import MonthlyExpenseChart from '../components/MonthlyExpenseChart'
import useMonthlyExpenses from '../hooks/useMonthlyExpenses'

const MonthlyExpensesPage = () => {
  const {
    selectedYear,
    setSelectedYear,
    data,
    loading,
    error,
    yearsAvailable
  } = useMonthlyExpenses()

  const total = data.reduce((acc, item) => acc + item.amount, 0)

  return (
    <div>
      <Typography variant="h5" className="mb-4">Egresos Mensuales</Typography>

      <FormControl size="small" className="mb-4" sx={{ minWidth: 160 }}>
        <InputLabel>Año</InputLabel>
        <Select value={selectedYear} label="Año" onChange={(e) => setSelectedYear(e.target.value)}>
          {yearsAvailable.map((year) => (
            <MenuItem key={year} value={year}>{year}</MenuItem>
          ))}
        </Select>
      </FormControl>

      {loading && <CircularProgress />}
      {error && <p className="text-danger">{error}</p>}

      {!loading && !error && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'flex-start' }}>
          {/* Gráfico */}
          <div style={{ flex: '1 1 60%', maxWidth: '600px' }}>
            <MonthlyExpenseChart data={data} />
          </div>

          {/* Detalle por mes */}
          <div style={{ flex: '1 1 30%', minWidth: '200px' }}>
            <Typography variant="h6" gutterBottom>Detalle por mes</Typography>
            <List dense>
              {data.map((item, idx) => (
                <ListItem key={idx} disableGutters>
                  <ListItemText
                    primary={`${item.month}: $${item.amount.toLocaleString('es-AR')}`}
                  />
                </ListItem>
              ))}
            </List>
            <Typography variant="h6" className="mt-2">
              Total anual: ${total.toLocaleString('es-AR')}
            </Typography>
          </div>
        </div>
      )}
    </div>
  )
}

export default MonthlyExpensesPage
