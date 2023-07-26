import { View, Text, SafeAreaView } from "react-native";
import { useLayoutEffect } from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useSheet } from "../../context/bottom_sheet/BottomSheetContext";

export default function AddNews() {
  const navigation = useNavigation<NavigationProp<any>>();

  const { isDarkMode } = useSheet();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Text
          className={`${
            isDarkMode ? "text-gray300" : "text-primaryColorSec"
          }  font-semibold text-[18px]`}
        >
          Add News
        </Text>
      ),
    });
  }, [isDarkMode]);

  return (
    <SafeAreaView
      className={`flex-1 ${isDarkMode ? "bg-darkNeutral" : "bg-white"}`}
    ></SafeAreaView>
  );
}
