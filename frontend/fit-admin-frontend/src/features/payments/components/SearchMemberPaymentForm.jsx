  import React from 'react'
  import { TextField, Button } from '@mui/material'

  const SearchMemberPaymentForm = ({ query, setQuery, onSearch, loading }) => {
    const handleSubmit = (e) => {
      e.preventDefault()
      onSearch()
    }

    return (
      <form onSubmit={handleSubmit} className="d-flex gap-3 mb-4">
        <TextField
          fullWidth
          label="Buscar socio por DNI o nombre"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          disabled={loading}
        />
        <Button variant="contained" type="submit" disabled={loading}>
          Buscar
        </Button>
      </form>
    )
  }

  export default SearchMemberPaymentForm
