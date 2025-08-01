import apiClient from '../../../config/config'

const assistanceService = {
searchMember: (query) =>
  apiClient.get('/api/members/search', {
    params: { query }  
  }),
  getHistoryByMemberId: (id) =>
    apiClient.get(`/api/assistances/getByMember/${id}`),

  registerAssistance: (memberId) =>
    apiClient.post(`/api/assistances/register`, { memberId }),

  updateAssistance: (id, data) =>
    apiClient.put(`/api/assistances/${id}`, data),

  deleteAssistance: (id) => apiClient.delete(`/api/assistances/delete/${id}`), 


  annulAssistance: (id) =>
    apiClient.patch(`/api/assistances/${id}/annul`),


  getByDate: (date) => apiClient.get(`/api/assistances/by-date/${date}`)

}

export default assistanceService
