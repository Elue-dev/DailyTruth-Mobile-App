import { View, Text, SafeAreaView } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../types/navigation";
import Search from "../../components/search";
import { News } from "../../types/news";
import NewsCard from "../../components/news/NewsCard";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS } from "../../common/colors";

export default function SearchScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [newsData, setNewsData] = useState<News[] | undefined>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchInitiated, setSearchIntiated] = useState(false);

  useEffect(() => {
    if (searchQuery === "") {
      setNewsData([]);
      setSearchIntiated(false);
    }
  }, [searchQuery]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Text className="text-primaryColorSec font-semibold text-[18px]">
          Search
        </Text>
      ),
    });
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Search
        setNewsData={setNewsData || undefined}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchInitiated={searchInitiated}
        setSearchIntiated={setSearchIntiated}
      />

      {!searchQuery ? (
        <>
          <View className="flex justify-center items-center pt-20">
            <MaterialCommunityIcons
              name="text-box-search-outline"
              size={150}
              color={COLORS.gray200}
            />
          </View>
          <Text className="text-center text-[20px] text-grayText pt-4 mx-4 leading-7">
            Start searching some news by Title, Keywords or Categories!
          </Text>
        </>
      ) : searchInitiated && newsData?.length === 0 ? (
        <View className="justify-center items-center pt-20">
          <View className="flex-row items-center gap-1 pb-2">
            <Text className="text-xl font-semibold text-grayText">
              No News found for
            </Text>
            <Text className="text-xl font-semibold text-primaryColor">
              '{searchQuery}'
            </Text>
          </View>
          <Text className="text-xl font-bold text-grayText">
            Try searching something else.
          </Text>
        </View>
      ) : (
        <NewsCard dataToUse={newsData} />
      )}
    </SafeAreaView>
  );
}
