import React from 'react'
import { TextField, Button } from '@mui/material'

const PaymentSearchForm = ({ query, setQuery, onSearch, onClear }) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSearch()
      }}
      className="d-flex gap-2 mb-3"
    >
      <TextField
        label="Buscar socio por DNI o nombre"
        variant="outlined"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        fullWidth
      />

      <Button type="submit" variant="contained" color="primary">
        Buscar
      </Button>

      <Button
        type="button"
        variant="outlined"
        color="secondary"
        onClick={onClear}
      >
        Limpiar
      </Button>
    </form>
  )
}

export default PaymentSearchForm
