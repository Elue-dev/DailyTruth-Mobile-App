import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { useSheet } from "../../../context/bottom_sheet/BottomSheetContext";
// import {
//   GoogleSignin,
//   statusCodes,
//   GoogleSigninButton,
// } from "@react-native-google-signin/google-signin";
// import firebase from "@react-native-firebase/app";
// import "@react-native-firebase/auth";
// import { firebaseConfig } from "../../../../firebase"; // Import your Firebase configuration
// import { useEffect } from "react";

export default function CreateAccountStart() {
  const navigation = useNavigation<NavigationProp<any>>();
  const { isDarkMode } = useSheet();

  async function resetOnboarding() {
    await AsyncStorage.removeItem("userHasOnboarded");
    navigation.navigate("TabStack");
  }

  // useEffect(() => {
  //   if (!firebase.apps.length) {
  //     firebase.initializeApp(firebaseConfig);
  //   }

  //   configureGoogleSignin();
  // }, []);

  // function configureGoogleSignin() {
  //   GoogleSignin.configure();
  // }

  async function handleGoogleSignIn() {}

  return (
    <SafeAreaView
      className={`flex-1 ${isDarkMode ? "bg-darkNeutral" : "bg-white"} `}
    >
      <View className="ml-4">
        <View>
          <Text
            className={`${
              isDarkMode ? "text-lightText" : "text-darkNeutral"
            } text-2xl font-bold  mt-20`}
          >
            Welcome to DailyTruth
          </Text>
          <Text
            className={`${
              isDarkMode ? "text-lightText" : "text-grayText"
            } text-[18px] mt-1`}
          >
            For credibility and reliability.
          </Text>
        </View>

        <View className="pt-14">
          <TouchableOpacity
            onPress={() => {}}
            className="border border-1 border-lightGray mr-3 rounded-md"
          >
            <View className="flex-row items-center justify-center">
              <AntDesign
                name="google"
                size={24}
                color={isDarkMode ? "#C7C7CC" : "black"}
              />
              <Text
                className={`${
                  isDarkMode ? "text-lightGray" : "text-extraLightGray"
                } p-4 text-center  text-base`}
              >
                Sign up with Google
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleGoogleSignIn}
            className="border border-1 border-lightGray mr-3 rounded-md mt-4"
          >
            <View className="flex-row items-center justify-center">
              <FontAwesome5
                name="facebook"
                size={24}
                color={isDarkMode ? "#C7C7CC" : "black"}
              />
              <Text
                className={`${
                  isDarkMode ? "text-lightGray" : "text-extraLightGray"
                } p-4 text-center  text-base`}
              >
                Sign up with Facebook
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View className="pt-16">
          <View className="h-[0.5px] w-[96%] bg-lightGray relative" />
          <Text
            className={`text-center absolute top-[52px] left-[30%]  px-2  text-base ${
              isDarkMode
                ? "bg-darkNeutral text-lightGray"
                : "bg-white text-grayText"
            }`}
          >
            Or Continue With
          </Text>
        </View>

        <View className="pt-14">
          <TouchableOpacity
            onPress={() => navigation.navigate("AuthSequence")}
            className="border border-1 border-lightGray mr-3 rounded-md mt-4 bg-grayNeutral"
          >
            <Text
              className={`p-4 text-center text-base  ${
                isDarkMode ? "bg-gray300 font-bold" : "font-semibold"
              }`}
              style={{ color: isDarkMode ? "#4E0F12" : "#74171C" }}
            >
              Email Address
            </Text>
          </TouchableOpacity>

          <Text className="text-right mr-3 mt-4 text-base  flex-col justify-center items-center text-grayText dark:text-lightGray">
            Already have an account?{" "}
            <Text
              onPress={() =>
                navigation.navigate("AuthSequence", {
                  state: "Sign In",
                })
              }
            >
              <Text className=" text-primaryColor dark:text-primaryColorTheme font-semibold underline text-base">
                Sign In
              </Text>
            </Text>
          </Text>
        </View>

        <View className="mt-32">
          <Text className="leading-6 text-grayText dark:text-lightGray">
            By signing up, you agree with our{" "}
            <Text onPress={() => console.warn("terms")}>
              <Text className="font-bold uppercase text-grayText dark:text-lightGray">
                Terms of Service
              </Text>
            </Text>{" "}
            and{" "}
            <Text onPress={() => console.warn("policy")}>
              <Text className="font-bold uppercase text-grayText dark:text-lightGray">
                Privacy Policy
              </Text>
            </Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
