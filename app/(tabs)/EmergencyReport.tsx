import React, { useState } from "react";
import { Modal, StyleSheet, TouchableOpacity } from "react-native";

import { Text, View, ScrollView } from "react-native";
import Colors from "@/constants/Colors";
import SearchForm from "@/components/emergencyReport/SearchForm";
import DateRangePicker from "@/components/DateRangePicker";
import moment from "moment";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ReportDetail from "@/components/emergencyReport/ReportDetail";
import TimeDivider from "@/components/emergencyReport/TimeDivider";
import ReportItem from "@/components/emergencyReport/ReportItem";

export default function EmergencyReport() {
  const [searchInput, setSearchInput] = useState("");
  const [searchType, setSearchType] = useState("");
  const [showDateModal, setShowDateModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);

  const [date, setDate] = useState<{
    startDate: string | null;
    endDate: string | null;
  }>({
    startDate: moment().startOf("day").format("YYYY-MM-DD"),
    endDate: null,
  });

  const handleDateRangeSelected = (startDate: string, endDate: string) => {
    if (startDate == "" && endDate == "") {
      setShowDateModal(false);
    } else {
      setDate({
        startDate: startDate,
        endDate: endDate,
      });
      setShowDateModal(false);
    }
  };

  return (
    <View style={styles.container}>
      <SearchForm />
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

      <ScrollView style={styles.scrollView}>
        <TimeDivider date="2024-07-14" />
        <ReportItem time="14:00" list="" />

        <TimeDivider date="2024-07-15" />
        <ReportItem time="12:00" list="" />
      </ScrollView>

      <Modal
        visible={showDateModal}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setShowDateModal(false)}
      >
        <View style={styles.modalContainer}>
          <DateRangePicker onDateRangeSelected={handleDateRangeSelected} />
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
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 5,
    height: 1,
    backgroundColor: Colors.divider,
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: Colors.modal_background,
  },

  scrollView:{
    width: "100%",
  },
});
