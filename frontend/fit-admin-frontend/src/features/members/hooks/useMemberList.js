import { useState, useEffect } from 'react'
import memberService from '../services/memberService'

const useMemberList = () => {
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchMembers = async () => {
    try {
      setLoading(true)
      const data = await memberService.getAllMembers()
      setMembers(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMembers()
  }, [])

  return {
    members,
    loading,
    error,
    refetch: fetchMembers // 👈 expuesto para actualizar
  }
}

export default useMemberList
