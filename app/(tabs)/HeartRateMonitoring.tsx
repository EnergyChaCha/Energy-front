import { useEffect, useState } from "react";
import { Modal, StyleSheet, TouchableOpacity } from "react-native";

import { Text, View } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import Colors from "@/constants/Colors";

import { AntDesign } from "@expo/vector-icons";
import moment from "moment";

import SearchForm from "@/components/SearchForm";
import CustomTabView from "@/components/CustomTabView";
import HeartRateList from "@/components/heartRateMonitoring/HeartRateList";
import DateSet from "@/components/emergencyReport/DateSet";
import HelpModal from "@/components/heartRateMonitoring/HelpModal";

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
    heartrateStatus: "stability",
  },
  {
    id: "worker_uuid_2",
    name: "이*원",
    phone: "010-****-4567",
    loginId: "abd**",
    minBpm: 80,
    maxBpm: 150,
    averageBpm: 140,
    minThreshold: 70,
    maxThreshold: 130,
    heartrateStatus: "caution",
  },
];

export default function heartRateMonitoring() {
  const [allData, setAllData] = useState(JsonData);
  const [showHelpModal, setShowHelpModal] = useState(false);

  // useEffect(() => {
  //   if (JsonData == null) return;
  //   JsonData.forEach((element) => {
  //     if(element.heartrateStatus)
  //   });
  // }, [JsonData]);

  const routes = [
    { key: "all", title: "전체" },
    { key: "emergency", title: "위기" },
    { key: "caution", title: "주의" },
    { key: "stability", title: "정상" },
  ];

  const renderScene = ({ route }: { route: { key: string } }) => {
    switch (route.key) {
      case "all":
        return <HeartRateList data={allData} />;
      case "emergency":
        return <HeartRateList data={allData} />;
      case "caution":
        return <HeartRateList data={allData} />;
      case "stability":
        return <HeartRateList data={allData} />;
      default:
        return <HeartRateList data={allData} />;
    }
  };

  const handleSearchClick = (input: string) => {
    console.log("Search Text:", input);
  };

  const handleDate = (startDate: string | null, endDate: string | null) => {
    console.log("startDate : ", startDate);
    console.log("endDate : ", endDate);
  };

  return (
    <View style={styles.container}>
      <SearchForm searchClick={handleSearchClick} />
      <DateSet handleDate={handleDate} />

      <View style={styles.tabContainer}>
        <View style={styles.tab}>
          <CustomTabView routes={routes} renderScene={renderScene} />
        </View>
        <TouchableOpacity
          style={styles.questionIcon}
          onPress={() => setShowHelpModal(true)}
        >
          <AntDesign name="questioncircleo" size={20} color={Colors.gray} />
        </TouchableOpacity>
      </View>

      <Modal
        visible={showHelpModal}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setShowHelpModal(false)}
      >
        <View style={styles.modalContainer}>
          <HelpModal modalClose={() => setShowHelpModal(false)} />
        </View>
      </Modal>
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
  tabContainer: {
    width: "100%",
    position: "relative",
    flex: 1,
  },
  tab: {
    width: "100%",
    flex: 1,
  },
  questionIcon: {
    position: "absolute",
    top: 13,
    right: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.modal_background,
  },
});
