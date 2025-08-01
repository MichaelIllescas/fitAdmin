import { useState } from 'react'
import Swal from 'sweetalert2'

const useAssistanceHistory = () => {
  const [query, setQuery] = useState('')
  const [member, setMember] = useState(null)
  const [assistances, setAssistances] = useState([])
  const [loading, setLoading] = useState(false)

  const handleSearch = async () => {
    if (query.trim() === '') return

    setLoading(true)

    try {
      await new Promise((res) => setTimeout(res, 800)) // Simulación

      const fakeMember = {
        id: 1,
        name: 'Juan',
        lastName: 'Pérez',
        dni: '12345678'
      }

      const fakeAssistances = [
        { id: 1, date: '2025-07-17T08:45:00' },
        { id: 2, date: '2025-07-16T19:00:00' },
        { id: 3, date: '2025-07-15T07:30:00' }
      ]

      setMember(fakeMember)
      setAssistances(fakeAssistances)
    } catch (e) {
      console.error('Error al buscar asistencias:', e)
    } finally {
      setLoading(false)
    }
  }
  const handleRegisterAssistance = async (memberId) => {
  try {
    // Simulación de registro
    await new Promise((res) => setTimeout(res, 500))

    const nueva = {
      id: Date.now(),
      date: new Date().toISOString()
    }

    setAssistances(prev => [nueva, ...prev])

    Swal.fire({
      icon: 'success',
      title: 'Asistencia registrada correctamente',
      timer: 1500,
      showConfirmButton: false
    })
  } catch (error) {
    console.error('Error registrando asistencia:', error)
    Swal.fire({
      icon: 'error',
      title: 'Error al registrar asistencia',
      text: 'Intente nuevamente.'
    })
  }
}


  return {
    query,
    setQuery,
    member,
    assistances,
    loading,
    handleSearch,
    handleRegisterAssistance
  }
}

export default useAssistanceHistory
