import { NativeModules, NativeEventEmitter } from 'react-native';
import {sendMessageToWear, myNativeModuleEvents}  from './WearableModule';
const { WearableModule } = NativeModules;
const wearEventEmitter = new NativeEventEmitter(WearableModule);

import {postBpm, getMyInfo} from '../../api/wearOSApi'

const paths = {
  POST_BPM: "POST_BPM",
  POST_REPORT: "POST_REPORT", 
  GET_ALERT_LIST: "GET_ALERT_LIST", 
  GET_REPORT_LIST: "GET_REPORT_LIST",
  MEMBER_INFO: "MEMBER_INFO"
}

// export const setupWearableListener = (onReceive) => {
//     console.log("WearableListener 셋 한다!!")
//   const subscription = wearEventEmitter.addListener('hello', (event) => {
//     console.log('Received from Wear:', event);
//     onReceive(event);
//   });

//   return () => {
//     subscription.remove();
//   };
// };


export const handleEvent = async(orderMessage) => {
  const message = JSON.parse(orderMessage)
  const path = message.path
  const data = message.data
  console.log(`path: ${path}`)
  console.log(`data: ${data}`)
  if (path == paths.POST_BPM) {
    try {
      const res = await postBpm(data);

    } catch (error) {
      setErrorMessage("에러");
      console.log(error);
    }
  }

  else if (path == paths.MEMBER_INFO) {
    try {
      const res = await getMyInfo();
      console.log(`${paths.MEMBER_INFO} 리액트에서 보낼거야: ${JSON.stringify(res)}`)
      sendMessageToWear(path, JSON.stringify(res))
    } catch (error) {
      setErrorMessage("에러");
      console.log(error);
    }
  }
}

