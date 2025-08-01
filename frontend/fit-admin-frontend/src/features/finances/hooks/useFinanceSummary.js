import { useEffect, useState } from 'react'
import { getMonthlyFinanceByYear } from '../services/financeService'

const useFinanceSummary = () => {
  const currentYear = new Date().getFullYear()
  const [selectedYear, setSelectedYear] = useState(currentYear)
  const [monthlyData, setMonthlyData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

const yearsAvailable = Array.from({ length: 7 }, (_, i) => currentYear - 3 + i);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await getMonthlyFinanceByYear(selectedYear)
        setMonthlyData(data)
      } catch (err) {
        console.error(err)
        setError('No se pudo obtener la información financiera.')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [selectedYear])

  const totalIncome = monthlyData.reduce((acc, cur) => acc + cur.income, 0)
  const totalExpense = monthlyData.reduce((acc, cur) => acc + cur.expense, 0)
  const netProfit = totalIncome - totalExpense

  return {
    selectedYear,
    setSelectedYear,
    yearsAvailable,
    monthlyData,
    totalIncome,
    totalExpense,
    netProfit,
    loading,
    error
  }
}

export default useFinanceSummary
