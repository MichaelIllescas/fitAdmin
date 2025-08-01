import Swal from 'sweetalert2'
import { deleteFee } from '../services/feeService'

const useDeleteFee = (onSuccess) => {
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará la cuota permanentemente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    })

    if (result.isConfirmed) {
      try {
        await deleteFee(id)
        Swal.fire({
          icon: 'success',
          title: 'Cuota eliminada',
          timer: 1500,
          showConfirmButton: false
        })
        if (onSuccess) onSuccess()
      } catch (error) {
        console.error(error)
        Swal.fire({
          icon: 'error',
          title: 'Error al eliminar',
          text: 'No se pudo eliminar la cuota. Intentá nuevamente.'
        })
      }
    }
  }

  return { handleDelete }
}

export default useDeleteFee
