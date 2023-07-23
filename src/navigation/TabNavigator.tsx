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
} from "@expo/vector-icons";

import { StyleSheet } from "react-native";
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
  const { state } = useSheet();
  const {
    state: { user },
  } = useAuth();

  function screenOptions({ route }: RoutePropArg): BottomTabNavigationOptions {
    return {
      tabBarIcon: ({ focused, size }) => {
        switch (route.name) {
          case "News":
            return (
              <Ionicons
                name="newspaper-outline"
                size={size}
                color={focused ? "#C2262E" : "#AEAEB2"}
                style={styles.tabBarIcon}
              />
            );
          case "Verify":
            return (
              <MaterialCommunityIcons
                name="newspaper-check"
                size={size + 5}
                color={focused ? "#C2262E" : "#AEAEB2"}
                style={styles.tabBarIconSec}
              />
            );
          case "Search":
            return (
              <AntDesign
                name="search1"
                size={size}
                color={focused ? "#C2262E" : "#AEAEB2"}
                style={styles.tabBarIcon}
              />
            );
          case "AddNews":
            return (
              <MaterialIcons
                name="post-add"
                size={size + 8}
                color={focused ? "#C2262E" : "#AEAEB2"}
                style={styles.tabBarIconSec}
              />
            );
          case "Profile":
            return (
              <FontAwesome
                name="user-o"
                size={size}
                color={focused ? "#C2262E" : "#AEAEB2"}
                style={styles.tabBarIcon}
              />
            );
          default:
            return null;
        }
      },
      tabBarActiveTintColor: "#C2262E",
      tabBarInactiveTintColor: "#AEAEB2",
      tabBarShowLabel: true,
      tabBarLabelStyle: styles.label,
      headerStyle: {
        backgroundColor: COLORS.grayNeutral,
      },
      tabBarStyle: {
        display: state.bottomSheetOpen ? "none" : "flex",
        borderTopWidth: 1,
        borderColor: "#000",
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
        }}
      />
      <TabStack.Screen
        name="Verify"
        component={VerifyScreen}
        options={{
          headerShown: true,
        }}
      />
      <TabStack.Screen
        name="AddNews"
        component={user ? AddNews : AuthSequence}
        options={{
          headerShown: user ? true : false,
          tabBarLabel: "Add Post",
        }}
      />
      <TabStack.Screen
        name="Search"
        component={SearchScreen}
        options={{
          headerShown: true,
        }}
      />

      <TabStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: true,
        }}
      />
    </TabStack.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarIcon: {
    fontSize: 26,
    paddingTop: 5,
  },
  tabBarIconSec: {
    paddingTop: 2,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
  },
});
