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


interface HealthInfo {
  emergencyNumber: string;
  emergencyRelationship: string;
  disease: string;
  allergy: string;
  medication: string;
  blood: string;
  organDonor: number;
  bpm: string;
}

interface Patient {
  id: string;
  loginId: string;
  name: string;
  gender: number;
  phone: string;
  workArea: string;
  department: string;
  gps: string;
  status: string;
  address: string;
  healthInfo: HealthInfo;
}

interface ReportDetailPatientProps {
  patientData: Patient;
  createdTime:string;
}

const ReportDetailPatient: React.FC<ReportDetailPatientProps> = ({
  patientData,
  createdTime,
}) => {
  return (
    <ScrollView style={styles.container}>
      <CustomTextInput
        label="장소 (GPS 좌표)"
        value={patientData.gps}
        inputType="label"
      />
      <CustomTextInput
        label="신고시 BPM"
        value={patientData.status}
        inputType="label"
      />
      <CustomTextInput label="날짜" value={createdTime} inputType="label" />
      <Text style={styles.subTitle}>회원정보</Text>
      <View style={styles.labelWrapper}>
        <View style={styles.labelSize}>
          <CustomTextInput
            label="아이디"
            value={patientData.loginId}
            inputType="label"
          />
        </View>
        <View style={styles.labelSize}>
          <CustomTextInput
            label="이름"
            value={patientData.name}
            inputType="label"
          />
        </View>
      </View>

      <View style={styles.labelWrapper}>
        <View style={styles.labelSize}>
          <CustomTextInput
            label="성별"
            value={patientData.gender == 0 ? "여자" : "남자"}
            inputType="label"
          />
        </View>
        <View style={styles.labelSize}>
          <CustomTextInput
            label="전화번호"
            value={patientData.phone}
            inputType="label"
          />
        </View>
      </View>

      <View style={styles.labelWrapper}>
        <View style={styles.labelSize}>
          <CustomTextInput
            label="근무지"
            value={patientData.workArea}
            inputType="label"
          />
        </View>
        <View style={styles.labelSize}>
          <CustomTextInput
            label="직무"
            value={patientData.department}
            inputType="label"
          />
        </View>
      </View>

      <Text style={styles.subTitle}>건강 정보</Text>

      <View style={styles.labelWrapper}>
        <View style={styles.labelSize}>
          <CustomTextInput
            label="비상 연락처"
            value={patientData.healthInfo.emergencyNumber}
            inputType="label"
          />
        </View>
        <View style={styles.labelSize}>
          <CustomTextInput
            label="비상 연락처 관계"
            value={patientData.healthInfo.emergencyRelationship}
            inputType="label"
          />
        </View>
      </View>

      <View style={styles.labelWrapper}>
        <View style={styles.labelSize}>
          <CustomTextInput
            label="혈액형"
            value={patientData.healthInfo.blood}
            inputType="label"
          />
        </View>
        <View style={styles.labelSize}>
          <CustomTextInput
            label="장기기증자"
            value={patientData.healthInfo.organDonor == 0 ? "예" : "아니오"}
            inputType="label"
          />
        </View>
      </View>

      <CustomTextInput
        label="기저질환"
        value={patientData.healthInfo.disease}
        inputType="label"
      />
      <CustomTextInput
        label="알레르기"
        value={patientData.healthInfo.allergy}
        inputType="label"
      />
      <CustomTextInput
        label="복용중인 약"
        value={patientData.healthInfo.medication}
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
