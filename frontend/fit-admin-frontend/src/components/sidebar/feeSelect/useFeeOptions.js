import { useEffect, useState } from 'react'
import { getAllFees } from '../../../features/fees/services/feeService'

const useFeeOptions = () => {
  const [fees, setFees] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchFees = async () => {
      try {
        const data = await getAllFees()
        setFees(data)
      } catch (err) {
        console.error('Error cargando cuotas:', err)
        setError('No se pudieron cargar las cuotas')
      } finally {
        setLoading(false)
      }
    }

    fetchFees()
  }, [])

  return { fees, loading, error }
}

export default useFeeOptions
