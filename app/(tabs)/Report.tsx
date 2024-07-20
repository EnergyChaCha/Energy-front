import ReceiverInfo from "@/components/report/ReceiverInfo";
import UserSearchForm from "@/components/report/UserSearchForm";
import Colors from "@/constants/Colors";
import { useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Image,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const JsonData = {
  ReceiverInfo: {
    id: "worker_uuid_1",
    name: "김지원",
    phone: "010-1222-4567",
    workArea: "안성 HUB",
    department: "상차",
  },
};

export default function Report() {
  const [next, setNext] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Image
          style={styles.titleImg}
          source={require("../../assets/images/report.png")}
        />
        <Text style={styles.titleText}>관리자{"  "}긴급 신고</Text>
      </View>

      {!next ? (
        <>
          <Text style={styles.subTitle}>접수자 정보</Text>
          <ReceiverInfo />

          <TouchableOpacity
            style={styles.nextBtn}
            onPress={() => setNext(true)}
          >
            <Ionicons
              name="arrow-forward-circle"
              size={50}
              color={Colors.navy}
            />
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TouchableOpacity
            style={styles.prevBtn}
            onPress={() => setNext(false)}
          >
            <Ionicons name="arrow-back-circle" size={30} color={Colors.navy} />
          </TouchableOpacity>
          <Text style={styles.subTitle}>위급 근무자 정보</Text>
          <UserSearchForm />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    marginTop: 40,
  },
  title: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "flex-end",
    marginBottom:30
  },
  titleImg: {
    width: 70,
    height: 70,
    marginBottom: 5,
    marginRight: 10,
  },
  titleText: {
    width: 120,
    fontSize: 30,
    lineHeight: 35,
    fontFamily: "notoSans8",
  },
  subTitle: {
    fontFamily: "notoSans7",
    lineHeight: 30,
    fontSize: 23,
    color: Colors.navy,
    marginBottom: 10,
  },
  prevBtn: {
    marginBottom:10
  },

  nextBtn: {
    marginBottom:10,
    alignSelf: "flex-end",
  },
  reportButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  prevBtnText:{
    fontSize: 16,
    fontWeight: "bold",
  },
});
