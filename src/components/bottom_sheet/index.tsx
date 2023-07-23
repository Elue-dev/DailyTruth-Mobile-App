import { useEffect, useMemo, useRef, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useSheet } from "../../context/bottom_sheet/BottomSheetContext";
import { styles } from "./style";
import { COLORS } from "../../common/colors";
import { newsData } from "../../screens/news/data";
import { BottomSheetProps } from "../../types/bottom_sheet";

export default function BottomSheetComponent({
  setDataToUse,
  selectedOption,
  setSelectedOption,
}: BottomSheetProps) {
  const { toggleBottomSheet, toggleOverlay } = useSheet();
  const navigation = useNavigation<NavigationProp<any>>();
  const SheetRef = useRef(null);
  const snapPoints = useMemo(() => ["50"], []);

  function handleBottomSheetActions(route: string | null) {
    toggleBottomSheet();
    toggleOverlay();
    if (route) navigation.navigate(route);
  }

  function applyNewsFilter() {
    let filteredNews;
    switch (selectedOption) {
      case "VerfiedOnly":
        filteredNews = newsData.filter((news) => news.isVerified === true);

        break;
      case "VerfiedAndUnverified":
        filteredNews = newsData;
        break;
      case "UnVerfiedOnly":
        filteredNews = newsData.filter((news) => news.isVerified === false);
        break;
      default:
        filteredNews = newsData;
    }
    setDataToUse(filteredNews);
    toggleBottomSheet();
    toggleOverlay();
  }

  return (
    <BottomSheet
      ref={SheetRef}
      snapPoints={snapPoints}
      enablePanDownToClose={false}
      handleComponent={() => null}
      onClose={() => handleBottomSheetActions("")}
      backgroundStyle={{ borderRadius: 20 }}
    >
      <BottomSheetView>
        <View style={styles.bottomSheetWrap}>
          <TouchableOpacity
            onPress={() => handleBottomSheetActions(null)}
            className="flex-row items-end justify-end"
          >
            <AntDesign name="closecircle" size={24} color={COLORS.gray50} />
          </TouchableOpacity>

          <Text className="text-xl text-center text-darkNeutral font-medium pb-5">
            News Filter
          </Text>

          <View className="flex-row justify-between items-center pb-4 border-b-[1px] border-grayNeutral">
            <Text
              style={styles.sheetText}
              className="text-extraLightGray font-normal"
            >
              Verfied News Only
            </Text>
            <TouchableOpacity onPress={() => setSelectedOption("VerfiedOnly")}>
              {selectedOption === "VerfiedOnly" ? (
                <Ionicons
                  name="ios-radio-button-on-sharp"
                  size={24}
                  color={COLORS.primaryColor}
                />
              ) : (
                <Ionicons
                  name="radio-button-off"
                  size={24}
                  color={COLORS.extraLightGray}
                />
              )}
            </TouchableOpacity>
          </View>

          <View className="flex-row justify-between items-center pb-4 border-b-[1px] border-grayNeutral mt-3">
            <Text
              style={styles.sheetText}
              className="text-extraLightGray font-normal"
            >
              Verified and Unverified
            </Text>
            <TouchableOpacity
              onPress={() => setSelectedOption("VerfiedAndUnverified")}
            >
              {selectedOption === "VerfiedAndUnverified" ? (
                <Ionicons
                  name="ios-radio-button-on-sharp"
                  size={24}
                  color={COLORS.primaryColor}
                />
              ) : (
                <Ionicons
                  name="radio-button-off"
                  size={24}
                  color={COLORS.extraLightGray}
                />
              )}
            </TouchableOpacity>
          </View>

          <View className="flex-row justify-between items-center pb-4 mt-3">
            <Text
              style={styles.sheetText}
              className="text-extraLightGray font-normal"
            >
              Unverified News Only
            </Text>
            <TouchableOpacity
              onPress={() => setSelectedOption("UnVerfiedOnly")}
            >
              {selectedOption === "UnVerfiedOnly" ? (
                <Ionicons
                  name="ios-radio-button-on-sharp"
                  size={24}
                  color={COLORS.primaryColor}
                />
              ) : (
                <Ionicons
                  name="radio-button-off"
                  size={24}
                  color={COLORS.extraLightGray}
                />
              )}
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={applyNewsFilter}
            className="bg-primaryColor py-3 rounded-md mt-5"
          >
            <Text className="text-white font-semibold text-center text-xl">
              Save
            </Text>
          </TouchableOpacity>
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
}
