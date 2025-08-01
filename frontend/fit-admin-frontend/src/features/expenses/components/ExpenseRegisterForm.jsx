import React from 'react'
import { TextField, Button } from '@mui/material'

const ExpenseRegisterForm = ({ formData, errors, onChange, onSubmit, isSubmitting }) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {/* Descripción: ocupa todo el ancho */}
      <div className='mb-3'>
        <TextField
          fullWidth
          label="Descripción del gasto"
          name="description"
          value={formData.description}
          onChange={onChange}
          error={!!errors.description}
          helperText={errors.description}
          multiline
          maxRows={3}
        />
      </div>

      {/* Monto + Fecha + Botón en una fila */}
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 mb-3">
          <TextField
            fullWidth
            label="Monto ($)"
            name="amount"
            type="number"
            value={formData.amount}
            onChange={onChange}
            error={!!errors.amount}
            helperText={errors.amount}
          />
        </div>

        <div className="flex-1 mb-3">
          <TextField
            fullWidth
            label="Fecha"
            name="date"
            type="date"
            value={formData.date}
            onChange={onChange}
            error={!!errors.date}
            helperText={errors.date}
            InputLabelProps={{ shrink: true }}
          />
        </div>

        <div className="flex items-end mb-3">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSubmitting}
            size="large"
          >
            {isSubmitting ? 'Registrando...' : 'Registrar Gasto'}
          </Button>
        </div>
      </div>
    </form>
  )
}

export default ExpenseRegisterForm
