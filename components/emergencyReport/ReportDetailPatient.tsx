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

const ReportDetailPatient = () => {
  const [form, setForm] = useState({
    // createdTime: ""
    // id: "",
    // loginId: "",
    // name: "",
    // gender: 0,
    // phone: "",
    // workArea: "",
    // department: "",
    // gps: "",
    // status: "",
    // address: "",
    // healthInfo: {
    //   emergencyNumber: "",
    //   emergencyRelationship: "",
    //   disease: "",
    //   allergy: "",
    //   medication: "",
    //   blood: "",
    //   organDonor: 0,
    createdTime: "2023-07-01T10:30:00Z",
    id: "target_uuid_1",
    loginId: "chacha123",
    name: "정으니",
    gender: 0,
    phone: "010-1234-1234",
    workArea: "근무지",
    department: "직무(상차)",
    gps: "gps 정보",
    status: "의식 없음",
    address: "주소",
    healthInfo: {
      emergencyNumber: "응급연락처",
      emergencyRelationship: "응급연락처관계",
      disease: "기저질환",
      allergy: "알레르기",
      medication: "복용중인 약",
      blood: "혈액형",
      organDonor: 0,
    },
  });

  return (
    <ScrollView style={styles.container}>
      <CustomTextInput
        label="장소 (GPS 좌표)"
        value={form.gps}
        inputType="label"
      />
      <CustomTextInput label="신고시 BPM" value={form.gps} inputType="label" />
      <CustomTextInput
        label="날짜"
        value={form.createdTime}
        inputType="label"
      />
      <Text style={styles.subTitle}>회원정보</Text>
      <View style={styles.labelWrapper}>
        <View style={styles.labelSize}>
          <CustomTextInput
            label="아이디"
            value={form.loginId}
            inputType="label"
          />
        </View>
        <View style={styles.labelSize}>
          <CustomTextInput label="이름" value={form.name} inputType="label" />
        </View>
      </View>

      <View style={styles.labelWrapper}>
        <View style={styles.labelSize}>
          <CustomTextInput
            label="성별"
            value={form.gender == 0 ? "여자" : "남자"}
            inputType="label"
          />
        </View>
        <View style={styles.labelSize}>
          <CustomTextInput
            label="전화번호"
            value={form.phone}
            inputType="label"
          />
        </View>
      </View>

      <View style={styles.labelWrapper}>
        <View style={styles.labelSize}>
          <CustomTextInput
            label="근무지"
            value={form.workArea}
            inputType="label"
          />
        </View>
        <View style={styles.labelSize}>
          <CustomTextInput
            label="직무"
            value={form.department}
            inputType="label"
          />
        </View>
      </View>

      <Text style={styles.subTitle}>건강 정보</Text>

      <View style={styles.labelWrapper}>
        <View style={styles.labelSize}>
          <CustomTextInput
            label="비상 연락처"
            value={form.healthInfo.emergencyNumber}
            inputType="label"
          />
        </View>
        <View style={styles.labelSize}>
          <CustomTextInput
            label="비상 연락처 관계"
            value={form.healthInfo.emergencyRelationship}
            inputType="label"
          />
        </View>
      </View>

      <View style={styles.labelWrapper}>
        <View style={styles.labelSize}>
          <CustomTextInput
            label="혈액형"
            value={form.healthInfo.blood}
            inputType="label"
          />
        </View>
        <View style={styles.labelSize}>
          <CustomTextInput
            label="장기기증자"
            value={form.healthInfo.organDonor == 0 ? "예" : "아니오"}
            inputType="label"
          />
        </View>
      </View>

      <CustomTextInput
        label="기저질환"
        value={form.healthInfo.disease}
        inputType="label"
      />
      <CustomTextInput
        label="알레르기"
        value={form.healthInfo.allergy}
        inputType="label"
      />
      <CustomTextInput
        label="복용중인 약"
        value={form.healthInfo.medication}
        inputType="label"
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
    height: "100%",
    width: "100%",
    padding: 10,
  },
  title: {
    fontFamily: "notoSans8",
    fontSize: 28,
    lineHeight: 30,
    marginBottom: 20,
    color: Colors.navy,
  },
  subTitle: {
    fontFamily: "notoSans7",
    lineHeight: 30,
    fontSize: 23,
    color: Colors.navy,
    marginTop: 10,
    marginBottom: 10,
  },
  labelWrapper: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
  },
  labelSize: {
    width: "50%",
    paddingHorizontal: 5,
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

export default ReportDetailPatient;
