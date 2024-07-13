import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "@/constants/Colors";

interface TimeDividerProps {
  date: string;
}

const TimeDivider: React.FC<TimeDividerProps> = ({ date }) => {
  const dateObject = new Date(date);
  const dayOfWeek = dateObject.getDay();
  const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
  const dayOfWeekString = weekdays[dayOfWeek];

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {date} ({dayOfWeekString})
      </Text>
      <View style={styles.divider}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  text:{
    color: Colors.gray
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.divider,
    marginLeft: 10,
  },
});

export default TimeDivider;
