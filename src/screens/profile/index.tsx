import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import React, { useLayoutEffect } from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../types/navigation";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "../../common/colors";
import { profileData } from "./data";

export default function ProfileScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

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
      default:
        return null;
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="pt-10 mx-3">
        {profileData.map((data, index) => (
          <TouchableOpacity
            key={data.title}
            onPress={() => handleProfileNavigation(data.title)}
            className={`flex-row justify-between items-center pb-5 border-grayNeutral ${
              index !== profileData.length - 1 && "border-b-2"
            }`}
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
      </View>
    </SafeAreaView>
  );
}
