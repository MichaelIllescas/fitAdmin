import { useState } from 'react'
import Swal from 'sweetalert2'
import memberService from '../services/dashboardService'

const useDashboard = () => {
  const [query, setQuery] = useState('')
  const [member, setMember] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSearch = async () => {
    if (query.trim() === '') {
      setError('Por favor ingrese un nombre, apellido o DNI.')
      return
    }

    setLoading(true)
    setError('')
    setMember(null)

    try {
      const data = await memberService.searchMember(query)
      setMember(data)
    } catch (err) {
      console.error(err)

      if (err.response?.status === 404) {
        setError('Socio no encontrado.')
      } else {
        setError('Ocurrió un error al buscar el socio.')
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo realizar la búsqueda.'
        })
      }
    } finally {
      setLoading(false)
    }
  }

  const handleClear = () => {
    setQuery('')
    setMember(null)
    setError('')
  }

  return {
    query,
    setQuery,
    member,
    loading,
    error,
    handleSearch,
    handleClear
  }
}

export default useDashboard
