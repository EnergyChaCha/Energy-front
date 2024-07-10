import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Alert
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Colors from "@/constants/Colors";
import CustomTextInput from "@/components/CustomTextInput";

const SignUpForm = () => {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [workplace, setWorkplace] = useState("");


  const navigation = useNavigation();

  const handleSignUp = () => {

    Alert.alert("회원가입 완료", `이름: ${name}, 아이디: ${id}`, [
      {
        text: "확인",
        onPress: () => navigation.navigate("login"),
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>회원가입</Text>
      <ScrollView style={styles.scroll}>
        <CustomTextInput
          label="이름"
          value={name}
          onChangeText={setName}
          placeholder="이름"
        />
        <CustomTextInput
          label="아이디"
          value={id}
          onChangeText={setId}
          placeholder="아이디"
        />
        <CustomTextInput
          label="비밀번호"
          value={password}
          onChangeText={setPassword}
          placeholder="비밀번호"
          secureTextEntry
        />
        <CustomTextInput
          label="비밀번호 확인"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="비밀번호 확인"
          secureTextEntry
        />
        <CustomTextInput
          label="전화번호"
          value={phone}
          onChangeText={setPhone}
          placeholder="전화번호"
          keyboardType="phone-pad"
        />
        <CustomTextInput
          label="생년월일"
          value={birthdate}
          onChangeText={setBirthdate}
          placeholder="YYYY/MM/DD"
        />
        <CustomTextInput
          label="성별"
          value={gender}
          onChangeText={setGender}
          placeholder="성별"
        />
        <CustomTextInput
          label="주소"
          value={address}
          onChangeText={setAddress}
          placeholder="주소"
        />
        <CustomTextInput
          label="근무지"
          value={workplace}
          onChangeText={setWorkplace}
          placeholder="근무지"
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
