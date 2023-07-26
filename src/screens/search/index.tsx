import { View, Text, SafeAreaView } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../types/navigation";
import Search from "../../components/search";
import { News } from "../../types/news";
import NewsCard from "../../components/news/NewsCard";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS } from "../../common/colors";
import { useSheet } from "../../context/bottom_sheet/BottomSheetContext";

export default function SearchScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [newsData, setNewsData] = useState<News[] | undefined>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchInitiated, setSearchIntiated] = useState(false);
  const { isDarkMode } = useSheet();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Text
          className={`${
            isDarkMode ? "text-gray300" : "text-primaryColorSec"
          }  font-semibold text-[18px]`}
        >
          Search
        </Text>
      ),
    });
  }, [isDarkMode]);

  return (
    <SafeAreaView
      className={`flex-1 ${isDarkMode ? "bg-darkNeutral" : "bg-white"}`}
    >
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
          <Text
            className={`${
              isDarkMode ? "text-lightGray" : "text-grayText "
            } text-center text-[20px] pt-4 mx-4 leading-7`}
          >
            Start searching some news by Title, Keywords or Categories!
          </Text>
        </>
      ) : searchInitiated && newsData?.length === 0 ? (
        <View className="justify-center items-center pt-20">
          <View className="flex-row items-center gap-1 pb-2">
            <Text className="text-xl font-semibold text-grayText dark:text-lightText">
              No News found for
            </Text>
            <Text className="text-xl font-semibold text-primaryColor dark:text-primaryColorTheme">
              '{searchQuery}'
            </Text>
          </View>
          <Text className="text-xl font-bold text-grayText dark:text-lightText">
            Try searching something else.
          </Text>
        </View>
      ) : (
        <NewsCard dataToUse={newsData} />
      )}
    </SafeAreaView>
  );
}
