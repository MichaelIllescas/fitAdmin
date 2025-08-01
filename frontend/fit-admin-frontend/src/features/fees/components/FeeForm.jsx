import React from 'react'
import { TextField, Button, Paper, Typography, Stack } from '@mui/material'

const FeeForm = ({ values, onChange, onSubmit }) => {
  return (
    <Paper className="p-4">
      <form onSubmit={onSubmit}>
        <Stack spacing={3}>
          <TextField
            label="Nombre del servicio"
            name="name"
            value={values.name}
            onChange={onChange}
            required
            fullWidth
          />

          <TextField
            label="Monto"
            name="price"
            type="number"
            value={values.price}
            onChange={onChange}
            required
            fullWidth
          />

          <TextField
            label="Duración (en días)"
            name="durationInDays"
            type="number"
            value={values.durationinDays}
            onChange={onChange}
            required
            fullWidth
            helperText="Ej: 1 día (diario), 7 días (semanal), 30 días (mensual)"
          />

          <Button type="submit" variant="contained" color="primary">
            Registrar Servicio
          </Button>
        </Stack>
      </form>
    </Paper>
  )
}

export default FeeForm
