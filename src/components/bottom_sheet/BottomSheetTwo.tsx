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

export default function BottomSheetTwo() {
  const { toggleBottomSheet, toggleOverlay } = useSheet();
  const SheetRef = useRef(null);
  const snapPoints = useMemo(() => ["45"], []);

  function handleBottomSheetActions() {
    toggleBottomSheet();
    toggleOverlay();
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
      <BottomSheetView>
        <View style={styles.bottomSheetWrap}>
          <TouchableOpacity
            onPress={handleBottomSheetActions}
            className="flex-row items-end justify-end mb-6"
          >
            <AntDesign name="closecircle" size={24} color={COLORS.gray50} />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row justify-start items-center border-b-[1px] pb-4 border-grayNeutral mt-3 gap-3">
            <SimpleLineIcons
              name="like"
              size={20}
              color={COLORS.extraLightGray}
            />
            <Text className="text-[19px] text-extraLightGray font-normal">
              Upvote
            </Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-row justify-start items-center border-b-[1px] pb-4 border-grayNeutral pt-4 gap-3">
            <SimpleLineIcons
              name="dislike"
              size={20}
              color={COLORS.extraLightGray}
            />
            <Text className="text-[19px] text-extraLightGray font-normal">
              Down Vote
            </Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-row justify-start items-center border-b-[1px] pb-4 border-grayNeutral pt-4 gap-3">
            <MaterialCommunityIcons
              name="bookmark-multiple-outline"
              size={25}
              color={COLORS.extraLightGray}
            />
            <Text className="text-[19px] text-extraLightGray font-normal">
              Save
            </Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-row justify-start items-center border-b-[1px] pb-4 border-grayNeutral pt-4 gap-3">
            <Ionicons
              name="md-flag-outline"
              size={25}
              color={COLORS.extraLightGray}
            />
            <Text className="text-[19px] text-extraLightGray font-normal">
              Flag News
            </Text>
          </TouchableOpacity>
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
}
