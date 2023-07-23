import { View, Text, SafeAreaView } from "react-native";
import React, { useLayoutEffect } from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../types/navigation";

export default function VerifyScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Text className="text-primaryColorSec font-semibold text-[18px]">
          Verify
        </Text>
      ),
    });
  }, []);

  return <SafeAreaView className="flex-1 bg-white"></SafeAreaView>;
}
