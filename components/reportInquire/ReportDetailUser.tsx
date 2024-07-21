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
import Colors from "@/constants/Colors";
import ReportDetailPatient from "./ReportDetailPatient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ReportDetailReporter from "./ReportDetailReporter";

const JsonDate = {
  id: "report_uuid_1",
  gps: "위도, 경도",
  createdTime: "2024-06-20T10:22:22",
  checked: "확인한 관리자 id",
  patient: {
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
      bpm: "",
    },
  },
  reporter: {
    id: "reporter_uuid_1",
    loginId: "chacha123",
    name: "정으니",
    gender: 0,
    phone: "010-1234-1234",
    department: "직무(상차)",
    workArea: "근무지",
  },
};

interface HealthInfo {
  emergencyNumber: string;
  emergencyRelationship: string;
  disease: string;
  allergy: string;
  medication: string;
  blood: string;
  organDonor: number;
  bpm: string;
}

interface Patient {
  id: string;
  loginId: string;
  name: string;
  gender: number;
  phone: string;
  workArea: string;
  department: string;
  gps: string;
  status: string;
  address: string;
  healthInfo: HealthInfo;
}

interface Reporter {
  id: string;
  loginId: string;
  name: string;
  gender: number;
  phone: string;
  department: string;
  workArea: string;
}


interface DateRangePickerProps {
  modalClose: () => void;
  reportDataId: string;
}

const ReportDetail: React.FC<DateRangePickerProps> = ({
  modalClose,
  reportDataId,
}) => {
  const [data, setData] = useState(JsonDate);

  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "patient", title: "환자" },
    { key: "reporter", title: "접수자" },
  ]);

  const renderScene = ({ route }: { route: { key: string } }) => {
    switch (route.key) {
      case "patient":
        return <ReportDetailPatient patientData={data.patient} createdTime={data.createdTime}/>;
      case "reporter":
        return <ReportDetailReporter reporterData={data.reporter} />;
      default:
        return null;
    }
  };

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
