import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { interests } from "../../data/interests";
import { UserInterestsProps } from "../../types/auth";
import {
  CommonActions,
  NavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, database } from "../../lib/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import { useAuth } from "../../context/auth/AuthContext";

export default function UserInterests({
  initiaCredentials,
  prevStep,
  credentials,
  selectedCategories,
  setSelectedCategories,
}: UserInterestsProps) {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<NavigationProp<any>>();
  const { email, password, username } = credentials;
  const { setActiveUser } = useAuth();

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
    if (email !== "" && password !== "") {
      setLoading(true);
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        if (user) {
          const userDocRef = doc(database, "users", user.uid);
          const userDocData = {
            id: user.uid,
            username,
            email,
            interests: selectedCategories,
            avatar: "",
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          };
          await setDoc(userDocRef, userDocData);
          const userObj = {
            id: user.uid,
            username,
            email,
            interests: selectedCategories,
            avatar: "",
          };
          setActiveUser(userObj);
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: "TabStack" }],
            })
          );
          setLoading(false);
        } else {
          setLoading(false);
          throw new Error("User not found");
        }
      } catch (error: any) {
        setLoading(false);
        Alert.alert("Signup error", error.message);
      }
    }
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
              // style={{maxWidth: 20}}
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
                  className={`text-center pt-7 text-grayText text-base whitespace-nowrap ${
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
          {loading ? (
            <TouchableOpacity className="bg-primaryColorLighter py-3 rounded-md">
              <ActivityIndicator color={"#fff"} size="small" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={createUserAccount}
              className="bg-primaryColor py-3 rounded-md"
            >
              <Text className="text-white font-semibold text-center text-xl">
                Create Account
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
