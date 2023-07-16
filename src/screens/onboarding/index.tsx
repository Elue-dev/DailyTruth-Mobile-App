import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Dimensions,
  Image,
  TouchableOpacity,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import React, { useRef, useState } from "react";
import { screensData } from "./screensData";
import { onBoardingScreensdata } from "../../types";
import {
  CommonActions,
  NavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { RootStackParamList } from "../../types/navigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "./styles";

export default function OnboardingScreen() {
  const { width, height } = Dimensions.get("window");
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const flatListRef = useRef<FlatList<onBoardingScreensdata>>(null);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  function updateCurrentSlideIndex(e: NativeSyntheticEvent<NativeScrollEvent>) {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  }

  function goToNextSlide() {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex !== screensData.length) {
      const offset = nextSlideIndex * width;
      flatListRef?.current?.scrollToOffset({ offset });
    }
  }

  function skipOnboarding() {
    const lastSlideIndex = screensData.length - 1;
    const offset = lastSlideIndex * width;
    flatListRef?.current?.scrollToOffset({ offset });
    setCurrentSlideIndex(lastSlideIndex);
  }

  async function initiateAccountCreation() {
    await AsyncStorage.setItem("userHasOnboarded", "true");
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "CreateAccountStart" }],
      })
    );
  }

  return (
    <SafeAreaView className="flex-1">
      <TouchableOpacity onPress={skipOnboarding}>
        <Text className="text-right mr-5 mt-4 text-primaryColor text-xl">
          Skip {">>"}
        </Text>
      </TouchableOpacity>
      <FlatList
        ref={flatListRef}
        data={screensData}
        keyExtractor={(screensData) => screensData.id.toString()}
        contentContainerStyle={{ height: height * 0.75, marginTop: 100 }}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        snapToAlignment="center"
        decelerationRate="fast"
        renderItem={({ item }) => (
          <View style={{ width }} key={item.id}>
            <Image source={item.image} style={styles.image} />
            <Text style={styles.titleText}>{item.title}</Text>
            <Text style={styles.subTitle}>{item.subTitle}</Text>

            <View style={styles.slidesWrap}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                {screensData.map((_, index) => (
                  <View
                    style={[
                      styles.indicator,
                      currentSlideIndex === index && {
                        backgroundColor: "#C2262E",
                        width: 28,
                      },
                    ]}
                    key={index}
                  />
                ))}
              </View>

              <TouchableOpacity
                style={styles.btn}
                onPress={
                  currentSlideIndex === screensData.length - 1
                    ? initiateAccountCreation
                    : goToNextSlide
                }
              >
                <View className="flex-col justify-center items-center">
                  <Text className="text-center text-white font-bold text-xl">
                    {currentSlideIndex === screensData.length - 1
                      ? "Get Started"
                      : "Next"}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
