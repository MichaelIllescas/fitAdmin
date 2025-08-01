import { useState } from 'react'
import Swal from 'sweetalert2'
import { registerFee } from '../services/feeService'

const useFeeForm = () => {
  const [values, setValues] = useState({
    name: '',
    price: '',
    durationInDays: ''
  })

  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Transformar los datos numéricos a número real
      const payload = {
        name: values.name,
        price: parseFloat(values.price),
        durationInDays: parseInt(values.durationInDays)
      }

      await registerFee(payload)
      Swal.fire({
        icon: 'success',
        title: 'Cuota registrada correctamente',
        timer: 1500,
        showConfirmButton: false
      })
      setValues({ name: '', price: '', durationInDays: '' })
    } catch (error) {
      console.error('Error registrando cuota:', error)
      Swal.fire({
        icon: 'error',
        title: 'Error al registrar la cuota',
        text: 'Verificá los datos e intentá nuevamente'
      })
    } finally {
      setLoading(false)
    }
  }

  return { values, loading, handleChange, handleSubmit }
}

export default useFeeForm
