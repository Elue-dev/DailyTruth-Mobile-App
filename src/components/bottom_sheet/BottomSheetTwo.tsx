import { useMemo, useRef } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import {
  MaterialCommunityIcons,
  AntDesign,
  SimpleLineIcons,
  Ionicons,
} from "@expo/vector-icons";
import { useSheet } from "../../context/bottom_sheet/BottomSheetContext";
import { styles } from "./style";
import { COLORS } from "../../common/colors";
import { useModal } from "../../context/modal/ModalCotext";

export default function BottomSheetTwo() {
  const { isDarkMode, toggleBottomSheet, toggleOverlay } = useSheet();
  const { showModalAndContent } = useModal();
  const SheetRef = useRef(null);
  const snapPoints = useMemo(() => ["45"], []);
  const borderTouse = isDarkMode ? " border-b-[0.4px]" : " border-b-[1px]";

  function handleBottomSheetActions() {
    toggleBottomSheet();
    toggleOverlay();
  }

  function flagNews() {
    showModalAndContent({
      title: "You are about to flag this News",
      message:
        "This will put this news up for further verification and might be removed from this platform if proven false",
      actionBtnText: "Flag News",
    });
  }

  return (
    <BottomSheet
      ref={SheetRef}
      snapPoints={snapPoints}
      enablePanDownToClose={false}
      handleComponent={() => null}
      onClose={handleBottomSheetActions}
      backgroundStyle={{ borderRadius: 20 }}
    >
      <BottomSheetView style={{ paddingBottom: 0 }}>
        <View
          style={[
            styles.bottomSheetWrap,
            isDarkMode && { backgroundColor: COLORS.darkNeutral },
          ]}
        >
          <TouchableOpacity
            onPress={handleBottomSheetActions}
            className="flex-row items-end justify-end mb-6"
          >
            <AntDesign name="closecircle" size={24} color={COLORS.gray50} />
          </TouchableOpacity>

          <TouchableOpacity
            className={`flex-row justify-start items-center pb-4 border-grayNeutral mt-3 gap-3 ${borderTouse}`}
          >
            <SimpleLineIcons
              name="like"
              size={20}
              color={isDarkMode ? COLORS.gray300 : COLORS.extraLightGray}
            />
            <Text
              className={`${
                isDarkMode ? "text-gray300" : "text-extraLightGray"
              }  text-[19px]  font-normal`}
            >
              Upvote
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={`flex-row justify-start items-center pb-4 border-grayNeutral pt-4 gap-3 ${borderTouse}`}
          >
            <SimpleLineIcons
              name="dislike"
              size={20}
              color={isDarkMode ? COLORS.gray300 : COLORS.extraLightGray}
            />
            <Text
              className={`${
                isDarkMode ? "text-gray300" : "text-extraLightGray"
              }  text-[19px]  font-normal`}
            >
              Down Vote
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={`flex-row justify-start items-center pb-4 border-grayNeutral pt-4 gap-3 ${borderTouse}`}
          >
            <MaterialCommunityIcons
              name="bookmark-multiple-outline"
              size={25}
              color={isDarkMode ? COLORS.gray300 : COLORS.extraLightGray}
            />
            <Text
              className={`${
                isDarkMode ? "text-gray300" : "text-extraLightGray"
              }  text-[19px]  font-normal`}
            >
              Save
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={flagNews}
            className={`flex-row justify-start items-center pb-4 border-grayNeutral pt-4 gap-3 ${borderTouse}`}
          >
            <Ionicons
              name="md-flag-outline"
              size={25}
              color={isDarkMode ? COLORS.gray300 : COLORS.extraLightGray}
            />
            <Text
              className={`${
                isDarkMode ? "text-gray300" : "text-extraLightGray"
              }  text-[19px]  font-normal`}
            >
              Flag News
            </Text>
          </TouchableOpacity>
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
}
