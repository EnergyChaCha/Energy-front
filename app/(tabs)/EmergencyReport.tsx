import React, { useState } from "react";
import { Modal, StyleSheet, TouchableOpacity } from "react-native";

import { Text, View } from "react-native";
import Colors from "@/constants/Colors";
import SearchForm from "@/components/emergencyReport/SearchForm";
import DateRangePicker from "@/components/DateRangePicker";
import moment from "moment";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function EmergencyReport() {
  const [searchInput, setSearchInput] = useState("");
  const [searchType, setSearchType] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [date, setDate] = useState<{
    startDate: string | null;
    endDate: string | null;
  }>({
    startDate: moment().startOf("day").format("YYYY-MM-DD"),
    endDate: null,
  });

  const handleDateRangeSelected = (startDate: string, endDate: string) => {
    if (startDate == "" && endDate ==""){
      setShowModal(false);
    }else{
      setDate({
        startDate: startDate,
        endDate: endDate,
      });
      setShowModal(false);
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
          onPress={() => setShowModal(true)}
        >
          <Text style={styles.dateText}>기간 설정 &nbsp;</Text>
          <MaterialCommunityIcons
            name="calendar-month"
            size={25}
            color={Colors.navy}
          />
        </TouchableOpacity>
      </View>
      <Modal
        visible={showModal}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setShowModal(false)}
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
    justifyContent: "center",
    alignSelf: "center",
    width: "90%",
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
});
