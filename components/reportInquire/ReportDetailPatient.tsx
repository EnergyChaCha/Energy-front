import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
} from "react-native";
import Colors from "@/constants/Colors";
import CustomTextInput from "@/components/CustomTextInput";
import moment from "moment";


interface healthInfoDto {
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
  id: number;
  loginId: string;
  name: string;
  gender: boolean;
  phone: string;
  workArea: string;
  department: string;
  latitude: number;
  longitude: number;
  status: string;
  address: string;
  healthInfoDto: healthInfoDto;
}

interface ReportDetailPatientProps {
  patientData: Patient;
  createdTime: string;
}

const ReportDetailPatient: React.FC<ReportDetailPatientProps> = ({
  patientData,
  createdTime,
}) => {
  return (
    <ScrollView style={styles.container}>
      <CustomTextInput
        label="장소 (GPS 좌표)"
        value={`위도 ${patientData.latitude}${"\n"}경도 ${
          patientData.longitude
        }`}
        inputType="label"
      />
      <CustomTextInput
        label="신고시 BPM"
        value={`${patientData.healthInfoDto.bpm} BPM`}
        inputType="label"
      />
      <CustomTextInput
        label="상태"
        value={patientData.status}
        inputType="label"
      />
      <CustomTextInput
        label="날짜"
        value={moment(createdTime).format("YYYY-MM-DD HH:mm:ss")}
        inputType="label"
      />
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
            value={patientData.gender ? "남자" : "여자"}
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
            value={patientData.healthInfoDto.emergencyNumber}
            inputType="label"
          />
        </View>
        <View style={styles.labelSize}>
          <CustomTextInput
            label="비상 연락처 관계"
            value={patientData.healthInfoDto.emergencyRelationship}
            inputType="label"
          />
        </View>
      </View>

      <View style={styles.labelWrapper}>
        <View style={styles.labelSize}>
          <CustomTextInput
            label="혈액형"
            value={patientData.healthInfoDto.blood}
            inputType="label"
          />
        </View>
        <View style={styles.labelSize}>
          <CustomTextInput
            label="장기기증자"
            value={patientData.healthInfoDto.organDonor == 0 ? "예" : "아니오"}
            inputType="label"
          />
        </View>
      </View>

      <CustomTextInput
        label="기저질환"
        value={patientData.healthInfoDto.disease}
        inputType="label"
      />
      <CustomTextInput
        label="알레르기"
        value={patientData.healthInfoDto.allergy}
        inputType="label"
      />
      <CustomTextInput
        label="복용중인 약"
        value={patientData.healthInfoDto.medication}
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
