import apiClient from "../../../config/config";

const registerMember = (memberData) => {
  return apiClient.invoke("members:register", memberData);
};

const getAllMembers = () => {
  return apiClient.invoke("members:list");
};

const updateMember = (id, data) => {
  return apiClient.invoke("members:update", { id, data });
};
const deleteMember = (id) => {
  return apiClient.invoke("members:delete", id);
};
export default {
  registerMember,
  getAllMembers,
  updateMember,
  deleteMember,
};
