import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveUserInfo = async (id: string, admin:boolean) => {
  try {
    await AsyncStorage.setItem("@user_id", id);
    await AsyncStorage.setItem("@user_role", admin? "ADMIN":"USER");
  } catch (error) {
    console.error("Failed to save user info.", error);
  }
};

export const getUserID = async () => {
  try {
    const id = await AsyncStorage.getItem("@user_id");
    return id;
  } catch (error) {
    console.error("Failed to fetch id.", error);
  }
};

export const getUserRole = async () => {
  try {
    const role = await AsyncStorage.getItem("@user_role");
    return role;
  } catch (error) {
    console.error("Failed to fetch id.", error);
  }
};


// 저장
export const saveToken = async (token:string) => {
  try {
    console.log('token',token);
    
    await AsyncStorage.setItem("@user_token", token);
  } catch (error) {
    console.error("Failed to save token.", error);
  }
};

// 읽기
export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem("@user_token");
    return token;
  } catch (error) {
    console.error("Failed to fetch token.", error);
  }
};

// 삭제
export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem("@user_token");
  } catch (error) {
    console.error("Failed to remove token.", error);
  }
};
