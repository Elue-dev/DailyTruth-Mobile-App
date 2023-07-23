import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { COLORS } from "../../common/colors";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { News, SearchNews } from "../../types/news";
import { newsData } from "../../screens/news/data";

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

  useFocusEffect(() => {
    inputRef.current?.focus();
  });

  function handleNewsSearch() {
    const searchResults = newsData.filter(
      (news) =>
        news.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        news.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        news.content.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setSearchIntiated(true);
    setNewsData(searchResults);
  }

  // useEffect(() => {
  //   if (location !== "saved") return;
  //   const searchResults = newsFromComponent?.filter(
  //     (news) =>
  //       news.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //       news.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //       news.content.toLowerCase().includes(searchQuery.toLowerCase())
  //   );
  //   setSearchIntiated(true);
  //   setNewsData(searchResults);
  // }, [searchQuery, location]);

  function handleClearSearch() {
    setSearchQuery("");
    setSearchIntiated(false);
    setNewsData(newsFromComponent);
  }

  return (
    <View
      className="mt-8 border px-3 pb-4 mx-4 shadow-sm border-gray100 rounded-lg flex-row justify-between items-center"
      style={{ elevation: 1, backgroundColor: "#FFF" }}
    >
      <TextInput
        ref={location === "saved" ? null : inputRef}
        value={searchQuery}
        onChangeText={(value) => setSearchQuery(value)}
        className="text-base h-full mt-2 text-darkNeutral"
        placeholder="Search news, keywords"
        placeholderTextColor={COLORS.grayText}
        selectionColor={COLORS.primaryColor}
      />
      {location !== "saved" ? (
        <>
          {searchInitiated ? (
            <TouchableOpacity onPress={handleClearSearch}>
              <AntDesign
                name="closecircleo"
                size={24}
                color={COLORS.primaryColor}
                style={{ paddingTop: 10 }}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={handleNewsSearch}>
              <Ionicons
                name="search-outline"
                size={28}
                color={COLORS.primaryColor}
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
      )}
    </View>
  );
}
