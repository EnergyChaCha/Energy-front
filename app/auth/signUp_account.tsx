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
  const [errorMessage, setErrorMessage] = useState("");
  const [form, setForm] = useState({
    id: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (name: string, value: string) => {
    setForm({ ...form, [name]: value });
  };

  const handleLogin = () => {
    if (form.password !== form.confirmPassword) {
      setErrorMessage("비밀번호가 일치하지 않습니다.");
    } else {
      setErrorMessage("");
    }
  };

  const navigation = useNavigation();

  const handleSignUp = () => {
    if (form.password !== form.confirmPassword) {
      Alert.alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    if (form.id == "" || form.password == "" || form.confirmPassword == "") {
      Alert.alert("필수 항목을 모두 입력해주세요.");
      return;
    }
    navigation.navigate("auth/signUp_personal", { form });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>회원가입</Text>
      <ScrollView style={styles.scroll}>
        <CustomTextInput
          label="아이디"
          value={form.id}
          onChangeText={(value) => handleChange("id", value)}
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

export default SignUpForm;
