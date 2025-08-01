import { useState } from 'react'
import dashboardService from '../../../dashboard/services/dashboardService' 
import Swal from 'sweetalert2'

const useAssistanceSearch = () => {
  const [query, setQuery] = useState('')
  const [member, setMember] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSearch = async () => {
    if (!query) return

    setLoading(true)
    setError(null)

    try {
      const res = await dashboardService.searchMember(query)
      setMember(res)
    } catch (err) {
      setError('No se encontró al socio.')
      setMember(null)
    } finally {
      setLoading(false)
    }
  }

  const handleRegisterAssistance = async (memberId) => {
    try {
      const now = new Date().toISOString()
      const data = {
        memberId,
        date: now,
        status: 'PERMITIDA',
        reason: ''
      }

      await dashboardService.registerAssistance(data)

      Swal.fire({
        icon: 'success',
        title: 'Asistencia registrada',
        text: `Se registró la asistencia del socio #${memberId}`,
        timer: 1500,
        showConfirmButton: false
      })
       setMember(null)
    } catch (error) {
      console.error('Error al registrar asistencia:', error)
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo registrar la asistencia.'
      })
    }
  }

  return {
    query,
    setQuery,
    member,
    loading,
    error,
    handleSearch,
    handleRegisterAssistance
  }
}

export default useAssistanceSearch
