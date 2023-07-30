import { View, Text, SafeAreaView, Pressable } from "react-native";
import { useLayoutEffect } from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useSheet } from "../../context/bottom_sheet/BottomSheetContext";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { database } from "../../lib/firebase";

export default function AddNews() {
  const navigation = useNavigation<NavigationProp<any>>();

  const { isDarkMode } = useSheet();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Text
          className={`${
            isDarkMode ? "text-gray300" : "text-primaryColorSec"
          }  font-semibold text-[18px]`}
        >
          Add News
        </Text>
      ),
    });
  }, [isDarkMode]);

  async function addNews() {
    console.log("heree");

    try {
      const collectionRef = collection(database, "news");

      const data = {
        id: "2",
        category: "Health",
        image: "",
        title: "",
        content: ``,
        readTime: 5,
        isVerified: false,
        upvotes: 0,
        date: serverTimestamp(),
        sources: ["Tom’s Guide"],
      };
      await addDoc(collectionRef, data);
      console.log("done");
    } catch (error) {
      console.log({ error });
    }
  }

  return (
    <SafeAreaView
      className={`flex-1 ${isDarkMode ? "bg-darkNeutral" : "bg-white"}`}
    >
      {/* <Pressable onPress={addNews}>
        <Text className="text-white">Add News</Text>
      </Pressable> */}
    </SafeAreaView>
  );
}
