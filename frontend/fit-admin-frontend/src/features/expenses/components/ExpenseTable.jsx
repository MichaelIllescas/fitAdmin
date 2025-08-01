import React, { useState } from "react";
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
  MenuItem,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { fetchExpenses } from "../hooks/useFetchExpenses";
import DeleteExpenseModal from "./DeleteExpenseModal";
import useDeleteExpense from "../hooks/useDeleteExpense";
import EditExpenseModal from "./EditExpenseModal";
import useEditExpense from "../hooks/useEditExpense";

const ExpenseTable = ({ expenses, setExpenses, setLoading, setError }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const { deleteExpense, isDeleting } = useDeleteExpense();
  const [openEditModal, setOpenEditModal] = useState(false);
  const { editExpense, isEditing } = useEditExpense();

  const handleEdit = () => {
    setOpenEditModal(true);
    handleCloseMenu();
  };

  const confirmEdit = async (updatedData) => {
    await editExpense(selectedExpense.id, updatedData, async () => {
      setOpenEditModal(false);
      await fetchExpenses(setExpenses, setLoading, setError);
    });
  };

  const handleOpenMenu = (event, expense) => {
    setAnchorEl(event.currentTarget);
    setSelectedExpense(expense);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };



  const handleDelete = () => {
    if (!selectedExpense) return;
    setOpenDeleteModal(true);
    handleCloseMenu();
  };

  const confirmDelete = async () => {
    await deleteExpense(selectedExpense.id, async () => {
      setOpenDeleteModal(false);
      await fetchExpenses(setExpenses, setLoading, setError);
      Swal.fire(
        "Eliminado",
        "El gasto ha sido eliminado exitosamente.",
        "success"
      );
    });
  };

  const formatDate = (dateString) => {
  const date = new Date(dateString)
  const corrected = new Date(date.getTime() + date.getTimezoneOffset() * 60000)
  return corrected.toLocaleDateString('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}


  if (expenses.length === 0) return <p>No hay gastos registrados.</p>;

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <strong>Descripción</strong>
            </TableCell>
            <TableCell>
              <strong>Monto ($)</strong>
            </TableCell>
            <TableCell>
              <strong>Fecha</strong>
            </TableCell>
            <TableCell align="right">
              <strong>Acciones</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {expenses.map((exp) => (
            <TableRow key={exp.id}>
              <TableCell>{exp.description}</TableCell>
              <TableCell>{exp.amount.toLocaleString("es-AR")}</TableCell>
              <TableCell>{formatDate(exp.date)}</TableCell>
              <TableCell align="right">
                <IconButton onClick={(e) => handleOpenMenu(e, exp)}>
                  <MoreVertIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={handleEdit}>Editar</MenuItem>
        <MenuItem onClick={handleDelete}>Eliminar</MenuItem>
      </Menu>

      <DeleteExpenseModal
        open={openDeleteModal}
        onClose={() => {
          setOpenDeleteModal(false);
          setSelectedExpense(null);
        }}
        onConfirm={confirmDelete}
        isDeleting={isDeleting}
      />


      <EditExpenseModal
  open={openEditModal}
  onClose={() => setOpenEditModal(false)}
  onConfirm={confirmEdit}
  expense={selectedExpense}
/>
    </TableContainer>
  );
};

export default ExpenseTable;
