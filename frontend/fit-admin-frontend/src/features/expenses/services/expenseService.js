import apiClient from '../../../config/config'

const registerExpense = async (expenseData) => {
  const response = await apiClient.post('/api/expenses/register', expenseData)
  return response.data
}

const getAllExpenses = async () => {
  const response = await apiClient.get('/api/expenses/getAll')
  return response.data
}

const getExpenseById = async (id) => {
  const response = await apiClient.get(`/api/expenses/getById/${id}`)
  return response.data
}

const updateExpense = async (id, data) => {
  const response = await apiClient.put(`/api/expenses/update/${id}`, data)
  return response.data
}

const deleteExpense = async (id) => {
  const response = await apiClient.delete(`/api/expenses/delete/${id}`)
  return response.data
}

export default {
  registerExpense,
  getAllExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense
}
