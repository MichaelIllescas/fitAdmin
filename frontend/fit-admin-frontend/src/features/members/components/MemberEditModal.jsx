import React from 'react'
import { Modal, Box, Typography } from '@mui/material'
import MemberForm from './MemberForm'
import useMemberEdit from '../hooks/useMemberEdit'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth: 600,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4
}

const MemberEditModal = ({ open, onClose, member, onUpdated }) => {
  const {
    formData,
    handleChange,
    handleSubmit,
    loading
  } = useMemberEdit(member, onClose, onUpdated)

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" gutterBottom>
          Editar Socio
        </Typography>

        <MemberForm
          values={formData}
          onChange={handleChange}
          onSubmit={handleSubmit}
          isEditing={true}
          loading={loading}
        />
      </Box>
    </Modal>
  )
}

export default MemberEditModal
