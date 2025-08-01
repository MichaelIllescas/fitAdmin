import apiClient from '../../config/config'

const registerMember = async (memberData) => {
  const response = await apiClient.post('/api/members/register', memberData)
  return response.data
}

const getAllMembers = async () => {
  const response = await apiClient.get('/api/members/getAll')
  return response.data
}

const searchMember = async (query) => {
  const response = await apiClient.get('/api/members/search', {
    params: { query }
  })
  return response.data
}


 const registerAssistance = async (data) => {
  const response = await apiClient.post('/api/assistances/register', data)
  return response.data
}


export default {
  registerMember,
  getAllMembers,
  searchMember,
  registerAssistance
}
