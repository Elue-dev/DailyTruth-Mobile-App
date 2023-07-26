import { View, Text, TextInput, TouchableOpacity } from "react-native";
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
      className={`mt-8 border px-3 pb-4 mx-4 shadow-sm  rounded-lg flex-row justify-between items-center ${
        isDarkMode ? "border-gray200" : "border-gray100"
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
        className={`${
          isDarkMode ? "text-grayNeutral" : "text-darkNeutral"
        } text-base h-full mt-2 `}
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
