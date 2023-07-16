import { View, Text, SafeAreaView, Button } from "react-native";
import React from "react";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../types/navigation";

export default function NewsScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Text className="">News Screen</Text>
      <Button
        title="Onboarding Screen"
        onPress={() => navigation.navigate("Onboarding")}
      />
    </SafeAreaView>
  );
}
