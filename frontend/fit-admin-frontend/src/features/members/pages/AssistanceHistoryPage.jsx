import React from "react";
import { Paper, Stack, Typography, Box, Chip } from '@mui/material'
import { TextField, Button } from "@mui/material";
import MemberHeader from "../components/MemberHeader";
import AssistanceHistoryTable from "../components/AssistanceHistoryTable";
import useAssistanceHistory from "../hooks/useAssistanceHistory";
import Swal from "sweetalert2";

const AssistanceHistoryPage = () => {
  const {
    query,
    setQuery,
    member,
    assistances,
    loading,
    handleSearch,
    handleRegisterAssistance,
  } = useAssistanceHistory();

  return (
    <div>
      <Typography variant="h5" className="mb-4">
        Historial de Asistencias
      </Typography>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
        }}
        className="d-flex gap-3 mb-4"
      >
        <TextField
          label="Buscar socio por DNI o nombre"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          disabled={loading}
          fullWidth
        />
        <Button variant="contained" type="submit" disabled={loading}>
          Buscar
        </Button>
      </form>


{member && (
  <>
    <Paper className="p-3 mb-4">
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', md: 'center' }}
        spacing={2}
      >
        <Box>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="h6">
              {member.name} {member.lastName}
            </Typography>
            <Chip
              label={member.status === 'al_dia' ? 'Al día' : 'Atrasado'}
              color={member.status === 'al_dia' ? 'success' : 'error'}
              size="small"
            />
          </Stack>
          <Typography variant="body2">DNI: {member.dni}</Typography>
        </Box>

        <Button
          variant="contained"
          color="success"
          onClick={() => handleRegisterAssistance(member.id)}
        >
          Registrar Asistencia
        </Button>
      </Stack>
    </Paper>

    <AssistanceHistoryTable
      assistances={assistances}
      onEdit={(id) => console.log('Editar asistencia', id)}
      onDelete={(id) => console.log('Eliminar asistencia', id)}
    />
  </>
)}

    </div>
  );
};

export default AssistanceHistoryPage;
