import apiClient from '../../../config/config'

export const fetchDailyIncome = (date) => {
  return apiClient.invoke('reports:dailyIncome', date)
}

export const fetchMonthlyIncomes = (year) => {
  return apiClient.invoke('reports:monthlyIncomes', year)
}

export const fetchMonthlyExpenses = (year) => {
  return apiClient.invoke('reports:monthlyExpenses', year)
}

export const fetchAnnualProfit = () => {
  return apiClient.invoke('reports:annualProfit')
}

export const getMonthlyFinanceByYear = (year) => {
  return apiClient.invoke('reports:monthly', year)
}