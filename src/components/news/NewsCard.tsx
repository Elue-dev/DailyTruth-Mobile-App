import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { newsData } from "../../screens/news/data";
import {
  MaterialIcons,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { COLORS } from "../../common/colors";
import { Dispatch, SetStateAction, useEffect } from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../types/navigation";
import { News } from "../../types/news";
import { useSheet } from "../../context/bottom_sheet/BottomSheetContext";

export default function NewsCard({
  dataToUse,
}: {
  dataToUse: any;
  setDataToUse?: Dispatch<SetStateAction<News[]>>;
}) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { isDarkMode } = useSheet();

  // useEffect(() => {
  //   setDataToUse && setDataToUse(newsData);
  // }, []);

  return (
    <View className="mx-2">
      <FlatList
        keyExtractor={(dataToUse) => dataToUse.id.toString()}
        data={dataToUse}
        showsVerticalScrollIndicator={false}
        renderItem={({ item: news, index }) => (
          <View
            className={`${
              isDarkMode ? "border-gray200" : "border-gray100 border-b-2"
            }   ${index === dataToUse.length - 1 ? "pb-14" : ""}`}
          >
            <View
              className={`border ${
                isDarkMode ? "border-extraLightGray" : "border-gray100"
              }  mb-5 shadow-sm px-2 py-4 mt-3 rounded-lg`}
              style={{
                elevation: 1,
                backgroundColor: isDarkMode ? COLORS.darkNeutral : "#FFF",
              }}
            >
              {/* Header */}
              <View className="flex-row justify-between items-center pb-3">
                <Text
                  className={`${
                    isDarkMode ? "text-lightText" : "text-extraLightGray"
                  } font-light`}
                >
                  {news.date}
                </Text>
                <View className="flex-row gap-1">
                  {news.isVerified ? (
                    <MaterialIcons
                      name="verified"
                      size={15}
                      color={COLORS.customGreen}
                    />
                  ) : (
                    <Ionicons
                      name="ios-warning-outline"
                      size={15}
                      color={
                        isDarkMode
                          ? COLORS.primaryColorTheme
                          : COLORS.primaryColor
                      }
                    />
                  )}

                  <Text
                    className={`${
                      isDarkMode
                        ? "text-lightText font-normal"
                        : "text-lightGray font-bold"
                    }  `}
                  >
                    |
                  </Text>
                  <Text className="text-gray200 font-light">
                    {news.upvotes} {news.upvotes === 1 ? "upvote" : "upvotes"}
                  </Text>
                </View>
              </View>

              {/* Body */}
              <Text
                className={`${
                  isDarkMode ? "text-grayNeutral" : "text-extraLightGray"
                } text-[18px]  font-bold`}
              >
                {news.title}
              </Text>
              <View className="">
                <Text
                  className={`${
                    isDarkMode ? "text-white" : "text-extraLightGray"
                  }  font-light leading-6 pt-2 text-base`}
                >
                  {news.content.slice(0, 175)}...
                </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate("NewsDetails", { news })}
                >
                  <Text
                    className={`${
                      isDarkMode
                        ? "text-primaryColorTheme"
                        : "text-primaryColor"
                    } pt-1 pb-2 font-semibold text-base`}
                  >
                    Read More
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Footer */}
              <View className="flex-row justify-between items-center">
                <View className="flex-row gap-1">
                  <Text className="text-gray50 text-base">{news.category}</Text>
                  <Text className="text-gray50 text-base">|</Text>
                  <Text className="text-gray50 text-base">
                    {news.readTime}{" "}
                    {news.readTime === 1 ? "min read" : "mins read"}
                  </Text>
                </View>
                <TouchableOpacity>
                  <MaterialCommunityIcons
                    name="bookmark-multiple-outline"
                    size={20}
                    color={isDarkMode ? COLORS.gray100 : COLORS.grayText}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
}
