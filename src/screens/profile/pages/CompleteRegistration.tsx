import { useLayoutEffect } from "react";
import { View, Text, SafeAreaView } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../types/navigation";
import { useSheet } from "../../../context/bottom_sheet/BottomSheetContext";
import CustomLeftHeader from "../../../helpers/CustomLeftHeader";

export default function CompleteRegistration() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { isDarkMode } = useSheet();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Text
          className={`${
            isDarkMode ? "text-gray300" : "text-primaryColorSec"
          }  font-semibold text-[18px]`}
        >
          Complete Registration
        </Text>
      ),

      headerLeft: () => (isDarkMode ? <CustomLeftHeader /> : null),
    });
  }, [isDarkMode]);

  return (
    <SafeAreaView
      className={`flex-1 ${isDarkMode ? "bg-darkNeutral" : "bg-white"}`}
    >
      <View className="pt-6 mx-3"></View>
    </SafeAreaView>
  );
}
