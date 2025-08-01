import React from 'react'
import { Paper, Typography, Box, Stack, Button, Chip } from '@mui/material'

const AssistanceHeader = ({ member, onRegister }) => {
  const isUpToDate = member.status === 'al_dia' || member.status === 'Activo'

    // 🔹 Función para formatear fecha
  const formatDate = (dateString) => {
    if (!dateString) return "-"
    const [year, month, day] = dateString.split('-') // YYYY-MM-DD
    return `${day}/${month}/${year}` // dd/mm/yyyy
  }

  return (
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
              {member.firstName} {member.lastName}
            </Typography>
            <Chip
              label={isUpToDate ? 'Al día' : 'Atrasado'}
              color={isUpToDate ? 'success' : 'error'}
              size="small"
            />
          </Stack>
          <Typography variant="body2">
            DNI: {member.documentNumber}
          </Typography>

          {member.lastPayment && (
            <Typography variant="body2" className="mt-1">
              Último pago: {formatDate(member.lastPayment.paymentDate)} ({member.lastPayment.feeType.name})
            </Typography>
          )}
        </Box>

        <Button variant="contained" color="success" onClick={onRegister}>
          Registrar Asistencia
        </Button>
      </Stack>
    </Paper>
  )
}

export default AssistanceHeader
