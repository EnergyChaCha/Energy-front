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

interface ReceiverProps {
  Receiver: {
    id: string;
    name: string;
    phone: string;
    workArea: string;
    department: string;
  };
}

function ReceiverInfo({ Receiver }: ReceiverProps) {
  return (
    <View style={styles.container}>
      <View style={styles.labelSize}>
        <CustomTextInput
          label="아이디"
          value={Receiver.name}
          inputType="label"
        />
      </View>
      <View style={styles.labelSize}>
        <CustomTextInput
          label="이름"
          value={Receiver.phone}
          inputType="label"
        />
      </View>
      <View style={styles.labelSize}>
        <CustomTextInput
          label="성별"
          value={Receiver.workArea}
          inputType="label"
        />
      </View>
      <View style={styles.labelSize}>
        <CustomTextInput
          label="전화번호"
          value={Receiver.department}
          inputType="label"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },

  labelWrapper: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
  },
  labelSize: {
    width: "100%",
    paddingHorizontal: 5,
  },
});

export default ReceiverInfo;
