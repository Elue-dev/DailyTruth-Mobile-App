import { View, Text, SafeAreaView, Button } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../types/navigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../../context/auth/AuthContext";

export default function NewsScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { state } = useAuth();
  console.log({ user: state.user });

  // async function resetOnboarding() {
  //   await AsyncStorage.removeItem("userHasOnboarded");
  //   navigation.navigate("Onboarding");
  // }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Text className="">News Screen</Text>
      {/* <Button title="Onboarding Screen" onPress={resetOnboarding} /> */}
    </SafeAreaView>
  );
}
