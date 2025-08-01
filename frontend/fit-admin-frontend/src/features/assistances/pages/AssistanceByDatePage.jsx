import React, { useState } from 'react'
import { TextField, Button, Typography, CircularProgress } from '@mui/material'
import useAssistanceByDate from '../hooks/useAssistanceByDate'
import AssistanceTable from '../components/AssistanceTable'
import useDeleteAssistance from '../hooks/useDeleteAssistance'

const AssistanceByDatePage = () => {
  const {
    date,
    setDate,
    assistances,
    loading,
    error,
    handleSearch,
    handleClear,
    refetch
  } = useAssistanceByDate()
  
  const { handleDelete } = useDeleteAssistance(refetch)
  const [searched, setSearched] = useState(false) // 🔑 nuevo estado

  const onSearch = async () => {
    setSearched(true)
    await handleSearch()
  }

  const onClear = () => {
    setSearched(false)
    handleClear()
  }

  return (
    <div>
      <Typography variant="h5" className="mb-3">
        Asistencias por Fecha
      </Typography>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          onSearch()
        }}
        className="d-flex gap-2 mb-3 align-items-center"
      >
        <TextField
          type="date"
          label="Seleccionar fecha"
          InputLabelProps={{ shrink: true }}
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <Button type="submit" variant="contained">Buscar</Button>
        <Button variant="outlined" color="secondary" onClick={onClear}>
          Limpiar
        </Button>
      </form>

      {error && <div className="alert alert-danger">{error}</div>}

      {loading ? (
        <CircularProgress />
      ) : (
        <>
          {assistances.length > 0 ? (
            <AssistanceTable assistances={assistances} onDelete={handleDelete} />
          ) : (
            searched && (
              <Typography className="mt-3 text-muted">
                No hay asistencias registradas para la fecha seleccionada.
              </Typography>
            )
          )}
        </>
      )}
    </div>
  )
}

export default AssistanceByDatePage
