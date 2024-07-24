import { NativeModules, NativeEventEmitter } from 'react-native';
import {sendMessageToWear, myNativeModuleEvents}  from './WearableModule';
const { WearableModule } = NativeModules;
const wearEventEmitter = new NativeEventEmitter(WearableModule);

import {postBpm, getMyInfo, postReport, getNotificatioonThresholdExceed, getNotificatioonReport} from '../../api/wearOSApi'

const paths = {
  POST_BPM: "POST_BPM",
  POST_REPORT: "POST_REPORT", 
  GET_ALERT_LIST: "GET_ALERT_LIST", 
  GET_REPORT_LIST: "GET_REPORT_LIST",
  MEMBER_INFO: "MEMBER_INFO"
}

export const handleEvent = async(orderMessage) => {
  const message = JSON.parse(orderMessage)
  const path = message.path
  const data = message.data
  console.log(`path: ${path}`)
  console.log(`data: ${data}`)
  if (path == paths.POST_BPM) {
    try {
      // console.log(`심박수를 저장합니다: 심박수 ${data}`)
      const res = await postBpm(Number(data));

    } catch (error) {
      setErrorMessage("에러");
      console.log(error);
    }
  }

  else if (path == paths.MEMBER_INFO) {
    try {
      const res = await getMyInfo();
      // console.log(`${paths.MEMBER_INFO} 리액트에서 보낼거야: ${JSON.stringify(res)}`)
      if (!res) {
        // console.log("아직 로그인을 안 했어요")
        return
      }
      await sendMessageToWear(path, JSON.stringify(res))
    } catch (error) {
      setErrorMessage("에러");
      console.log(error);
    }
  }

  else if (path == paths.POST_REPORT) {
    const parsed = JSON.parse(data)
    const bpm = parsed.bpm
    const longitude = parsed.longitude
    const latitude = parsed.latitude
    console.log(`bpm: ${bpm}  longitude: ${longitude}  latitude: ${latitude}`)

    const report = {bpm, longitude, latitude}

    try {
      const res = await postReport(report);
      if (!res) {
        return
      }
      await sendMessageToWear(path, JSON.stringify(res))
    } catch (error) {
      setErrorMessage("에러");
      console.log(error);
    }
  }

  // 심박수 초과 알림 리스트
  else if (path == paths.GET_ALERT_LIST) {
    try {
      const res = await getNotificatioonThresholdExceed();
      if (!res) {
        return
      }
      await sendMessageToWear(path, JSON.stringify(res))
    } catch (error) {
      setErrorMessage("에러");
      console.log(error);
    }
  }

  // 신고 알림 리스트
  else if (path == paths.GET_REPORT_LIST) {
    try {
      const res = await getNotificatioonReport();
      if (!res) {
        return
      }
      await sendMessageToWear(path, JSON.stringify(res))
    } catch (error) {
      setErrorMessage("에러");
      console.log(error);
    }
  }
}

