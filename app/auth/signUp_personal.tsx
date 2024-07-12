import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Colors from "@/constants/Colors";
import CustomTextInput from "@/components/CustomTextInput";

const SignUpForm = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    birth: null,
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

  const handleChange = (name: string, value: string|number) => {
    setForm({ ...form, [name]: value });
  };

  const navigation = useNavigation();
  const handleSignUp = () => {
    navigation.navigate("auth/signUp_work");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>회원가입</Text>
      <ScrollView style={styles.scroll}>
        <CustomTextInput
          label="이름"
          value={form.name}
          onChangeText={(value) => handleChange("id", value)}
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
          value={form.birth}
          onChangeText={(value) => handleChange("birth", value)}
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

export default SignUpForm;
