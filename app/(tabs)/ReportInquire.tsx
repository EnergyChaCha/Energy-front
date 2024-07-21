import React, { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import AdminReportInquire from "@/components/reportInquire/PageAdminReportInquire";
import UserReportInquire from "@/components/reportInquire/PageUserReportInquire";
import { getUserRole } from "@/util/storage";
import { Text } from "react-native";

export default function ReportInquire() {
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

  return role === "ADMIN" ? <AdminReportInquire /> : <UserReportInquire />;
}
