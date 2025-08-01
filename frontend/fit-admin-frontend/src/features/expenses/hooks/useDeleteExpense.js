import { useState } from 'react'
import expenseService from '../services/expenseService'
import Swal from 'sweetalert2'

const useDeleteExpense = () => {
  const [isDeleting, setIsDeleting] = useState(false)

  const deleteExpense = async (id, onSuccess) => {
    setIsDeleting(true)
    try {
      await expenseService.deleteExpense(id)

      Swal.fire({
        icon: 'success',
        title: 'Eliminado',
        text: 'El gasto fue eliminado exitosamente.',
        timer: 2000,
        showConfirmButton: false
      })

      if (onSuccess) onSuccess()
    } catch (error) {
      console.error('Error al eliminar el gasto:', error)
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo eliminar el gasto.'
      })
    } finally {
      setIsDeleting(false)
    }
  }

  return { deleteExpense, isDeleting }
}

export default useDeleteExpense
