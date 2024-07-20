import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AdminHeartPage from "@/components/heartRateMonitoring/AdminHeartPage";
import UserHeartPage from "@/components/heartRateMonitoring/UserHeartPage";

export default function HeartRateMonitoring() {
  const [role, setRole] = useState<string | null>(null);
  // useEffect(() => {
  //   const fetchUserRole = async () => {
  //     try {
  //       const storedRole = await AsyncStorage.getItem("@user_role");
  //       if (storedRole) {
  //         setRole(storedRole);
  //       }
  //     } catch (error) {
  //       console.error("Failed to fetch role from storage.", error);
  //     } 
  //   };

  //   fetchUserRole();
  // }, []);


  return role === "ADMIN" ? <AdminHeartPage /> : <UserHeartPage />;
}
