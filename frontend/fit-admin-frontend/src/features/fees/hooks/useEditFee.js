import { useState } from 'react'
import Swal from 'sweetalert2'
import { updateFee } from '../services/feeService'

const useEditFee = (initialFee = null) => {
  const [selectedFee, setSelectedFee] = useState(initialFee)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setSelectedFee((prev) => ({
      ...prev,
      [name]: name === 'price' || name === 'durationInDays' ? Number(value) : value
    }))
  }

  const handleSubmit = async (e, onSuccess) => {
    e.preventDefault()
    setLoading(true)

    try {
      await updateFee(selectedFee.id, selectedFee)
      Swal.fire({
        icon: 'success',
        title: 'Cuota actualizada correctamente',
        timer: 1500,
        showConfirmButton: false
      })
      onSuccess()
    } catch (error) {
      console.error(error)
      Swal.fire({
        icon: 'error',
        title: 'Error al actualizar la cuota',
        text: 'Intentá nuevamente.'
      })
    } finally {
      setLoading(false)
    }
  }

  return {
    selectedFee,
    setSelectedFee,
    loading,
    handleChange,
    handleSubmit
  }
}

export default useEditFee
