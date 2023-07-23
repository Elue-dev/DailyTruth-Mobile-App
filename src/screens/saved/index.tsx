import { View, Text, SafeAreaView } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../types/navigation";
import NewsCard from "../../components/news/NewsCard";
import { newsData } from "../news/data";
import Search from "../../components/search";
import { News } from "../../types/news";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS } from "../../common/colors";

export default function SavedScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [savedNews, setSavedNews] = useState<News[] | undefined>(newsData);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchInitiated, setSearchIntiated] = useState(false);

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
      <Search
        location="saved"
        newsFromComponent={savedNews}
        setNewsData={setSavedNews || undefined}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchInitiated={searchInitiated}
        setSearchIntiated={setSearchIntiated}
      />
      <View className="pt-3" style={{ zIndex: -1 }}>
        {searchInitiated && newsData?.length === 0 ? (
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
          <NewsCard dataToUse={savedNews} />
        )}

        {/* <NewsCard dataToUse={savedNews} /> */}
      </View>
    </SafeAreaView>
  );
}
