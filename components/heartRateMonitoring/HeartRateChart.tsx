import Colors from "@/constants/Colors";
import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

interface HeartRateData {
  date: string;
  minBpm: number;
  maxBpm: number;
  averageBpm: number;
}

interface HeartRateChartProps {
  data: HeartRateData[];
}

const CHART_HEIGHT = 150;
const Y_AXIS_MIN = 30;
const Y_AXIS_MAX = 200;

function HeartRateChart({ data }: HeartRateChartProps) {
  const normalizeY = (value: number) => {
    return (
      CHART_HEIGHT -
      ((value - Y_AXIS_MIN) / (Y_AXIS_MAX - Y_AXIS_MIN)) * CHART_HEIGHT
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.yAxis}>
        {[200, 150, 100, 50, 30].map((value) => (
          <Text key={value} style={styles.yAxisLabel}>
            {value}
          </Text>
        ))}
      </View>
      <View style={styles.chart}>
        {data.map((item, index) => {
          const maxY = normalizeY(item.maxBpm);
          const minY = normalizeY(item.minBpm);
          const avgY = normalizeY(item.averageBpm);

          return (
            <View key={index} style={styles.dataColumn}>
              <View style={[styles.backLine, { height: "100%" }]} />

              <Text style={[styles.maxMinValue, { top: maxY - 5, right: -8 }]}>
                {item.maxBpm}
              </Text>
              <View
                style={[styles.dataLine, { top: maxY, height: minY - maxY }]}
              />
              <View style={[styles.dataPoint, { top: maxY }]} />

              <View style={[styles.dataPoint, { top: minY }]} />
              <Text style={[styles.maxMinValue, { top: minY - 5, right: -3 }]}>
                {item.minBpm}
              </Text>
              <View style={[styles.avgPoint, { top: avgY }]} />
              <Text style={[styles.avgValue, { top: avgY - 5, right: -3 }]}>
                {item.averageBpm}
              </Text>
              <Text style={styles.xAxisLabel}>{item.date}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: CHART_HEIGHT + 10,
  },
  yAxis: {
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingRight: 5,
  },
  yAxisLabel: {
    fontSize: 10,
    color: "black",
  },
  chart: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#c2c2c2",
  },
  dataColumn: {
    width: 30,
    height: "100%",
    alignItems: "center",
  },
  dataPoint: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#7d98f8",
    position: "absolute",
  },
  dataLine: {
    width: 2,
    backgroundColor: "#a8baf9",
    position: "absolute",
  },
  backLine: {
    width: 2,
    backgroundColor: "#e4e4e4",
    position: "absolute",
  },
  avgPoint: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#f68484",
    position: "absolute",
  },
  xAxisLabel: {
    fontSize: 10,
    color: "black",
    position: "absolute",
    bottom: -20,
  },
  maxMinValue: {
    fontSize: 10,
    color: "#7d98f8",
    position: "absolute",
  },
  avgValue: {
    fontSize: 10,
    color: "#f68484",
    position: "absolute",
  },
});

export default HeartRateChart;
