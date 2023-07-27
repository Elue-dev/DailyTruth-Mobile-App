import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
} from "react-native";
import { useEffect, useRef } from "react";
import { COLORS } from "../../common/colors";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
// import { useFocusEffect } from "@react-navigation/native";
import { SearchNews } from "../../types/news";
import { newsData } from "../../screens/news/data";
import { useSheet } from "../../context/bottom_sheet/BottomSheetContext";

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

  // useFocusEffect(() => {
  //   inputRef.current?.focus();
  // });

  useEffect(() => {
    function handleNewsSearch() {
      const newsToUse = location === "saved" ? newsFromComponent : newsData;
      const searchResults = newsToUse?.filter(
        (news) =>
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
    setNewsData(location === "saved" ? newsFromComponent : newsData);
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
      {/* {location !== "saved" ? (
        <>
          {searchInitiated ? (
            <TouchableOpacity onPress={handleClearSearch}>
              <AntDesign
                name="closecircleo"
                size={24}
                color={isDarkMode ? "white" : COLORS.primaryColor}
                style={{ paddingTop: 10 }}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={handleNewsSearch}>
              <Ionicons
                name="search-outline"
                size={28}
                color={isDarkMode ? "white" : COLORS.primaryColor}
                style={{ paddingTop: 10 }}
              />
            </TouchableOpacity>
          )}
        </>
      ) : (
        <>
          {searchInitiated && (
            <TouchableOpacity onPress={handleClearSearch}>
              <AntDesign
                name="closecircleo"
                size={24}
                color={COLORS.primaryColor}
                style={{ paddingTop: 10 }}
              />
            </TouchableOpacity>
          )}
        </>
      )} */}
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
