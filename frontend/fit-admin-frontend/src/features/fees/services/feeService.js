import apiClient from '../../../config/config'

export const registerFee = (feeData) => {
  return apiClient.invoke('feeTypes:register', feeData)
}

export const getAllFees = () => {
  return apiClient.invoke('feeTypes:list')
}

export const updateFee = (id, feeData) => {
  return apiClient.invoke('feeTypes:update', { id, data: feeData })
}

export const deleteFee = (id) => {
  return apiClient.invoke('feeTypes:delete', id)
}