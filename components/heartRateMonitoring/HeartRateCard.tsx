import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "@/constants/Colors";

interface HeartRateCardProps {
  data: {
    id: number;
    name: string;
    phone: string;
    loginId: string;
    minBpm: number;
    maxBpm: number;
    avgBpm: number;
    minThreshold: number;
    maxThreshold: number;
    heartrateStatus: number | null;
  };
}

function HeartRateCard({ data }: HeartRateCardProps) {
  const getStatusColor = (status: number | null) => {
    switch (status) {
      case 2:
        return Colors.red;
      case 1:
        return Colors.orange;
      default:
        return Colors.navy;
    }
  };

  const statusMap: { [key: number]: string } = {
    2: "위기",
    1: "주의",
    0: "안정",
    // help: "심박수 등급",
  };

  const bpmToPosition = (bpm: number) => {
    return ((bpm - 30) / (200 - 30)) * 100;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text
          style={[
            styles.status,
            { color: getStatusColor(data.heartrateStatus) },
          ]}
        >
          {data.heartrateStatus? statusMap[data.heartrateStatus]: "안정"}
        </Text>
        <View style={styles.userInfo}>
          <Text style={styles.info}>
            {data.name} / {data.loginId} / {data.phone}
          </Text>
        </View>
      </View>
      <View style={styles.bpmContainer}>
        <View style={styles.topBpmLabels}>
          <Text></Text>
          <View
            style={[
              styles.bpmLabel,
              { left: `${bpmToPosition(data.minBpm) - 5}%` },
            ]}
          >
            <Text style={styles.bpmLabelText}>심박수</Text>
            <Text style={styles.bpmLabelText}>{data.minBpm}</Text>
          </View>
          <View
            style={[
              styles.bpmLabel,
              { left: `${bpmToPosition(data.maxBpm) - 5}%` },
            ]}
          >
            <Text style={styles.bpmLabelText}>심박수</Text>
            <Text style={styles.bpmLabelText}>{data.maxBpm}</Text>
          </View>
        </View>
        <View style={styles.bpmBar}>
          <View
            style={[
              styles.threshold,
              {
                left: `${bpmToPosition(data.minThreshold)}%`,
                width: `${
                  bpmToPosition(data.maxThreshold) -
                  bpmToPosition(data.minThreshold)
                }%`,
              },
            ]}
          >
            <Text style={styles.thresholdText}>임계치 범위</Text>
          </View>
          <View
            style={[
              styles.averageBpm,
              { left: `${bpmToPosition(data.avgBpm)}%` },
            ]}
          />
          <View
            style={[styles.bpmDot, { left: `${bpmToPosition(data.minBpm)}%` }]}
          />
          <View
            style={[styles.bpmDot, { left: `${bpmToPosition(data.maxBpm)}%` }]}
          />
        </View>
        <View style={styles.bottomBpmLabels}>
          <Text style={[styles.bpmLabel, { left: "-3%" }]}>30</Text>
          <View
            style={[
              styles.bpmLabel,
              { left: `${bpmToPosition(data.avgBpm) - 9}%` },
            ]}
          >
            <Text style={styles.bpmLabelText}>{Math.round(data.avgBpm)}</Text>
            <Text style={styles.bpmLabelText}>평균 심박수</Text>
          </View>
          <Text style={[styles.bpmLabel, { left: "96%" }]}>200</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    shadowColor: "#6c6c6c",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    borderRadius: 5,
    marginBottom: 10,
    paddingTop: 10,
    paddingHorizontal: 25,
    paddingBottom: 35,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    alignItems: "center",
  },
  status: {
    fontFamily: "notoSans7",
    fontSize: 18,
    lineHeight: 25,
  },
  userInfo: {
    alignItems: "flex-end",
  },
  info: {
    fontFamily: "notoSans4",
    fontSize: 14,
    lineHeight: 20,
  },
  bpmContainer: {
    paddingHorizontal: 10,
  },
  bpmBar: {
    height: 20,
    backgroundColor: "#d3d3d3",
    position: "relative",
  },
  threshold: {
    position: "absolute",
    height: 20,
    backgroundColor: "#eb9e9e",
  },
  thresholdText: {
    color: "#eccdcd",
    textAlign: "center",
    fontFamily: "notoSans7",
    fontSize: 14,
    lineHeight: 20,
  },
  averageBpm: {
    position: "absolute",
    width: 2,
    height: 30,
    backgroundColor: "#1857b7",
    top: -5,
  },
  bpmDot: {
    position: "absolute",
    borderWidth: 2,
    height: 20,
    backgroundColor: Colors.navy,
    borderRadius: 2,
    borderStyle: "dotted", // 점선 스타일
  },
  bottomBpmLabels: {
    flexDirection: "row",
    marginTop: 5,
    position: "relative",
  },
  topBpmLabels: {
    flexDirection: "row",
    marginBottom: 10,
    position: "relative",
  },
  bpmLabel: {
    position: "absolute",
    alignItems: "center",
  },
  bpmLabelText: {
    fontFamily: "notoSans4",
    fontSize: 12,
    lineHeight: 15,
  },
});

export default HeartRateCard;
