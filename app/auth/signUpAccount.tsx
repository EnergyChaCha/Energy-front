import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import Colors from "@/constants/Colors";
import CustomTextInput from "@/components/CustomTextInput";
import { RootStackParamList } from "./signupType";

const SignUpAccountScreen = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [form, setForm] = useState({
    loginId: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (name: string, value: string) => {
    setForm({ ...form, [name]: value });
  };

  type SignUpAccountNavigationProp = NavigationProp<
    RootStackParamList,
    "SignUpAccountScreen"
  >;

  const navigation = useNavigation<SignUpAccountNavigationProp>();

  const handleSignUp = () => {
    if (form.password !== form.confirmPassword) {
      setErrorMessage("비밀번호가 일치하지 않습니다.");
      return;
    }
    if (
      form.loginId === "" ||
      form.password === "" ||
      form.confirmPassword === ""
    ) {
      setErrorMessage("필수 항목을 모두 입력해주세요.");
      return;
    }
    setErrorMessage("");
    navigation.navigate("auth/signUpPersonal", {
      signUpData: {
        loginId: form.loginId,
        password: form.password,
      },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>회원가입</Text>
      <ScrollView style={styles.scroll}>
        <CustomTextInput
          label="아이디"
          value={form.loginId}
          onChangeText={(value) => handleChange("loginId", value)}
          placeholder="아이디"
          inputType="input"
          required
        />
        <CustomTextInput
          label="비밀번호"
          value={form.password}
          onChangeText={(value) => handleChange("password", value)}
          placeholder="비밀번호"
          inputType="input"
          required
          secureTextEntry
        />
        <CustomTextInput
          label="비밀번호 확인"
          value={form.confirmPassword}
          onChangeText={(value) => handleChange("confirmPassword", value)}
          placeholder="비밀번호 확인"
          inputType="input"
          required
          secureTextEntry
        />
      </ScrollView>
      {form.confirmPassword != "" && form.password !== form.confirmPassword ? (
        <Text style={styles.errorMessage}>비밀번호가 일치하지 않습니다.</Text>
      ) : null}

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>다음</Text>
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
  errorMessage: {
    color: Colors.red,
    marginTop: 10,
    fontFamily: "notoSans4",
  },
});

export default SignUpAccountScreen;
