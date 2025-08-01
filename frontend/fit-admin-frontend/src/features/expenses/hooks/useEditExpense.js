import { useState } from 'react'
import expenseService from '../services/expenseService'
import Swal from 'sweetalert2'

const useEditExpense = () => {
  const [isEditing, setIsEditing] = useState(false)

  const editExpense = async (id, updatedData, onSuccess) => {
    setIsEditing(true)
    try {
      await expenseService.updateExpense(id, updatedData)
      Swal.fire('Actualizado', 'El gasto fue modificado exitosamente.', 'success')
      if (onSuccess) onSuccess()
    } catch (error) {
      console.error('Error al editar gasto:', error)
      Swal.fire('Error', 'No se pudo editar el gasto.', 'error')
    } finally {
      setIsEditing(false)
    }
  }

  return { editExpense, isEditing }
}

export default useEditExpense
