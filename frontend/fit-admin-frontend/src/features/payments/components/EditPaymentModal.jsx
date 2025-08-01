import React from 'react'
import {
  Modal,
  Box,
  Typography,
  Button,
  TextField,
  MenuItem
} from '@mui/material'
import FeeSelect from '../../../components/sidebar/feeSelect/FeeSelect'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4
}

const PaymentEditModal = ({
  open,
  onClose,
  formValues,
  handleChange,
  handleSubmit,
  loading
}) => {
  if (!formValues) return null

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" className="mb-3">
          Editar Pago
        </Typography>

        <form onSubmit={handleSubmit}>
          <FeeSelect
            value={formValues.feeTypeId || ''}
            onChange={handleChange}
            name="feeTypeId"
          />

          <TextField
            fullWidth
            label="Monto pagado"
            name="amountPaid"
            type="number"
            value={formValues.amountPaid || ''}
            onChange={handleChange}
            className="mb-3"
          />

          <TextField
            fullWidth
            label="Fecha de pago"
            name="paymentDate"
            type="date"
            value={formValues.paymentDate || ''}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            className="mb-3"
          />

        <TextField
  select
  fullWidth
  label="Método de pago"
  name="paymentMethod"
  value={formValues.paymentMethod || ''}
  onChange={handleChange}
  className="mb-4"
>
  <MenuItem value="EFECTIVO">Efectivo</MenuItem>
  <MenuItem value="TRANSFERENCIA">Transferencia</MenuItem>
  <MenuItem value="TARJETA">Tarjeta</MenuItem>
  <MenuItem value="OTRO">Otro</MenuItem>
</TextField>


          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
          >
            {loading ? 'Guardando...' : 'Guardar Cambios'}
          </Button>
        </form>
      </Box>
    </Modal>
  )
}

export default PaymentEditModal
