import { useState } from 'react'
import assistanceService from '../services/assistanceService'
import Swal from 'sweetalert2'

const useAssistanceHistory = () => {
  const [query, setQuery] = useState('')
  const [member, setMember] = useState(null)
  const [assistances, setAssistances] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchAssistances = async (memberId) => {
    try {
      const history = await assistanceService.getHistoryByMemberId(memberId)
      setAssistances(history.data)
    } catch (err) {
      console.error('Error al obtener historial:', err)
      setAssistances([])
    }
  }

  const handleSearch = async () => {
    if (!query) return

    setLoading(true)
    setError(null)

    try {
      const res = await assistanceService.searchMember(query)
      const foundMember = res.data.member || res.data
      setMember(foundMember)

      await fetchAssistances(foundMember.id)
    } catch (err) {
      console.error('Error al buscar historial:', err)
      setError('No se pudo encontrar al socio o su historial.')
      setMember(null)
      setAssistances([])
    } finally {
      setLoading(false)
    }
  }

  return {
    query,
    setQuery,
    member,
    setMember,
    assistances,
    loading,
    error,
    handleSearch,
    refetch: () => member && fetchAssistances(member.id) // ✅ refetch externo
  }
}


export default useAssistanceHistory
