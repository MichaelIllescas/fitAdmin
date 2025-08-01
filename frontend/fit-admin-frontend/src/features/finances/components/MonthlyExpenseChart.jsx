import React from 'react'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend)

const MonthlyExpenseChart = ({ data }) => {
  const chartData = {
    labels: data.map((item) => item.month),
    datasets: [
      {
        label: 'Egresos ($)',
        data: data.map((item) => item.amount),
        backgroundColor: '#f44336',
        borderRadius: 4,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#333',
        },
      },
    },
    scales: {
      x: {
        ticks: { color: '#333' },
        grid: { color: '#eee' },
      },
      y: {
        ticks: { color: '#333' },
        grid: { color: '#eee' },
      },
    },
  }

  return (
    <div className="bg-white p-4 rounded shadow">
      <Bar data={chartData} options={options} />
    </div>
  )
}

export default MonthlyExpenseChart
