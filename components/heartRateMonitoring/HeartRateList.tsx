import React from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import Colors from "@/constants/Colors";
import { useNavigation } from "@react-navigation/native";
import HeartRateCard from "./HeartRateCard";

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

interface HeartRateListProps {
  data: WorkerData[];
}

function HeartRateList({ data }: HeartRateListProps) {
  const navigation = useNavigation();

  const handleCardPress = (item: WorkerData) => {
    (navigation as any).navigate("modal/HeartRateUserInfo", {
      userData: item,
      userId: item.id,
    });
  };

  const renderWorkerItem = (item: WorkerData) => (
    <TouchableOpacity  key={item.id} onPress={() => handleCardPress(item)}>
      <HeartRateCard data={item} />
    </TouchableOpacity>
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
