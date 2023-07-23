import { View, Text, SafeAreaView } from "react-native";
import React, { useEffect, useLayoutEffect } from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../types/navigation";
import NewsCard from "../../components/news/NewsCard";
import { newsData } from "../news/data";
import Search from "../../components/search";

export default function SavedScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Text className="text-primaryColorSec font-semibold text-[18px]">
          Saved News
        </Text>
      ),
    });
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Search location="saved" />
      <View className="pt-3" style={{ zIndex: -1 }}>
        <NewsCard dataToUse={newsData} />
      </View>
    </SafeAreaView>
  );
}
