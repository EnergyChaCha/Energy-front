import api from "./axiosConfig";

export const getAllMembers = async () => {
  try {
    const response = await api.get("/admin/member/all");
    return response.data.result;
  } catch (error) {
    console.log(error);
  }
};

export const getMemberDetail = async (memberId: number) => {
  try {
    const response = await api.get(`/admin/member?memberId=${memberId}`);
    return response.data.result;
  } catch (error) {
    console.log(error);
  }
};

export const postGrantMember = async (memberId: number, role: string) => {
  try {
    const response = await api.post(`/admin/grant`, {
      memberId: memberId,
      role: role,
    });
    return response.data.result;
  } catch (error) {
    console.log(error);
  }
};
