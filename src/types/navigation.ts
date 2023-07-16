import { NavigatorScreenParams, RouteProp } from "@react-navigation/native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackNavigationProp } from "@react-navigation/stack";

export type RootStackParamList = {
  TabStack: NavigatorScreenParams<TabStackParamList>;
  Onboarding: undefined;
  CreateAccountStart: undefined;
  AuthSequence: {
    state?: string;
  };
};

export type TabStackParamList = {
  News: undefined;
  Verify: undefined;
  Search: undefined;
  Saved: undefined;
  Profile: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

export type TabsStackScreenProps<T extends keyof TabStackParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<TabStackParamList, T>,
    RootStackScreenProps<"TabStack">
  >;

export type RouteNavigatorProps = {
  navigation: NativeStackScreenProps<RootStackParamList>;
};

export type OnboardingScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Onboarding"
>;

export type OnboardingScreenRouteProp = RouteProp<
  RootStackParamList,
  "Onboarding"
>;

export interface OnboardingScreenProps {
  navigation: OnboardingScreenNavigationProp;
  route: OnboardingScreenRouteProp;
}
