import api from "./axiosConfig";


interface BpmData {
    bpm: number;
}

interface report {
    bpm: number,
    longitude: number,
    latitude: number
}


// HI-09 심박수 저장
export const postBpm = async (bpmData: BpmData) => {
    try {
        const response = await api.post("/heartrate", bpmData);
        return response.data.result;
    } catch (error) {
        console.log(error);
    }
};

// WA-07 본인 정보 조회
export const getMyInfo = async () => {
    try {
        const response = await api.get("/watch/my-info");
        return response.data.result;
    } catch (error) {
        console.log(error);
    }
};

// WA-02 본인 신고
export const postReport = async (report: report) => {
    try {
        const response = await api.post("/watch/report", report);
        return response.data.result;
    } catch (error) {
        console.log(error);
    }
};

// WA-04 심박수 초과 알림 리스트 조회
export const getNotificatioonThresholdExceed = async () => {
    try {
        const response = await api.get("/watch/notification/heartrate");
        return response.data.result;
    } catch (error) {
        console.log(error);
    }
};

// WA-05 신고 알림 리스트 조회
export const getNotificatioonReport = async () => {
    try {
        const response = await api.get("/watch/notification/report");
        if (response.data.status == 401) {
            return null;
        }
        return response.data.result;
    } catch (error) {
        console.log(error);
    }
};