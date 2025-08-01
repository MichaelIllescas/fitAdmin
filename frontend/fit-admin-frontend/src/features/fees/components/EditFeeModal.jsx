import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button
} from '@mui/material'

const EditFeeModal = ({ open, onClose, fee, onChange, onSubmit, loading }) => {
  if (!fee) return null

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Editar Cuota</DialogTitle>
      <form onSubmit={onSubmit}>
        <DialogContent>
          <TextField
            fullWidth
            label="Nombre"
            name="name"
            value={fee.name}
            onChange={onChange}
            className="mb-3"
            required
          />
          <TextField
            fullWidth
            label="Precio"
            name="price"
            type="number"
            value={fee.price}
            onChange={onChange}
            className="mb-3"
            required
          />
          <TextField
            fullWidth
            label="Duración (días)"
            name="durationInDays"
            type="number"
            value={fee.durationInDays}
            onChange={onChange}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} disabled={loading}>Cancelar</Button>
          <Button type="submit" variant="contained" color="primary" disabled={loading}>
            Guardar Cambios
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default EditFeeModal
