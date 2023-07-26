import { useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../types/navigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { interests } from "../../data/interests";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import NewsCard from "../../components/news/NewsCard";
import { useSheet } from "../../context/bottom_sheet/BottomSheetContext";
import BottomSheetComponent from "../../components/bottom_sheet";
import { SharedElement } from "react-native-shared-element";
import { News } from "../../types/news";
import { newsData } from "./data";
import { COLORS } from "../../common/colors";

export default function NewsScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [dataToUse, setDataToUse] = useState<News[]>([]);
  const [selectedOption, setSelectedOption] = useState("VerfiedAndUnverified");
  const modifiedInterests = ["All", ...interests];
  const [selectedInterest, setSelectedInterest] = useState("All");
  const {
    state: { bottomSheetOpen },
    isDarkMode,
    toggleBottomSheet,
    toggleOverlay,
  } = useSheet();

  const primaryColorToUse = isDarkMode
    ? "border-b-primaryColorTheme"
    : "border-b-primaryColor";

  useEffect(() => {
    const filteredNews: News[] = newsData.filter(
      (news) =>
        news.category === selectedInterest ||
        news.category.toLowerCase().includes(selectedInterest.toLowerCase())
    );
    const newsToUse = selectedInterest === "All" ? newsData : filteredNews;
    setDataToUse(newsToUse);
  }, [selectedInterest]);

  async function resetOnboarding() {
    await AsyncStorage.removeItem("userHasOnboarded");
    navigation.navigate("Onboarding");
  }

  function handleBottomSheetActions() {
    toggleBottomSheet();
    toggleOverlay();
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Text
          className={`${
            isDarkMode ? "text-gray300" : "text-primaryColorSec"
          }  font-semibold text-[18px]`}
        >
          News
        </Text>
      ),
      headerLeft: () => (
        <TouchableOpacity className="ml-2" onPress={resetOnboarding}>
          <FontAwesome
            name="tachometer"
            size={24}
            color={`${isDarkMode ? COLORS.gray300 : "#666"}`}
          />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity className="mr-2" onPress={toggleBottomSheet}>
          <MaterialCommunityIcons
            name="menu-swap-outline"
            size={28}
            color={`${isDarkMode ? COLORS.gray300 : "#666"}`}
          />
        </TouchableOpacity>
      ),
    });
  }, [isDarkMode]);

  return (
    <SafeAreaView
      className={`flex-1 ${isDarkMode ? "bg-darkNeutral" : "bg-white"} `}
    >
      <View className="ml-3">
        <FlatList
          keyExtractor={(modifiedInterests) => modifiedInterests}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={modifiedInterests}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                setSelectedInterest(item);
                setSelectedOption("VerfiedAndUnverified");
              }}
            >
              <View
                className={`mt-4  ${
                  isDarkMode ? "border-b-2" : "border-b-4"
                } py-1 px-2 ${
                  selectedInterest === item
                    ? primaryColorToUse
                    : "border-b-grayNeutral"
                }`}
              >
                <Text
                  className={`text-base text-gray200 ${
                    selectedInterest === item &&
                    `${
                      isDarkMode
                        ? "text-primaryColorTheme"
                        : "text-primaryColor"
                    } font-semibold`
                  }`}
                >
                  {item}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>

      {bottomSheetOpen && (
        <>
          <TouchableOpacity onPress={handleBottomSheetActions}>
            <SharedElement id="overlay" onNode={toggleOverlay}>
              <View />
            </SharedElement>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
            onPress={handleBottomSheetActions}
          />
        </>
      )}

      {dataToUse.length === 0 ? (
        <View className="mx-4">
          <Text
            className={`pt-8 text-base ${
              isDarkMode ? "text-grayNeutral" : "text-extraLightGray"
            } `}
          >
            No news found with category {selectedInterest}{" "}
            {selectedOption !== "VerfiedAndUnverified" &&
            selectedOption === "UnVerfiedOnly"
              ? "that is unverified"
              : selectedOption === "UnVerfiedOnly"
              ? "that is Verified"
              : null}
          </Text>
          {selectedOption === "VerfiedAndUnverified" && (
            <Text
              className={`${
                isDarkMode ? "text-grayNeutral" : "text-extraLightGray"
              } pt-2 text-base`}
            >
              Either there are no news on {selectedInterest} or{" "}
              {selectedInterest} is not among your interests.
            </Text>
          )}
        </View>
      ) : (
        <View className="pt-3" style={{ zIndex: -1 }}>
          <NewsCard dataToUse={dataToUse} setDataToUse={setDataToUse} />
        </View>
      )}

      {bottomSheetOpen && (
        <BottomSheetComponent
          selectedInterest={selectedInterest}
          setDataToUse={setDataToUse}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />
      )}
    </SafeAreaView>
  );
}
