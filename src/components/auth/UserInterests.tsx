import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { interests } from "../../data/interests";
import { UserInterestsProps } from "../../types/auth";
import {
  CommonActions,
  NavigationProp,
  useNavigation,
} from "@react-navigation/native";

export default function UserInterests({
  initiaCredentials,
  prevStep,
  credentials,
  selectedCategories,
  setSelectedCategories,
}: UserInterestsProps) {
  const navigation = useNavigation<NavigationProp<any>>();

  function setUserInterests(interest: string) {
    if (selectedCategories.includes(interest)) {
      setSelectedCategories(
        selectedCategories.filter((cat) => cat !== interest)
      );
    } else {
      setSelectedCategories([...selectedCategories, interest]);
    }
  }

  async function createUserAccount() {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "TabStack" }],
      })
    );
  }

  return (
    <SafeAreaView className="bg-white flex-1">
      <ScrollView showsVerticalScrollIndicator={false} className="px-4 mt-8">
        <TouchableOpacity onPress={prevStep}>
          <Ionicons name="arrow-back-outline" size={24} color="#1C1C1E" />
        </TouchableOpacity>

        <View>
          <Text className="text-2xl font-bold text-darkNeutral mt-7">
            Add your interests
          </Text>
          <Text className="text-grayText text-[18px] mt-3 tracking-wide leading-6">
            Choose the sections you would like to receive news on. The interests
            can be changed anytime under your profile settings.
          </Text>
        </View>

        <View className="flex-row flex-wrap gap-x-2 gap-y-3 pt-10">
          {interests.map((interest) => (
            <TouchableOpacity
              key={interest}
              className="w-20"
              onPress={() => setUserInterests(interest)}
            >
              <View
                className={`${
                  selectedCategories.includes(interest)
                    ? "bg-lightGray"
                    : "bg-transparent border-2 border-grayNeutral"
                }  rounded-md h-20`}
              >
                <Text
                  className={`text-center pt-7 text-grayText text-base ${
                    selectedCategories.includes(interest) &&
                    "text-grayText font-bold"
                  } `}
                >
                  {interest}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View className="mt-14 mb-24">
          <TouchableOpacity
            onPress={createUserAccount}
            className="bg-primaryColor py-3 rounded-md"
          >
            <Text className="text-white font-semibold text-center text-xl">
              Create Account
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
