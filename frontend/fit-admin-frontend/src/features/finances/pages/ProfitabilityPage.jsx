import React from 'react'
import {
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress
} from '@mui/material'
import ProfitabilityCard from '../components/ProfitabilityCard'
import useAnnualProfit from '../hooks/useAnnualProfit'

const ProfitabilityPage = () => {
  const {
    selectedYear,
    setSelectedYear,
    income,
    expense,
    yearsAvailable,
    loading,
    error
  } = useAnnualProfit()

  return (
    <div className="space-y-4">
      <Typography variant="h5">Rentabilidad</Typography>

      <FormControl size="small" sx={{ minWidth: 160 }}>
        <InputLabel>Año</InputLabel>
        <Select value={selectedYear} label="Año" onChange={(e) => setSelectedYear(e.target.value)}>
          {yearsAvailable.map((year) => (
            <MenuItem key={year} value={year}>
              {year}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {loading && <CircularProgress />}
      {error && <p className="text-danger">{error}</p>}

      {!loading && !error && (
        <ProfitabilityCard income={income} expense={expense} />
      )}
    </div>
  )
}

export default ProfitabilityPage
