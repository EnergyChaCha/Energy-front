import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { FontAwesome5, MaterialIcons, Octicons } from "@expo/vector-icons";
import { Ionicons, AntDesign } from "@expo/vector-icons";

import { Link, Tabs, useNavigation } from "expo-router";
import { Pressable } from "react-native";

import Colors from "@/constants/Colors";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const navigation = useNavigation();
  return (
    <Tabs
      screenOptions={{
        headerStyle: {},
        headerTitleStyle: {
          fontFamily: "notoSans7",
          fontSize: 18,
        },
        headerTintColor: Colors.navy,
        headerTitleAlign: "center",
        headerLeft: () => (
          <Pressable onPress={() => navigation.goBack()}>
            <Ionicons
              name="arrow-back"
              size={24}
              color="#000000"
              style={{ marginLeft: 15 }}
            />
          </Pressable>
        ),
        headerRight: () => (
          <Pressable onPress={() => navigation.navigate("Notifications")}>
            <Ionicons
              name="notifications"
              size={24}
              color="#000000"
              style={{ marginRight: 15 }}
            />
          </Pressable>
        ),
      }}
    >
      <Tabs.Screen
        name="EmergencyReport"
        options={{
          title: "신고이력",
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="notification"
              size={24}
              color={focused ? Colors.blue : Colors.navy}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="HeartRateMonitoring"
        options={{
          title: "심박수",
          tabBarIcon: ({ focused }) => (
            <FontAwesome5
              name="heartbeat"
              size={24}
              color={focused ? Colors.blue : Colors.navy}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="SOS"
        options={{
          title: "SOS",
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              name="sos"
              size={24}
              color={focused ? Colors.blue : Colors.navy}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="Notifications"
        options={{
          title: "알림",
          tabBarIcon: ({ focused }) => (
            <Octicons
              name="bell-fill"
              size={24}
              color={focused ? Colors.blue : Colors.navy}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="Setting"
        options={{
          title: "설정",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="settings"
              size={24}
              color={focused ? Colors.blue : Colors.navy}
            />
          ),
        }}
      />
    </Tabs>
  );
}
