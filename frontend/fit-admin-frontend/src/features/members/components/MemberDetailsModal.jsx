import React from 'react'
import {
  Modal,
  Box,
  Typography,
  Divider,
  Chip,
  Button,
  Stack
} from '@mui/material'

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 450,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 2,
  p: 4
}

const formatDate = (dateString) => {
  if (!dateString) return '-'
  const [year, month, day] = dateString.split('-')
  return `${day}/${month}/${year}`
}

const MemberDetailsModal = ({ open, onClose, member }) => {
  if (!member) return null


  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6" gutterBottom>
          Detalles del Socio
        </Typography>
        <Divider className="mb-3" />

        <Stack spacing={1}>
          <Typography><strong>Nombre:</strong> {member.firstName} {member.lastName}</Typography>
          <Typography><strong>DNI:</strong> {member.documentNumber}</Typography>
          <Typography><strong>Teléfono:</strong> {member.phone || '-'}</Typography>
          <Typography><strong>Fecha de nacimiento:</strong> {formatDate(member.birthDate)}</Typography>
          <Typography><strong>Sexo:</strong> {member.gender || '-'}</Typography>
        <Typography component="span">
      Estado:{' '}
      <Chip
        label={member.status}
        color={member.status == 'Activo'? 'success' : 'error'}
        size="small"
      />
    </Typography>
          <Typography><strong>Tipo de cuota:</strong> {member.feeType.name || '-'}</Typography>
        </Stack>

        <Box mt={3} textAlign="right">
          <Button variant="contained" onClick={onClose}>
            Cerrar
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default MemberDetailsModal
