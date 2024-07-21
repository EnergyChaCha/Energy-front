// import { NativeModules, NativeEventEmitter } from "react-native";

// const { WearableModule } = NativeModules;
// const wearEventEmitter = new NativeEventEmitter(WearModule);

// useEffect(() => {
//   const subscription = wearEventEmitter.addListener("WearRequest", (event) => {
//     console.log("Received from Wear:", event);
//     // 여기서 HTTP POST 요청을 수행
//     performPostRequest(event.timestamp);
//   });

//   return () => {
//     subscription.remove();
//   };
// }, []);

// // 신고 post 요청을 해야함
// const performPostRequest = async (timestamp) => {
//   try {
//     const response = await fetch("https://your-api-url.com/endpoint", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ timestamp }),
//     });
//     const data = await response.json();
//     console.log("POST request response:", data);
//     // 필요한 경우 여기서 응답을 다시 WearOS로 보낼 수 있습니다
//   } catch (error) {
//     console.error("Error performing POST request:", error);
//   }
// };
