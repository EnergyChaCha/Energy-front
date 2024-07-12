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
    emergencyContact: "",
    emergencyRelation: "",
    underlyingCondition: "",
    allergies: "",
    medications: "",
    bloodType: "",
    organDonor: "",
  });

  const handleChange = (name: string, value: string) => {
    setForm({ ...form, [name]: value });
  };

  const bloodTypeOptions = [
    { label: "선택해주세요", value: "" },
    { label: "A", value: "A" },
    { label: "B", value: "B" },
    { label: "O", value: "O" },
    { label: "AB", value: "AB" },
  ];

  const organDonorOptions = [
    { label: "선택해주세요", value: "" },
    { label: "예", value: "yes" },
    { label: "아니오", value: "no" },
  ];

  const navigation = useNavigation();

  const handleSignUp = () => {
    navigation.navigate("auth/login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>건강 정보 등록</Text>
      <ScrollView style={styles.scroll}>
        <CustomTextInput
          label="응급 연락처"
          value={form.emergencyContact}
          onChangeText={(value) => handleChange("emergencyContact", value)}
          placeholder="응급 연락처를 입력하세요"
          inputType="input"
          keyboardType="phone-pad"
        />
        <CustomTextInput
          label="응급 연락처 관계"
          value={form.emergencyRelation}
          onChangeText={(value) => handleChange("emergencyRelation", value)}
          placeholder="응급 연락처와의 관계를 입력하세요"
          inputType="input"
        />
        <CustomTextInput
          label="기저질환"
          value={form.underlyingCondition}
          onChangeText={(value) => handleChange("underlyingCondition", value)}
          placeholder="기저질환을 입력하세요"
          inputType="input"
        />
        <CustomTextInput
          label="알레르기"
          value={form.allergies}
          onChangeText={(value) => handleChange("allergies", value)}
          placeholder="알레르기를 입력하세요"
          inputType="input"
        />
        <CustomTextInput
          label="복용중인 약"
          value={form.medications}
          onChangeText={(value) => handleChange("medications", value)}
          placeholder="복용중인 약을 입력하세요"
          inputType="input"
        />
        <CustomTextInput
          label="혈액형"
          value={form.bloodType}
          onChangeText={(value) => handleChange("bloodType", value)}
          placeholder="혈액형을 선택하세요"
          inputType="dropdown"
          options={bloodTypeOptions}
        />
        <CustomTextInput
          label="장기기증자"
          value={form.organDonor}
          onChangeText={(value) => handleChange("organDonor", value)}
          placeholder="장기기증 여부를 선택하세요"
          inputType="dropdown"
          options={organDonorOptions}
        />
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
});

export default SignUpForm;
