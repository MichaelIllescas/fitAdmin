  import { useState } from 'react'
  import Swal from 'sweetalert2'
  import dashboardService from '../services/dashboardService'

const useRegisterAssistance = (onSuccess) => {
  const { registerAssistance } = dashboardService
  const [loading, setLoading] = useState(false)

  const handleRegister = async (memberId) => {
    setLoading(true)
    try {
      const now = new Date().toISOString()
      const data = {
        memberId,
        date: now,
        status: 'PERMITIDA',
        reason: ''
      }

      await registerAssistance(data)

      Swal.fire({
        icon: 'success',
        title: 'Asistencia registrada',
        text: `Se registró la asistencia del socio #${memberId}`,
        timer: 1500,
        showConfirmButton: false
      })

      if (onSuccess) onSuccess() // ✅ disparar refetch
    } catch (error) {
      console.error('Error al registrar asistencia:', error)
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo registrar la asistencia.'
      })
    } finally {
      setLoading(false)
    }
  }

  return { handleRegister, loading }
}


  export default useRegisterAssistance
