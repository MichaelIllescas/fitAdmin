import React from 'react'
import { Button, TextField } from '@mui/material'

const SearchMemberForm = ({ query, setQuery, onSearch, onClear, loading }) => {
  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch()
  }

  return (
    <form onSubmit={handleSubmit} className="d-flex align-items-center gap-3">
      <TextField
        fullWidth
        label="Buscar por nombre y apellido o DNI"
        variant="outlined"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        disabled={loading}
      />
      <Button type="submit" variant="contained" color="primary" disabled={loading}>
        {loading ? 'Buscando...' : 'Buscar'}
      </Button>
      <Button
        type="button"
        variant="outlined"
        color="secondary"
        onClick={onClear}
        disabled={loading && !query}
      >
        Limpiar
      </Button>
    </form>
  )
}

export default SearchMemberForm
