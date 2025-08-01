import React, { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Menu,
  MenuItem
} from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'

const formatDateTime = (isoDate) => {
  const date = new Date(isoDate)
  return `${date.toLocaleDateString('es-AR')} - ${date.toLocaleTimeString('es-AR', {
    hour: '2-digit',
    minute: '2-digit'
  })}`
}

const AssistanceHistoryTable = ({ assistances, onEdit, onDelete }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedId, setSelectedId] = useState(null)

  const handleOpenMenu = (event, id) => {
    setAnchorEl(event.currentTarget)
    setSelectedId(id)
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
    setSelectedId(null)
  }

  const handleEdit = () => {
    handleCloseMenu()
    onEdit(selectedId)
  }

  const handleDelete = () => {
    handleCloseMenu()
    onDelete(selectedId)
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow style={{ backgroundColor: '#343a40' }}>
            <TableCell style={{ color: 'white' }}>Fecha y Hora</TableCell>
            <TableCell style={{ color: 'white' }} align="right">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {assistances.map((a) => (
            <TableRow key={a.id}>
              <TableCell>{formatDateTime(a.date)}</TableCell>
              <TableCell align="right">
                <IconButton onClick={(e) => handleOpenMenu(e, a.id)}>
                  <MoreVertIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Menú desplegable */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={handleEdit}>✏️ Editar</MenuItem>
        <MenuItem onClick={handleDelete}>🗑️ Eliminar</MenuItem>
      </Menu>
    </TableContainer>
  )
}

export default AssistanceHistoryTable
