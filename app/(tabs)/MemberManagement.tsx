import { getAllMembers } from "@/api/accountApi";
import CustomTextInput from "@/components/CustomTextInput";
import Table from "@/components/Table";
import Colors from "@/constants/Colors";
import { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, View, ScrollView } from "react-native";

const workerData = [
  {
    id: 5,
    name: "김*차",
    birth: "1990-02-23",
    gender: 0,
    phone: "010-****-4567",
    loginId: "abd**",
    workArea: "안산 HUB",
    department: "상차",
    role: "ADMIN",
  },
  {
    id: 5,
    name: "김*차",
    birth: "1990-02-23",
    gender: 0,
    phone: "010-****-4567",
    loginId: "abd**",
    workArea: "안산 HUB",
    department: "상차",
    role: "USER",
  },
  {
    id: 5,
    name: "김*차",
    birth: "1990-02-23",
    gender: 0,
    phone: "010-****-4567",
    loginId: "abd**",
    workArea: "안산 HUB",
    department: "상차",
    role: "USER",
  },
  {
    id: 5,
    name: "김*차",
    birth: "1990-02-23",
    gender: 0,
    phone: "010-****-4567",
    loginId: "abd**",
    workArea: "안산 HUB",
    department: "상차",
    role: "USER",
  },
  {
    id: 5,
    name: "김*차",
    birth: "1990-02-23",
    gender: 0,
    phone: "010-****-4567",
    loginId: "abd**",
    workArea: "안산 HUB",
    department: "상차",
    role: "USER",
  },
  {
    id: 5,
    name: "김*차",
    birth: "1990-02-23",
    gender: 0,
    phone: "010-****-4567",
    loginId: "abd**",
    workArea: "안산 HUB",
    department: "상차",
    role: "USER",
  },
  {
    id: 5,
    name: "김*차",
    birth: "1990-02-23",
    gender: 0,
    phone: "010-****-4567",
    loginId: "abd**",
    workArea: "안산 HUB",
    department: "상차",
    role: "USER",
  },
  {
    id: 5,
    name: "김*차",
    birth: "1990-02-23",
    gender: 0,
    phone: "010-****-4567",
    loginId: "abd**",
    workArea: "안산 HUB",
    department: "상차",
    role: "USER",
  },
  {
    id: 5,
    name: "김*차",
    birth: "1990-02-23",
    gender: 0,
    phone: "010-****-4567",
    loginId: "abd**",
    workArea: "안산 HUB",
    department: "상차",
    role: "USER",
  },
  {
    id: 5,
    name: "김*차",
    birth: "1990-02-23",
    gender: 0,
    phone: "010-****-4567",
    loginId: "abd**",
    workArea: "안산 HUB",
    department: "상차",
    role: "USER",
  },
  {
    id: 5,
    name: "김*차",
    birth: "1990-02-23",
    gender: 0,
    phone: "010-****-4567",
    loginId: "abd**",
    workArea: "안산 HUB",
    department: "상차",
    role: "USER",
  },
  {
    id: 5,
    name: "김*차",
    birth: "1990-02-23",
    gender: 0,
    phone: "010-****-4567",
    loginId: "abd**",
    workArea: "안산 HUB",
    department: "상차",
    role: "USER",
  },
  {
    id: 5,
    name: "김*차",
    birth: "1990-02-23",
    gender: 0,
    phone: "010-****-4567",
    loginId: "abd**",
    workArea: "안산 HUB",
    department: "상차",
    role: "USER",
  },
  {
    id: 5,
    name: "김*차",
    birth: "1990-02-23",
    gender: 0,
    phone: "010-****-4567",
    loginId: "abd**",
    workArea: "안산 HUB",
    department: "상차",
    role: "USER",
  },
  {
    id: 5,
    name: "김*차",
    birth: "1990-02-23",
    gender: 0,
    phone: "010-****-4567",
    loginId: "abd**",
    workArea: "안산 HUB",
    department: "상차",
    role: "USER",
  },
  {
    id: 5,
    name: "김*차",
    birth: "1990-02-23",
    gender: 0,
    phone: "010-****-4567",
    loginId: "abd**",
    workArea: "안산 HUB",
    department: "상차",
    role: "USER",
  },
  {
    id: 5,
    name: "김*차",
    birth: "1990-02-23",
    gender: 0,
    phone: "010-****-4567",
    loginId: "abd**",
    workArea: "안산 HUB",
    department: "상차",
    role: "USER",
  },
  {
    id: 5,
    name: "김*차",
    birth: "1990-02-23",
    gender: 0,
    phone: "010-****-4567",
    loginId: "abd**",
    workArea: "안산 HUB",
    department: "상차",
    role: "USER",
  },
  {
    id: 5,
    name: "김*차",
    birth: "1990-02-23",
    gender: 0,
    phone: "010-****-4567",
    loginId: "abd**",
    workArea: "안산 HUB",
    department: "상차",
    role: "USER",
  },
];

interface MemberData {
  id: number;
  name: string;
  birthdate: string;
  gender: boolean;
  phone: string;
  loginId: string;
  workArea: string;
  department: string;
  role: string;
}

export default function MemberManagement() {
  const [memberData, setMemberData] = useState<MemberData[] | null>(null);

  const fetchMemberData = async () => {
    try {
      const members = await getAllMembers();
      if (members) setMemberData(members);
    } catch (error) {
      console.error("Failed to fetch role from storage.", error);
    }
  };
  
  useEffect(() => {
    fetchMemberData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>회원 관리</Text>
      <View style={styles.tableContainer}>
        <Table data={memberData} refreshData={fetchMemberData} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    paddingTop: 0,
    alignSelf: "center",
    margin: 20,
    padding: 30,
    borderRadius: 20,
  },
  title: {
    fontFamily: "notoSans8",
    fontSize: 28,
    color: Colors.navy,
    marginHorizontal: 30,
    marginVertical: 30,
  },
  tableContainer: {
    flex: 1,
  },
});
