import { View, Text, FlatList } from "react-native";
import { newsData } from "../../screens/news/data";
import {
  MaterialIcons,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { COLORS } from "../../common/colors";

export default function NewsCard() {
  return (
    <View className="mx-2 pt-1">
      <FlatList
        keyExtractor={(newsData) => newsData.id}
        data={newsData}
        renderItem={({ item: news }) => (
          <View className="border-b-2 border-gray100 ">
            <View
              className="border border-gray100 mb-5 shadow-lg px-2 py-4 mt-3 rounded-lg"
              style={{ elevation: 3, backgroundColor: "#FFF" }}
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
                      size={17}
                      color={COLORS.customGreen}
                    />
                  ) : (
                    <Ionicons
                      name="ios-warning-outline"
                      size={17}
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
              <Text className="text-extraLightGray font-light leading-6 pt-2">
                {news.content}
              </Text>

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
