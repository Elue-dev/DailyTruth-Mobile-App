import { NavigatorScreenParams, RouteProp } from "@react-navigation/native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackNavigationProp } from "@react-navigation/stack";
import { User } from "./auth";

export type RootStackParamList = {
  TabStack: NavigatorScreenParams<TabStackParamList>;
  Onboarding: undefined;
  CreateAccountStart: undefined;
  AuthSequence: {
    state?: string;
  };
  NewsDetails: {
    news: string;
  };
  Search: undefined;
  Saved: undefined;
  AccountInfo: undefined;
  ManageInterests: undefined;
  ContactSupport: undefined;
  Terms: undefined;
};

export type TabStackParamList = {
  News: undefined;
  Verify: undefined;
  Search: undefined;
  AddNews: undefined;
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

export interface RoutePropArg {
  route: RouteProp<TabStackParamList, keyof TabStackParamList>;
  navigation: any;
}
