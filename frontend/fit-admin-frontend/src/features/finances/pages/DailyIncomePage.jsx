import React from 'react'
import { CircularProgress, Typography } from '@mui/material'
import useDailyIncome from '../hooks/useDailyIncome'
import DailyIncomeSearchForm from '../components/DailyIncomeSearchForm'
import DailyIncomeTable from '../components/DailyIncomeTable'

const DailyIncomePage = () => {
  const {
    date,
    setDate,
    data,
    loading,
    error,
    fetchData,
    clearData
  } = useDailyIncome()

  return (
    <div>
      <Typography variant="h5" className="mb-4">Ingresos por Fecha</Typography>

      <DailyIncomeSearchForm
        date={date}
        setDate={setDate}
        onSearch={fetchData}
        onClear={clearData}
      />

      {loading && <CircularProgress />}
      {error && <p className="text-danger">{error}</p>}

      {data && (
        <>
        <Typography variant="h6" className="mb-3">
  Total ingresado: $
  {new Intl.NumberFormat('es-AR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(data.total)}
</Typography>
          <DailyIncomeTable payments={data.payments} />
        </>
      )}
    </div>
  )
}

export default DailyIncomePage
