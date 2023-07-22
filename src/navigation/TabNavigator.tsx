import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TabStackParamList } from "../types/navigation";
import {
  MaterialCommunityIcons,
  AntDesign,
  FontAwesome,
  Ionicons,
} from "@expo/vector-icons";

import { StyleSheet } from "react-native";
import NewsScreen from "../screens/news";
import VerifyScreen from "../screens/verify";
import SearchScreen from "../screens/search";
import SavedScreen from "../screens/saved";
import ProfileScreen from "../screens/profile";
import { COLORS } from "../common/colors";

const TabStack = createBottomTabNavigator<TabStackParamList>();

export default function TabsNavigator() {
  return (
    <TabStack.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size }) => {
          switch (route.name) {
            case "News":
              return (
                <Ionicons
                  name="newspaper-outline"
                  size={size}
                  color={focused ? "#C2262E" : "#AEAEB2"}
                  style={styles.tobBarIcon}
                />
              );
            case "Verify":
              return (
                <MaterialCommunityIcons
                  name="newspaper-check"
                  size={size}
                  color={focused ? "#C2262E" : "#AEAEB2"}
                  style={styles.tobBarIcon}
                />
              );
            case "Search":
              return (
                <AntDesign
                  name="search1"
                  size={size}
                  color={focused ? "#C2262E" : "#AEAEB2"}
                  style={styles.tobBarIcon}
                />
              );
            case "Saved":
              return (
                <Ionicons
                  name="bookmarks-outline"
                  size={size}
                  color={focused ? "#C2262E" : "#AEAEB2"}
                  style={styles.tobBarIcon}
                />
              );
            case "Profile":
              return (
                <FontAwesome
                  name="user-o"
                  size={size}
                  color={focused ? "#C2262E" : "#AEAEB2"}
                  style={styles.tobBarIcon}
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
      })}
    >
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
        name="Search"
        component={SearchScreen}
        options={{
          headerShown: true,
        }}
      />
      <TabStack.Screen
        name="Saved"
        component={SavedScreen}
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
  tobBarIcon: {
    fontSize: 26,
    paddingTop: 5,
  },
  label: {
    fontSize: 14,
  },
});
