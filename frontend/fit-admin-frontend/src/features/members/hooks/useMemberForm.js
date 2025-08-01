import { useState } from 'react'
import Swal from 'sweetalert2'
import memberService from '../services/memberService'

const useMemberForm = ({ initialData = {}, onSuccess }) => {
  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    documentNumber: '',
    phone: '',
    birthDate: '',
    gender: '',
    feeId: '', // 🆕 campo agregado
    ...initialData
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await memberService.registerMember(values)

      Swal.fire({
        icon: 'success',
        title: 'Socio registrado correctamente',
        showConfirmButton: false,
        timer: 1500
      })

      if (onSuccess) onSuccess()

      setValues({
        firstName: '',
        lastName: '',
        documentNumber: '',
        phone: '',
        birthDate: '',
        gender: '',
        feeId: '' // 🧹 limpiar también
      })
    } catch (error) {
      console.error(error)
      Swal.fire({
        icon: 'error',
        title: 'Error al registrar el socio',
        text: error?.response?.data?.message || 'Intente nuevamente'
      })
    }
  }

  return {
    values,
    handleChange,
    handleSubmit
  }
}

export default useMemberForm
