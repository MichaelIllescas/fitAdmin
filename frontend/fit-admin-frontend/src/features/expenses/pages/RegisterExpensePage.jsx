import React from 'react'
import ExpenseRegisterForm from '../components/ExpenseRegisterForm'
import useRegisterExpense from '../hooks/useRegisterExpense'
import { Typography } from '@mui/material'

const RegisterExpensePage = () => {
  const {
    formData,
    errors,
    isSubmitting,
    onChange,
    onSubmit
  } = useRegisterExpense()

  return (
    <div>
      <Typography variant="h5" className="mb-4">Registrar Gasto</Typography>
      <ExpenseRegisterForm
        formData={formData}
        errors={errors}
        onChange={onChange}
        onSubmit={onSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  )
}

export default RegisterExpensePage
