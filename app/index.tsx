import { Redirect } from "expo-router";
import { useEffect } from 'react';
import { handleEvent } from './wearOs/WearableEventHandler';
import {sendMessageToWear, myNativeModuleEvents}  from './wearOs/WearableModule';


export default function Index() {
  return <Redirect href="/auth/login" />;
}



// const message = {
//     hello: "안녕 나는 리액트에서 보낸 메시지야"
// }

// sendMessageToWear("/hello-react-wear", JSON.stringify(message))

myNativeModuleEvents.addListener('CustomEvent', async (message) => {
  handleEvent(message);
});