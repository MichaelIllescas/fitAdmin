import React from 'react'
import AssistanceSearchForm from '../components/AssistanceSearchForm'
import AssistanceHeader from '../components/AssistanceHeader'
import useAssistanceSearch from '../hooks/useAssistanceSearch'
import { Typography } from '@mui/material'

const RegisterAssistancePage = () => {
  const {
    query,
    setQuery,
    member,
    loading,
    error,
    handleSearch,
    handleRegisterAssistance
  } = useAssistanceSearch()

  return (
    <div>
      <Typography variant="h5" className="mb-4">Registrar Ingreso</Typography>

      <AssistanceSearchForm
        query={query}
        setQuery={setQuery}
        onSearch={handleSearch}
        loading={loading}
      />

      {error && <div className="alert alert-danger mt-3">{error}</div>}

      {member && (
        <AssistanceHeader
          member={member}
          onRegister={() => handleRegisterAssistance(member.id)}
        />
      )}
    </div>
  )
}

export default RegisterAssistancePage
