import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Modal,
} from "react-native";
import Colors from "@/constants/Colors";
import CustomTextInput from "../CustomTextInput";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { getReportSearch, postReport } from "@/api/reportApi";

interface UserInfo {
  id: number;
  name: string;
  phone: string;
  loginId: string;
  gender: number;
  workArea: string;
  birthdate: string;
  department: string;
}

const stateOption = [
  { label: "의식없음", value: "의식없음" },
  { label: "경련", value: "경련" },
  { label: "화상", value: "화상" },
  { label: "출혈", value: "출혈" },
  { label: "쇼크", value: "쇼크" },
  { label: "기절", value: "기절" },
  { label: "기타", value: "기타" },
];

const UserSearchForm = () => {
  const [name, setName] = useState("");
  const [workArea, setWorkArea] = useState("");
  const [searchResults, setSearchResults] = useState<UserInfo[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserInfo | null>(null);
  const [userState, setUserState] = useState<string>("의식없음");
  const [userStateOther, setUserStateOther] = useState<string>("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState(false);

  const handleSearch = async () => {
    try {
      const data = await getReportSearch(name, workArea);
      console.log(data);
      setSearchResults(data);
    } catch (error) {
      console.error("Failed to fetch user Info", error);
    }
  };

  const searchListClick = (user: UserInfo) => {
    console.log(user);
    setSelectedUser(user);
  };

  const reportConfirmClick = async () => {
    try {
      const response = await postReport({
        patientId: selectedUser!.id,
        status: userState == "기타" ? userStateOther : userState,
        latitude:0,
        longitude: 0,
      });
      console.log(response);
      
      setModalContent(true);
    } catch (error) {
      console.error("Report failed:", error);
      Alert.alert("오류", "신고 중 오류가 발생했습니다.");
    }
  };

  const handleConfirmReport = async () => {
    setIsModalVisible(false);
    setSelectedUser(null);
    setUserState("");
    setUserStateOther("");
    setModalContent(false);
  };

  const renderItem = ({ item }: { item: UserInfo }) => (
    <TouchableOpacity
      style={styles.resultItem}
      onPress={() => searchListClick(item)}
    >
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.info}>
        {`${item.loginId} / ${item.birthdate} / ${
          item.gender == 0 ? "여자" : "남자"
        } / ${item.department}`}
      </Text>
      <Ionicons
        name="checkmark-circle"
        size={24}
        color="#007AFF"
        style={styles.checkIcon}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {!selectedUser && (
        <View style={styles.searchBar}>
          <Text style={styles.title}>검색</Text>
          <View style={styles.inputWrapper}>
            <Text style={styles.searchTitle}>이름</Text>
            <TextInput
              style={styles.input}
              placeholder="이름을 입력하세요"
              placeholderTextColor="#999"
              value={name}
              onChangeText={setName}
            />
          </View>
          <View style={styles.inputWrapper}>
            <Text style={styles.searchTitle}>근무지</Text>
            <TextInput
              style={styles.input}
              placeholder="근무지를 입력하세요"
              placeholderTextColor="#999"
              value={workArea}
              onChangeText={setWorkArea}
            />
          </View>

          <TouchableOpacity style={styles.searchIcon} onPress={handleSearch}>
            <Ionicons name="search" size={25} color={Colors.navy} />
          </TouchableOpacity>
        </View>
      )}

      {selectedUser && (
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={{ flexDirection: "row" }}
            onPress={() => setSelectedUser(null)}
          >
            <Ionicons name="arrow-back-circle" size={24} color={Colors.blue} />
            <Text style={styles.toSearchList}>검색 결과로</Text>
          </TouchableOpacity>
        </View>
      )}
      {searchResults.length > 0 && !selectedUser && (
        <FlatList
          data={searchResults}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      )}

      {selectedUser && (
        <View style={styles.searchResultWrapper}>
          <View style={styles.labelWrapper}>
            <View style={styles.labelSize}>
              <CustomTextInput
                label="아이디"
                value={selectedUser.name}
                inputType="label"
              />
            </View>
            <View style={styles.labelSize}>
              <CustomTextInput
                label="이름"
                value={selectedUser.gender == 0 ? "여자" : "남자"}
                inputType="label"
              />
            </View>
          </View>

          <View style={styles.labelWrapper}>
            <View style={styles.labelSize}>
              <CustomTextInput
                label="성별"
                value={selectedUser.workArea}
                inputType="label"
              />
            </View>
            <View style={styles.labelSize}>
              <CustomTextInput
                label="전화번호"
                value={selectedUser.department}
                inputType="label"
              />
            </View>
          </View>
          <View style={[styles.labelWrapper, { alignItems: "flex-end" }]}>
            <View style={styles.labelSize}>
              <CustomTextInput
                label="상태"
                options={stateOption}
                inputType="dropdown"
                value={userState}
                onChangeText={setUserState}
              />
            </View>
            {userState == "other" && (
              <View style={styles.labelSize}>
                <CustomTextInput
                  label=""
                  value={userStateOther}
                  onChangeText={setUserStateOther}
                  inputType="input"
                />
              </View>
            )}
          </View>
          <TouchableOpacity
            style={styles.reportButton}
            onPress={() => setIsModalVisible(true)}
          >
            <MaterialCommunityIcons
              name="car-emergency"
              size={24}
              color="white"
            />
            <Text style={styles.reportButtonText}>신고하기</Text>
          </TouchableOpacity>
        </View>
      )}

      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>관리자 긴급 신고</Text>
            {!modalContent && (
              <>
                <Ionicons name="alert-circle" size={100} color={Colors.red} />
                <Text style={styles.modalSubText}>신고를</Text>
                <Text style={styles.modalSubText}>접수하시겠습니까?</Text>
                <View style={styles.modalButtonContainer}>
                  <TouchableOpacity
                    style={[styles.modalButton, styles.cancelButton]}
                    onPress={() => setIsModalVisible(false)}
                  >
                    <Text style={styles.modalButtonText}>취소</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.modalButton, styles.confirmButton]}
                    onPress={reportConfirmClick}
                  >
                    <Text style={styles.modalButtonText}>접수</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
            {modalContent && (
              <>
                <FontAwesome5
                  name="check-circle"
                  size={80}
                  color={Colors.navy}
                  style={{ marginBottom: 10 }}
                />
                <Text style={styles.modalSubText}>신고가</Text>
                <Text style={styles.modalSubText}>완료되었습니다.</Text>
                <TouchableOpacity
                  style={[styles.modalButton, { backgroundColor: Colors.navy }]}
                  onPress={handleConfirmReport}
                >
                  <Text style={styles.modalButtonText}>완료</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F7",
  },
  title: {
    fontFamily: "notoSans7",
    lineHeight: 30,
    fontSize: 18,
    color: Colors.navy,
  },
  searchBar: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 16,
    position: "relative",
  },
  searchTitle: {
    fontFamily: "notoSans5",
    lineHeight: 20,
    fontSize: 15,
    color: Colors.navy,
    width: 50,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    marginLeft: 10,
    fontSize: 15,
    width: 180,
    height: 35,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  searchIcon: {
    position: "absolute",
    right: 30,
    bottom: 15,
  },
  resultText: {
    fontFamily: "notoSans7",
    lineHeight: 30,
    fontSize: 18,
    color: Colors.navy,
    marginBottom: 10,
    marginRight: 10,
  },
  resultItem: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 10,
  },
  info: {
    fontSize: 14,
    color: "#666",
    flex: 1,
  },
  checkIcon: {
    marginLeft: 10,
  },
  labelWrapper: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
  },
  labelSize: {
    width: "50%",
    paddingHorizontal: 5,
  },
  searchResultWrapper: {
    paddingVertical: 10,
  },
  reportButton: {
    backgroundColor: Colors.red,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginHorizontal: 5,
    flexDirection: "row",
  },
  reportButtonText: {
    marginLeft: 10,
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  toSearchList: {
    fontFamily: "notoSans6",
    fontSize: 16,
    lineHeight: 20,
    alignSelf: "center",
    marginLeft: 5,
    color: Colors.blue,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    width: "80%",
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontFamily: "notoSans8",
    fontSize: 25,
    lineHeight: 30,
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
    backgroundColor: Colors.red,
  },
  modalButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default UserSearchForm;
