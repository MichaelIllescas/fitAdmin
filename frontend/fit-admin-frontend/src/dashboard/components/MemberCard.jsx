import React from 'react'
import ActionButtons from './ActionButtons'
import { Card, CardContent, Typography } from '@mui/material'

// Formatear fecha en formato argentino
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

const MemberCard = ({ member }) => {
  const { lastPayment } = member || {}
  const { isUpToDate, dueDate } = getPaymentStatus(lastPayment)

  return (
    <Card
      className="shadow"
      style={{
        borderLeft: `8px solid ${isUpToDate ? '#198754' : '#dc3545'}`
      }}
    >
      <CardContent>
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div>
            <Typography variant="h6">
              {member.firstName} {member.lastName}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              DNI: {member.documentNumber}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Teléfono: {member.phone || '-'}
            </Typography>

            {lastPayment ? (
              <>
                <Typography variant="body2" color="textSecondary">
                  Último pago:{' '}
                  <strong>{formatDate(lastPayment.paymentDate)}</strong>
                </Typography>

                {dueDate && (
                  <Typography variant="body2" color="textSecondary">
                    Vence el: <strong>{formatDate(dueDate)}</strong>
                  </Typography>
                )}
              </>
            ) : (
              <Typography variant="body2" color="error" className='mt-2'>
                No tiene pagos registrados
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

        <ActionButtons member={member} />
      </CardContent>
    </Card>
  )
}

export default MemberCard
