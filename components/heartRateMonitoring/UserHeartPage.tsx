import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TextInput } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import moment from "moment";
import HeartRateChart from "@/components/heartRateMonitoring/HeartRateChart";

const UserHeartPage = () => {
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // const data = await getHeartRateDetail(userId);
        // setUserInfo({
        //   name: data.name,
        //   birthdate: data.birthdate,
        //   gender: data.gender,
        //   status: data.status,
        //   phone: data.phone,
        //   loginId: data.loginId,
        //   workArea: data.workArea,
        //   department: data.department,
        // });
      } catch (error) {
        console.error("Failed to fetch user data", error);
      }
    };

    // fetchHeartRateData();
    // fetchUserData();
  }, []);

  const heartRateData = [
    { date: "0", minBpm: 30, maxBpm: 200, averageBpm: 89 },
    { date: "1", minBpm: 40, maxBpm: 120, averageBpm: 89 },
    { date: "2", minBpm: 60, maxBpm: 110, averageBpm: 89 },
    { date: "3", minBpm: 55, maxBpm: 100, averageBpm: 89 },
    { date: "4", minBpm: 56, maxBpm: 120, averageBpm: 89 },
    { date: "5", minBpm: 80, maxBpm: 130, averageBpm: 89 },
    { date: "6", minBpm: 90, maxBpm: 160, averageBpm: 89 },
  ];

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
      <HeartRateChart data={heartRateData} />

      <Text style={[styles.title, { marginTop: 50 }]}>심박수 통계</Text>
      <View style={styles.statisticsContainer}>
        <View style={styles.statistics}>
          <Text style={styles.subTitle}>평균</Text>
          <View style={styles.bpm}>
            <Text style={styles.bpmNumber}>132</Text>
            <Text style={styles.bpmText}>BPM</Text>
          </View>
        </View>
        <View style={styles.statistics}>
          <Text style={styles.subTitle}>최소</Text>
          <View style={styles.bpm}>
            <Text style={styles.bpmNumber}>132</Text>
            <Text style={styles.bpmText}>BPM</Text>
          </View>
        </View>
        <View style={styles.statistics}>
          <Text style={styles.subTitle}>최대</Text>
          <View style={styles.bpm}>
            <Text style={styles.bpmNumber}>132</Text>
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
