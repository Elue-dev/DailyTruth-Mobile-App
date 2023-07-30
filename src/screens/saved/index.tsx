import { View, Text, SafeAreaView, Platform, Image } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../types/navigation";
import NewsCard from "../../components/news/NewsCard";
import Search from "../../components/search";
import { SavedNews } from "../../types/news";
import { useSheet } from "../../context/bottom_sheet/BottomSheetContext";
import CustomLeftHeader from "../../helpers/CustomLeftHeader";
import useFetchCollection from "../../hooks/useFetchCollection";
import { useAuth } from "../../context/auth/AuthContext";
import Loader from "../../components/loader";

export default function SavedScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [savedNews, setSavedNews] = useState<any>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchInitiated, setSearchIntiated] = useState(false);
  const { isDarkMode } = useSheet();
  const { state } = useAuth();
  const { data, loading } = useFetchCollection("saved");
  const userSavedNews = savedNews?.filter(
    (news: SavedNews) => news.userID === state.user?.id
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Text
          className={`${
            isDarkMode ? "text-gray300" : "text-primaryColorSec"
          }  font-semibold text-[18px]`}
        >
          Saved News
        </Text>
      ),

      headerLeft: () =>
        isDarkMode && Platform.OS === "ios" ? <CustomLeftHeader /> : null,
    });
  }, [isDarkMode]);

  useEffect(() => {
    if (data.length > 0) {
      const userSavedNews = data?.filter(
        (news: SavedNews) => news.userID === state.user?.id
      );
      setSavedNews(userSavedNews);
    }
  }, [data, loading]);

  useEffect(() => {
    if (searchQuery === "") {
      const userSavedNews = data?.filter(
        (news: SavedNews) => news.userID === state.user?.id
      );
      setSavedNews(userSavedNews);
      setSearchIntiated(false);
    }
  }, [searchQuery]);

  if (loading) return <Loader />;
  if (userSavedNews.length === 0) return <NoSavedNews />;

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-darkNeutral">
      <Search
        location="saved"
        newsFromComponent={userSavedNews}
        setNewsData={setSavedNews || undefined}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchInitiated={searchInitiated}
        setSearchIntiated={setSearchIntiated}
      />

      <View className="pt-3 pb-10" style={{ zIndex: -1 }}>
        {searchInitiated && savedNews?.length === 0 ? (
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
          <NewsCard dataToUse={savedNews} location="saved" />
        )}
      </View>
    </SafeAreaView>
  );
}

function NoSavedNews() {
  return (
    <View className="flex-1 justify-center items-center bg-white dark:bg-darkNeutral">
      <Image
        source={require("../../assets/rafiki.png")}
        className="h-80 w-80"
        style={{ resizeMode: "contain" }}
      />

      <Text className="text-darkNeutral dark:text-lightGray text-xl mt-5 mx-3">
        Nothing here yet. Any news you save will appear here
      </Text>
    </View>
  );
}
