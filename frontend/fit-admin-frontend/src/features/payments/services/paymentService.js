import apiClient from '../../../config/config'

export const searchMember = (query) => {
  return apiClient.invoke('payments:searchMember', query)
}

export const registerPayment = (data) => {
  return apiClient.invoke('payments:register', data)
}

export const getAllPayments = () => {
  return apiClient.invoke('payments:list')
}

export const deletePayment = (id) => {
  return apiClient.invoke('payments:delete', id)
}

export const updatePayment = (id, data) => {
  return apiClient.invoke('payments:update', { id, data })
}

export const getPaymentsByQuery = (query) => {
  return apiClient.invoke('payments:search', query)
}
  
