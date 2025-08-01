import { TextField, Button, MenuItem } from "@mui/material";
import FeeSelect from "../../../components/sidebar/feeSelect/FeeSelect";

const MemberForm = ({ values, onChange, onSubmit, isEditing = false }) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="row mb-3">
        <div className="col-md-6">
          <TextField
            fullWidth
            label="Nombre"
            name="firstName"
            value={values.firstName}
            onChange={onChange}
            required
          />
        </div>
        <div className="col-md-6">
          <TextField
            fullWidth
            label="Apellido"
            name="lastName"
            value={values.lastName}
            onChange={onChange}
            required
          />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-6">
          <TextField
            fullWidth
            label="DNI"
            name="documentNumber"
            value={values.documentNumber}
            onChange={onChange}
            required
          />
        </div>
        <div className="col-md-6">
          <TextField
            fullWidth
            label="Teléfono"
            name="phone"
            value={values.phone}
            onChange={onChange}
          />
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-6">
          <TextField
            fullWidth
            label="Fecha de nacimiento"
            name="birthDate"
            type="date"
            value={values.birthDate}
            onChange={onChange}
            InputLabelProps={{ shrink: true }}
            required
          />
        </div>
        <div className="col-md-6">
          <TextField
            select
            fullWidth
            label="Sexo"
            name="gender"
            value={values.gender}
            onChange={onChange}
            required
          >
            <MenuItem value="masculino">Masculino</MenuItem>
            <MenuItem value="femenino">Femenino</MenuItem>
            <MenuItem value="otro">Otro</MenuItem>
          </TextField>
        </div>
      </div>

      <FeeSelect
        value={values.feeId}
        onChange={onChange}
        name="feeId"
        label="Cuota Asociada"
      />

      <Button type="submit" variant="contained" color="primary">
        {isEditing ? "Actualizar Socio" : "Registrar Socio"}
      </Button>
    </form>
  );
};

export default MemberForm;
