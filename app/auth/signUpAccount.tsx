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
import { idCheck } from "@/api/authApi";

const SignUpAccountScreen = () => {
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

  const validateLoginId = (loginId: string) => {
    const loginIdRegex = /^[a-zA-Z0-9]{4,12}$/;
    return loginIdRegex.test(loginId);
  };

  const validatePassword = (password: string) => {
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSignUp = async () => {
    if (
      form.loginId === "" ||
      form.password === "" ||
      form.confirmPassword === ""
    ) {
      Alert.alert("오류", "필수 항목을 모두 입력해주세요.");
      return;
    }

    if (!validateLoginId(form.loginId)) {
      Alert.alert("오류", "아이디는 4~12글자, 영어 숫자 조합만 가능합니다.", [
        { text: "확인" },
      ]);
      return;
    }

    if (!validatePassword(form.password)) {
      Alert.alert(
        "비밀번호 오류",
        "비밀번호는 다음 조건을 만족해야 합니다:\n\n" +
          "• 영문, 숫자, 특수문자를 모두 포함\n" +
          "• 8글자 이상",
        [{ text: "확인" }]
      );
      return;
    }

    if (form.password !== form.confirmPassword) {
      Alert.alert("오류", "비밀번호가 일치하지 않습니다.", [{ text: "확인" }]);
      return;
    }

    try {
      const isDuplicate = await idCheck(form.loginId);
      if (isDuplicate) {
        Alert.alert("오류", "이미 사용 중인 아이디입니다.", [{ text: "확인" }]);
        return;
      }

      // 중복이 아니면 다음 화면으로 이동
      navigation.navigate("auth/signUpPersonal", {
        signUpData: {
          loginId: form.loginId,
          password: form.password,
        },
      });
    } catch (error) {
      console.log(error);
      Alert.alert("오류", "아이디 중복 확인 중 오류가 발생했습니다.", [
        { text: "확인" },
      ]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>회원가입</Text>
      <ScrollView style={styles.scroll}>
        <View style={styles.wrapper}>
          <CustomTextInput
            label="아이디"
            value={form.loginId}
            onChangeText={(value) => handleChange("loginId", value)}
            placeholder="아이디"
            inputType="input"
            required
          />
          <Text style={styles.check}>
            4~12글자, 영어 숫자 조합만 가능합니다.
          </Text>
        </View>
        <View style={[styles.wrapper, { marginBottom: 50 }]}>
          <CustomTextInput
            label="비밀번호"
            value={form.password}
            onChangeText={(value) => handleChange("password", value)}
            placeholder="비밀번호"
            inputType="input"
            required
            secureTextEntry
          />
          <Text style={[styles.check, { bottom: -30 }]}>
            비밀번호는 영문, 숫자, 특수문자를 모두 포함해야하고,{"\n"}8글자
            이상이여야 합니다.
          </Text>
        </View>
        <View style={styles.wrapper}>
          <CustomTextInput
            label="비밀번호 확인"
            value={form.confirmPassword}
            onChangeText={(value) => handleChange("confirmPassword", value)}
            placeholder="비밀번호 확인"
            inputType="input"
            required
            secureTextEntry
          />
          {form.confirmPassword != "" &&
          form.password !== form.confirmPassword ? (
            <Text style={[styles.check, styles.errorMessage]}>
              비밀번호가 일치하지 않습니다.
            </Text>
          ) : null}
        </View>
      </ScrollView>
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
    // position: "absolute",
    color: Colors.red,
    fontFamily: "notoSans4",
  },
  wrapper: {
    marginBottom: 30,
  },
  check: {
    color: "#4d4d4d",
    fontSize: 13,
    position: "absolute",
    fontFamily: "sansNoto5",
    lineHeight: 20,
    bottom: -10,
    left: 7,
  },
});

export default SignUpAccountScreen;
