import { useLayoutEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import {
  NavigationProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { RootStackParamList } from "../../types/navigation";
import {
  AntDesign,
  MaterialIcons,
  Ionicons,
  Entypo,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { COLORS } from "../../common/colors";
import { News } from "../../types/news";
import BottomSheetComponent from "../../components/bottom_sheet";
import { SharedElement } from "react-native-shared-element";
import { useSheet } from "../../context/bottom_sheet/BottomSheetContext";
import BottomSheetTwo from "../../components/bottom_sheet/BottomSheetTwo";

interface NewsParams {
  news: News;
}

export default function NewsDetails() {
  const { height, width } = Dimensions.get("window");
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { news } = useRoute().params as NewsParams;
  const {
    state: { bottomSheetOpen },
    toggleBottomSheet,
    toggleOverlay,
  } = useSheet();

  function handleBottomSheetActions() {
    toggleBottomSheet();
    toggleOverlay();
  }

  function backArrow() {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
      >
        <AntDesign name="arrowleft" size={24} color={COLORS.primaryColorSec} />
      </TouchableOpacity>
    );
  }

  function backArrowDisabled() {
    return (
      <AntDesign name="arrowleft" size={24} color={COLORS.primaryColorSec} />
    );
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Text className="text-primaryColorSec font-semibold text-[18px]">
          News
        </Text>
      ),
      headerLeft: bottomSheetOpen ? backArrowDisabled : backArrow,
    });
  }, [bottomSheetOpen]);

  return (
    <SafeAreaView>
      <ScrollView
        className={`pb-44 ${!bottomSheetOpen && "px-3"}`}
        showsVerticalScrollIndicator={false}
      >
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

        {/* Header */}
        <View className="flex-row justify-between items-center">
          <View className="pt-6">
            <View className="flex-row items-center gap-1 pb-2">
              <Text className="text-grayText text-[14px]">News Status:</Text>
              <View className="flex-row items-center">
                <Text
                  className={`text-[14px] font-semibold ${
                    news.isVerified ? "text-customGreen" : "text-primaryColor"
                  }`}
                >
                  {news.isVerified ? "Verified" : "Unverified"}{" "}
                </Text>
                {news.isVerified ? (
                  <MaterialIcons
                    name="verified"
                    size={18}
                    color={COLORS.customGreen}
                  />
                ) : (
                  <Ionicons
                    name="ios-warning-outline"
                    size={18}
                    color={COLORS.primaryColor}
                  />
                )}
              </View>
            </View>

            <View className="flex-row items-center gap-1">
              <Text className="text-grayText text-[14px] font-normal">
                Time Posted:
              </Text>
              <View className="flex-row">
                <Text className="text-grayText text-[14px] font-medium">
                  {news.date}
                </Text>
              </View>
            </View>
          </View>

          <View className="flex-row items-center gap-4">
            <TouchableOpacity>
              <SimpleLineIcons name="like" size={18} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleBottomSheet}>
              <Entypo name="dots-three-vertical" size={18} color="black" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Cotent */}
        {news.image && (
          <Image
            source={{ uri: news.image }}
            style={{
              height: 300,
              width: width - 25,
              borderRadius: 10,
              marginTop: 30,
              zIndex: -1,
            }}
          />
        )}
        <View className="pt-6">
          <Text className="text-[20px] leading-6 text-extraLightGray font-bold">
            {news.title}
          </Text>
          <Text className="pt-3 leading-5 font-light text-grayText">
            {news.content}
          </Text>
          <View className="pt-5">
            <Text className="uppercase pb-3 text-[17px] text-grayText font-bold">
              News Sources
            </Text>
            {news.sources?.map((source, index) => (
              <View className="flex-row items-start">
                <Entypo
                  name="dot-single"
                  size={24}
                  color={COLORS.primaryColorTet}
                />
                <Text
                  key={index}
                  className="mb-2 text-primaryColorTet underline"
                >
                  {source}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {bottomSheetOpen && <BottomSheetTwo />}
    </SafeAreaView>
  );
}
