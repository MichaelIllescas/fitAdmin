import { useEffect, useState } from 'react'
import { fetchAnnualProfit } from '../services/financeService'

const useAnnualProfit = () => {
  const currentYear = new Date().getFullYear()
  const [selectedYear, setSelectedYear] = useState(currentYear)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      const result = await fetchAnnualProfit()
      setData(result)
    } catch (err) {
      console.error(err)
      setError('Error al obtener rentabilidad anual.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const profitabilityByYear = data.reduce((acc, item) => {
    acc[item.year] = { income: item.income, expense: item.expense }
    return acc
  }, {})

  const yearsAvailable = Object.keys(profitabilityByYear)

  return {
    selectedYear,
    setSelectedYear,
    income: profitabilityByYear[selectedYear]?.income || 0,
    expense: profitabilityByYear[selectedYear]?.expense || 0,
    yearsAvailable,
    loading,
    error
  }
}

export default useAnnualProfit
