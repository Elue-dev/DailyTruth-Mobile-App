import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useLayoutEffect } from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "../../common/colors";
import { profileData } from "./data";
import { signOut } from "firebase/auth";
import { auth } from "../../lib/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ProfileScreen() {
  const navigation = useNavigation<NavigationProp<any>>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Text className="text-primaryColorSec font-semibold text-[18px]">
          Profile
        </Text>
      ),
    });
  }, []);

  function handleProfileNavigation(title: string) {
    switch (title) {
      case "Complete Registration":
        navigation.navigate("CompleteReg");
        break;
      case "Manage Interests":
        navigation.navigate("ManageInterests");
        break;
      case "Contact Support":
        navigation.navigate("ContactSupport");
        break;
      case "Terms and Privacy Policy":
        navigation.navigate("Terms");
        break;
      case "Saved News":
        navigation.navigate("Saved");
        break;
      default:
        return null;
    }
  }

  async function logoutUser() {
    try {
      await signOut(auth);
      AsyncStorage.removeItem("user");
      navigation.navigate("News");
    } catch (error: any) {
      console.log(error);
      Alert.alert("Logout error", error.message);
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="pt-10 mx-3">
        {profileData.map((data, index) => (
          <TouchableOpacity
            key={data.title}
            onPress={() => handleProfileNavigation(data.title)}
            className={`flex-row justify-between items-center pb-5 border-grayNeutral border-b-2`}
          >
            <View>
              <Text className="text-primaryColorSec text-[17px] mt-4 font-semibold">
                {data.title}
              </Text>
              <Text className="pt-1 text-gray200 font-normal">
                {data.description}
              </Text>
            </View>
            <View>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={30}
                color={COLORS.primaryColorSec}
              />
            </View>
          </TouchableOpacity>
        ))}

        <View>
          <TouchableOpacity
            onPress={logoutUser}
            className={`flex-row justify-between items-center pb-5 border-grayNeutral`}
          >
            <View>
              <Text className="text-primaryColorSec text-[17px] mt-4 font-semibold">
                Logout
              </Text>
              <Text className="pt-1 text-gray200 font-normal">
                Log out of your account
              </Text>
            </View>
            <View>
              <MaterialIcons
                name="logout"
                size={25}
                color={COLORS.primaryColorSec}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
