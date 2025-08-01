import React from 'react'
import { TextField, Button } from '@mui/material'

const AssistanceSearchForm = ({ query, setQuery, onSearch, onClear, loading }) => {
  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch()
  }

  return (
    <form onSubmit={handleSubmit} className="d-flex gap-3 mb-4">
      <TextField
        label="Buscar socio por DNI o nombre"
        fullWidth
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        disabled={loading}
      />

      <Button type="submit" variant="contained" disabled={loading}>
        Buscar
      </Button>

      <Button
        type="button"
        variant="outlined"
        color="secondary"
        onClick={onClear || (() => setQuery(''))}
        disabled={loading}
      >
        Limpiar
      </Button>
    </form>
  )
}

export default AssistanceSearchForm
