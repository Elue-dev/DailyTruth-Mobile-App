import { View, Text, Platform } from "react-native";
import { VerificationResultsProps } from "../../types/news";
import { useSheet } from "../../context/bottom_sheet/BottomSheetContext";
import { useLayoutEffect } from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../common/colors";
import { TextInput } from "react-native";

export default function VerificationResults({
  keyword,
  setKeyword,
  verificationResults,
  setVerificationResults,
}: VerificationResultsProps) {
  const { isDarkMode } = useSheet();
  const navigation = useNavigation<NavigationProp<any>>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Text className="text-primaryColorSec dark:text-gray300 font-semibold text-[18px]">
          Verification Results
        </Text>
      ),

      headerLeft: () =>
        Platform.OS === "ios" ? (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="mx-3"
          >
            <Ionicons
              name="arrow-back-circle"
              size={29}
              color={COLORS.gray200}
            />
          </TouchableOpacity>
        ) : null,
    });
  }, [isDarkMode]);

  return (
    <View className="flex-1 bg-white dark:bg-darkNeutral">
      <View className="mx-3">
        <Text className="text-darkNeutral dark:text-lightText text-xl font-bold mt-12">
          Verify via Keywords
        </Text>

        <View
          className={`mt-4 mb-8 px-3 pb-4 shadow-sm rounded-lg flex-row justify-between items-center border-gray100 dark:border-gray200 ${
            Platform.OS === "android" ? "border-4 dark:border" : "border"
          }`}
          style={{
            elevation: 1,
            backgroundColor: isDarkMode ? "transparent" : "#FFF",
          }}
        >
          <TextInput
            value={keyword}
            className="text-base mt-2 text-darkNeutral dark:text-grayNeutral"
            editable={false}
          />
        </View>

        {verificationResults.map((result) => (
          <Text
            className="text-darkNeutral dark:text-lightText"
            key={result.id}
          >
            {result.title}
          </Text>
        ))}
      </View>
    </View>
  );
}
