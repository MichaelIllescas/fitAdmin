import apiClient from '../../../config/config'

export const fetchDailyIncome = async (date) => {
  const res = await apiClient.get(`/api/reports/dailyIncome?date=${date}`)
  return res.data
}

export const fetchMonthlyIncomes = async (year) => {
  const res = await apiClient.get(`/api/reports/monthlyIncomes?year=${year}`)
  return res.data
}

export const fetchMonthlyExpenses = async (year) => {
  const res = await apiClient.get(`/api/reports/monthlyExpenses?year=${year}`)
  return res.data
}

export const fetchAnnualProfit = async () => {
  const res = await apiClient.get('/api/reports/annualProfit')
  return res.data
}

export const getMonthlyFinanceByYear = async (year) => {
  const res = await apiClient.get(`api/reports/monthly`, {
    params: { year }
  })
  return res.data // se espera un array [{ month, income, expense }, ...]
}