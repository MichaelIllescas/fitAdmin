import React from "react"
import { Typography } from "@mui/material"
import { useLocation } from "react-router-dom"
import SearchMemberPaymentForm from "../components/SearchMemberPaymentForm"
import PaymentForm from "../components/PaymentForm"
import useRegisterPayment from "../hooks/useRegisterPayment"

const RegisterPaymentPage = () => {
  const location = useLocation()
  const preloadedMember = location.state?.member || null

  const {
    query,
    setQuery,
    member,
    loading,
    handleSearch,
    formValues,
    setFormValues,
    handleSubmit,
    lastPayment,
    getPaymentStatus
  } = useRegisterPayment(null, preloadedMember) // ✅ pasamos el member si viene desde el botón

  return (
    <div>
      <Typography variant="h5" className="mb-4">
        Registrar Pago
      </Typography>

      <SearchMemberPaymentForm
        query={query}
        setQuery={setQuery}
        onSearch={handleSearch}
        loading={loading}
      />

      {member && (
        <PaymentForm
          member={member}
          values={formValues}
          setValues={setFormValues}
          onSubmit={handleSubmit}
          getPaymentStatus={getPaymentStatus}
          lastPayment={lastPayment}
        />
      )}
    </div>
  )
}

export default RegisterPaymentPage
