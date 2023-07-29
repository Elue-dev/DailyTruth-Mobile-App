import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../types/navigation";
import { useEffect, useLayoutEffect, useState } from "react";
import { useSheet } from "../../../context/bottom_sheet/BottomSheetContext";
import CustomLeftHeader from "../../../helpers/CustomLeftHeader";
import { interests } from "../../../data/interests";
import { useAuth } from "../../../context/auth/AuthContext";
import { useAlert } from "../../../context/alert/AlertContext";

export default function ManageInterests() {
  const [uInterests, setUInterests] = useState<string[] | undefined>([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const {
    state: { user },
  } = useAuth();
  const { isDarkMode } = useSheet();
  const { showAlertAndContent } = useAlert();
  const btn = isDarkMode ? "bg-primaryColorTheme" : "bg-primaryColorTheme";

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Text className="text-primaryColorSec dark:text-gray300 font-semibold text-[18px]">
          Manage Interests
        </Text>
      ),

      headerLeft: () => (isDarkMode ? <CustomLeftHeader /> : null),
    });
  }, [isDarkMode]);

  useEffect(() => {
    const filteredUserInterests = user?.interests.filter((interest) =>
      interests.includes(interest)
    );
    setUInterests(filteredUserInterests);
  }, [interests]);

  function manageUserInterests(interest: string) {
    if (uInterests?.includes(interest)) {
      setUInterests(uInterests.filter((int) => int !== interest));
    } else {
      setUInterests(uInterests && [...uInterests, interest]);
    }
  }

  function updateUserInterests() {
    navigation.goBack();
    showAlertAndContent({
      type: "success",
      message: "Interests successfully updated",
    });
  }

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-darkNeutral">
      <View className="pt-6 mx-3">
        <Text className="text-2xl font-bold mt-7 text-darkNeutral dark:text-white">
          Manage your interests
        </Text>
        <Text className="text-[16px] mt-3 tracking-wide leading-6 font-normal text-grayText dark:font-light dark:text-lightText">
          Choose interests according to your preference as they will determine
          the type of news you see
        </Text>
      </View>

      <View className="flex-row flex-wrap gap-x-2 gap-y-3 pt-10 ml-2">
        {interests.map((interest) => (
          <TouchableOpacity
            key={interest}
            className="w-20"
            onPress={() => manageUserInterests(interest)}
          >
            <View
              className={`${
                uInterests?.includes(interest)
                  ? "bg-lightGray"
                  : "bg-transparent border-2 border-grayNeutral dark:border-lightBorder"
              }  rounded-md h-20`}
            >
              <Text
                className={`text-center pt-7 ${
                  isDarkMode ? "text-lightText" : "text-grayText"
                } text-base whitespace-nowrap ${
                  uInterests?.includes(interest) && "text-grayText font-bold"
                } `}
              >
                {interest}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <View className="mt-14 mb-24 mx-4">
        {loading ? (
          <TouchableOpacity className="bg-primaryColorLighter py-3 rounded-md">
            <ActivityIndicator color={"#FFF"} size="small" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={updateUserInterests}
            className={`${btn} py-3 rounded-md`}
          >
            <Text className="text-white font-semibold text-center text-xl">
              Update Interests
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}
