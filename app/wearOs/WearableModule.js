import { NativeModules } from "react-native";
import { DeviceEventEmitter, NativeEventEmitter } from 'react-native';





const { WearModule } = NativeModules;
// NativeEventEmitter 생성
const myNativeModuleEvents = new NativeEventEmitter(WearModule);
// 중복 호출 방지 로직 추가
let isSending = false;

const sendMessageToWear = async (path, message) => {

  try {
    const result = await WearModule.sendMessageToWear(
        path,
        message
    );
    console.log(result);
  } catch (error) {
    console.error("Error sending message to WearOS:", error);
  }
};

// // 이벤트 리스너 등록
// const subscription = myNativeModuleEvents.addListener('CustomEvent', (message) => {
//     console.log('Received message from native:', message);
//   });
export { sendMessageToWear, myNativeModuleEvents };