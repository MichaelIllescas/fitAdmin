import { useState } from 'react'
import Swal from 'sweetalert2'
import expenseService from '../services/expenseService'

const useRegisterExpense = () => {
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    date: ''
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validate = () => {
    const newErrors = {}
    if (!formData.description.trim()) newErrors.description = 'La descripción es obligatoria'
    if (!formData.amount || isNaN(formData.amount)) newErrors.amount = 'El monto es obligatorio y debe ser numérico'
    if (!formData.date) newErrors.date = 'La fecha es obligatoria'
    return newErrors
  }

  const onChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validate()
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) return

    setIsSubmitting(true)
    try {
      await expenseService.registerExpense(formData)
      Swal.fire({
        icon: 'success',
        title: 'Gasto registrado con éxito',
        showConfirmButton: false,
        timer: 1500
      })
      setFormData({ description: '', amount: '', date: '' })
    } catch (error) {
      console.error(error)
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un error al registrar el gasto'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    formData,
    errors,
    isSubmitting,
    onChange,
    onSubmit
  }
}

export default useRegisterExpense
