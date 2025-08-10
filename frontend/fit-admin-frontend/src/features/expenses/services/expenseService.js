import apiClient from '../../../config/config'

const registerExpense = (expenseData) => {
  return apiClient.invoke('expenses:register', expenseData)
}

const getAllExpenses = () => {
  return apiClient.invoke('expenses:list')
}

const getExpenseById = (id) => {
  return apiClient.invoke('expenses:getById', id)
}

const updateExpense = (id, data) => {
  return apiClient.invoke('expenses:update', { id, data })
}

const deleteExpense = (id) => {
  return apiClient.invoke('expenses:delete', id)
}

export default {
  registerExpense,
  getAllExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense
}
