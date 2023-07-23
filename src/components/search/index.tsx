import { View, Text, TextInput } from "react-native";
import { useRef } from "react";
import { COLORS } from "../../common/colors";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";

export default function Search({ location }: { location?: string }) {
  const inputRef = useRef<TextInput>(null);

  useFocusEffect(() => {
    inputRef.current?.focus();
  });

  return (
    <View
      className="mt-8 border px-3 pb-4 mx-4 shadow-sm border-gray100 rounded-lg flex-row justify-between items-center"
      style={{ elevation: 1, backgroundColor: "#FFF" }}
    >
      <TextInput
        ref={location === "saved" ? null : inputRef}
        className="text-base h-full mt-2 text-darkNeutral"
        placeholder="Search news, keywords"
        placeholderTextColor={COLORS.grayText}
        selectionColor={COLORS.primaryColor}
      />
      <Ionicons
        name="search-outline"
        size={28}
        color={COLORS.gray50}
        style={{ paddingTop: 10 }}
      />
    </View>
  );
}
