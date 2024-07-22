import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Alert } from "react-native";
import CustomTextInput from "@/components/CustomTextInput";
import Colors from "@/constants/Colors";
import { useNavigation } from "@react-navigation/native";
import { getToken, saveToken, saveUserInfo } from "@/util/storage";
import { signIn } from "@/api/authApi";

const Login = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      const res = await signIn(id, password);
      saveToken(res.accessToken);
      console.log(res.isAdmin);

      await saveUserInfo(res.id, res.isAdmin);
      // const result = await getToken();
      // console.log("result ---------", result);

      (navigation as any).navigate("(tabs)");
    } catch (error) {
      setErrorMessage("아이디와 비밀번호가 올바르지 않습니다.");
      console.log(error);
    }
  };
  const signUpClick = () => {
    (navigation as any).navigate("auth/termsOfService");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>로그인</Text>

      <CustomTextInput
        label="아이디"
        value={id}
        onChangeText={setId}
        placeholder="id"
        inputType="input"
      />

      <CustomTextInput
        label="비밀번호"
        value={password}
        onChangeText={setPassword}
        placeholder="password"
        inputType="input"
        secureTextEntry
      />

      {errorMessage ? (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      ) : null}

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>완료</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.signupButton}>
        <Text style={styles.signupButtonText}>바이오인증</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.signupButton} onPress={signUpClick}>
        <Text style={styles.signupButtonText}>회원가입</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    padding: 40,
    backgroundColor: "white",
  },
  title: {
    fontFamily: "notoSans8",
    fontSize: 28,
    marginBottom: 10,
    color: Colors.navy,
  },
  errorMessage: {
    color: Colors.red,
    marginTop: 10,
    fontFamily: "notoSans4",
  },
  loginButton: {
    backgroundColor: Colors.blue,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 80,
    marginBottom: 10,
  },
  loginButtonText: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },
  signupButton: {
    alignItems: "center",
  },
  signupButtonText: {
    color: Colors.navy,
    fontSize: 14,
    fontFamily: "notoSans5",
  },
});

export default Login;
