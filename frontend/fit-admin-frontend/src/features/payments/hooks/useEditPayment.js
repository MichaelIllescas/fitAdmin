// src/features/payments/hooks/useEditPayment.js
import { useState } from 'react'
import Swal from 'sweetalert2'
import { updatePayment } from '../services/paymentService'

const useEditPayment = (onUpdated) => {
  const [open, setOpen] = useState(false)
const [values, setValues] = useState({
  id: '',
  memberId: '', 
  feeTypeId: '',
  amountPaid: '',
  paymentDate: '',
  paymentMethod: ''
})

  const openModal = (payment) => {
    loadPaymentData(payment)
    setOpen(true)
  }

  const closeModal = () => setOpen(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  const loadPaymentData = (payment) => {
    if (!payment) return
   setValues({
  id: payment.id,
  memberId: payment.memberId, // 👈 nuevo
  feeTypeId: payment.feeTypeId,
  amountPaid: payment.amountPaid,
  paymentDate: payment.paymentDate.split('T')[0],
  paymentMethod: payment.paymentMethod
})
  }

  const handleUpdate = async (id) => {
    try {
      await updatePayment(id, values)
      Swal.fire('Éxito', 'Pago actualizado correctamente', 'success')
      closeModal()
      onUpdated?.()
    } catch (error) {
      console.error(error)
      Swal.fire('Error', 'No se pudo actualizar el pago', 'error')
    }
  }

  return {
    open,
    values,
    openModal,
    closeModal,
    handleChange,
    handleUpdate,
    loadPaymentData // ✅ AHORA ESTÁ DEFINIDA
  }
}

export default useEditPayment
