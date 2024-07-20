import CustomTextInput from "@/components/CustomTextInput";
import Colors from "@/constants/Colors";
import { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, View, ScrollView } from "react-native";

export default function Setting() {
    const [form, setForm] = useState({
      emergencyContact: "",
      emergencyContactRelation: "",
      underlyingConditions: "",
      allergies: "",
      medications: "",
      bloodType: "",
      organDonor: "",
    });
  return (
    <View style={styles.container}>

      <Text style={styles.title}>건강 정보</Text>
      <ScrollView>
        <CustomTextInput
          label="응급 연락처"
          value={form.emergencyContact}
          inputType="label"
        />
        <CustomTextInput
          label="응급 연락처 관계"
          value={form.emergencyContactRelation}
          inputType="label"
        />
        <CustomTextInput
          label="기저질환"
          value={form.underlyingConditions}
          inputType="label"
        />
        <CustomTextInput
          label="알레르기"
          value={form.allergies}
          inputType="label"
        />
        <CustomTextInput
          label="복용중인 약"
          value={form.medications}
          inputType="label"
        />
        <CustomTextInput
          label="혈액형"
          value={form.bloodType}
          inputType="label"
        />
        <CustomTextInput
          label="장기기증자"
          value={form.organDonor}
          inputType="label"
        />
      </ScrollView>

      {/* <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>다음</Text>
      </TouchableOpacity> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal:20
  },
  title: {
    fontFamily: "notoSans8",
    fontSize: 28,
    color: Colors.navy,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  scroll: {
    height: "80%",
  },
});
