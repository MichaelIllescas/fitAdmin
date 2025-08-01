import React from "react";
import { Typography, CircularProgress } from "@mui/material";
import AssistanceSearchForm from "../components/AssistanceSearchForm";
import AssistanceHeader from "../components/AssistanceHeader";
import AssistanceTable from "../components/AssistanceTable";
import useAssistanceHistory from "../hooks/useAssistanceHistory";
import Swal from "sweetalert2";
import useRegisterAssistance from "../../../dashboard/hooks/useRegisterAssistance";
import useDeleteAssistance from "../hooks/useDeleteAssistance";

const AssistanceHistoryPage = () => {
  const {
    query,
    setQuery,
    member,
    setMember,
    assistances,
    loading,
    error,
    handleSearch,
  
      refetch
  } = useAssistanceHistory();
const { handleDelete } = useDeleteAssistance(refetch)
  const { handleRegister } = useRegisterAssistance(refetch);

  return (
    <div>
      <Typography variant="h5" className="mb-3">
        Historial de Asistencias
      </Typography>

      <AssistanceSearchForm
        query={query}
        setQuery={setQuery}
        onSearch={handleSearch}
        loading={loading}
        onClear={() => {
    setQuery('')
    setMember(null) // 👈 limpia el resultado si querés
  }}
      />

      {error && <div className="alert alert-danger mt-2">{error}</div>}

      {member && (
        <>
          {member && (
            <AssistanceHeader
              member={member}
              onRegister={() => handleRegister(member.id)}
            />
          )}

          {loading ? (
            <CircularProgress />
          ) : (
            <AssistanceTable assistances={assistances} onDelete={handleDelete} />
          )}
        </>
      )}
    </div>
  );
};

export default AssistanceHistoryPage;
