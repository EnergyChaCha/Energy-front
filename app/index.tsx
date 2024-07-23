import { Redirect } from "expo-router";
import { useEffect } from 'react';
import { setupWearableListener, performPostRequest } from './wearOs/WearableEventHandler';

export default function Index() {
  return <Redirect href="/auth/login" />;
}

const cleanupListener = setupWearableListener(async (event: any) => {
  await performPostRequest(event.timestamp);
});

cleanupListener()
console.log("hello world")