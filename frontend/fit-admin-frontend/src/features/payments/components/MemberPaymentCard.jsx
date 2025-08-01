import React from 'react'
import { Card, CardContent, Typography } from '@mui/material'

// Formatear fecha en formato argentino
const formatDate = (dateString) => {
  const date = new Date(dateString)
  const corrected = new Date(date.getTime() + date.getTimezoneOffset() * 60000)
  return corrected.toLocaleDateString('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}


// Calcular vencimiento y estado
const getPaymentStatus = (payment) => {
  if (!payment) return { isUpToDate: false, dueDate: null }

  const paymentDate = new Date(payment.paymentDate)
  const duration = payment.feeType?.durationInDays || 0

  const dueDate = new Date(paymentDate)
  dueDate.setDate(dueDate.getDate() + duration)

  const today = new Date()
  const isUpToDate = today <= dueDate

  return { isUpToDate, dueDate }
}

const PaymentCard = ({ payment }) => {
  if (!payment) return null

  const { isUpToDate, dueDate } = getPaymentStatus(payment)

  return (
    <Card
      className="shadow"
      style={{
        borderLeft: `8px solid ${isUpToDate ? '#198754' : '#dc3545'}`,
        width: '100%',
        marginTop: '1rem'
      }}
    >
      <CardContent>
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div>
            <Typography variant="h6">
              {payment.member.firstName} {payment.member.lastName}
            </Typography>
            <Typography >
              Ultimo pago registrado: 
            </Typography>

            <Typography variant="body2" color="textSecondary">
              Monto abonado: <strong>${payment.amountPaid}</strong>
            </Typography>

            <Typography variant="body2" color="textSecondary">
              Método: {payment.paymentMethod}
            </Typography>

            <Typography variant="body2" color="textSecondary">
              Tipo de cuota: {payment.feeType.name} ({payment.feeType.durationInDays} días)
            </Typography>

            <Typography variant="body2" color="textSecondary">
              Fecha de pago: <strong>{formatDate(payment.paymentDate)}</strong>
            </Typography>

            {dueDate && (
              <Typography variant="body2" color="textSecondary">
                Vence el: <strong>{formatDate(dueDate)}</strong>
              </Typography>
            )}
          </div>

          <div>
            <span
              className={`badge fs-6 ${isUpToDate ? 'bg-success' : 'bg-danger'}`}
            >
              {isUpToDate ? 'Al día' : 'Atrasado'}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default PaymentCard
