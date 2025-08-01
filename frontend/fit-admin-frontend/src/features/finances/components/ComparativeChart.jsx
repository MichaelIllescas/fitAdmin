import React from 'react'
import {
  BarChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'

const ComparativeChart = ({ data, height = 300 }) => {
  // Agregar campo netProfit a cada objeto
  const dataWithNet = data.map((item) => ({
    ...item,
    netProfit: item.income - item.expense,
  }))

  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart
        data={dataWithNet}
        margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
        <Legend />
        <Bar dataKey="income" fill="#4caf50" name="Ingresos" />
        <Bar dataKey="expense" fill="#f44336" name="Egresos" />
        <Line
          type="monotone"
          dataKey="netProfit"
          stroke="#2196f3"
          strokeWidth={2}
          name="Ganancia Neta"
        />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default ComparativeChart
