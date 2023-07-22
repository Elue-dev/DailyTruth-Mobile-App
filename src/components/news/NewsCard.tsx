import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { newsData } from "../../screens/news/data";
import {
  MaterialIcons,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { COLORS } from "../../common/colors";
import { useEffect } from "react";

export default function NewsCard({ dataToUse, setDataToUse }: any) {
  useEffect(() => {
    setDataToUse(newsData);
  }, []);

  return (
    <View className="mx-2">
      <FlatList
        keyExtractor={(dataToUse) => dataToUse.id}
        data={dataToUse}
        showsVerticalScrollIndicator={false}
        renderItem={({ item: news, index }) => (
          <View
            className={`border-b-2 border-gray100  ${
              index === dataToUse.length - 1 ? "pb-14" : null
            }`}
          >
            <View
              className="border border-gray100 mb-5 shadow-sm px-2 py-4 mt-3 rounded-lg"
              style={{ elevation: 1, backgroundColor: "#FFF" }}
            >
              {/* Header */}
              <View className="flex-row justify-between items-center pb-3">
                <Text className="text-extraLightGray font-light">
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
                      color={COLORS.primaryColor}
                    />
                  )}

                  <Text className="text-lightGray font-bold">|</Text>
                  <Text className="text-gray200 font-light">
                    {news.upvotes} {news.upvotes === 1 ? "upvote" : "upvotes"}
                  </Text>
                </View>
              </View>

              {/* Body */}
              <Text className="text-[16px] text-extraLightGray font-bold">
                {news.title}
              </Text>
              <View className="">
                <Text className="text-extraLightGray font-light leading-6 pt-2">
                  {news.content}...
                </Text>
                <TouchableOpacity>
                  <Text className="text-primaryColor py-1 font-semibold">
                    Read More
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Footer */}
              <View className="flex-row justify-between items-center">
                <View className="flex-row gap-1">
                  <Text className="text-gray50">{news.category}</Text>
                  <Text className="text-gray50">|</Text>
                  <Text className="text-gray50">
                    {news.readTime}{" "}
                    {news.readTime === 1 ? "min read" : "mins read"}
                  </Text>
                </View>
                <MaterialCommunityIcons
                  name="bookmark-plus-outline"
                  size={25}
                  color={COLORS.grayText}
                />
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
}
