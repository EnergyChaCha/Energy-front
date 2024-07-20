import React, { useEffect, useMemo, useState } from "react";
import { StyleSheet } from "react-native";
import { View, ScrollView } from "react-native";
import Colors from "@/constants/Colors";
import SearchForm from "@/components/SearchForm";
import TimeDivider from "@/components/reportInquire/TimeDivider";
import ReportItem from "@/components/reportInquire/ReportItem";
import DateSet from "@/components/reportInquire/DateSet";
import { getReportListAll } from "@/api/reportApi";

const JsonData = [
  {
    id: "report_uuid_1",
    gps: "위도, 경도",
    createdTime: "2024-06-20T15:15:22",
    checked: "확인한 관리자 id 1",
    patient: {
      id: "target_uuid_1",
      loginId: "log**",
      name: "김*차",
      phone: "010-****-1234",
    },
    reporter: {
      id: "reporter_uuid_2",
      loginId: "log**",
      name: "홍*동",
      phone: "010-****-1234",
    },
  },
  {
    id: "report_uuid_2",
    gps: "위도, 경도",
    createdTime: "2024-06-20T15:25:22",
    checked: "확인한 관리자 id 2",
    patient: {
      id: "target_uuid_1",
      loginId: "log**",
      name: "홍*동",
      phone: "010-****-1234",
    },
    reporter: {
      id: "reporter_uuid_1",
      loginId: "log**",
      name: "강*날",
      phone: "010-****-1234",
    },
  },
  {
    id: "report_uuid_3",
    gps: "위도, 경도",
    createdTime: "2024-06-21T12:10:22",
    checked: "확인한 관리자 id",
    patient: {
      id: "target_uuid_1",
      loginId: "log**",
      name: "홍*동",
      phone: "010-****-1234",
    },
    reporter: {
      id: "reporter_uuid_1",
      loginId: "log**",
      name: "홍*동",
      phone: "010-****-1234",
    },
  },
];

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
  id: string;
  gps: string;
  createdTime: string;
  checked: string;
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
    console.log("startDate : ", startDate);
    console.log("endDate : ", endDate);
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

      <View style={styles.scrollView}>
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
      </View>
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
