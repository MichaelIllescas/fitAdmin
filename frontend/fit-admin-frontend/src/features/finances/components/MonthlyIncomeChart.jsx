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

const MonthlyIncomeChart = ({ data }) => {
  const chartData = {
    labels: data.map((item) => item.month),
    datasets: [
      {
        label: 'Ingresos ($)',
        data: data.map((item) => item.amount),
        backgroundColor: '#4caf50',
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
   
  <div className="bg-white p-4 rounded shadow" style={{ height: 300 }}>
    <Bar data={chartData} options={options} />
  </div>
)

}

export default MonthlyIncomeChart
