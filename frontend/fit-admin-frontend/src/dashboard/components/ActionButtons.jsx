import React from 'react'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import useRegisterAssistance from '../hooks/useRegisterAssistance' 

const ActionButtons = ({ member }) => {
  const navigate = useNavigate()
  const { handleRegister, loading } = useRegisterAssistance()

  const handleRegisterAttendance = () => {
    handleRegister(member.id)
  }

  const handleRegisterPayment = () => {
    navigate('/pagos/registrar', {
      state: { member }
    })
  }

  return (
    <div className="d-flex gap-2">
      <Button
        variant="contained"
        color="success"
        onClick={handleRegisterAttendance}
        disabled={loading}
      >
        Registrar Asistencia
      </Button>

      <Button
        variant="outlined"
        color="primary"
        onClick={handleRegisterPayment}
      >
        Registrar Pago
      </Button>
    </div>
  )
}

export default ActionButtons
