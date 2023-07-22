import { useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../types/navigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { interests } from "../../data/interests";
import { FontAwesome } from "@expo/vector-icons";
import NewsCard from "../../components/news/NewsCard";

export default function NewsScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const modifiedInterests = ["All", ...interests];
  const [selectedInterest, setSelectedInterest] = useState("All");

  async function resetOnboarding() {
    await AsyncStorage.removeItem("userHasOnboarded");
    navigation.navigate("Onboarding");
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity className="mr-2" onPress={resetOnboarding}>
          <FontAwesome name="tachometer" size={24} color="black" />
        </TouchableOpacity>
      ),
    });
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View>
        <FlatList
          keyExtractor={(modifiedInterests) => modifiedInterests}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={modifiedInterests}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => setSelectedInterest(item)}>
              <View
                className={`mt-4 border-b-4 py-1 px-2 ${
                  selectedInterest === item
                    ? "border-b-primaryColor"
                    : "border-b-grayNeutral"
                }`}
              >
                <Text
                  className={`text-base text-gray200 ${
                    selectedInterest === item &&
                    "text-primaryColor font-semibold"
                  }`}
                >
                  {item}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>

      <View className="pt-3">
        <NewsCard />
      </View>
    </SafeAreaView>
  );
}
