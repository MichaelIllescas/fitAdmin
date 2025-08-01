import React from 'react'
import { TextField, Button } from '@mui/material'

const DailyIncomeSearchForm = ({ date, setDate, onSearch, onClear }) => {
  return (
    <form
      className="d-flex gap-3 mb-4"
      onSubmit={(e) => {
        e.preventDefault()
        onSearch()
      }}
    >
      <TextField
        type="date"
        label="Seleccionar fecha"
        InputLabelProps={{ shrink: true }}
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <Button type="submit" variant="contained" color="primary">
        Buscar
      </Button>

      <Button type="button" variant="outlined" color="secondary" onClick={onClear}>
        Limpiar
      </Button>
    </form>
  )
}

export default DailyIncomeSearchForm
