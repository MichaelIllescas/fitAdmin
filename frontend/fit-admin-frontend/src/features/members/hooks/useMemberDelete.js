import Swal from 'sweetalert2'
import memberService from '../services/memberService'

const useMemberDelete = (onDeleted) => {
  const deleteMemberById = async (id) => {
    const result = await Swal.fire({
      title: '¿Eliminar socio?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    })

    if (result.isConfirmed) {
      try {
        await memberService.deleteMember(id)

        await Swal.fire({
          icon: 'success',
          title: 'Socio eliminado',
          text: 'El socio fue eliminado correctamente.',
          confirmButtonColor: '#3085d6'
        })

        onDeleted?.() // Refetch o recarga de lista
      } catch (err) {
        console.error('Error al eliminar socio:', err)
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo eliminar el socio.',
          confirmButtonColor: '#d33'
        })
      }
    }
  }

  return { deleteMemberById }
}

export default useMemberDelete
