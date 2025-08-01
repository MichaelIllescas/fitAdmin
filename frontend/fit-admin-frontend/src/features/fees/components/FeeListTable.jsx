import React, { useState } from 'react'
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  IconButton,
  Menu,
  MenuItem,
  TableContainer
} from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import EditFeeModal from './EditFeeModal'
import useEditFee from '../hooks/useEditFee'
import useDeleteFee from '../hooks/useDeleteFee'

const FeeListTable = ({ fees, onUpdate }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedFeeId, setSelectedFeeId] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { handleDelete } = useDeleteFee(onUpdate)
  const {
    selectedFee,
    setSelectedFee,
    handleChange,
    handleSubmit,
    loading
  } = useEditFee()

  const handleMenuOpen = (event, id) => {
    setAnchorEl(event.currentTarget)
    setSelectedFeeId(id)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    setSelectedFeeId(null)
  }

  const handleEdit = () => {
    const feeToEdit = fees.find(fee => fee.id === selectedFeeId)
    setSelectedFee(feeToEdit)
    setIsModalOpen(true)
    handleMenuClose()
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleSubmitWrapper = async (e) => {
    await handleSubmit(e, () => {
      setIsModalOpen(false)
      if (onUpdate) onUpdate()
    })
  }



const handleDeleteClick = () => {
  handleMenuClose()
  handleDelete(selectedFeeId)
}

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: '#343a40' }}>
              <TableCell style={{ color: 'white' }}>Nombre</TableCell>
              <TableCell style={{ color: 'white' }}>Monto</TableCell>
              <TableCell style={{ color: 'white' }}>Duración (días)</TableCell>
              <TableCell style={{ color: 'white' }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fees.map((fee) => (
              <TableRow key={fee.id}>
                <TableCell>{fee.name}</TableCell>
                <TableCell>${fee.price}</TableCell>
                <TableCell>{fee.durationInDays} días</TableCell>
                <TableCell>
                  <IconButton onClick={(e) => handleMenuOpen(e, fee.id)}>
                    <MoreVertIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
          <MenuItem onClick={handleEdit}> Editar</MenuItem>
          <MenuItem onClick={handleDeleteClick}> Eliminar</MenuItem>
        </Menu>
      </TableContainer>

      <EditFeeModal
        open={isModalOpen}
        onClose={handleCloseModal}
        fee={selectedFee}
        onChange={handleChange}
        onSubmit={handleSubmitWrapper}
        loading={loading}
      />
    </>
  )
}

export default FeeListTable
