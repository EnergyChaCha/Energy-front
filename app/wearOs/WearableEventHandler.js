import { NativeModules, NativeEventEmitter } from 'react-native';

const { WearableModule } = NativeModules;
const wearEventEmitter = new NativeEventEmitter(WearableModule);

export const setupWearableListener = (onReceive) => {
    console.log("WearableListener 셋 한다!!")
  const subscription = wearEventEmitter.addListener('hello', (event) => {
    console.log('Received from Wear:', event);
    onReceive(event);
  });

  return () => {
    subscription.remove();
  };
};

export const performPostRequest = async (timestamp) => {
    console.log("performPostRequest 실행")
//   try {
//     const response = await fetch('https://your-api-url.com/endpoint', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ timestamp }),
//     });
//     const data = await response.json();
//     console.log('POST request response:', data);
//     // 필요시 응답을 다시 Wear OS로 보낼 수 있습니다
//   } catch (error) {
//     console.error('Error performing POST request:', error);
//   }
};