import React, { useEffect, useState } from "react";
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
import { getReportMyInfo } from "@/api/reportApi";

interface ReceiverInfo {
  id: string;
  name: string;
  phone: string;
  workArea: string;
  department: string;
}

function ReceiverInfo() {
  const [userInfo, setUserInfo] = useState<ReceiverInfo | null>(null);
  const userId = 9;

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const data = await getReportMyInfo(userId);
        setUserInfo({
          id: data.id,
          name: data.name,
          phone: data.phone,
          workArea: data.workArea,
          department: data.department
        });
      } catch (error) {
        console.error("Failed to fetch user Info", error);
      }
    };
    fetchUserInfo();
  }, [userId]);

  return (
    <View style={styles.container}>
      {userInfo && (
        <>
          <View style={styles.labelSize}>
            <CustomTextInput
              label="아이디"
              value={userInfo.name}
              inputType="label"
            />
          </View>
          <View style={styles.labelSize}>
            <CustomTextInput
              label="이름"
              value={userInfo.phone}
              inputType="label"
            />
          </View>
          <View style={styles.labelSize}>
            <CustomTextInput
              label="성별"
              value={userInfo.workArea}
              inputType="label"
            />
          </View>
          <View style={styles.labelSize}>
            <CustomTextInput
              label="전화번호"
              value={userInfo.department}
              inputType="label"
            />
          </View>
        </>
      )}
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
