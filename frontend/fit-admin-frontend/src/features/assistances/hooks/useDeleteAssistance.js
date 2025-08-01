import Swal from 'sweetalert2'
import assistanceService from '../services/assistanceService'

const useDeleteAssistance = (onSuccess) => {
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta asistencia se eliminará permanentemente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar'
    })

    if (!confirm.isConfirmed) return

    try {
      await assistanceService.deleteAssistance(id)
      Swal.fire('Eliminado', 'La asistencia ha sido eliminada.', 'success')
      onSuccess?.() // 🔄 refetch o actualización
    } catch (error) {
      console.error('Error al eliminar asistencia:', error)
      Swal.fire('Error', 'No se pudo eliminar la asistencia.', 'error')
    }
  }

  return { handleDelete }
}

export default useDeleteAssistance
