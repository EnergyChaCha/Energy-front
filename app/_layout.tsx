import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";


export {
  // Layout 컴포넌트에서 발생하는 오류를 잡기 위한 ErrorBoundary를 내보냄
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // `/modal` 경로에서 리로드할 때 뒤로 가기 버튼이 표시되도록 설정
  initialRouteName: "signup",
};

// 에셋 로딩이 완료되기 전에 스플래시 스크린이 자동으로 숨겨지지 않도록 방지
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    notoSans1: require("../assets/fonts/NotoSansKR-Thin.ttf"),
    notoSans2: require("../assets/fonts/NotoSansKR-ExtraLight.ttf"),
    notoSans3: require("../assets/fonts/NotoSansKR-Light.ttf"),
    notoSans4: require("../assets/fonts/NotoSansKR-Regular.ttf"),
    notoSans5: require("../assets/fonts/NotoSansKR-Medium.ttf"),
    notoSans6: require("../assets/fonts/NotoSansKR-SemiBold.ttf"),
    notoSans7: require("../assets/fonts/NotoSansKR-Bold.ttf"),
    notoSans8: require("../assets/fonts/NotoSansKR-ExtraBold.ttf"),
    notoSans9: require("../assets/fonts/NotoSansKR-Black.ttf"),
  });

  // 네비게이션 트리에서 오류를 잡기 위해 Expo Router가 Error Boundaries를 사용함
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  // 폰트가 로드되면 스플래시 스크린을 숨김
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  // 폰트가 로드되지 않았으면 null을 반환
  if (!loaded) {
    return null;
  }

  // 폰트가 로드되면 RootLayoutNav 컴포넌트를 렌더링
  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <Stack initialRouteName="auth/login">
      <Stack.Screen name="auth/login" options={{ headerShown: false }} />

      
      <Stack.Screen
        name="auth/termsOfService"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="auth/signUpAccount"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="auth/signUpPersonal"
        options={{ headerShown: false }}
      />
      <Stack.Screen name="auth/signUpWork" options={{ headerShown: false }} />
      <Stack.Screen name="auth/signUpHealth" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      {/* 모달 화면을 설정 */}
      <Stack.Screen name="modal" options={{ presentation: "modal" }} />
    </Stack>
  );
}
