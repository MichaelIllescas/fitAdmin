// ✅ src/features/payments/components/PaymentActionsMenu.jsx
import React, { useState } from 'react'
import { IconButton, Menu, MenuItem } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import useDeletePayment from '../../../features/payments/hooks/useDeletePayment'

const PaymentActionsMenu = ({ row }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleOpen = (e) => setAnchorEl(e.currentTarget)
  const handleClose = () => setAnchorEl(null)

  const { handleDelete } = useDeletePayment(row.onDeleted)

  const handleEdit = () => {
    handleClose()
    row.onEdit?.() // ✅ Llama a la función que abre el modal desde el padre
  }

  return (
    <>
      <IconButton size="small" onClick={handleOpen}>
        <MoreVertIcon fontSize="small" />
      </IconButton>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={handleEdit}>Editar</MenuItem>
        <MenuItem onClick={() => handleDelete(row.id)}>Eliminar</MenuItem>
      </Menu>
    </>
  )
}

export default PaymentActionsMenu
