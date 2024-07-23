import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import Colors from "@/constants/Colors";
import moment from "moment";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import DateRangePicker from "@/components/DateRangePicker";

interface DateSetProps {
  handleDate: (startDate: string | null, endDate: string | null) => void;
}

function DateSet({ handleDate }: DateSetProps) {
  const [showDateModal, setShowDateModal] = useState(false);

  const [date, setDate] = useState<{
    startDate: string | null;
    endDate: string | null;
  }>({
    startDate: moment().subtract(7, "days").format("YYYY-MM-DD"),
    endDate: moment().format("YYYY-MM-DD"),
  });

  const handleDateRangeSelected = (startDate: string, endDate: string) => {
    if (startDate == "" && endDate == "") {
      setShowDateModal(false);
    } else {
      setDate({
        startDate: startDate,
        endDate: endDate,
      });
      handleDate(startDate, endDate);

      setShowDateModal(false);
    }
  };

  return (
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
    backgroundColor: Colors.modal_background,
  },
});

export default DateSet;
