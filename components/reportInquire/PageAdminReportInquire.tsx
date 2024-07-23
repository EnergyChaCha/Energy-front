import React, { useEffect, useMemo, useState } from "react";
import { StyleSheet } from "react-native";
import { View, ScrollView } from "react-native";
import Colors from "@/constants/Colors";
import SearchForm from "@/components/SearchForm";
import TimeDivider from "@/components/reportInquire/TimeDivider";
import ReportItem from "@/components/reportInquire/ReportItem";
import DateSet from "@/components/reportInquire/DateSet";
import { getReportListAll } from "@/api/reportApi";
import moment from "moment";

interface Patient {
  id: string;
  loginId: string;
  name: string;
  phone: string;
}

interface Reporter {
  id: string;
  loginId: string;
  name: string;
  phone: string;
}

interface ReportData {
  reportId: number;
  latitude: number;
  longitude: number;
  bpm: number;
  createdTime: string;
  patient: Patient;
  reporter: Reporter;
}

interface GroupedData {
  [date: string]: {
    [time: string]: ReportData[];
  };
}

const groupDataByDateAndHour = (data: ReportData[]): GroupedData => {
  const sortedData = data.sort(
    (a, b) =>
      new Date(a.createdTime).getTime() - new Date(b.createdTime).getTime()
  );

  return sortedData.reduce((acc: GroupedData, item) => {
    const date = new Date(item.createdTime);
    const dateString = date.toISOString().split("T")[0];
    const hour = date.getHours().toString().padStart(2, "0");

    if (!acc[dateString]) {
      acc[dateString] = {};
    }

    if (!acc[dateString][hour]) {
      acc[dateString][hour] = [];
    }

    acc[dateString][hour].push(item);

    return acc;
  }, {});
};

export default function AdminReportInquire() {
  const [data, setData] = useState<ReportData[]>([]);

  const fetchReportListAll = async (start:string, end:string) => {
    try {
      const response = await getReportListAll(start, end);
      setData(response);
    } catch (error) {
      console.error("Failed to fetch user Info", error);
    }
  };
  useEffect(() => {
    fetchReportListAll(
      moment().subtract(7,'days').format("YYYY-MM-DD"),
      moment().format("YYYY-MM-DD")
    );
  }, []);

  const groupedData = useMemo(() => groupDataByDateAndHour(data), [data]);

  const handleDate = (startDate: string | null, endDate: string | null) => {
    fetchReportListAll(startDate!, endDate!);
  };

  const handleSearchClick = (input: string, typeValue?: string) => {
    console.log("Search Text:", input);
    console.log("Search typeValue:", typeValue);
  };

  return (
    <View style={styles.container}>
      <SearchForm
        searchClick={handleSearchClick}
        searchOptions={[
          { label: "환자", value: "patient" },
          { label: "접수자", value: "reporter" },
        ]}
      />
      <DateSet handleDate={handleDate} />

      <ScrollView style={styles.scrollView}>
        {Object.entries(groupedData).map(([date, hourGroups]) => (
          <React.Fragment key={date}>
            <TimeDivider date={date} />
            {Object.entries(hourGroups).map(([hour, items]) => (
              <ReportItem
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
    alignSelf: "center",
    width: "100%",
  },

  scrollView: {
    width: "100%",
  },
});
