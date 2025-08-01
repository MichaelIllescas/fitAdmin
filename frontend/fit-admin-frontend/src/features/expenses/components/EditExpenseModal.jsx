import React, { useEffect, useState } from 'react'
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button
} from '@mui/material'

const EditExpenseModal = ({ open, onClose, onConfirm, expense }) => {
  const [form, setForm] = useState({
    description: '',
    amount: '',
    date: ''
  })

  useEffect(() => {
    if (expense) {
      setForm({
        description: expense.description || '',
        amount: expense.amount || '',
        date: expense.date ? expense.date.slice(0, 10) : ''
      })
    }
  }, [expense])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = () => {
    onConfirm(form)
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Editar Gasto</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Descripción"
          name="description"
          fullWidth
          value={form.description}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Monto"
          name="amount"
          type="number"
          fullWidth
          value={form.amount}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Fecha"
          name="date"
          type="date"
          fullWidth
          value={form.date}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSubmit} variant="contained">Guardar</Button>
      </DialogActions>
    </Dialog>
  )
}

export default EditExpenseModal
