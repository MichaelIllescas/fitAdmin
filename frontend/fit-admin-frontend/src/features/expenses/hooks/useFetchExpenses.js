import { useEffect, useState } from 'react'
import expenseService from '../services/expenseService'

// 👇 función reutilizable exportada
export const fetchExpenses = async (setExpenses, setLoading, setError) => {
  try {
    setLoading(true)
    const data = await expenseService.getAllExpenses()
    setExpenses(data)
  } catch (err) {
    console.error(err)
    setError('No se pudieron cargar los gastos.')
  } finally {
    setLoading(false)
  }
}

const useFetchExpenses = () => {
  const [expenses, setExpenses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchExpenses(setExpenses, setLoading, setError)
  }, [])

  return { expenses, loading, error, setExpenses, setLoading, setError }
}

export default useFetchExpenses
