import apiClient from '../../../config/config'

const assistanceService = {
  searchMember: (query) => apiClient.invoke('members:search', query),
  getHistoryByMemberId: (id) => apiClient.invoke('assistances:byMember', id),
  registerAssistance: (memberId) => apiClient.invoke('assistances:register', { memberId }),
  updateAssistance: (id, data) => apiClient.invoke('assistances:update', { id, data }),
  deleteAssistance: (id) => apiClient.invoke('assistances:delete', id),
  annulAssistance: (id) => apiClient.invoke('assistances:annul', id),
  getByDate: (date) => apiClient.invoke('assistances:byDate', date)
}

export default assistanceService
