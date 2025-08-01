import { useState } from 'react'
import { getAllPayments } from '../services/paymentService'

const useFetchPayments = () => {
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchPayments = async () => {
    try {
      setLoading(true)
      const res = await getAllPayments()
      setPayments(res.data)
      setError(null)
    } catch (err) {
      console.error(err)
      setError('Error al obtener los pagos')
    } finally {
      setLoading(false)
    }
  }

  return { payments, loading, error, fetchPayments }
}

export default useFetchPayments
