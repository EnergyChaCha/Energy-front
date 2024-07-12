import api from "./axiosConfig";

export const signUp = async (name: string) => {
  try {
    const response = await api.post("/auth/signup", {
      name: `${name}`,
    });
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

export const hello = async () => {
  try {
    const response = await api.get("/hello");
    return response.data.result;
  } catch (error) {
    console.log(error);
  }
};