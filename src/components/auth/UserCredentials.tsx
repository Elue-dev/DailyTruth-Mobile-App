import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { UserCredentialsProps } from "../../types/auth";
import { NavigationProp, useNavigation } from "@react-navigation/native";

export default function UserCredentials({
  initiaCredentials,
  credentials,
  paramsPassed,
  setCredentials,
  handleTextChange,
  nextStep,
  prevStep,
}: UserCredentialsProps) {
  const [currentInput, setCurrentInput] = useState("");
  const [authAction, setAuthAction] = useState(
    paramsPassed ? "Sign In" : "Sign Up"
  );
  const changedActionState = authAction === "Sign Up" ? "Sign In" : "Sign Up";
  const navigation = useNavigation<NavigationProp<any>>();
  const { email, password, username } = credentials;

  async function loginUser() {
    navigation.navigate("TabStack");
  }

  return (
    <SafeAreaView className="bg-white flex-1">
      <ScrollView showsVerticalScrollIndicator={false} className="px-4 mt-8">
        <TouchableOpacity
          onPress={() => navigation.navigate("CreateAccountStart")}
        >
          <Ionicons name="arrow-back-outline" size={24} color="#1C1C1E" />
        </TouchableOpacity>
        <View className="bg-grayNeutral flex-row p-[5px] justify-between items-center rounded-lg mt-5">
          {["Sign Up", "Sign In"].map((currentAction, index) => (
            <TouchableOpacity
              onPress={() => {
                setAuthAction(changedActionState);
                setCredentials(initiaCredentials);
              }}
              key={index}
              className={`py-1 px-16 rounded-lg ${
                currentAction === authAction ? "bg-white" : "bg-transparent"
              }`}
            >
              <Text className="text-center text-base">{currentAction}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {authAction === "Sign Up" ? (
          <View>
            <Text className="text-2xl font-bold text-darkNeutral mt-12">
              Welcome to DailyTruth
            </Text>
            <Text className="text-grayText text-[18px] mt-3 tracking-wide leading-6">
              We are committed to delivering accurate and trustworthy news from
              around the world.
            </Text>
          </View>
        ) : (
          <View>
            <Text className="text-2xl font-bold text-darkNeutral mt-12">
              Welcome back to DailyTruth
            </Text>
            <Text className="text-grayText text-[18px] mt-3 tracking-wide leading-6">
              As always, we are committed to delivering accurate and trustworthy
              news from around the world.
            </Text>
          </View>
        )}

        <View>
          {authAction === "Sign Up" ? (
            <View className="mt-14">
              <Text
                className={`absolute ${
                  currentInput === "Username" || username
                    ? "bottom-5 text-[12px] text-grayText mb-2"
                    : "bottom-2 text-[16px]"
                }`}
              >
                Username
              </Text>
              <TextInput
                value={username}
                onChangeText={(text) => handleTextChange("username", text)}
                className="border-b-2 border-lightGray relative text-[16px]"
                onFocus={() => setCurrentInput("Username")}
                onBlur={() => setCurrentInput("")}
              />
            </View>
          ) : (
            <View />
          )}

          <View className={`${authAction === "Sign Up" ? "mt-10" : "mt-12"}`}>
            <Text
              className={`absolute ${
                currentInput === "Email Address" || email
                  ? "bottom-5 text-[12px] text-grayText"
                  : "bottom-2 text-[16px]"
              }`}
            >
              Email Address
            </Text>
            <TextInput
              value={email}
              onChangeText={(text) => handleTextChange("email", text)}
              className="border-b-2 border-lightGray relative text-[16px]"
              onFocus={() => setCurrentInput("Email Address")}
              onBlur={() => setCurrentInput("")}
            />
          </View>

          <View className="mt-10">
            <Text
              className={`absolute ${
                currentInput === "Password" || password
                  ? "bottom-5 text-[12px] text-grayText"
                  : "bottom-2 text-[16px]"
              }`}
            >
              Password
            </Text>
            <TextInput
              value={password}
              onChangeText={(text) => handleTextChange("password", text)}
              className="border-b-2 border-lightGray relative text-[16px]"
              onFocus={() => setCurrentInput("Password")}
              onBlur={() => setCurrentInput("")}
            />
          </View>
        </View>

        <View className="mt-14">
          <TouchableOpacity
            onPress={authAction === "Sign In" ? loginUser : nextStep}
            className="bg-primaryColor py-3 rounded-md"
          >
            <Text className="text-white font-semibold text-center text-xl">
              {authAction === "Sign In" ? "Sign In" : "Continue"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
