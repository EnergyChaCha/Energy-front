import { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import { Text, View } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import Colors from "@/constants/Colors";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import moment from "moment";

import SearchForm from "@/components/SearchForm";

const JsonData = [
  {
    id: "worker_uuid_1",
    name: "김*원",
    phone: "010-****-4567",
    loginId: "abd**",
    minBpm: 50,
    maxBpm: 140,
    averageBpm: 89,
    minThreshold: 70,
    maxThreshold: 130,
    heartrateStatus: "emergency",
  },
  {
    id: "worker_uuid_2",
    name: "이*원",
    phone: "010-****-4567",
    loginId: "abd**",
    minBpm: 50,
    maxBpm: 140,
    averageBpm: 89,
    minThreshold: 70,
    maxThreshold: 130,
    heartrateStatus: "caution",
  },
];

export default function heartRateMonitoring() {
  const [data, setData] = useState(JsonData);
  
  const [showDateModal, setShowDateModal] = useState(false);
  const [date, setDate] = useState<{
    startDate: string | null;
    endDate: string | null;
  }>({
    startDate: moment().startOf("day").format("YYYY-MM-DD"),
    endDate: null,
  });

  const handleSearchClick = (input: string) => {
    console.log("Search Text:", input);
  };

  return (
    <View style={styles.container}>
      <SearchForm searchClick={handleSearchClick} />
      <View style={styles.dateWrapper}>
        <Text style={styles.dateText}>
          기간 &nbsp;
          <Text style={{ color: Colors.blue }}>
            {date.startDate}
            {date.endDate &&
              date.endDate !== date.startDate &&
              ` ~ ${date.endDate}`}
          </Text>
        </Text>
        <TouchableOpacity
          style={styles.dateIcon}
          onPress={() => setShowDateModal(true)}
        >
          <Text style={styles.dateText}>기간 설정 &nbsp;</Text>
          <MaterialCommunityIcons
            name="calendar-month"
            size={25}
            color={Colors.navy}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 10,
    alignSelf: "center",
    width: "100%",
  },
  dateWrapper: {
    width: "100%",
    height: 50,
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between",

    paddingVertical: 10,
    paddingHorizontal: 5,
  },

  dateText: {
    fontFamily: "notoSans5",
    fontSize: 15,
    lineHeight: 20,
    color: Colors.navy,
    alignSelf: "center",
  },
  dateIcon: {
    display: "flex",
    flexDirection: "row",
    alignSelf: "center",
  },
});
