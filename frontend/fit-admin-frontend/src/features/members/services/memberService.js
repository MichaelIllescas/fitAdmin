import apiClient from "../../../config/config";

const registerMember = async (memberData) => {
  const response = await apiClient.post("/api/members/register", memberData);
  return response.data;
};

const getAllMembers = async () => {
  const response = await apiClient.get("/api/members/getAll");
  return response.data;
};

const updateMember = (id, data) => {
  const response = apiClient.put(`/api/members/update/${id}`, data);
  return response.data;
};
const deleteMember = (id) => {
  const response = apiClient.delete(`/api/members/delete/${id}`);
  return response.data;
};
export default {
  registerMember,
  getAllMembers,
  updateMember,
  deleteMember,
};
