import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  Switch,
  Pressable,
} from "react-native";
import { useLayoutEffect, useState } from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import {
  SimpleLineIcons,
  FontAwesome,
  MaterialIcons,
} from "@expo/vector-icons";
import { COLORS } from "../../common/colors";
import { profileData } from "./data";
import { signOut } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { useAuth } from "../../context/auth/AuthContext";
import { useSheet } from "../../context/bottom_sheet/BottomSheetContext";
import { styles } from "./pages/styles";
import { useAlert } from "../../context/alert/AlertContext";

export default function ProfileScreen() {
  const navigation = useNavigation<NavigationProp<any>>();

  const {
    state: { user },
    removeActiveUser,
  } = useAuth();

  const { isDarkMode, toggleTheme } = useSheet();
  const { showAlertAndContent } = useAlert();
  const [isEnabled, setIsEnabled] = useState(isDarkMode);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Text
          className={`${
            isDarkMode ? "text-gray300" : "text-primaryColorSec"
          }  font-semibold text-[18px]`}
        >
          {user ? " Profile" : "More"}
        </Text>
      ),
    });
  }, [isDarkMode]);

  const unprotectedProfileData = profileData.filter(
    (data) => data.isProtected === false
  );

  const profileDataToUse = user ? profileData : unprotectedProfileData;

  function toggleSwitch() {
    setIsEnabled(!isEnabled);
    toggleTheme();
  }

  function handleProfileNavigation(title: string) {
    switch (title) {
      case "Account Information":
        navigation.navigate("AccountInfo");
        break;
      case "Manage Interests":
        navigation.navigate("ManageInterests");
        break;
      case "Contact Support":
        navigation.navigate("ContactSupport");
        break;
      case "Terms and Privacy Policy":
        navigation.navigate("Terms", { defaultTitle: "Terms Of Use" });
        break;
      case "Saved News":
        navigation.navigate("Saved");
        break;
      default:
        return null;
    }
  }

  async function logOutUser() {
    try {
      await signOut(auth);
      removeActiveUser();
      navigation.navigate("News");
    } catch (error: any) {
      console.log(error);
      showAlertAndContent({
        type: "error",
        message: "Something went wrong. Please try again",
      });
    }
  }

  return (
    <SafeAreaView
      className={`flex-1 ${isDarkMode ? "bg-darkNeutral" : "bg-white"}`}
    >
      <View className="pt-10 mx-3">
        {profileDataToUse.map((data) => (
          <TouchableOpacity
            key={data.title}
            onPress={() => handleProfileNavigation(data.title)}
            className={`${
              isDarkMode ? "border-b-lightBorder" : "border-grayNeutral"
            } flex-row justify-between items-center pb-5  border-b-2`}
          >
            <View>
              <Text
                className={`${
                  isDarkMode ? "text-gray100" : "text-primaryColorSec"
                }  text-[17px] mt-4 font-semibold`}
              >
                {data.title}
              </Text>
              <Text
                className={`${
                  isDarkMode
                    ? "text-lightText font-light"
                    : "text-gray200 font-normal"
                } pt-1 `}
              >
                {data.description}
              </Text>
            </View>
            <View>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={32}
                color={isDarkMode ? COLORS.gray100 : COLORS.primaryColorSec}
              />
            </View>
          </TouchableOpacity>
        ))}

        <Pressable
          className={`flex-row justify-between items-center pb-5 border-grayNeutral dark:border-b-lightBorder border-b-2`}
        >
          <View>
            <Text
              className={`${
                isDarkMode ? "text-gray100" : "text-primaryColorSec"
              }  text-[17px] mt-4 font-semibold`}
            >
              Theme
            </Text>
            <Text
              className={`${
                isDarkMode
                  ? "text-lightText font-light"
                  : "text-gray200 font-normal"
              } pt-1 `}
            >
              Switch between Light and Dark Theme
            </Text>
          </View>

          <Switch
            trackColor={{
              false: "#767577",
              true: COLORS.primaryColorTheme,
            }}
            thumbColor={isEnabled ? "#f4f3f4" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onChange={toggleSwitch}
            value={isEnabled}
            style={styles.switch}
          />
        </Pressable>

        {user ? (
          <View>
            <TouchableOpacity
              onPress={logOutUser}
              className="flex-row justify-between items-center pb-5 "
            >
              <View>
                <Text
                  className={`${
                    isDarkMode ? "text-gray100" : "text-primaryColorSec"
                  }  text-[17px] mt-4 font-semibold`}
                >
                  Log Out
                </Text>
                <Text
                  className={`${
                    isDarkMode
                      ? "text-lightText font-light"
                      : "text-gray200 font-normal"
                  } pt-1 `}
                >
                  Log out of your account
                </Text>
              </View>
              <View>
                <SimpleLineIcons
                  name="logout"
                  size={25}
                  color={isDarkMode ? COLORS.gray100 : COLORS.primaryColorSec}
                />
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("AuthSequence", { state: "Sign Up" })
              }
              className="flex-row justify-between items-center pb-5"
            >
              <View>
                <Text
                  className={`${
                    isDarkMode ? "text-gray100" : "text-primaryColorSec"
                  }  text-[17px] mt-4 font-semibold`}
                >
                  Sign In / Sign Up
                </Text>
                <Text
                  className={`${
                    isDarkMode
                      ? "text-lightText font-light"
                      : "text-gray200 font-normal"
                  } pt-1 `}
                >
                  Sign up or Sign in to your account
                </Text>
              </View>
              <View>
                <FontAwesome
                  name="sign-in"
                  size={30}
                  color={isDarkMode ? COLORS.gray100 : COLORS.primaryColorSec}
                />
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
