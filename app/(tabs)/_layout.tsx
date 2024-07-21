import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Platform, StyleSheet, View, Text } from "react-native";
import {
  Ionicons,
  AntDesign,
  FontAwesome5,
  MaterialIcons,
} from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import ReportInquire from "./ReportInquire";
import HeartRateMonitoring from "./HeartRateMonitoring";
import Report from "./Report";
import Setting from "./Setting";
import MemberManagement from "./MemberManagement";
import { useNavigation } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

export default function TabLayout() {
  const isWeb = Platform.OS === "web";
  const navigation = useNavigation(); // 네비게이션 객체 가져오기

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerStyle: {},
        headerTitleStyle: {
          fontFamily: "notoSans7",
          fontSize: 18,
        },
        headerTintColor: Colors.navy,
        headerTitleAlign: "center",
        headerLeft: () => (
          <Ionicons
            name="arrow-back"
            size={24}
            color="#000000"
            style={{ marginLeft: 15 }}
            onPress={() => {
              navigation.navigate("auth/Login"); // 로그인 페이지로 이동
            }}
          />
        ),
        tabBarIcon: ({ color, size }) => {
          switch (route.name) {
            case "ReportInquire":
              return (
                <AntDesign name="notification" size={size} color={color} />
              );
            case "HeartRateMonitoring":
              return (
                <FontAwesome5 name="heartbeat" size={size} color={color} />
              );
            case "Report":
              return <MaterialIcons name="sos" size={size} color={color} />;
            case "Setting":
              return <Ionicons name="settings" size={size} color={color} />;
            case "MemberManagement":
              return <Ionicons name="people" size={size} color={color} />;
            default:
              return null;
          }
        },
      })}
    >
      <Tab.Screen
        name="ReportInquire"
        component={ReportInquire}
        options={{ title: "신고이력" }}
      />
      <Tab.Screen
        name="HeartRateMonitoring"
        component={HeartRateMonitoring}
        options={{ title: "심박수" }}
      />
      <Tab.Screen
        name="Report"
        component={Report}
        options={{ title: "Report" }}
      />
      <Tab.Screen
        name="Setting"
        component={Setting}
        options={{ title: "설정" }}
      />
      {isWeb && (
        <Tab.Screen
          name="MemberManagement"
          component={MemberManagement}
          options={{ title: "회원 관리" }}
        />
      )}
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
