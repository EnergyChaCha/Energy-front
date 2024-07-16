import React from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import Colors from "@/constants/Colors";
import HeartRateCard from "./HeartRateCard";

interface WorkerData {
  id: string;
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

interface HeartRateListProps {
  data: WorkerData[];
}

function HeartRateList({ data }: HeartRateListProps) {

  const renderWorkerItem = (item: WorkerData) => (
    <View key={item.id}>
      {data.map((item) => (
        <HeartRateCard key={item.id} data={item} />
      ))}
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {data.map(renderWorkerItem)}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    padding: 10,
  },
});

export default HeartRateList;
