import React,{useState} from "react";
import { StyleSheet } from "react-native";

import { Text, View } from "react-native";
import Colors from "@/constants/Colors";
import SearchForm from "@/components/emergencyReporter/SearchForm";
import DateRangePicker from "@/components/DateRangePicker";

export default function EmergencyReport() {
  const [searchInput, setSearchInput] = useState("");
  const [searchType, setSearchType] = useState("");

    const handleDateRangeSelected = (startDate: string, endDate: string) => {
      console.log(`Selected date range: ${startDate} to ${endDate}`);
      // 여기서 선택된 날짜 범위로 원하는 작업을 수행하세요
    };

  return (
    <View style={styles.container}>
      <SearchForm />
      {/* <Text style={styles.title}>신고이력</Text> */}
      <View style={styles.separator} />
      <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
        <DateRangePicker onDateRangeSelected={handleDateRangeSelected} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    width: "90%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    backgroundColor: Colors.divider,
    width: "100%",
  },
});
