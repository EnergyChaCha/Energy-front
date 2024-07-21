import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import {
  NavigationProp,
  useNavigation,
  useRoute,
  RouteProp,
} from "@react-navigation/native";
import Colors from "@/constants/Colors";
import CustomTextInput from "@/components/CustomTextInput";
import { RootStackParamList } from "./signupType";

const SignUpPersonal = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    birthdate: "",
    gender: "",
    address: "",
  });
  const dropOption: {
    label: string;
    value: string;
  }[] = [
    { label: "선택해주세요", value: "" },
    { label: "남성", value: "male" },
    { label: "여성", value: "female" },
  ];

  const handleChange = (name: string, value: string | number) => {
    setForm({ ...form, [name]: value });
  };

  type SignUpPersonalNavigationProp = NavigationProp<
    RootStackParamList,
    "auth/signUpPersonal"
  >;
  type SignUpPersonalRouteProp = RouteProp<
    RootStackParamList,
    "auth/signUpPersonal"
  >;

  const navigation = useNavigation<SignUpPersonalNavigationProp>();
  const route = useRoute<SignUpPersonalRouteProp>();
  const { signUpData } = route.params;

  const handleSignUp = () => {
    if (!form.name || !form.phone || !form.birthdate) {
      Alert.alert("필수 항목을 모두 입력해주세요.");
      return;
    }

    if (form.birthdate.length !== 8) {
      Alert.alert("생년월일을 8자로 입력해주세요.");
      return;
    }
    const formattedBirth = `${form.birthdate.substring(
      0,
      4
    )}-${form.birthdate.substring(4, 6)}-${form.birthdate.substring(6, 8)}`;

    navigation.navigate("auth/signUpWork", {
      signUpData,
      personalData: {
        name: form.name,
        phone: form.phone,
        birthdate: formattedBirth,
        gender: form.gender == "male" ? true : false,
        address: form.address,
      },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>회원가입</Text>
      <ScrollView style={styles.scroll}>
        <CustomTextInput
          label="이름"
          value={form.name}
          onChangeText={(value) => handleChange("name", value)}
          placeholder="이름"
          inputType="input"
          required={true}
        />
        <CustomTextInput
          label="전화번호"
          value={form.phone}
          onChangeText={(value) => handleChange("phone", value)}
          placeholder="숫자만 입력해주세요."
          keyboardType="phone-pad"
          inputType="number"
          required={true}
        />
        <CustomTextInput
          label="생년월일"
          value={form.birthdate}
          onChangeText={(value) => handleChange("birthdate", value)}
          placeholder="YYYYMMDD (8글자로 입력해주세요)"
          inputType="number"
          required={true}
        />
        <CustomTextInput
          label="성별"
          value={form.gender}
          onChangeText={(value) => handleChange("gender", value)}
          placeholder="성별"
          inputType="dropdown"
          options={dropOption}
        />
        <CustomTextInput
          label="주소"
          value={form.address}
          onChangeText={(value) => handleChange("address", value)}
          placeholder="주소"
          inputType="input"
        />
      </ScrollView>

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>완료</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    padding: 40,
    backgroundColor: "white",
  },
  title: {
    fontFamily: "notoSans8",
    fontSize: 28,
    color: Colors.navy,
  },
  scroll: {
    height: "80%",
  },
  button: {
    backgroundColor: Colors.blue,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },
});

export default SignUpPersonal;
