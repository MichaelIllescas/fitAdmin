import apiClient from '../../config/config'

const registerMember = (memberData) => {
  return apiClient.invoke('members:register', memberData)
}

const getAllMembers = () => {
  return apiClient.invoke('members:list')
}

const searchMember = (query) => {
  return apiClient.invoke('members:search', query)
}

const registerAssistance = (data) => {
  return apiClient.invoke('assistances:register', data)
}

export default {
  registerMember,
  getAllMembers,
  searchMember,
  registerAssistance
}
