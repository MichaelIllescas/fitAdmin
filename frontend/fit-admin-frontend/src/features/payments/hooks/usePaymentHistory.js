import { useState } from 'react'
import {getPaymentsByQuery} from '../services/paymentService'

const usePaymentHistory = () => {
  const [query, setQuery] = useState('')
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchPayments = async () => {
    try {
      setLoading(true)
      setError(null)

      const result = await getPaymentsByQuery(query)
      setPayments(result)
    } catch (err) {
      setError(err.response.data.message)
      setPayments([])
    } finally {
      setLoading(false)
    }
  }

  return {
    query,
    setQuery,
    payments,
    setPayments,
    loading,
    error,
    fetchPayments
  }
}

export default usePaymentHistory
