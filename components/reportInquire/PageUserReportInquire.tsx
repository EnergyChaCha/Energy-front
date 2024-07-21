import React, { useEffect, useMemo, useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import Colors from "@/constants/Colors";
import SearchForm from "@/components/SearchForm";
import TimeDivider from "@/components/reportInquire/TimeDivider";
import ReportItem from "@/components/reportInquire/ReportItem";
import DateSet from "@/components/reportInquire/DateSet";
import { getReportListAll, getReportListUser } from "@/api/reportApi";
import ReportItemUser from "./ReportItemUser";

const JsonData = [
  {
    createdTime: "2024-06-20T10:22:22",
    bpm: 89,
    gps: "장소(좌표) 정보",
    flag: "본인신고",
    flagInfo: {
      name: "",
      gender: "",
      workArea: "",
      department: "",
      status: "",
    },
  },
  {
    createdTime: "2024-06-20T12:22:22",
    bpm: 100,
    gps: "장소(좌표) 정보",
    flag: "보낸 신고",
    flagInfo: {
      name: "이*은",
      gender: "여성",
      workArea: "안산",
      department: "상차",
      status: "의식 없음",
    },
  },
];

interface FlagInfo {
  name: string;
  gender: string;
  workArea: string;
  department: string;
  status: string;
}

interface ReportData {
  createdTime: string;
  bpm: number;
  gps: string;
  flag: string;
  flagInfo: FlagInfo;
}

interface GroupedData {
  [date: string]: {
    [time: string]: ReportData[];
  };
}

const groupDataByDateAndHour = (data: ReportData[]): GroupedData => {
  return data
    .sort(
      (a, b) =>
        new Date(a.createdTime).getTime() - new Date(b.createdTime).getTime()
    )
    .reduce((acc: GroupedData, item) => {
      const date = new Date(item.createdTime);
      const dateString = date.toISOString().split("T")[0];
      const hour = date.getHours().toString().padStart(2, "0");

      if (!acc[dateString]) acc[dateString] = {};
      if (!acc[dateString][hour]) acc[dateString][hour] = [];

      acc[dateString][hour].push(item);
      return acc;
    }, {});
};

const getTodayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1
  const day = String(today.getDate()).padStart(2, "0"); // 날짜를 두 자리로 맞춤

  return `${year}-${month}-${day}`;
};

export default function UserReportInquire() {
  const [data, setData] = useState<ReportData[]>(JsonData);
  const [date, setDate] = useState<{
    startDate: string;
    endDate: string;
  }>({
    startDate: getTodayDate(),
    endDate: getTodayDate(),
  });

const fetchReportListUser = async () => {
  try {
    const response = await getReportListUser(date.startDate, date.endDate);
    // API 응답을 ReportData 형식에 맞게 변환
    const formattedData: ReportData[] = response.map((item: any) => ({
      createdTime: item.createdTime,
      bpm: Number(item.bpm),
      gps: String(item.gps),
      flag: String(item.flag),
      flagInfo: {
        name: String(item.flagInfo?.name || ""),
        gender: String(item.flagInfo?.gender || ""),
        workArea: String(item.flagInfo?.workArea || ""),
        department: String(item.flagInfo?.department || ""),
        status: String(item.flagInfo?.status || ""),
      },
    }));
    setData(formattedData);
  } catch (error) {
    console.error("Failed to fetch user Info", error);
  }
};
  useEffect(() => {
    fetchReportListUser();
  }, [date]);

  const groupedData = useMemo(() => groupDataByDateAndHour(data), [data]);


  const handleDate = (startDate: string | null, endDate: string | null) => {
    if (startDate && !endDate) {
      setDate({ startDate: startDate, endDate: "" });
    } else if (startDate && endDate) {
      setDate({ startDate: startDate, endDate: endDate });
    }
  };

  const handleSearchClick = (input: string, typeValue?: string) => {
    console.log("Search Text:", input, "Search typeValue:", typeValue);
  };

  return (
    <View style={styles.container}>
      <DateSet handleDate={handleDate} />
      <ScrollView style={styles.scrollView}>
        {Object.entries(groupedData).map(([date, hourGroups]) => (
          <React.Fragment key={date}>
            <TimeDivider date={date} />
            {Object.entries(hourGroups).map(([hour, items]) => (
              <ReportItemUser
                key={`${date}-${hour}`}
                time={`${hour}:00`}
                list={items}
              />
            ))}
          </React.Fragment>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 10,
    width: "100%",
  },
  scrollView: {
    width: "100%",
  },
});
