import api from "./axiosConfig";

interface SignUpData {
  loginId: string;
  password: string;
  name: string;
  phone: string;
  birthdate: string;
  gender: boolean;
  address: string;
  workArea: string;
  department: string;
}
interface SignUpHealthData {
  emergencyContact: string;
  emergencyContactRelation: string;
  underlyingConditions: string;
  allergies: string;
  medications: string;
  bloodType: string;
  organDonor: string;
}

interface SignInData {
  adminId: string;
  adminPw: string;
}

export const signUp = async (signUpdata: SignUpData) => {
  try {
    const response = await api.post("/auth/signup", signUpdata);
    return response.data.result;
  } catch (error) {
    console.log(error);
  }
};

export const signUpHealthInfo = async (
  memberId: string,
  signUpHealthData: SignUpHealthData
) => {
  try {
    const response = await api.post(
      `/auth/health-info/${memberId}`,
      signUpHealthData
    );
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
