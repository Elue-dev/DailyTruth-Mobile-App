import { View, Text, SafeAreaView, Button } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../types/navigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../../context/auth/AuthContext";

export default function NewsScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { state } = useAuth();

  async function resetOnboarding() {
    await AsyncStorage.removeItem("userHasOnboarded");
    navigation.navigate("Onboarding");
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Text className="text-center pt-3">
        Logged in as {state.user?.username}({state.user?.email})
      </Text>
      <Button title="Onboarding Screen" onPress={resetOnboarding} />
    </SafeAreaView>
  );
}
