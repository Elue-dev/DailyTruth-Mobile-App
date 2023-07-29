import { useLayoutEffect, useState } from "react";
import { View, Text, Image, ScrollView, Platform } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../types/navigation";
import { useSheet } from "../../../context/bottom_sheet/BottomSheetContext";
import CustomLeftHeader from "../../../helpers/CustomLeftHeader";
import { useAuth } from "../../../context/auth/AuthContext";
import { DEFAULT_AVATAR } from "../../../utils";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import { COLORS } from "../../../common/colors";

export default function AccountInfo() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { isDarkMode } = useSheet();
  const {
    state: { user },
  } = useAuth();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Text className="text-primaryColorSec dark:text-gray300 font-semibold text-[18px]">
          Account Information
        </Text>
      ),

      headerLeft: () =>
        isDarkMode && Platform.OS === "ios" ? <CustomLeftHeader /> : null,
    });
  }, [isDarkMode]);

  return (
    <ScrollView
      className="flex-1 bg-white dark:bg-darkNeutral"
      showsVerticalScrollIndicator={false}
    >
      <View className="mx-2">
        <View className="pt-6 mx-3 justify-center items-center">
          <Image
            source={{ uri: user?.avatar || DEFAULT_AVATAR }}
            className="h-28 w-28 rounded-full bg-primaryColorLighter"
          />
          <Text className="pt-2 text-darkNeutral dark:text-lightText text-xl font-bold">
            {user?.username}
          </Text>
        </View>

        <View className="pt-6">
          <View className="flex-row items-center justify-between pb-3">
            <Text className="text-darkNeutral dark:text-gray-500 text-base font-bold pb-3">
              INFORMATION
            </Text>

            <View>
              <TouchableOpacity
                className="flex-row items-center gap-2"
                onPress={() => {
                  navigation.navigate("EditProfile");
                }}
              >
                <Text className="text-primaryColor dark:text-primaryColorTheme text-[15px]">
                  Edit Profile
                </Text>

                <AntDesign
                  name="edit"
                  size={15}
                  color={
                    isDarkMode ? COLORS.primaryColorTheme : COLORS.primaryColor
                  }
                />
              </TouchableOpacity>
            </View>
          </View>

          <View className="flex-row justify-between items-center pb-2 border-b-[.2px] border-b-lightBorder dark:border-b-slate-200">
            <Text className="text-darkNeutral dark:text-lightGray text-base">
              Username
            </Text>
            <Text className="text-darkNeutral dark:text-white text-base">
              {user?.username}
            </Text>
          </View>

          <View className="flex-row justify-between items-center pb-2 pt-5 border-b-[.2px] border-b-lightBorder dark:border-b-slate-200">
            <Text className="text-darkNeutral dark:text-lightGray text-base">
              Email
            </Text>
            <Text className="text-darkNeutral dark:text-white text-base">
              {user?.email}
            </Text>
          </View>
        </View>

        <View className="pt-8">
          <View className="flex-row items-center justify-between">
            <Text className="text-darkNeutral dark:text-gray-500 text-base font-bold pb-3">
              INTERESTS
            </Text>

            <View>
              <TouchableOpacity
                className="flex-row items-center gap-2"
                onPress={() => {
                  navigation.navigate("ManageInterests");
                }}
              >
                <Text className="text-primaryColor dark:text-primaryColorTheme text-[15px]">
                  Manage
                </Text>

                <AntDesign
                  name="edit"
                  size={15}
                  color={
                    isDarkMode ? COLORS.primaryColorTheme : COLORS.primaryColor
                  }
                />
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 8,
              paddingTop: 20,
              marginLeft: 1,
            }}
          >
            {user?.interests.map((interest) => (
              <View key={interest}>
                <Text
                  style={{
                    color: "gray",
                    borderColor: isDarkMode
                      ? COLORS.lightBorder
                      : COLORS.grayNeutral,
                    borderWidth: 2,
                    borderRadius: 8,
                    padding: 10,
                    fontSize: 15,
                    fontWeight: "bold",
                  }}
                >
                  {interest}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
