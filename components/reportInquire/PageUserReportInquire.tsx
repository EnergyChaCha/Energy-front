import React, { useEffect, useMemo, useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import Colors from "@/constants/Colors";
import SearchForm from "@/components/SearchForm";
import TimeDivider from "@/components/reportInquire/TimeDivider";
import ReportItem from "@/components/reportInquire/ReportItem";
import DateSet from "@/components/reportInquire/DateSet";
import { getReportListAll } from "@/api/reportApi";
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

export default function UserReportInquire() {
  const [data, setData] = useState<ReportData[]>(JsonData);

  useEffect(() => {
    const fetchReportListAll = async () => {
      try {
        const response = await getReportListAll();
        setData(response);
      } catch (error) {
        console.error("Failed to fetch user Info", error);
      }
    };
    // fetchReportListAll();
  }, []);

  const groupedData = useMemo(() => groupDataByDateAndHour(data), [data]);

  const handleDate = (startDate: string | null, endDate: string | null) => {
    console.log("startDate:", startDate, "endDate:", endDate);
    // 여기에 날짜 필터링 로직을 구현하세요
  };

  const handleSearchClick = (input: string, typeValue?: string) => {
    console.log("Search Text:", input, "Search typeValue:", typeValue);
    // 여기에 검색 로직을 구현하세요
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
