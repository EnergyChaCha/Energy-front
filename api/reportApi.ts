import api from "./axiosConfig";


export const getReportAll = async () => {
  try {
    const response = await api.get("/hello");
    return response.data.result;
  } catch (error) {
    console.log(error);
  }
};


export const signIn = async (adminId: string, adminPw: string) => {
  try {
    const response = await api.post("/auth/signin", {
      adminId: `${adminId}`,
      adminPw: `${adminPw}`,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};
