import { useState } from 'react'
import { fetchDailyIncome } from '../services/financeService'

const useDailyIncome = () => {
  const [date, setDate] = useState('')
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchData = async () => {
    if (!date) return
    setLoading(true)
    setError(null)

    try {
      const result = await fetchDailyIncome(date)
      setData(result)
    } catch (err) {
      console.error(err)
      setError('No se pudieron obtener los ingresos.')
    } finally {
      setLoading(false)
    }
  }

  const clearData = () => {
    setDate('')
    setData(null)
    setError(null)
  }

  return {
    date,
    setDate,
    data,
    loading,
    error,
    fetchData,
    clearData
  }
}

export default useDailyIncome
