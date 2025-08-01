import React from "react";
import {
  TextField,
  Button,
  MenuItem,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import FeeSelect from "../../../components/sidebar/feeSelect/FeeSelect";

const PaymentForm = ({
  member,
  values,
  setValues,
  onSubmit,
  getPaymentStatus,
  lastPayment,
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Paper className="p-4">
      <Typography variant="h6" className="mb-3">
        Datos del Socio
      </Typography>

      <Stack spacing={1} className="mb-3">
        {member && (
          <Typography>
            <strong>
              {member.firstName} {member.lastName}
            </strong>
          </Typography>
        )}
        <Typography>DNI: {member.documentNumber}</Typography>

        {member && (
          <>
            <Typography>
              {getPaymentStatus(member, lastPayment).status}
            </Typography>
          </>
        )}
      </Stack>

   <form onSubmit={onSubmit}>
  <div className="row mb-3">
    <div className="col-md-6">
      <FeeSelect
  value={values.feeTypeId}
  onChange={handleChange}
  name="feeTypeId"
  label="Tipo de cuota"
  error={!values.feeTypeId}
  helperText={!values.feeTypeId ? 'Este campo es obligatorio' : ''}
/>

    </div>

    <div className="col-md-6">
      <TextField
        fullWidth
        label="Monto"
        name="amountPaid"
        type="number"
        value={values.amountPaid}
        onChange={handleChange}
        required
      />
    </div>
  </div>

  <div className="row mb-3">
    <div className="col-md-6">
      <TextField
        fullWidth
        label="Fecha de pago"
        name="paymentDate"
        type="date"
        value={values.paymentDate}
        onChange={handleChange}
        InputLabelProps={{ shrink: true }}
        required
      />
    </div>

    <div className="col-md-6">
      <TextField
        select
        fullWidth
        label="Forma de pago"
        name="paymentMethod"
        value={values.paymentMethod}
        onChange={handleChange}
        required
      >
        <MenuItem value="EFECTIVO">Efectivo</MenuItem>
        <MenuItem value="TRANSFERENCIA">Transferencia</MenuItem>
        <MenuItem value="DEBITO">Débito</MenuItem>
        <MenuItem value="OTRO">Otro</MenuItem>
      </TextField>
    </div>
  </div>

  <Button type="submit" variant="contained" color="success">
    Confirmar Pago
  </Button>
</form>

    </Paper>
  );
};

export default PaymentForm;
