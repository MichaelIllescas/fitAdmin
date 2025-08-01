import { useEffect, useState } from "react"
import memberService from "../services/memberService"
import Swal from "sweetalert2"

const useMemberEdit = (member, onClose, onUpdated) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    documentNumber: '',
    phone: '',
    birthDate: '',
    gender: '',
    feeId: ''
  })

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (member) {
      setFormData({
        firstName: member.firstName || '',
        lastName: member.lastName || '',
        documentNumber: member.documentNumber || '',
        phone: member.phone || '',
        birthDate: member.birthDate || '',
        gender: member.gender || '',
        feeId: member.feeId || ''
      })
    }
  }, [member])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await memberService.updateMember(member.id, formData)

      onClose?.()      // ✅ cerrar el modal primero
      onUpdated?.()    // ✅ refrescar la lista

      // ✅ lanzar el swal después de cerrar
      setTimeout(() => {
        Swal.fire({
          icon: 'success',
          title: 'Socio actualizado',
          text: 'Los datos fueron guardados correctamente.',
          confirmButtonColor: '#3085d6'
        })
      }, 300)
    } catch (err) {
      console.error('Error al actualizar socio:', err)
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo actualizar el socio.',
        confirmButtonColor: '#d33'
      })
    } finally {
      setLoading(false)
    }
  }

  return {
    formData,
    handleChange,
    handleSubmit,
    loading
  }
}

export default useMemberEdit
