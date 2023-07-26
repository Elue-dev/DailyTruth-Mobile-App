import {
  DefaultTheme,
  NavigationContainer,
  Theme,
} from "@react-navigation/native";
import { useEffect, useMemo, useState } from "react";
import RouteNavigator from "./src/navigation/RouteNavigator";
import * as Font from "expo-font";
import { ActivityIndicator, View } from "react-native";
import { AuthProvider } from "./src/context/auth/AuthContext";
import { BottomSheetProvider } from "./src/context/bottom_sheet/BottomSheetContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CustomStatusBar from "./src/components/status_bar";
import Modal from "./src/components/modal/Modal";
import { ModalProvider } from "./src/context/modal/ModalCotext";
import { AlertProvider } from "./src/context/alert/AlertContext";
import Alert from "./src/components/alert/Alert";

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    loadFonts();
  }, []);

  const loadFonts = async () => {
    await Font.loadAsync({
      "source-sans-regular": require("./src/assets/fonts/SourceSans3-Regular.ttf"),
    });
    setFontLoaded(true);
  };

  const theme: Theme = useMemo(
    () => ({
      ...DefaultTheme,
      colors: {
        ...DefaultTheme.colors,
        background: "#f5f5f5",
        text: "#191919",
        border: "#D9D9D9",
        primary: "#191919",
      },
    }),
    []
  );

  return (
    <GestureHandlerRootView className="flex-1">
      {fontLoaded ? (
        <AuthProvider>
          <BottomSheetProvider>
            <ModalProvider>
              <AlertProvider>
                <NavigationContainer theme={theme}>
                  <RouteNavigator />
                  <CustomStatusBar />
                  <Modal />
                  <Alert />
                </NavigationContainer>
              </AlertProvider>
            </ModalProvider>
          </BottomSheetProvider>
        </AuthProvider>
      ) : (
        <View className="pt-20">
          <ActivityIndicator color="#000" size="large" />
        </View>
      )}
    </GestureHandlerRootView>
  );
}
