import { View, Text } from "react-native";
import { useLayoutEffect } from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";

export default function AddPost() {
  const navigation = useNavigation<NavigationProp<any>>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Text className="text-primaryColorSec font-semibold text-[18px]">
          Add Post
        </Text>
      ),
    });
  }, []);

  return <View></View>;
}
