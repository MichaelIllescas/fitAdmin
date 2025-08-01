import { useEffect, useState } from 'react'
import { getAllFees } from '../services/feeService'

const useFetchFees = () => {
  const [fees, setFees] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchFees = async () => {
    setLoading(true)
    try {
      const data = await getAllFees()
      setFees(data)
      setError(null)
    } catch (err) {
      console.error('Error fetching fees:', err)
      setError('Error al cargar las cuotas')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchFees()
  }, [])

  return { fees, loading, error, refetch: fetchFees }
}

export default useFetchFees
