import { View, Text, FlatList, TouchableOpacity } from "react-native";
// import { newsData } from "../../screens/news/data";
import {
  MaterialIcons,
  Ionicons,
  MaterialCommunityIcons,
  Octicons,
} from "@expo/vector-icons";
import { COLORS } from "../../common/colors";
import { Dispatch, SetStateAction, useState } from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../types/navigation";
import { News } from "../../types/news";
import { useSheet } from "../../context/bottom_sheet/BottomSheetContext";
import { getTimeDifference } from "../../helpers";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { database } from "../../lib/firebase";
import { useAlert } from "../../context/alert/AlertContext";
import { useAuth } from "../../context/auth/AuthContext";

export default function NewsCard({
  dataToUse,
  location,
}: {
  dataToUse: any;
  location: string;
  setDataToUse?: Dispatch<SetStateAction<News[]>>;
}) {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { isDarkMode } = useSheet();
  const { showAlertAndContent } = useAlert();
  const { state } = useAuth();

  async function saveNews(news: News, action: string) {
    if (!state.user)
      return showAlertAndContent({
        type: "error",
        message: "You must be logged in to saved this news",
      });

    if (state.user.isDeactivated)
      return showAlertAndContent({
        type: "error",
        message:
          "Your account is currently deactivated. Reactivate your account to continue",
        timeout: 5000,
      });

    setLoading(true);
    const querySnapshot = await getDocs(collection(database, "saved"));
    const savedDoc = querySnapshot.docs.find(
      (doc) => doc.data().id === news.id
    );

    if (action === "save" && savedDoc?.data()) {
      setLoading(false);
      showAlertAndContent({
        type: "error",
        message: "You have previously saved this post",
      });
      return;
    }

    try {
      const newsWithUserID = {
        ...news,
        userID: state.user?.id,
      };

      const querySnapshot = await getDocs(collection(database, "saved"));
      const savedDoc = querySnapshot.docs.find(
        (doc) => doc.data().id === news.id
      );

      if (action === "unsave" && savedDoc) {
        await deleteDoc(doc(database, "saved", savedDoc.id));
        setLoading(false);
        navigation.goBack();
        showAlertAndContent({
          type: "success",
          message: "News removed from saved",
        });
        return;
      }

      const collectionRef = collection(database, "saved");
      await addDoc(collectionRef, newsWithUserID);
      setLoading(false);
      showAlertAndContent({
        type: "success",
        message: "News saved",
      });
    } catch (error) {
      setLoading(false);
      console.log({ error });
      showAlertAndContent({
        type: "error",
        message: "Something went wrong. Please try again",
      });
    }
  }

  return (
    <View className="mx-2">
      <FlatList
        keyExtractor={(dataToUse) => dataToUse.id.toString()}
        data={dataToUse}
        showsVerticalScrollIndicator={false}
        renderItem={({ item: news, index }) => (
          <View
            className={`${
              isDarkMode ? "border-gray200" : "border-gray100 border-b-2"
            }   ${index === dataToUse.length - 1 ? "pb-14" : ""}`}
          >
            <View
              className={`border ${
                isDarkMode ? "border-extraLightGray" : "border-gray100"
              }  mb-5 shadow-sm px-2 py-4 mt-3 rounded-lg`}
              style={{
                elevation: 1,
                backgroundColor: isDarkMode ? COLORS.darkNeutral : "#FFF",
              }}
            >
              {/* Header */}
              {location !== "saved" && (
                <View className="flex-row justify-between items-center pb-3">
                  <Text
                    className={`${
                      isDarkMode ? "text-lightText" : "text-extraLightGray"
                    } font-light`}
                  >
                    {getTimeDifference(news.date)}
                  </Text>

                  <View className="flex-row gap-1">
                    {news.isVerified ? (
                      <MaterialIcons
                        name="verified"
                        size={15}
                        color={COLORS.customGreen}
                      />
                    ) : (
                      <Ionicons
                        name="ios-warning-outline"
                        size={15}
                        color={
                          isDarkMode
                            ? COLORS.primaryColorTheme
                            : COLORS.primaryColor
                        }
                      />
                    )}

                    <View className="flex-row items-center">
                      <Text
                        className={`mr-1 ${
                          isDarkMode
                            ? "text-lightText font-normal"
                            : "text-lightGray font-bold"
                        }  `}
                      >
                        |
                      </Text>
                      <Text className="text-gray200 font-light">
                        {news.upvotes.length}{" "}
                        {news.upvotes.length === 1 ? "upvote" : "upvotes"}
                      </Text>
                    </View>
                  </View>
                </View>
              )}

              {/* Body */}
              <Text
                className={`${
                  isDarkMode ? "text-grayNeutral" : "text-extraLightGray"
                } text-[18px]  font-bold`}
              >
                {news.title}
              </Text>
              <View className="">
                <Text
                  className={`${
                    isDarkMode ? "text-white" : "text-extraLightGray"
                  }  font-light leading-6 pt-2 text-base`}
                >
                  {news.content.slice(0, 175)}...
                </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate("NewsDetails", { news })}
                >
                  <Text
                    className={`${
                      isDarkMode
                        ? "text-primaryColorTheme"
                        : "text-primaryColor"
                    } pt-1 pb-2 font-semibold text-base`}
                  >
                    Read More
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Footer */}
              <View className="flex-row justify-between items-center">
                <View className="flex-row gap-1">
                  <Text className="text-gray50 text-base">{news.category}</Text>
                  <Text className="text-gray50 text-base">|</Text>
                  <Text className="text-gray50 text-base">
                    {news.readTime}{" "}
                    {news.readTime === 1 ? "min read" : "mins read"}
                  </Text>
                </View>
                {loading ? (
                  <Text className="text-darkNeutral dark:text-gray100">
                    ...
                  </Text>
                ) : (
                  <>
                    {location === "saved" ? (
                      <TouchableOpacity
                        onPress={() => saveNews(news, "unsave")}
                      >
                        <Octicons
                          name="bookmark-slash"
                          size={20}
                          color={isDarkMode ? COLORS.gray100 : COLORS.grayText}
                        />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity onPress={() => saveNews(news, "save")}>
                        <MaterialCommunityIcons
                          name="bookmark-multiple-outline"
                          size={20}
                          color={isDarkMode ? COLORS.gray100 : COLORS.grayText}
                        />
                      </TouchableOpacity>
                    )}
                  </>
                )}
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
}
