import { NativeModules } from "react-native";

const { WearModule } = NativeModules;

export const sendMessageToWear = async (path, message) => {
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
