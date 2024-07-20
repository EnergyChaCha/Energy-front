import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
  SignUpAccountScreen: undefined; // No params for this screen
  "auth/signUpPersonal": { signUpData: { loginId: string; password: string } };
  "auth/signUpWork": {
    signUpData: { loginId: string; password: string };
    personalData: {
      name: string;
      phone: string;
      birthdate: string;
      gender: boolean;
      address: string;
    };
  };
  "auth/signUpHealth": { memberId: string };
  "auth/login":undefined;
};
