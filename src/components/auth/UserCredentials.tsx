import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { UserCredentialsProps } from "../../types/auth";
import {
  CommonActions,
  NavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, database } from "../../lib/firebase";
import { useAuth } from "../../context/auth/AuthContext";
import { doc, getDoc } from "firebase/firestore";

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
  const [loading, setLoading] = useState(false);
  const [authAction, setAuthAction] = useState(
    paramsPassed ? "Sign In" : "Sign Up"
  );
  const changedActionState = authAction === "Sign Up" ? "Sign In" : "Sign Up";
  const navigation = useNavigation<NavigationProp<any>>();
  const { email, password, username } = credentials;
  const { setActiveUser } = useAuth();

  async function loginUser() {
    if (email !== "" && password !== "") {
      setLoading(true);
      try {
        const user: any = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        if (user) {
          const userDocReference = doc(database, "users", user.user.uid);
          const userDocSnapshot = await getDoc(userDocReference);

          if (userDocSnapshot?.exists()) {
            const userData = userDocSnapshot?.data();
            const userObj = {
              id: user.user.uid,
              username: userData.username || "",
              email: userData.email || "",
              interests: userData.interests || [""],
              avatar: userData.avatar || "",
            };
            setActiveUser(userObj);
          }
        }
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "TabStack" }],
          })
        );
        setLoading(false);
      } catch (error: any) {
        setLoading(false);
        console.log(error);

        Alert.alert("Login error", error.message);
      }
    }
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
                  ? "bottom-5 text-[12px] text-grayText mb-2"
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
                  ? "bottom-5 text-[12px] text-grayText mb-2"
                  : "bottom-2 text-[16px]"
              }`}
            >
              Password
            </Text>
            <TextInput
              value={password}
              secureTextEntry
              onChangeText={(text) => handleTextChange("password", text)}
              className="border-b-2 border-lightGray relative text-[16px]"
              onFocus={() => setCurrentInput("Password")}
              onBlur={() => setCurrentInput("")}
            />
          </View>
        </View>

        <View className="mt-14">
          {loading ? (
            <TouchableOpacity className="bg-primaryColorLighter py-3 rounded-md">
              <ActivityIndicator color={"#fff"} size="small" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={authAction === "Sign In" ? loginUser : nextStep}
              className="bg-primaryColor py-3 rounded-md"
            >
              <Text className="text-white font-semibold text-center text-xl">
                {authAction === "Sign In" ? "Sign In" : "Continue"}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
