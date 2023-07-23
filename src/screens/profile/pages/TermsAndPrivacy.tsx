import { View, Text, SafeAreaView } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../types/navigation";
import { useLayoutEffect } from "react";

export default function TermsAndPrivacy() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Text className="text-primaryColorSec font-semibold text-[18px]">
          Terms and Privacy
        </Text>
      ),
    });
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="pt-6 mx-3">
        <Text>Terms and Privacy</Text>
      </View>
    </SafeAreaView>
  );
}
