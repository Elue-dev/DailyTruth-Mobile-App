import { View, TextInput, TouchableOpacity, Platform } from "react-native";
import { useEffect, useRef } from "react";
import { COLORS } from "../../common/colors";
import { MaterialIcons } from "@expo/vector-icons";
// import { useFocusEffect } from "@react-navigation/native";
import { News, SearchNews } from "../../types/news";
import { useSheet } from "../../context/bottom_sheet/BottomSheetContext";
import useFetchCollection from "../../hooks/useFetchCollection";

export default function Search({
  location,
  newsFromComponent,
  setNewsData,
  searchQuery,
  setSearchQuery,
  searchInitiated,
  setSearchIntiated,
}: SearchNews) {
  const inputRef = useRef<TextInput>(null);
  const { isDarkMode } = useSheet();
  const { data: allNews } = useFetchCollection("news");

  // useFocusEffect(() => {
  //   inputRef.current?.focus();
  // });

  useEffect(() => {
    function handleNewsSearch() {
      const searchResults = allNews?.filter(
        (news: News) =>
          news.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          news.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          news.content.toLowerCase().includes(searchQuery.toLowerCase())
      );

      setSearchIntiated(true);
      setNewsData(searchResults);
    }

    handleNewsSearch();
  }, [searchQuery]);

  function clearSearch() {
    setSearchQuery("");
    setSearchIntiated(false);
    setNewsData(newsFromComponent);
  }

  return (
    <View
      className={`mt-8  px-3 pb-4 mx-4 shadow-sm rounded-lg flex-row justify-between items-center border-gray100 dark:border-gray200 ${
        Platform.OS === "android" ? "border-4 dark:border" : "border"
      }`}
      style={{
        elevation: 1,
        backgroundColor: isDarkMode ? "transparent" : "#FFF",
      }}
    >
      <TextInput
        ref={location === "saved" ? null : inputRef}
        value={searchQuery}
        onChangeText={(value) => setSearchQuery(value)}
        className="text-base h-full mt-2 text-darkNeutral dark:text-grayNeutral"
        placeholder="Search news, keywords"
        placeholderTextColor={isDarkMode ? "white" : COLORS.grayText}
        selectionColor={
          isDarkMode ? COLORS.primaryColorTheme : COLORS.primaryColor
        }
      />

      {searchQuery && (
        <TouchableOpacity onPress={clearSearch}>
          <MaterialIcons
            name="clear"
            size={28}
            color={isDarkMode ? "#E5E5EA" : COLORS.primaryColor}
            style={{ paddingTop: 10 }}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}
