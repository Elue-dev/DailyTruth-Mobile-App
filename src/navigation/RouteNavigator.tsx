import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CreateAccountStart from "../screens/auth/create_account_start";
import OnboardingScreen from "../screens/onboarding";
import { RootStackParamList } from "../types/navigation";
import TabNavigator from "./TabNavigator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { COLORS } from "../common/colors";

const RootStack = createNativeStackNavigator<RootStackParamList>();

async function checkOnboardingStatus() {
  const previousOnboardingCheck = await AsyncStorage.getItem(
    "userHasOnboarded"
  );
  return previousOnboardingCheck === "true";
}

export default function RouteNavigator() {
  const [userHasOnboarded, setUserHasOnboarded] = useState(false);
  const [isOnboardingCheckComplete, setIsOnboardingCheckComplete] =
    useState(false);

  useEffect(() => {
    async function getOnboardingCheckResults() {
      const hasOnboarded = await checkOnboardingStatus();
      setUserHasOnboarded(hasOnboarded);
      setIsOnboardingCheckComplete(true);
    }

    getOnboardingCheckResults();
  }, []);

  if (!isOnboardingCheckComplete)
    return <ActivityIndicator color={COLORS.primaryColor} size="large" />;

  return (
    <RootStack.Navigator
      initialRouteName={userHasOnboarded ? "TabStack" : "Onboarding"}
    >
      <RootStack.Screen
        name="TabStack"
        component={TabNavigator}
        options={{
          headerShown: false,
        }}
      />
      <RootStack.Screen
        name="Onboarding"
        component={OnboardingScreen}
        options={{
          headerShown: false,
        }}
      />
      <RootStack.Screen
        name="CreateAccountStart"
        component={CreateAccountStart}
        options={{
          headerShown: false,
        }}
      />
    </RootStack.Navigator>
  );
}
