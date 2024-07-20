import React, { useState } from "react";
import { StyleSheet, ScrollView, Text } from "react-native";
import Colors from "@/constants/Colors";
import CustomTextInput from "@/components/CustomTextInput";

interface Reporter {
  id: string;
  loginId: string;
  name: string;
  gender: number;
  phone: string;
  department: string;
  workArea: string;
}

interface ReportDetailReporterProps {
  reporterData: Reporter;
}

const ReportDetailReporter = ({ reporterData }: ReportDetailReporterProps) => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.subTitle}>회원정보</Text>
      <CustomTextInput
        label="아이디"
        value={reporterData.loginId}
        inputType="label"
      />
      <CustomTextInput label="이름" value={reporterData.name} inputType="label" />
      <CustomTextInput
        label="성별"
        value={reporterData.gender == 0 ? "여자" : "남자"}
        inputType="label"
      />
      <CustomTextInput
        label="전화번호"
        value={reporterData.phone}
        inputType="label"
      />
      <CustomTextInput
        label="근무지"
        value={reporterData.department}
        inputType="label"
      />
      <CustomTextInput
        label="직무"
        value={reporterData.workArea}
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
});

export default ReportDetailReporter;
