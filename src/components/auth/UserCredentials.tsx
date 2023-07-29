import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  ActivityIndicator,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
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
import { useSheet } from "../../context/bottom_sheet/BottomSheetContext";
import { useAlert } from "../../context/alert/AlertContext";
import {
  handleAuthErrors,
  validateEmail,
} from "../../helpers/HandleAuthErrors";

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
  const [authAction, setAuthAction] = useState("Sign Up");
  const changedActionState = authAction === "Sign Up" ? "Sign In" : "Sign Up";
  const isAndroid = Platform.OS === "android";
  const navigation = useNavigation<NavigationProp<any>>();
  const { email, password, username } = credentials;
  const { setActiveUser } = useAuth();
  const { isDarkMode } = useSheet();
  const { showAlertAndContent } = useAlert();
  const text = isDarkMode ? "text-lightText" : "text-darkNeutral";
  const btn = isDarkMode ? "bg-primaryColorTheme" : "bg-primaryColorTheme";

  useEffect(() => {
    const paramsToUse = paramsPassed === "Sign Up" ? "Sign Up" : "Sign In";
    setAuthAction(paramsToUse);
  }, [paramsPassed]);

  async function loginUser() {
    if (email || password) {
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
        const errorMessage = handleAuthErrors(error.message);

        showAlertAndContent({
          type: "error",
          message: errorMessage || "Something went wrong. Please try again",
        });
      }
    } else {
      showAlertAndContent({
        type: "error",
        message: "Both email and password are required",
      });
    }
  }

  function handleNextStep() {
    if (!username || !email || !password)
      return showAlertAndContent({
        type: "error",
        message: "Username, Email and Password are required",
      });

    if (!validateEmail(email))
      return showAlertAndContent({
        type: "error",
        message: "Please enter a valid email format",
      });

    nextStep();
  }

  return (
    <SafeAreaView
      className={`${isDarkMode ? "bg-darkNeutral" : "bg-white"}  flex-1`}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="px-4 mt-8"
        style={{ paddingTop: isAndroid ? 60 : null }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("CreateAccountStart")}
        >
          <Ionicons
            name="arrow-back-outline"
            size={24}
            color={isDarkMode ? "white" : "#1C1C1E"}
          />
        </TouchableOpacity>
        <View
          className={`${
            isDarkMode ? "bg-dark" : "bg-grayNeutral"
          }  flex-row p-[5px] justify-around items-center rounded-lg mt-5 overflow-hidden`}
        >
          {["Sign Up", "Sign In"].map((currentAction, index) => (
            <TouchableOpacity
              onPress={() => {
                setAuthAction(changedActionState);
                setCredentials(initiaCredentials);
              }}
              key={index}
              className={`py-1 px-16 rounded-lg ${
                currentAction === authAction && isDarkMode
                  ? "bg-authDark"
                  : currentAction === authAction && !isDarkMode
                  ? "bg-white"
                  : ""
              }`}
            >
              <Text
                className={`text-center text-base dark:text-white ${
                  currentAction === authAction ? "font-bold" : "font-semibold"
                } `}
              >
                {currentAction}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {authAction === "Sign Up" ? (
          <View>
            <Text className={`${text} text-2xl font-bold  mt-12`}>
              Welcome to DailyTruth
            </Text>
            <Text
              className={`${text} ${
                isDarkMode ? "font-light" : "font-normal"
              } text-[18px] mt-3 tracking-wide leading-6`}
            >
              We are committed to delivering accurate and trustworthy news from
              around the world.
            </Text>
          </View>
        ) : (
          <View>
            <Text className={`${text} text-2xl font-bold  mt-12`}>
              Welcome back to DailyTruth
            </Text>
            <Text
              className={`${text} ${
                isDarkMode ? "font-light" : " font-normal"
              } text-[18px] mt-3 tracking-wide leading-6`}
            >
              As always, we are committed to delivering accurate and trustworthy
              news from around the world.
            </Text>
          </View>
        )}

        <View>
          {authAction === "Sign Up" && (
            <View className="mt-14">
              <Text
                className={`absolute ${
                  currentInput === "Username" || username
                    ? `bottom-5 text-[12px]  mb-2 ${
                        isDarkMode ? "text-lightText" : "text-grayText"
                      }`
                    : `bottom-2 text-[16px] ${
                        isDarkMode ? "text-lightText" : "text-grayText"
                      }`
                }`}
              >
                Username
              </Text>
              <TextInput
                value={username}
                onChangeText={(text) => handleTextChange("username", text)}
                className={`${
                  isDarkMode ? "border-lightBorder" : "border-lightGray"
                } border-b-2  relative text-[16px]`}
                onFocus={() => setCurrentInput("Username")}
                onBlur={() => setCurrentInput("")}
                style={{ color: isDarkMode ? "#E5E5EA" : "#000" }}
              />
            </View>
          )}

          <View className={`${authAction === "Sign Up" ? "mt-10" : "mt-12"}`}>
            <Text
              className={`absolute ${
                currentInput === "Email Address" || email
                  ? `bottom-5 text-[12px]  mb-2 ${
                      isDarkMode ? "text-lightText" : "text-grayText"
                    }`
                  : `bottom-2 text-[16px] ${
                      isDarkMode ? "text-lightText" : "text-grayText"
                    }`
              }`}
            >
              Email Address
            </Text>
            <TextInput
              value={email}
              onChangeText={(text) => handleTextChange("email", text)}
              className={`${
                isDarkMode ? "border-lightBorder" : "border-lightGray"
              } border-b-2  relative text-[16px]`}
              onFocus={() => setCurrentInput("Email Address")}
              onBlur={() => setCurrentInput("")}
              style={{ color: isDarkMode ? "#E5E5EA" : "#000" }}
            />
          </View>

          <View className="mt-10">
            <Text
              className={`absolute ${
                currentInput === "Password" || password
                  ? `bottom-5 text-[12px]  mb-2 ${
                      isDarkMode ? "text-lightText" : "text-grayText"
                    }`
                  : `bottom-2 text-[16px] ${
                      isDarkMode ? "text-lightText" : "text-grayText"
                    }`
              }`}
            >
              Password
            </Text>
            <TextInput
              value={password}
              secureTextEntry
              onChangeText={(text) => handleTextChange("password", text)}
              className={`${
                isDarkMode ? "border-lightBorder" : "border-lightGray"
              } border-b-2  relative text-[16px]`}
              onFocus={() => setCurrentInput("Password")}
              onBlur={() => setCurrentInput("")}
              style={{ color: isDarkMode ? "#E5E5EA" : "#000" }}
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
              onPress={authAction === "Sign In" ? loginUser : handleNextStep}
              className={`${btn} py-3 rounded-md`}
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
