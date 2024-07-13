import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Modal,
} from "react-native";
import Colors from "@/constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import ReportDetail from "./ReportDetail";

interface TimeDividerProps {
  time: string;
  list: string;
}

function ReportItem({ time, list }: TimeDividerProps) {
  const [showReportModal, setShowReportModal] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.time}>{time}</Text>
      <View style={styles.itemWrapper}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.item}
          onPress={() => setShowReportModal(true)}
        >
          <Text style={styles.itemGPSText}>장소 (GPS 좌표)</Text>
          <Text style={styles.itemBPMText}>129 BPM (신고 시 심박수)</Text>
          <Text style={styles.itemInfoText}>
            환자 : log** / 홍*동 / 010****5678 {"\n"}
            접수자 : log** / 홍*동/ 010****5678
          </Text>
          <TouchableOpacity style={styles.checkboxContainer}>
            <AntDesign name="checkcircleo" size={24} color="black" />
            <Text style={styles.iconText}>id</Text>
          </TouchableOpacity>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.item}
          onPress={() => setShowReportModal(true)}
        >
          <Text style={styles.itemGPSText}>장소 (GPS 좌표)</Text>
          <Text style={styles.itemBPMText}>129 BPM (신고 시 심박수)</Text>
          <Text style={styles.itemInfoText}>
            환자 : log** / 홍*동 / 010****5678 {"\n"}
            접수자 : log** / 홍*동/ 010****5678
          </Text>
          <TouchableOpacity style={styles.checkboxContainer}>
            <AntDesign name="checkcircleo" size={24} color="black" />
            <Text style={styles.iconText}>id</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
      <Modal
        visible={showReportModal}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setShowReportModal(false)}
      >
        <View style={styles.modalContainer}>
          <ReportDetail modalClose={() => setShowReportModal(false)} />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
  },
  time: {
    height: 30,
    marginTop: 5,
    backgroundColor: Colors.background_blue,
    paddingVertical: 5,
    paddingHorizontal: 10,
    color: Colors.blue,
    fontFamily: "notoSans6",
    fontSize: 15,
    lineHeight: 20,
    borderRadius: 5,
  },
  itemWrapper: {
    flex: 1,
    display: "flex",
  },
  item: {
    margin: 5,
    paddingHorizontal: 20,
    paddingVertical: 15,

    borderRadius: 5,
    backgroundColor: "#fff",
    shadowColor: "#6c6c6c",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  itemGPSText: {
    fontFamily: "notoSans4",
    fontSize: 13,
    lineHeight: 20,
    color: Colors.gray,
    marginBottom: 8,
  },
  itemBPMText: {
    fontFamily: "notoSans8",
    fontSize: 18,
    lineHeight: 25,
    color: Colors.navy,
    marginBottom: 5,
  },
  itemInfoText: {
    fontFamily: "notoSans4",
    fontSize: 12,
    lineHeight: 20,
    color: Colors.gray,
  },
  checkboxContainer: {
    position: "absolute",
    right: 15,
    top: "50%",
    alignItems: "center",
  },
  iconText: {
    marginTop: 3,
    fontSize: 12,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: Colors.modal_background,
  },
});

export default ReportItem;
