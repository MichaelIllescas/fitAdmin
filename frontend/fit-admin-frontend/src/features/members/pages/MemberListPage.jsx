import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  TextField,
  Pagination,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MemberDetailsModal from "../components/MemberDetailsModal";
import useMemberList from "../hooks/useMemberList";
import MemberEditModal from "../components/MemberEditModal";
import useMemberDelete from "../hooks/useMemberDelete";

const MemberListPage = () => {
  const { members, loading, error, refetch } = useMemberList();
  const [editOpen, setEditOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const { deleteMemberById } = useMemberDelete(refetch);

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  // 🔎 Busqueda
  const [searchQuery, setSearchQuery] = useState("");

  // 📄 Paginación
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  const handleMenuOpen = (event, id) => {
    setAnchorEl(event.currentTarget);
    setSelectedId(id);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedId(null);
  };

  const handleDelete = () => {
    deleteMemberById(selectedId);
    handleMenuClose();
  };

  const handleViewDetails = () => {
    const member = members.find((m) => m.id === selectedId);
    setSelectedMember(member);
    setDetailsOpen(true);
    handleMenuClose();
  };

  const handleEdit = () => {
    const member = members.find((m) => m.id === selectedId);
    setSelectedMember(member);
    setEditOpen(true);
    handleMenuClose();
  };

  // 🔎 Filtrar socios
  const filteredMembers = useMemo(() => {
    return members.filter((m) =>
      `${m.firstName} ${m.lastName} ${m.documentNumber}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
  }, [members, searchQuery]);

  // 📄 Calcular paginación
  const paginatedMembers = useMemo(() => {
    const startIndex = (page - 1) * itemsPerPage;
    return filteredMembers.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredMembers, page]);

  // 📊 Contar activos e inactivos
  const activeCount = filteredMembers.filter((m) => m.status === "Activo").length;
  const inactiveCount = filteredMembers.filter((m) => m.status === "Inactivo").length;

  return (
    <div>
      <h2 className="mb-4">Lista de Socios</h2>

      <div className="mb-3 d-flex gap-3 align-items-center">
        <Link to="/socios/nuevo">
          <Button variant="contained" color="primary">
            Registrar Socio
          </Button>
        </Link>

        <TextField
          size="small"
          label="Buscar socio"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setPage(1); // resetear a página 1
          }}
        />
      </div>

      <Typography variant="body1" className="mb-3">
        Activos: <strong>{activeCount}</strong> | Inactivos:{" "}
        <strong>{inactiveCount}</strong>
      </Typography>

      {loading && <p>Cargando socios...</p>}
      {error && <p className="text-danger">Error al cargar socios</p>}

      {!loading && members.length === 0 && <p>No hay socios registrados.</p>}

      {!loading && filteredMembers.length > 0 && (
        <>
          <div className="table-responsive">
            <table className="table table-bordered table-hover">
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Nombre</th>
                  <th>DNI</th>
                  <th>Teléfono</th>
                  <th>Estado</th>
                  <th className="text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {paginatedMembers.map((member, index) => (
                  <tr key={member.id}>
                    <td>{(page - 1) * itemsPerPage + index + 1}</td>
                    <td>
                      {member.firstName} {member.lastName}
                    </td>
                    <td>{member.documentNumber}</td>
                    <td>{member.phone || "-"}</td>
                    <td className="text-center">
                      <Chip
                        label={member.status}
                        color={member.status === "Activo" ? "success" : "error"}
                        size="small"
                      />
                    </td>
                    <td className="text-center">
                      <IconButton onClick={(e) => handleMenuOpen(e, member.id)}>
                        <MoreVertIcon />
                      </IconButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="d-flex justify-content-center mt-3">
            <Pagination
              count={Math.ceil(filteredMembers.length / itemsPerPage)}
              page={page}
              onChange={(e, value) => setPage(value)}
              color="primary"
            />
          </div>
        </>
      )}

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleViewDetails}>Ver Detalles</MenuItem>
        <MenuItem onClick={handleEdit}>Editar</MenuItem>
        <MenuItem onClick={handleDelete}>Eliminar</MenuItem>
      </Menu>

      <MemberDetailsModal
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
        member={selectedMember}
      />

      <MemberEditModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        member={selectedMember}
        onUpdated={refetch}
      />
    </div>
  );
};

export default MemberListPage;
