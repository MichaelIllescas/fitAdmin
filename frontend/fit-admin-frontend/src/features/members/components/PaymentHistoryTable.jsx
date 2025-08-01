import React from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip } from '@mui/material'

const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString('es-AR')
}

const PaymentHistoryTable = ({ payments }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow style={{ backgroundColor: '#343a40' }}>
            <TableCell style={{ color: 'white' }}>Fecha</TableCell>
            <TableCell style={{ color: 'white' }}>Monto</TableCell>
            <TableCell style={{ color: 'white' }}>Tipo</TableCell>
            <TableCell style={{ color: 'white' }}>Estado</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {payments.map((p) => (
            <TableRow key={p.id}>
              <TableCell>{formatDate(p.date)}</TableCell>
              <TableCell>${p.amount}</TableCell>
              <TableCell>{p.type}</TableCell>
              <TableCell>
                <Chip
                  label={p.status === 'pagado' ? 'Pagado' : 'Atrasado'}
                  color={p.status === 'pagado' ? 'success' : 'error'}
                  size="small"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default PaymentHistoryTable
