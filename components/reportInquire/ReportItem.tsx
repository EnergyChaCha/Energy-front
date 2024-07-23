import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Modal,
  FlatList,
} from "react-native";
import Colors from "@/constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import ReportDetail from "./ReportDetail";

interface Patient {
  id: string;
  loginId: string;
  name: string;
  phone: string;
}

interface Reporter {
  id: string;
  loginId: string;
  name: string;
  phone: string;
}

interface ReportData {
  reportId: number;
  latitude: number;
  longitude: number;
  bpm: number;
  createdTime: string;
  patient: Patient;
  reporter: Reporter;
}

interface ReportItemProps {
  time: string;
  list: ReportData[];
}

function ReportItem({ time, list }: ReportItemProps) {
  const [showReportModal, setShowReportModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState<number>();

  const renderReportItem = ({ item }: { item: ReportData }) => (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.item}
      onPress={() => {
        setSelectedReport(item.reportId);
        setShowReportModal(true);
      }}
    >
      <Text style={[styles.itemGPSText, {marginBottom:0}]}>위도 {item.latitude}</Text>
      <Text style={styles.itemGPSText}>경도 {item.longitude}</Text>
      <Text style={styles.itemBPMText}>{item.bpm} BPM (신고 시 심박수)</Text>
      <Text style={styles.itemInfoText}>
        환자 : {item.patient.loginId} / {item.patient.name} /{" "}
        {item.patient.phone} {"\n"}
        접수자 : {item.reporter.loginId} / {item.reporter.name} /{" "}
        {item.reporter.phone}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.time}>{time}</Text>
      <View style={styles.itemWrapper}>
        <FlatList
          data={list}
          renderItem={renderReportItem}
          keyExtractor={(item, index) => index.toString()}
          scrollEnabled={false}
        />
      </View>
      <Modal
        visible={showReportModal}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setShowReportModal(false)}
      >
        <View style={styles.modalContainer}>
          <ReportDetail
            modalClose={() => setShowReportModal(false)}
            reportDataId={selectedReport!}
          />
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
    fontSize: 15,
    lineHeight: 20,
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
    backgroundColor: Colors.modal_background,
  },
});

export default ReportItem;
