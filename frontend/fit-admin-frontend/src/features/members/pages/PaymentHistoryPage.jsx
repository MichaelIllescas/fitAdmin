import React from 'react'
import { Typography, TextField, Button } from '@mui/material'
import PaymentHistoryTable from '../components/PaymentHistoryTable'
import MemberHeader from '../components/MemberHeader'
import usePaymentHistory from '../hooks/usePaymentHistory'

const PaymentHistoryPage = () => {
  const {
    query,
    setQuery,
    member,
    payments,
    loading,
    handleSearch
  } = usePaymentHistory()

  return (
    <div>
      <Typography variant="h5" className="mb-4">Historial de Pagos</Typography>

      <form onSubmit={(e) => { e.preventDefault(); handleSearch() }} className="d-flex gap-3 mb-4">
        <TextField
          label="Buscar socio por DNI o nombre"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          disabled={loading}
          fullWidth
        />
        <Button variant="contained" type="submit" disabled={loading}>
          Buscar
        </Button>
      </form>

      {member && (
        <>
          <MemberHeader member={member} />
          <PaymentHistoryTable payments={payments} />
        </>
      )}
    </div>
  )
}

export default PaymentHistoryPage
