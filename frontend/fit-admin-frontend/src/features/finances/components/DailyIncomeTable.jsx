import React, { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableRow, TablePagination } from '@mui/material'

const DailyIncomeTable = ({ payments }) => {
  const [page, setPage] = useState(0)
  const rowsPerPage = 5

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const paginated = payments.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Fecha</TableCell>
            <TableCell>Monto</TableCell>
            <TableCell>Método</TableCell>
            <TableCell>Socio</TableCell>
            <TableCell>Tipo de cuota</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginated.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.date}</TableCell>
              <TableCell>${row.amount}</TableCell>
              <TableCell>{row.method}</TableCell>
              <TableCell>{row.member}</TableCell>
              <TableCell>{row.feeType}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={payments.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[]}
      />
    </>
  )
}

export default DailyIncomeTable
