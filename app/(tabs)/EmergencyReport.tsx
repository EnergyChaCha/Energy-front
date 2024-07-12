import { StyleSheet } from "react-native";

import { Text, View } from "react-native";
import Colors from "@/constants/Colors";

export default function EmergencyReport() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>신고이력</Text>
      <View
        style={styles.separator}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    backgroundColor: Colors.divider,
    width: "80%",
  },
});
