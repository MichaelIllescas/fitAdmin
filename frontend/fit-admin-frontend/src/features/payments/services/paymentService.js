import apiClient from '../../../config/config'

export const searchMember = (query) => {
  return apiClient.get(`/api/payments/searchMember?query=${query}`)
}

export const registerPayment = (data) => {
  return apiClient.post('/api/payments/register', data)
}


export const getAllPayments = () => {
  return apiClient.get('/api/payments/getAll')
}

export const deletePayment = (id) => {
  return apiClient.delete(`/api/payments/delete/${id}`)
}

export const updatePayment = (id, data) =>{
return apiClient.put(`/api/payments/update/${id}`, data)

} 

export const getPaymentsByQuery = async (query) => {
  const res = await apiClient.get(`/api/payments/search?query=${query}`)
  return res.data
}
  
