import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import moment from "moment";
import HeartRateChart from "@/components/heartRateMonitoring/HeartRateChart";
import { useRoute } from "@react-navigation/native";
import {
  getHeartRate,
  getHeartRateChart,
  getHeartRateDetail,
  putHeartRate,
} from "@/api/heartApi";

interface WorkerData {
  id: number;
  name: string;
  phone: string;
  loginId: string;
  minBpm: number;
  maxBpm: number;
  averageBpm: number;
  minThreshold: number;
  maxThreshold: number;
  heartrateStatus: string;
}

interface UserInfo {
  name: string;
  birthdate: string;
  gender: boolean;
  status: number;
  phone: string;
  loginId: string;
  workArea: string;
  department: string;
}

interface chartType {
  date: string;
  minimumBpm: number;
  maximumBpm: number;
  averageBpm: number;
}

const statusMap: { [key: string]: string } = {
  emergency: "위기",
  caution: "주의",
  stability: "안정",
};

const statusColorMap: { [key: string]: string } = {
  emergency: Colors.red,
  caution: Colors.orange,
  stability: Colors.navy,
};

const UserHeartInfo = () => {
  const route = useRoute();
  const { userData, userId } = route.params as {
    userData: WorkerData;
    userId: number;
  };
  console.log(userId);

  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [heartRateChart, setHeartRateChart] = useState<chartType[]>([]);

  const [minHeartValue, setMinHeartValue] = useState("0");
  const [maxHeartValue, setMaxHeartValue] = useState("0");

  const fetchHeartRateData = async () => {
    try {
      const data = await getHeartRate(userId);

      setMinHeartValue(data.minTreshold.toString());
      setMaxHeartValue(data.maxTreshold.toString());
    } catch (error) {
      console.error("Failed to fetch heart rate data", error);
    }
  };

  const fetchUserData = async () => {
    try {
      const data = await getHeartRateDetail(userId);
      setUserInfo({
        name: data.name,
        birthdate: data.birthdate,
        gender: data.gender,
        status: data.status,
        phone: data.phone,
        loginId: data.loginId,
        workArea: data.workArea,
        department: data.department,
      });
    } catch (error) {
      console.error("Failed to fetch user data", error);
    }
  };

  const fetchHeartChart = async (
    userId: number,
    start: string,
    end: string
  ) => {
    try {
      const data = await getHeartRateChart(userId, start, end);
      setHeartRateChart(data);
    } catch (error) {
      console.error("Failed to fetch user data", error);
    }
  };
  
  useEffect(() => {
    fetchHeartRateData();
    fetchUserData();
    fetchHeartChart(
      userId,
      moment().subtract(7, "days").format("YYYY-MM-DD"),
      moment().format("YYYY-MM-DD")
    );
  }, [userId]);

  const handleComplete = async () => {
    try {
      const data = await putHeartRate(
        userId,
        parseInt(minHeartValue),
        parseInt(maxHeartValue)
      );
      console.log(data);
    } catch (error) {
      console.error("Failed to fetch heart rate data", error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>회원 정보</Text>

      {userInfo && (
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <View
              style={[styles.iconContainer, { backgroundColor: Colors.navy }]}
            >
              <MaterialCommunityIcons
                name="heart-pulse"
                size={40}
                color="white"
              />
            </View>

            <Text
              style={[
                styles.status,
                { color: statusColorMap[userData.heartrateStatus] },
              ]}
            >
              {statusMap[userData.heartrateStatus]}
            </Text>
            <Text style={styles.name}>{userInfo.name}</Text>
            <Text style={styles.subInfo}>{userInfo.birthdate}</Text>
            <Text style={styles.subInfo}>
              {userInfo.gender ? "남자" : "여자"}
            </Text>
          </View>
          <View style={styles.detailsSection}>
            <DetailRow label="아이디" value={userInfo.loginId} />
            <DetailRow label="전화번호" value={userInfo.phone} />
            <DetailRow label="근무지" value={userInfo.workArea} />
            <DetailRow label="직무" value={userInfo.department} border={true} />
          </View>
        </View>
      )}

      <Text style={styles.title}>심박수 통계</Text>
      <Text style={styles.dateRange}>
        기간{"   "}
        <Text style={styles.date}>
          {moment().subtract(7, "days").format("YYYY.MM.DD")} -{"  "}
          {moment().format("YYYY.MM.DD")}
        </Text>
      </Text>

      <HeartRateChart data={heartRateChart} />

      <View style={styles.bpmSection}>
        <Text style={styles.title}>심박수 임계치 설정</Text>
        <View style={styles.bpmRow}>
          <BpmDisplay value={minHeartValue} onChangeText={setMinHeartValue} />
          <Text style={styles.bpmSeparator}>~</Text>
          <BpmDisplay value={maxHeartValue} onChangeText={setMaxHeartValue} />
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleComplete}>
        <Text style={styles.buttonText}>완료</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const DetailRow = ({
  label,
  value,
  border,
}: {
  label: string;
  value: string;
  border?: boolean;
}) => (
  <View style={[styles.detailRow, border ? { borderBottomWidth: 0 } : {}]}>
    <Text style={styles.detailLabel}>{label}</Text>
    <Text style={styles.detailValue}>{value}</Text>
  </View>
);

const BpmDisplay = ({
  value,
  onChangeText,
}: {
  value: string;
  onChangeText: (text: string) => void;
}) => (
  <View style={styles.bpmDisplay}>
    <MaterialCommunityIcons name="heart-pulse" size={24} color={Colors.red} />
    <TextInput
      style={styles.bpmValue}
      value={value}
      onChangeText={onChangeText}
      keyboardType="numeric"
    />
    <Text style={styles.bpmUnit}>BPM</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontFamily: "notoSans7",
    lineHeight: 28,
    marginBottom: 10,
    color: Colors.navy,
  },
  profileSection: {
    flexDirection: "row",
    marginBottom: 5,
  },
  avatarContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    width: "30%",
    height: 170,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "red",
  },
  status: {
    fontFamily: "notoSans5",
    color: "red",
    fontSize: 15,
    lineHeight: 20,
  },
  name: {
    fontSize: 18,
    fontFamily: "notoSans7",
    lineHeight: 20,
    marginVertical: 5,
  },
  subInfo: {
    color: "gray",
  },
  detailsSection: {
    marginBottom: 20,
    marginLeft: 10,
    flex: 1,
    height: 170,
    backgroundColor: "white",
    justifyContent: "center",
    padding: 10,
    borderRadius: 10,
  },
  detailRow: {
    flexDirection: "row",
    borderBottomColor: "#d2d2d28e",
    borderBottomWidth: 1,
    padding: 10,
  },
  detailLabel: {
    fontFamily: "notoSans5",
    fontSize: 13,
    lineHeight: 20,
    color: Colors.navy,
    width: 70,
  },
  detailValue: {
    fontFamily: "notoSans6",
    color: Colors.gray,
    fontSize: 13,
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  dateRange: {
    color: "gray",
    marginBottom: 10,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 10,
  },
  date: { color: Colors.blue },
  bpmSection: {
    marginTop: 40,
  },
  bpmRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  bpmDisplay: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 10,
    borderRadius: 10,
  },
  bpmIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  bpmValue: {
    fontSize: 18,
    marginLeft: 10,
    fontWeight: "bold",
  },
  bpmSeparator: {
    fontSize: 24,
    marginHorizontal: 10,
  },
  button: {
    alignSelf: "center",
    backgroundColor: Colors.blue,
    padding: 8,
    width: 80,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },

  iconContainer: {
    width: 70,
    height: 70,
    borderRadius: 80,
    backgroundColor: Colors.red,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    top:10


  },
  bpmUnit: {
    fontSize: 14,
    marginLeft: 5,
    color: Colors.gray,
  },
});

export default UserHeartInfo;
