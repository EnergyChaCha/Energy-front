import { useEffect, useState } from "react";
import { Modal, StyleSheet, TouchableOpacity } from "react-native";

import { Text, View } from "react-native";
import Colors from "@/constants/Colors";

import { AntDesign } from "@expo/vector-icons";
import SearchForm from "@/components/SearchForm";
import CustomTabView from "@/components/CustomTabView";
import HeartRateList from "@/components/heartRateMonitoring/HeartRateList";
import DateSet from "@/components/reportInquire/DateSet";
import HelpModal from "@/components/heartRateMonitoring/HelpModal";
import { useRoute } from "@react-navigation/native";
import { getHeartRateAll } from "@/api/heartApi";
import moment from "moment";

const JsonData = [
  {
    id: 6,
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
    id: 5,
    name: "이*원",
    phone: "010-****-4567",
    loginId: "abd**",
    minBpm: 80,
    maxBpm: 150,
    avgBpm: 140,
    minThreshold: 70,
    maxThreshold: 130,
    heartrateStatus: "caution",
  },
];
interface heartRateType {
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
}



export default function AdminHeartPage() {
  const [allData, setAllData] = useState<heartRateType[]>([]);
  const [showHelpModal, setShowHelpModal] = useState(false);

  const [date, setDate] = useState<{
    startDate: string;
    endDate: string;
  }>({
    startDate: moment().subtract(7, "days").format("YYYY-MM-DD"),
    endDate: moment().format("YYYY-MM-DD"),
  });

  const fetchUserData = async (start: string, end: string) => {
    try {
      const data = await getHeartRateAll(start, end);

      console.log(data);
      setAllData(data);
    } catch (error) {
      console.error("Failed to fetch user data", error);
    }
  };

  useEffect(() => {
    // if (JsonData == null) return;
    // setAllData(JsonData);
    fetchUserData(date.startDate, date.endDate);
  }, []);

  const routes = [
    { key: "all", title: "전체" },
    { key: "emergency", title: "위기" },
    { key: "caution", title: "주의" },
    { key: "stability", title: "안정" },
  ];

  const renderScene = ({ route }: { route: { key: string } }) => {
    let filteredData;
    switch (route.key) {
      case "all":
        filteredData = allData;
        break;
      case "emergency":
        filteredData = allData.filter((item) => item.heartrateStatus === 2);
        break;
      case "caution":
        filteredData = allData.filter((item) => item.heartrateStatus === 1);
        break;
      case "stability":
        filteredData = allData.filter((item) => item.heartrateStatus === 0);
        break;
      default:
        filteredData = allData;
    }
    return <HeartRateList data={filteredData} />;
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
