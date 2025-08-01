import React from 'react'
import { Card, CardContent, Typography } from '@mui/material'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import TrendingDownIcon from '@mui/icons-material/TrendingDown'

const ProfitabilityCard = ({ income, expense }) => {
  const profit = income - expense
  const isPositive = profit >= 0

  return (
    <Card elevation={3}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Rentabilidad Anual
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Ingresos totales: ${income.toLocaleString('es-AR')}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Egresos totales: ${expense.toLocaleString('es-AR')}
        </Typography>

        <div className="flex items-center mt-3">
          {isPositive ? (
            <TrendingUpIcon className="text-green-600 mr-1" />
          ) : (
            <TrendingDownIcon className="text-red-600 mr-1" />
          )}
          <Typography variant="h5" className={isPositive ? 'text-green-700' : 'text-red-700'}>
            ${profit.toLocaleString('es-AR')}
          </Typography>
        </div>
        <Typography variant="body2" color="text.secondary">
          {isPositive ? 'Ganancia Neta' : 'Pérdida Neta'}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default ProfitabilityCard
