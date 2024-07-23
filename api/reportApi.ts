import { Double } from "react-native/Libraries/Types/CodegenTypes";
import api from "./axiosConfig";

// RI-01: 신고이력 전체 조회
export const getReportListAll = async (start:string, end:string) => {
  try {
    const response = await api.get(
      `/report/all?start=${start}&end=${end}&loginId=&page=0&size=200`
    );
    return response.data.result.content;
  } catch (error) {
    console.log(error);
  }
};

// RI-07: 근로자 신고이력 전체 조회
export const getReportListUser = async (start:string, end:string) => {
  try {
    const response = await api.get(
      `/report/my-report?start=${start}&end=${end}&page=0&size=200&flag=0`
    );
    return response.data.result.report;
  } catch (error) {
    console.log(error);
  }
};

// RI-05: 신고이력 상세 조회
export const getReportListDetail = async (reportId: number) => {
  try {
    const response = await api.get(`/report/?reportId=${reportId}`);
    return response.data.result;
  } catch (error) {
    console.error(error);
  }
};


interface ReportParams {
  start: string;
  end: string;
  page: number;
  size: number;
  flag: string;
}
// RI-07: 근로자 권한일때, 본인 정보 조회
export const getReportMyReport = async (params: ReportParams) => {
  try {
    const response = await api.get("/report", { params });
    return response.data.result;
  } catch (error) {
    console.error(error);
  }
};



// --------- 신고하기 화면

// RE-04: 신고하기에서 본인 정보 조회
// 완료
export const getReportMyInfo = async (memberId:number) => {
  try {
    const response = await api.get(`/report/my-info?memberId=${memberId}`);
    return response.data.result;
  } catch (error) {
    console.log(error);
  }
};

// RE-02: 신고하기에서 환자 검색
// 완료
export const getReportSearch = async (name: string, workArea: string) => {
  try {
    const response = await api.get(
      `/report/other/search?name=${name}&work-area=${workArea}`
    );
    return response.data.result;
  } catch (error) {
    console.error(error);
  }
};

interface ReportData {
  patientId: number;
  status: string;
  latitude: Double;
  longitude: Double;
}
// RE-01: 신고하기
// 코드만 추가해둠
export const postReport = async (data: ReportData) => {
  try {
    const response = await api.post("/report/", data);
    return response.data;
  } catch (error) {
    console.error("Error posting report:", error);
    throw error;
  }
};
