import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import { Calendar, DateData } from "react-native-calendars";
import moment from "moment";
import Colors from "@/constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface DateRangePickerProps {
  onDateRangeSelected: (startDate: string, endDate: string) => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  onDateRangeSelected,
}) => {
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [selectBtn, setSelectBtn] = useState<number | null>(null);

  const onDayPress = (day: DateData) => {
    setSelectBtn(null);
    if (!startDate || (startDate && endDate)) {
      setStartDate(day.dateString);
      setEndDate(null);
    } else if (moment(day.dateString).isAfter(startDate)) {
      setEndDate(day.dateString);
    } else {
      setStartDate(day.dateString);
      setEndDate(null);
    }
  };

  const getMarkedDates = () => {
    const marked: any = {};
    console.log(startDate, endDate);

    if (startDate) {
      marked[startDate] = {
        startingDay: true,
        endingDay: true,
        color: Colors.light_blue,
        textColor: "white",
      };
    }
    if (endDate) {
      marked[endDate] = {
        endingDay: true,
        color: Colors.light_blue,
        textColor: "white",
      };
    }
    if (startDate && endDate) {
      marked[startDate] = {
        startingDay: true,
        color: Colors.light_blue,
        textColor: "white",
      };
      let d = moment(startDate);
      const end = moment(endDate);
      while (d.isBefore(end)) {
        const dateString = d.format("YYYY-MM-DD");
        if (dateString !== startDate) {
          marked[dateString] = {
            color: Colors.background_blue,
            textColor: "black",
          };
        }
        d = d.add(1, "day");
      }
    }

    if (startDate && endDate == startDate) {
      marked[startDate] = {
        startingDay: true,
        endingDay: true,
        color: Colors.light_blue,
        textColor: "white",
      };
    }

    return marked;
  };

  const setDateRange = (days: number, buttonIndex: number) => {
    if (days == -1) {
      setShowCalendar(!showCalendar);
    } else {
      const end = moment().startOf("day");
      const start = moment(end).subtract(days - 1, "days");

      setStartDate(start.format("YYYY-MM-DD"));
      setEndDate(end.format("YYYY-MM-DD"));
    }
    setSelectBtn(buttonIndex);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>기간 설정</Text>
      <Text style={styles.dateText}>
        {startDate}
        {endDate && endDate !== startDate && ` - ${endDate}`}
      </Text>

      <View style={styles.dayBtnList}>
        <TouchableOpacity
          style={[styles.dayBtn, selectBtn === 1 && styles.selectedBtn]}
          onPress={() => setDateRange(1, 1)}
        >
          <Text style={styles.dayBtnText}>1일</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.dayBtn, selectBtn === 2 && styles.selectedBtn]}
          onPress={() => setDateRange(7, 2)}
        >
          <Text style={styles.dayBtnText}>1주</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.dayBtn, selectBtn === 3 && styles.selectedBtn]}
          onPress={() => setDateRange(30, 3)}
        >
          <Text style={styles.dayBtnText}>1개월</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.dayBtn, selectBtn === 4 && styles.selectedBtn]}
          onPress={() => setDateRange(90, 4)}
        >
          <Text style={styles.dayBtnText}>3개월</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.dayBtn, selectBtn === 5 && styles.selectedBtn]}
          onPress={() => setDateRange(180, 5)}
        >
          <Text style={styles.dayBtnText}>6개월</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setDateRange(-1, 6)}>
          <MaterialCommunityIcons
            name="calendar-month"
            size={24}
            color={showCalendar ? Colors.blue : Colors.gray}
          />
        </TouchableOpacity>
      </View>

      <Animated.View style={{ display: showCalendar ? "flex" : "none" }}>
        <Calendar
          onDayPress={onDayPress}
          markedDates={getMarkedDates()}
          markingType="period"
          maxDate={moment().format("YYYY-MM-DD")}
        />
      </Animated.View>

      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: startDate ? Colors.blue : Colors.background_gray },
        ]}
        onPress={() => console.log()}
      >
        <Text
          style={[
            styles.buttonText,
            {
              color: startDate ? "#fff" : Colors.gray,
            },
          ]}
        >
          검색
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  titleText: {
    fontFamily: "notoSans5",
    fontSize: 18,
    lineHeight: 23,
    marginBottom: 10,
  },
  dateText: {
    fontFamily: "notoSans5",
    fontSize: 15,
    lineHeight: 20,
    color: Colors.light_blue,
    marginBottom: 10,
  },
  button: {
    // backgroundColor: {startDate?},
    padding: 5,
    width: "50%",
    alignSelf: "center",
    margin: 10,
    borderRadius: 3,
    alignItems: "center",
  },
  buttonText: {
    fontFamily: "notoSans5",
    fontSize: 15,
    lineHeight: 25,
  },
  dayBtnList: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  dayBtn: {
    width: 50,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background_gray,
    borderRadius: 3,
    margin: 5,
    // paddingVertical: 8,
    // paddingHorizontal: 15,
  },
  dayBtnText: {
    lineHeight: 20,
    fontSize: 13,
    fontFamily: "notoSans4",
  },
  selectedBtn: {
    backgroundColor: Colors.background_blue,
  },
  confirmButton: {
    backgroundColor: "#5291FF",
    padding: 10,
    margin: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  confirmButtonText: {
    color: "white",
    fontSize: 16,
  },
});

export default DateRangePicker;
