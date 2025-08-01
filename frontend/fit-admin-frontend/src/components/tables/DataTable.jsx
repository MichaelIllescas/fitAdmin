import React from 'react'
import {
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, TablePagination, Paper, TextField
} from '@mui/material'

import useTableLogic from './useTableLogic'

const DataTable = ({ data, columns, itemsPerPage = 10 }) => {
  const {
    search,
    setSearch,
    page,
    paginatedData,
    totalPages,
    handleChangePage
  } = useTableLogic(data, itemsPerPage)

  return (
    <Paper className="p-3">
      <TextField
        fullWidth
        label="Buscar..."
        variant="outlined"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-3"
      />

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell key={col.key}><strong>{col.label}</strong></TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedData.map((row, i) => (
              <TableRow key={i}>
                {columns.map((col) => (
                  <TableCell key={col.key}>
                    {typeof col.render === 'function'
                      ? col.render(row)
                      : row[col.key]}
                  </TableCell>
                ))}
              </TableRow>
            ))}

            {paginatedData.length === 0 && (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  No se encontraron resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={data.length}
        page={page - 1}
        onPageChange={(_, newPage) => handleChangePage(_, newPage + 1)}
        rowsPerPage={itemsPerPage}
        rowsPerPageOptions={[]}
      />
    </Paper>
  )
}

export default DataTable
