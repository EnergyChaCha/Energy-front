import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Alert } from "react-native";
import CustomTextInput from "@/components/CustomTextInput";
import Colors from "@/constants/Colors";
import { useNavigation } from "@react-navigation/native";
import { hello, signIn } from "@/api/apiServices";

const LoginScreen = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      const res = await signIn(id, password);
      // const res = await hello(); // get Test

      // Alert.alert(res);
      // localStorage.setItem("accessToken", res.accessToken);
      // localStorage.setItem("userName", res.name);
      navigation.navigate("(tabs)");
    } catch (error) {
      console.log(error);
    }
  };

  // const handleLogin = () => {
  //   // 여기에 로그인 로직을 구현합니다.



  //   if (id !== "energy") {
  //     setErrorMessage("아이디와 비밀번호가 올바르지 않습니다.");
  //   } else {
  //     navigation.navigate("(tabs)");
  //   }
  // };

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

      <TouchableOpacity style={styles.signupButton}>
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

export default LoginScreen;
