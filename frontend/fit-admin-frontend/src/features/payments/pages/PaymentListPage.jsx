import React, { useEffect } from 'react'
import { CircularProgress, Typography } from '@mui/material'
import DataTable from '../../../components/tables/DataTable'
import useFetchPayments from '../hooks/useFetchPayments'
import PaymentActionsMenu from '../components/PaymentActionsMenu'
import useEditPayment from '../hooks/useEditPayment'
import PaymentEditModal from '../components/EditPaymentModal'


const PaymentListPage = () => {
  const { payments, loading, error, fetchPayments } = useFetchPayments()

  const {
  open,
  values,
  openModal,
  closeModal,
  handleChange,
  handleUpdate,
  
} = useEditPayment(() => {
  fetchPayments()  
  closeModal()     
})


  useEffect(() => {
    fetchPayments()
  }, [])

  const columns = [
    { key: 'id', label: 'ID' },
   {
  key: 'paymentDate',
  label: 'Fecha',
  render: (row) => {
    const date = new Date(row.paymentDate)
    return new Date(date.getTime() + date.getTimezoneOffset() * 60000).toLocaleDateString('es-AR')
  }
}
,
    { key: 'amountPaid', label: 'Monto' },
    { key: 'paymentMethod', label: 'Método de pago' },
    {
      key: 'Member',
      label: 'Socio',
      render: (row) => `${row.member?.firstName} ${row.member?.lastName}`
    },
    {
      key: 'feeType',
      label: 'Servicio',
      render: (row) => row.feeType?.name
    },
    {
  key: 'actions',
  label: 'Acciones',
  render: (row) => (
    <PaymentActionsMenu
      row={{
        ...row,
        onDeleted: fetchPayments,
        onEdit: () => openModal(row) 
      }}
    />
  )
}

  ]

  return (
    <div>
      <Typography variant="h5" className="mb-4">Listado de Pagos</Typography>
 
      {loading && <CircularProgress />}
      {error && <p className="text-danger">{error}</p>}

      {!loading && !error && (
        <DataTable
          data={payments}
          columns={columns}
          itemsPerPage={5}
        />
      )}


  <PaymentEditModal
  open={open}
  onClose={closeModal}
  formValues={values}
  handleChange={handleChange}
  handleSubmit={(e) => {
    e.preventDefault()
    handleUpdate(values.id) 
  }}
  loading={loading}
/>


    </div>
  )
}

export default PaymentListPage
