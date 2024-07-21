import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AdminHeartPage from "@/components/heartRateMonitoring/AdminHeartPage";
import UserHeartPage from "@/components/heartRateMonitoring/UserHeartPage";
import { getUserRole } from "@/util/storage";
import { useFocusEffect } from "@react-navigation/native";

export default function HeartRateMonitoring() {
  const [role, setRole] = useState<string | null>(null);

  useFocusEffect(
    React.useCallback(() => {
      const fetchUserRole = async () => {
        try {
          const storedRole = await getUserRole();
          console.log("storedRole은 실행됨?", storedRole);

          if (storedRole) {
            setRole(storedRole);
          }
        } catch (error) {
          console.error("Failed to fetch role from storage.", error);
        }
      };

      fetchUserRole();
    }, [])
  );

  if (role === null) {
    return <Text>Loading...</Text>;
  }

  return role === "ADMIN" ? <AdminHeartPage /> : <UserHeartPage />;
}
