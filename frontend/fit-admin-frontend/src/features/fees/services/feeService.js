import apiClient from '../../../config/config'

export const registerFee = async (feeData) => {
  const response = await apiClient.post('/api/fee-types/register', feeData)
  return response.data
}

export const getAllFees = async () => {
  const response = await apiClient.get('/api/fee-types/getAll')
  return response.data
}

export const updateFee = async (id, feeData) => {
  const response = await apiClient.put(`/api/fee-types/update/${id}`, feeData)
  return response.data
}

export const deleteFee = async (id) => {
  const response = await apiClient.delete(`/api/fee-types/delete/${id}`)
  return response.data
}