import React, { useState } from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import Colors from "@/constants/Colors";

interface FlagInfo {
  name: string;
  gender: string;
  workArea: string;
  department: string;
  status: string;
}

interface ReportData {
  createdTime: string;
  bpm: number;
  gps: string;
  flag: string;
  flagInfo: FlagInfo;
}

interface ReportItemProps {
  time: string;
  list: ReportData[];
}

function ReportItemUser({ time, list }: ReportItemProps) {
  const renderReportItem = ({ item }: { item: ReportData }) => (
    <>
      <Text style={styles.itemGPSText}>{item.gps}</Text>
      <Text style={styles.itemBPMText}>{item.bpm} BPM (신고 시 심박수)</Text>
      <Text style={styles.itemInfoText}>{item.flag}</Text>
      {item.flag == "보낸 신고" && (
        <Text style={styles.itemInfoText}>
          {item.flagInfo.name} / {item.flagInfo.gender} /{" "}
          {item.flagInfo.workArea} / {item.flagInfo.department} /{" "}
          {item.flagInfo.status} /
        </Text>
      )}
    </>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.time}>{time}</Text>
      <View style={styles.itemWrapper}>
        <FlatList
          data={list}
          renderItem={renderReportItem}
          keyExtractor={(item, index) => index.toString()}
          scrollEnabled={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
  },
  time: {
    height: 30,
    marginTop: 5,
    backgroundColor: Colors.background_blue,
    paddingVertical: 5,
    paddingHorizontal: 10,
    color: Colors.blue,
    fontFamily: "notoSans6",
    fontSize: 15,
    lineHeight: 20,
    borderRadius: 5,
  },
  itemWrapper: {
    flex: 1,
    display: "flex",

    margin: 5,
    paddingHorizontal: 20,
    paddingVertical: 15,

    borderRadius: 5,
    backgroundColor: "#fff",
    shadowColor: "#6c6c6c",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  itemGPSText: {
    fontFamily: "notoSans4",
    fontSize: 13,
    lineHeight: 20,
    color: Colors.gray,
    marginBottom: 8,
  },
  itemBPMText: {
    fontFamily: "notoSans8",
    fontSize: 15,
    lineHeight: 20,
    color: Colors.navy,
    marginBottom: 5,
  },
  itemInfoText: {
    fontFamily: "notoSans4",
    fontSize: 12,
    lineHeight: 20,
    color: Colors.gray,
  },
});

export default ReportItemUser;
