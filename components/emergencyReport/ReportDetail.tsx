import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { useNavigation } from "@react-navigation/native";
import Colors from "@/constants/Colors";
import CustomTextInput from "@/components/CustomTextInput";
import ReportDetailPatient from "./ReportDetailPatient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import TabComponent from "./Tab";
import ReportDetailReporter from "./ReportDetailReporter";

interface DateRangePickerProps {
  modalClose: () => void;
}

const ReportDetail: React.FC<DateRangePickerProps> = ({ modalClose }) => {
  const [form, setForm] = useState({
    createdTime: "2023-07-01T10:30:00Z",
    id: "target_uuid_1",
    loginId: "chacha123",
    name: "정으니",
    gender: 0,
    phone: "010-1234-1234",
    workArea: "근무지",
    department: "직무(상차)",
    gps: "gps 정보",
    status: "의식 없음",
    address: "주소",
    healthInfo: {
      emergencyNumber: "응급연락처",
      emergencyRelationship: "응급연락처관계",
      disease: "기저질환",
      allergy: "알레르기",
      medication: "복용중인 약",
      blood: "혈액형",
      organDonor: 0,
    },
  });

  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "patient", title: "환자" },
    { key: "reporter", title: "접수자" },
  ]);

  const renderScene = SceneMap({
    patient: ReportDetailPatient,
    reporter: ReportDetailReporter,
  });

  const renderTabBar = (props: any) => (
    <TabBar
      indicatorStyle={styles.indicator}
      style={styles.tabbar}
      labelStyle={styles.label}
      {...props}
    />
  );

  const handleClose = () => {
    modalClose();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
        <MaterialCommunityIcons name="close" size={24} color={Colors.gray} />
      </TouchableOpacity>

      <Text style={styles.title}>
        <MaterialCommunityIcons
          name="car-emergency"
          size={30}
          color={Colors.red}
        />
        &nbsp;신고 정보
      </Text>

      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={renderTabBar}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "80%",
    width: "90%",
    padding: 10,
    backgroundColor: "white",
    borderRadius: 10,
  },
  title: {
    fontFamily: "notoSans8",
    fontSize: 28,
    lineHeight: 35,
    marginTop: 20,
    marginBottom: 20,
    marginRight: 10,
    color: Colors.navy,
    alignSelf: "center",
  },
  tabbar: {
    backgroundColor: "#fff",
    elevation: 0,
  },
  indicator: {
    backgroundColor: Colors.navy,
  },
  label: {
    color: Colors.navy,
    margin: 0,
    fontFamily:"notoSans6",
    fontSize:15,
    lineHeight:20
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 10,
    zIndex: 1,
  },
});

export default ReportDetail;
