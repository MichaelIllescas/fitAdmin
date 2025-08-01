import { useState } from 'react'

const usePaymentHistory = () => {
  const [query, setQuery] = useState('')
  const [member, setMember] = useState(null)
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(false)

  const handleSearch = async () => {
    if (query.trim() === '') return

    setLoading(true)

    try {
      // Simulamos búsqueda en el backend
      await new Promise((res) => setTimeout(res, 800))

      // Socio simulado
      const fakeMember = {
        id: 1,
        name: 'Juan',
        lastName: 'Pérez',
        dni: '12345678'
      }

      // Pagos simulados
      const fakePayments = [
        { id: 1, date: '2025-07-01', amount: 8000, type: 'Cuota Mensual', status: 'pagado' },
        { id: 2, date: '2025-06-01', amount: 8000, type: 'Funcional', status: 'pagado' },
        { id: 3, date: '2025-05-01', amount: 8000, type: 'Cuota Mensual', status: 'atrasado' }
      ]

      setMember(fakeMember)
      setPayments(fakePayments)
    } catch (e) {
      console.error('Error al buscar pagos:', e)
    } finally {
      setLoading(false)
    }
  }

  return {
    query,
    setQuery,
    member,
    payments,
    loading,
    handleSearch
  }
}

export default usePaymentHistory
