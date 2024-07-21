import Colors from "@/constants/Colors";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Alert,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

interface WorkerData {
  id: number;
  name: string;
  birth: string;
  gender: number;
  phone: string;
  loginId: string;
  workArea: string;
  department: string;
  role: string;
}

interface TableProps {
  data: WorkerData[];
}

const Table: React.FC<TableProps> = ({ data }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);

  const [selectedWorker, setSelectedWorker] = useState<WorkerData | null>(null);

  const headers = [
    "이름",
    "아이디",
    "생년월일",
    "성별",
    "전화번호",
    "근무지",
    "직무",
    "관리자여부",
  ];

  const formatData = (item: WorkerData) => ({
    name: item.name,
    loginId: item.loginId,
    birth: item.birth,
    gender: item.gender === 0 ? "남성" : "여성",
    phone: item.phone,
    workArea: item.workArea,
    department: item.department,
    role: item.role === "USER" ? "" : "관리자",
  });
  const DetailRow = ({
    label,
    value,
    border,
  }: {
    label: string;
    value: string;
    border?: boolean;
  }) => (
    <View style={[styles.detailRow, border ? { borderBottomWidth: 0 } : {}]}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );

  const handleRowPress = (worker: WorkerData) => {
    setSelectedWorker(worker);
    setModalVisible(true);
  };

  const handleAdminAssign = () => {
    setConfirmModalVisible(true);
  };

  const confirmAdminAssign = () => {
    if (selectedWorker) {
      console.log("Assigned admin ID:", selectedWorker.id);
      
    }
    setConfirmModalVisible(false);
    setModalVisible(false);
  };

  return (
    <View style={styles.tableWrapper}>
      <Text style={styles.totalNum}>
        총{"  "}
        <Text style={{ color: Colors.blue }}>{data.length}</Text> 명
      </Text>
      <ScrollView style={styles.tableScroll}>
        <View>
          <View style={styles.headerRow}>
            {headers.map((header, index) => (
              <Text key={index} style={styles.headerCell}>
                {header}
              </Text>
            ))}
          </View>
          {data.map((worker, rowIndex) => {
            const formattedWorker = formatData(worker);
            return (
              <TouchableOpacity
                key={rowIndex}
                style={styles.dataRow}
                onPress={() => handleRowPress(worker)}
              >
                {Object.values(formattedWorker).map((cell, cellIndex) => (
                  <Text key={cellIndex} style={styles.dataCell}>
                    {cell}
                  </Text>
                ))}
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.title}>
              <FontAwesome5 name="user-alt" size={24} color={Colors.navy} />
              {"  "}회원 정보
            </Text>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>
                <Ionicons name="close" size={24} color="#696969" />
              </Text>
            </TouchableOpacity>

            {!confirmModalVisible && (
              <>
                <TouchableOpacity
                  style={styles.adminButton}
                  onPress={handleAdminAssign}
                >
                  <Text style={styles.adminButtonText}>
                    <FontAwesome5 name="user-cog" size={24} color="white" />
                    {"  "}관리자 지정
                  </Text>
                </TouchableOpacity>

                {selectedWorker && (
                  <View style={styles.profileSection}>
                    <View style={styles.avatarContainer}>
                      <Text style={styles.name}>{selectedWorker.name}</Text>
                      <Text style={styles.subInfo}>생년월일</Text>
                      <Text style={styles.subInfo}>성별</Text>
                    </View>
                    <View style={styles.detailsSection}>
                      <DetailRow
                        label="아이디"
                        value={selectedWorker.loginId}
                      />
                      <DetailRow
                        label="전화번호"
                        value={selectedWorker.phone}
                      />
                      <DetailRow label="근무지" value="안산 HUB" />
                      <DetailRow label="직무" value="상차" border={true} />
                    </View>
                  </View>
                )}
              </>
            )}
            {confirmModalVisible && (
              <>
                <Ionicons name="alert-circle" size={100} color={Colors.navy} />
                <Text style={styles.modalSubText}>관리자로</Text>
                <Text style={styles.modalSubText}>지정하겠습니까?</Text>
                <View style={styles.modalButtonContainer}>
                  <TouchableOpacity
                    style={[styles.modalButton, styles.cancelButton]}
                    onPress={() => {
                      setModalVisible(false);
                      setConfirmModalVisible(false);
                    }}
                  >
                    <Text style={styles.modalButtonText}>취소</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.modalButton, styles.confirmButton]}
                    onPress={confirmAdminAssign}
                  >
                    <Text style={styles.modalButtonText}>확인</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  tableWrapper: {
    flex: 1,
  },
  tableScroll: {
    flex: 1,
  },
  totalNum: {
    fontFamily: "notoSans5",
    fontSize: 15,
    lineHeight: 20,
    margin: 10,
  },
  headerRow: {
    flexDirection: "row",
    backgroundColor: "#f2f2f2",
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  dataRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  headerCell: {
    padding: 10,
    width: 130,
    textAlign: "center",
    fontFamily: "notoSans7",
    fontSize: 15,
    lineHeight: 20,
    color: Colors.navy,
  },
  dataCell: {
    padding: 10,
    width: 130,
    textAlign: "center",
    fontFamily: "notoSan",
    fontSize: 15,
    lineHeight: 20,
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 500,
    backgroundColor: Colors.background_gray,
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  adminButton: {
    position: "absolute",
    bottom: 20,
    right: 30,
    backgroundColor: Colors.navy,
    padding: 15,
    borderRadius: 5,
  },
  adminButtonText: {
    color: "white",
    fontSize: 18,
    fontFamily: "notoSans5",
    lineHeight: 22,
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 30,
  },
  closeButtonText: {
    color: Colors.navy,
  },

  title: {
    fontSize: 25,
    fontFamily: "notoSans7",
    lineHeight: 28,
    marginBottom: 10,
    color: Colors.navy,
  },
  profileSection: {
    flexDirection: "row",
    marginBottom: 50,
    marginTop: 20,
  },
  avatarContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 10,
    height: 200,
    width: 150,
  },
  name: {
    fontSize: 20,
    fontFamily: "notoSans7",
    lineHeight: 25,
    marginVertical: 15,
  },
  subInfo: {
    color: "gray",
  },
  detailsSection: {
    marginBottom: 20,
    marginLeft: 10,
    width: 280,
    height: 200,
    backgroundColor: "white",
    justifyContent: "center",
    padding: 10,
    borderRadius: 10,
  },
  detailRow: {
    flexDirection: "row",
    borderBottomColor: "#d2d2d28e",
    borderBottomWidth: 1,
    padding: 10,
  },
  detailLabel: {
    fontFamily: "notoSans5",
    fontSize: 15,
    lineHeight: 20,
    color: Colors.navy,
    width: 100,
  },
  detailValue: {
    fontFamily: "notoSans6",
    color: Colors.gray,
    fontSize: 15,
    lineHeight: 20,
  },

  modalSubText: {
    textAlign: "center",
    fontFamily: "notoSans6",
    fontSize: 20,
    lineHeight: 25,
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    marginTop: 20,
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    width: "45%",
  },
  cancelButton: {
    backgroundColor: "#DDDDDD",
  },
  confirmButton: {
    backgroundColor: Colors.navy,
  },
  modalButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Table;
