import React, { memo, useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TextInput } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import moment from "moment";
import HeartRateChart from "@/components/heartRateMonitoring/HeartRateChart";
import { getHeartRateChart, getHeartUserInfo } from "@/api/heartApi";
import { getUserID } from "@/util/storage";

interface chartType {
  date: string;
  minimumBpm: number;
  maximumBpm: number;
  averageBpm: number;
}

const UserHeartPage = () => {
  const [heartRateChart, setHeartRateChart] = useState<chartType[]>([]);
  const [userInfo, setUserInfo] = useState<{
    averageThreshold: number;
    maxBpmThreshold: number;
    minBpmThreshold: number;
  }>({
    averageThreshold: 0,
    maxBpmThreshold: 0,
    minBpmThreshold: 0,
  });

  useEffect(() => {
    const fetchUserData = async (start: string, end: string) => {
      try {
        const userId = await getUserID();
        if (userId == undefined) return;
        const data = await getHeartUserInfo(parseInt(userId), start, end);
        
        setUserInfo({
          averageThreshold: data[0].averageThreshold,
          maxBpmThreshold: data[0].maxBpmThreshold,
          minBpmThreshold: data[0].minBpmThreshold,
        });
      } catch (error) {
        console.error("Failed to fetch user data", error);
      }
    };
    const fetchHeartRateData = async (start: string, end: string) => {
      try {
        const userId = await getUserID();
        if (userId == undefined) return;
        const data = await getHeartRateChart(parseInt(userId), start, end);
        setHeartRateChart(data);
      } catch (error) {
        console.error("Failed to fetch user data", error);
      }
    };

    fetchHeartRateData(
      moment().subtract(7, "days").format("YYYY-MM-DD"),
      moment().format("YYYY-MM-DD")
    );
    fetchUserData(
      moment().subtract(7, "days").format("YYYY-MM-DD"),
      moment().format("YYYY-MM-DD")
    );
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>나의 심박수</Text>
      <Text style={styles.dateRange}>
        기간{"   "}
        <Text style={styles.date}>
          {moment().subtract(7, "days").format("YYYY.MM.DD")} -{"  "}
          {moment().format("YYYY.MM.DD")}
        </Text>
      </Text>
      <HeartRateChart data={heartRateChart} />

      <Text style={[styles.title, { marginTop: 50 }]}>심박수 통계</Text>
      <View style={styles.statisticsContainer}>
        <View style={styles.statistics}>
          <Text style={styles.subTitle}>평균</Text>
          <View style={styles.bpm}>
            <Text style={styles.bpmNumber}>
              {Math.round(userInfo.averageThreshold)}
            </Text>
            <Text style={styles.bpmText}>BPM</Text>
          </View>
        </View>
        <View style={styles.statistics}>
          <Text style={styles.subTitle}>최소</Text>
          <View style={styles.bpm}>
            <Text style={styles.bpmNumber}>{userInfo.minBpmThreshold}</Text>
            <Text style={styles.bpmText}>BPM</Text>
          </View>
        </View>
        <View style={styles.statistics}>
          <Text style={styles.subTitle}>최대</Text>
          <View style={styles.bpm}>
            <Text style={styles.bpmNumber}>{userInfo.maxBpmThreshold}</Text>
            <Text style={styles.bpmText}>BPM</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

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
  dateRange: {
    color: "gray",
    marginBottom: 10,
  },
  date: { color: Colors.blue },
  bpmSection: {
    marginTop: 40,
  },
  statisticsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  statistics: {
    width: "30%",
    margin: 5,
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
  },
  subTitle: {
    fontFamily: "notoSans6",
    fontSize: 16,
    lineHeight: 20,
  },
  bpm: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  bpmText: {
    fontFamily: "notoSans4",
    fontSize: 16,
    lineHeight: 20,
    marginLeft: 5,
  },
  bpmNumber: {
    fontFamily: "notoSans8",
    fontSize: 20,
    lineHeight: 25,
  },
});

export default UserHeartPage;
