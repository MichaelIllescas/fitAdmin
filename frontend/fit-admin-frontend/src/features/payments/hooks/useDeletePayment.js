import Swal from 'sweetalert2'
import { deletePayment } from '../services/paymentService'

const useDeletePayment = (onSuccess) => {
  const handleDelete = async (paymentId) => {
    const confirm = await Swal.fire({
      title: '¿Eliminar pago?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    })

    if (!confirm.isConfirmed) return

    try {
      await deletePayment(paymentId)

      await Swal.fire({
        icon: 'success',
        title: 'Pago eliminado',
        timer: 1200,
        showConfirmButton: false
      })

      if (typeof onSuccess === 'function') onSuccess()

    } catch (err) {
      console.error(err)
      Swal.fire('Error', 'No se pudo eliminar el pago.', 'error')
    }
  }

  return { handleDelete }
}

export default useDeletePayment
