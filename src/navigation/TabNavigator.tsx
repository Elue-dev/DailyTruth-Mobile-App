import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { RoutePropArg, TabStackParamList } from "../types/navigation";
import {
  MaterialCommunityIcons,
  AntDesign,
  FontAwesome,
  Ionicons,
  MaterialIcons,
  Entypo,
} from "@expo/vector-icons";
import { Platform, StyleSheet } from "react-native";
import NewsScreen from "../screens/news";
import VerifyScreen from "../screens/verify";
import SearchScreen from "../screens/search";
import ProfileScreen from "../screens/profile";
import { COLORS } from "../common/colors";
import { useSheet } from "../context/bottom_sheet/BottomSheetContext";
import { useAuth } from "../context/auth/AuthContext";
import AuthSequence from "../screens/auth_sequence";
import AddNews from "../screens/add_news";

const TabStack = createBottomTabNavigator<TabStackParamList>();

export default function TabsNavigator() {
  const { state, isDarkMode } = useSheet();
  const {
    state: { user },
  } = useAuth();

  function screenOptions({ route }: RoutePropArg): BottomTabNavigationOptions {
    const colorToUse = isDarkMode ? "#CE5158" : "#C2262E";

    return {
      tabBarIcon: ({ focused, size }) => {
        switch (route.name) {
          case "News":
            return (
              <Ionicons
                name="newspaper-outline"
                size={size}
                color={focused ? colorToUse : "#AEAEB2"}
                style={styles.tabBarIcon}
              />
            );
          case "Verify":
            return (
              <MaterialCommunityIcons
                name="newspaper-check"
                size={size + 5}
                color={focused ? colorToUse : "#AEAEB2"}
                style={styles.tabBarIconSec}
              />
            );
          case "Search":
            return (
              <AntDesign
                name="search1"
                size={size}
                color={focused ? colorToUse : "#AEAEB2"}
                style={styles.tabBarIcon}
              />
            );
          case "AddNews":
            return (
              <MaterialIcons
                name="post-add"
                size={size + 8}
                color={focused ? colorToUse : "#AEAEB2"}
                style={styles.tabBarIconSec}
              />
            );
          case "Profile":
            return (
              <FontAwesome
                name="user-o"
                size={size}
                color={focused ? colorToUse : "#AEAEB2"}
                style={styles.tabBarIcon}
              />
            );
          case "More":
            return (
              <Entypo
                name="dots-three-vertical"
                size={size}
                color={focused ? colorToUse : "#AEAEB2"}
                style={styles.tabBarIcon}
              />
            );
          default:
            return null;
        }
      },
      tabBarActiveTintColor: colorToUse,
      tabBarInactiveTintColor: "#AEAEB2",
      tabBarShowLabel: true,
      tabBarLabelStyle: styles.label,
      headerStyle: {
        backgroundColor: isDarkMode
          ? COLORS.grayNeutralTheme
          : COLORS.grayNeutral,
      },
      tabBarStyle: {
        display: state.bottomSheetOpen ? "none" : "flex",
        borderTopWidth: isDarkMode ? 0.19 : 1,
        borderColor: "#d8d8d8",
        backgroundColor: isDarkMode ? "#1F1F1F" : "#FFF",
      },
    };
  }

  return (
    <TabStack.Navigator screenOptions={screenOptions}>
      <TabStack.Screen
        name="News"
        component={NewsScreen}
        options={{
          headerShown: true,
          headerTitleAlign: "center",
        }}
      />
      <TabStack.Screen
        name="Verify"
        component={VerifyScreen}
        options={{
          headerShown: true,
          headerTitleAlign: "center",
        }}
      />
      <TabStack.Screen
        name="AddNews"
        component={user ? AddNews : AuthSequence}
        options={{
          headerShown: user ? true : false,
          tabBarLabel: "Add News",
          headerTitleAlign: "center",
        }}
      />
      <TabStack.Screen
        name="Search"
        component={SearchScreen}
        options={{
          headerShown: true,
          headerTitleAlign: "center",
        }}
      />

      <TabStack.Screen
        name={user ? "Profile" : "More"}
        component={ProfileScreen}
        options={{
          headerShown: true,
          headerTitleAlign: "center",
        }}
      />
    </TabStack.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarIcon: {
    fontSize: 26,
    paddingTop: Platform.OS === "ios" ? 5 : 3,
  },
  tabBarIconSec: {
    paddingTop: Platform.OS === "ios" ? 2 : 3,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
  },
});
