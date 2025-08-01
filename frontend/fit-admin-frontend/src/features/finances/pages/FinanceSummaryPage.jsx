import React from 'react'
import {
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Divider,
  CircularProgress
} from '@mui/material'
import ComparativeChart from '../components/ComparativeChart'
import ProfitabilityCard from '../components/ProfitabilityCard'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material'
import useFinanceSummary from '../hooks/useFinanceSummary'

const FinanceSummaryPage = () => {
  const {
    selectedYear,
    setSelectedYear,
    yearsAvailable,
    monthlyData,
    totalIncome,
    totalExpense,
    netProfit,
    loading,
    error
  } = useFinanceSummary()

  return (
    <Box className="space-y-6">
      <Typography variant="h5" className='mb-2'>Resumen Financiero</Typography>

      <FormControl size="small" sx={{ minWidth: 160, marginBottom: "20px" }}>
        <InputLabel>Año</InputLabel>
        <Select
          value={selectedYear}
          label="Año"
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          {yearsAvailable.map((year) => (
            <MenuItem key={year} value={year}>
              {year}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <>
          {/* Tarjetas de resumen */}
          <Box display="flex" gap={3} flexDirection={{ xs: 'column', md: 'row' }} className="mb-5">
            <ProfitabilityCard income={totalIncome} expense={totalExpense} />
            <Box
              sx={{
                border: '1px solid #ccc',
                borderRadius: 2,
                padding: 2,
                flex: 1,
                backgroundColor: '#f9f9f9'
              }}
            >
              <Typography variant="subtitle1"><strong>Ganancia Neta:</strong></Typography>
              <Typography variant="h6" color={netProfit >= 0 ? 'green' : 'error'}>
                ${netProfit.toLocaleString()}
              </Typography>
            </Box>
          </Box>

          <Divider />

          {/* Gráfico y tabla */}
          <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={4}>
            <Box flex={1}>
              <ComparativeChart data={monthlyData} height={260} />
            </Box>

            <Box flex={1}>
              <Typography variant="h6" className="mb-2">Detalle por mes</Typography>
              <TableContainer component={Paper}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Mes</TableCell>
                      <TableCell>Ingresos</TableCell>
                      <TableCell>Egresos</TableCell>
                      <TableCell>Ganancia Neta</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {monthlyData.map(({ month, income, expense }) => (
                      <TableRow key={month}>
                        <TableCell>{month}</TableCell>
                        <TableCell>${income.toLocaleString()}</TableCell>
                        <TableCell>${expense.toLocaleString()}</TableCell>
                        <TableCell>
                          ${(income - expense).toLocaleString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Box>
        </>
      )}
    </Box>
  )
}

export default FinanceSummaryPage
