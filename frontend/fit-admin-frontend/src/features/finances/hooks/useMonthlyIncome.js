import { useEffect, useState } from 'react'
import { fetchMonthlyIncomes } from '../services/financeService'

const useMonthlyIncome = () => {
  const currentYear = new Date().getFullYear()
  const [selectedYear, setSelectedYear] = useState(currentYear)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Mostrar desde 3 años antes hasta 3 años después del actual
  const [yearsAvailable] = useState(() => {
    const start = currentYear - 3
    const end = currentYear + 3
    return Array.from({ length: end - start + 1 }, (_, i) => start + i)
  })

  const monthLabels = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']

  const fetchData = async (year) => {
    try {
      setLoading(true)
      setError(null)

      const result = await fetchMonthlyIncomes(year)

      const fullData = monthLabels.map((month, idx) => {
        const match = result.find((r) => parseInt(r.month) === idx + 1)
        return {
          month,
          amount: match ? match.amount : 0
        }
      })

      setData(fullData)
    } catch (err) {
      console.error(err)
      setError('Error al cargar los ingresos mensuales.')
      setData([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData(selectedYear)
  }, [selectedYear])

  return {
    selectedYear,
    setSelectedYear,
    data,
    loading,
    error,
    yearsAvailable
  }
}

export default useMonthlyIncome
