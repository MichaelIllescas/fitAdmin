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
  TablePagination,
  TextField,
  Box,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const formatDateTime = (isoDate) => {
  const date = new Date(isoDate);
  return `${date.toLocaleDateString("es-AR")} - ${date.toLocaleTimeString(
    "es-AR",
    {
      hour: "2-digit",
      minute: "2-digit",
    }
  )}`;
};

const AssistanceTable = ({ assistances, onDelete }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  const [search, setSearch] = useState(""); // 🔑 estado para buscador

  const handleOpen = (e, id) => {
    setAnchorEl(e.currentTarget);
    setSelectedId(id);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedId(null);
  };

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  // 🔎 Filtrar por nombre, apellido o DNI
  const filteredAssistances = assistances.filter((a) => {
    const fullName = `${a.member?.firstName || ""} ${a.member?.lastName || ""}`.toLowerCase();
    const dni = a.member?.documentNumber?.toString() || "";
    return (
      fullName.includes(search.toLowerCase()) ||
      dni.includes(search)
    );
  });

  const paginatedAssistances = filteredAssistances.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <TableContainer component={Paper}>
      <Box p={2}>
        <TextField
          label="Buscar socio (nombre, apellido o DNI)"
          variant="outlined"
          fullWidth
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(0); // 🔑 resetear a la primera página al buscar
          }}
        />
      </Box>

      <Table>
        <TableHead>
          <TableRow style={{ backgroundColor: "#343a40" }}>
            <TableCell style={{ color: "white" }}>Socio</TableCell>
            <TableCell style={{ color: "white" }}>DNI</TableCell>
            <TableCell style={{ color: "white" }}>Fecha y Hora</TableCell>
            <TableCell style={{ color: "white" }} align="right">
              Acciones
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {paginatedAssistances.map((a) => (
            <TableRow key={a.id}>
              <TableCell>
                {a.member?.firstName} {a.member?.lastName}
              </TableCell>
              <TableCell>{a.member?.documentNumber}</TableCell>
              <TableCell>{formatDateTime(a.date)}</TableCell>
              <TableCell align="right">
                <IconButton onClick={(e) => handleOpen(e, a.id)}>
                  <MoreVertIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}

          {paginatedAssistances.length === 0 && (
            <TableRow>
              <TableCell colSpan={4} align="center">
                No se encontraron resultados.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <TablePagination
        rowsPerPageOptions={[10]}
        component="div"
        count={filteredAssistances.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
      />

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem
          onClick={() => {
            onDelete(selectedId);
            handleClose();
          }}
        >
          Eliminar
        </MenuItem>
      </Menu>
    </TableContainer>
  );
};

export default AssistanceTable;
