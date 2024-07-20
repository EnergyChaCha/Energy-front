import api from "./axiosConfig";


// HT-01: 심박수 임계치 값 설정
export const putHeartRate = async (
  memberID: number,
  minTreshold: number,
  maxTreshold: number
) => {
  try {
    const response = await api.put(`/heartrate/threshold/${memberID}`,{
      minTreshold: minTreshold,
      maxTreshold: maxTreshold
    });
    return response.data.content;
  } catch (error) {
    console.error(error);
  }
};

// HT-02: 심박수 임계치 값 조회
export const getHeartRate = async (memberID: number) => {
  try {
    const response = await api.get(`/heartrate/threshold/${memberID}`);
    return response.data.result;
  } catch (error) {
    console.error(error);
  }
};

// HI-03: 관리자가 리스트에서 클릭했을때 해당 회원의 심박수 상세 정보 조회
export const getHeartRateDetail = async (memberID: number) => {
  try {
    const response = await api.get(`/heartrate/detail/?${memberID}`);
    return response.data.content;
  } catch (error) {
    console.error(error);
  }
};