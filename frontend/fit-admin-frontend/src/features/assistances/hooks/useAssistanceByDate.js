import { useState } from 'react'
import assistanceService from '../services/assistanceService'

const useAssistanceByDate = () => {
  const [date, setDate] = useState('')
  const [assistances, setAssistances] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchData = async (selectedDate) => {
    setLoading(true)
    setError(null)

    try {
      const res = await assistanceService.getByDate(selectedDate)
      setAssistances(res.data)
    } catch (err) {
      console.error('Error al buscar asistencias por fecha:', err)
      setError('No se pudieron obtener asistencias.')
      setAssistances([])
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async () => {
    if (!date) return
    await fetchData(date)
  }

  const handleClear = () => {
    setDate('')
    setAssistances([])
    setError(null)
  }

  return {
    date,
    setDate,
    assistances,
    loading,
    error,
    handleSearch,
    handleClear,
    refetch: () => date && fetchData(date) // ✅ ahora podés usar refetch()
  }
}

export default useAssistanceByDate
