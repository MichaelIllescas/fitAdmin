import React from 'react'
import { Typography } from '@mui/material'
import FeeForm from '../components/FeeForm'
import useFeeForm from '../hooks/useFeeForm'

const RegisterFeePage = () => {
  const { values, loading, handleChange, handleSubmit } = useFeeForm()

  return (
    <div>
      <Typography variant="h5" className="mb-4">Registrar Nueva Cuota / Servicio</Typography>

      <FeeForm
        values={values}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </div>
  )
}

export default RegisterFeePage
