import { useMemo, useRef, useState } from "react";
import { View, Text, TouchableOpacity, Pressable } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import {
  MaterialCommunityIcons,
  AntDesign,
  SimpleLineIcons,
  Ionicons,
} from "@expo/vector-icons";
import { useSheet } from "../../context/bottom_sheet/BottomSheetContext";
import { styles } from "./style";
import { COLORS } from "../../common/colors";
import { useModal } from "../../context/modal/ModalCotext";
import {
  Timestamp,
  addDoc,
  collection,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { database } from "../../lib/firebase";
import { useAlert } from "../../context/alert/AlertContext";
import { useAuth } from "../../context/auth/AuthContext";
import { BottomSheetTwoProps } from "../../types/bottom_sheet";

export default function BottomSheetTwo({ currentNews }: BottomSheetTwoProps) {
  const [loading, setLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const { isDarkMode, toggleBottomSheet, toggleOverlay } = useSheet();
  const { showModalAndContent } = useModal();
  const { showAlertAndContent, closeAlert } = useAlert();
  const {
    state: { user },
  } = useAuth();
  const SheetRef = useRef(null);
  const snapPoints = useMemo(() => ["45"], []);
  const borderTouse = isDarkMode ? " border-b-[0.4px]" : " border-b-[1px]";

  function handleBottomSheetActions() {
    toggleBottomSheet();
    toggleOverlay();
  }

  function flagNews() {
    closeAlert();

    if (user?.isDeactivated) {
      showAlertAndContent({
        type: "error",
        message:
          "Your account is currently deactivated. Reactivate your account to continue",
      });
      handleBottomSheetActions();
      return;
    }

    showModalAndContent({
      title: "You are about to flag this News",
      message:
        "This will put this news up for further verification and might be removed from this platform if proven false",
      actionBtnText: "Flag News",
      action: "Flag",
    });
  }

  async function reactToNews(action: string) {
    closeAlert();

    if (!user) {
      showAlertAndContent({
        type: "error",
        message: `You must be logged in ${
          action === "upvote" ? "upvote" : "down vote"
        } this news `,
      });
      handleBottomSheetActions();
      return;
    }

    if (user?.isDeactivated) {
      showAlertAndContent({
        type: "error",
        message:
          "Your account is currently deactivated. Reactivate your account to continue",
      });
      handleBottomSheetActions();
      return;
    }

    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(database, "news"));
      const newsDoc = querySnapshot.docs.find(
        (doc) => doc.data().id === currentNews.id
      );

      if (newsDoc) {
        const docRef = doc(database, "news", newsDoc.id);
        const upvotes = newsDoc.data().upvotes;
        const downvotes = newsDoc.data().downvotes;
        if (action === "upvote" && upvotes.includes(user?.id)) {
          setLoading(false);
          toggleBottomSheet();
          showAlertAndContent({
            type: "info",
            message: "News already upvoted by you",
          });
          return;
        }
        if (action === "downvote" && downvotes.includes(user?.id)) {
          setLoading(false);
          toggleBottomSheet();
          showAlertAndContent({
            type: "info",
            message: "News already downvoted by you",
          });
          return;
        }

        if (action === "upvote") {
          const filteredDownvotes = downvotes.filter(
            (downvote: string) => downvote !== user?.id
          );
          await updateDoc(docRef, {
            upvotes: [...upvotes, user?.id],
            downvotes: filteredDownvotes,
            updatedAt: Timestamp.now().toDate(),
          });
        } else {
          const filteredUpvotes = upvotes.filter(
            (upvote: string) => upvote !== user?.id
          );
          await updateDoc(docRef, {
            upvotes: filteredUpvotes,
            downvotes: [...downvotes, user?.id],
            updatedAt: Timestamp.now().toDate(),
          });
        }
        setLoading(false);
        toggleBottomSheet();
        showAlertAndContent({
          type: "success",
          message: action === "upvote" ? "News upvoted" : "News Downvoted",
        });
      } else {
        setLoading(false);
        showAlertAndContent({
          type: "error",
          message: "News document not found",
        });
      }
    } catch (error) {
      toggleBottomSheet();
      setLoading(false);
      showAlertAndContent({
        type: "error",
        message: "Something went wrong. Please try again",
      });
    }
  }

  async function saveNews() {
    closeAlert();
    if (!user) {
      return showAlertAndContent({
        type: "error",
        message: "You must be logged in to saved this news",
      });
    }

    if (user?.isDeactivated) {
      showAlertAndContent({
        type: "error",
        message:
          "Your account is currently deactivated. Reactivate your account to continue",
      });
      handleBottomSheetActions();
      return;
    }

    setSaveLoading(true);
    const querySnapshot = await getDocs(collection(database, "saved"));
    const savedDoc = querySnapshot.docs.find(
      (doc) => doc.data().id === currentNews.id
    );

    if (savedDoc?.data()) {
      setSaveLoading(false);
      toggleBottomSheet();
      showAlertAndContent({
        type: "error",
        message: "You have previously saved this post",
      });
      return;
    }

    try {
      const newsWithUserID = {
        ...currentNews,
        userID: user?.id,
      };
      const collectionRef = collection(database, "saved");
      await addDoc(collectionRef, newsWithUserID);
      setSaveLoading(false);
      showAlertAndContent({
        type: "success",
        message: "News saved",
      });
    } catch (error) {
      setSaveLoading(false);
      showAlertAndContent({
        type: "error",
        message: "Something went wrong. Please try again",
      });
    }
  }

  return (
    <BottomSheet
      ref={SheetRef}
      snapPoints={snapPoints}
      enablePanDownToClose={false}
      handleComponent={() => null}
      onClose={handleBottomSheetActions}
      backgroundStyle={{ borderRadius: 20 }}
    >
      <BottomSheetView style={{ paddingBottom: 0 }}>
        <View
          style={[
            styles.bottomSheetWrap,
            isDarkMode && { backgroundColor: COLORS.darkNeutral },
          ]}
        >
          <TouchableOpacity
            onPress={handleBottomSheetActions}
            className="flex-row items-end justify-end mb-6"
          >
            <AntDesign name="closecircle" size={24} color={COLORS.gray50} />
          </TouchableOpacity>

          {loading ? (
            <View
              className={`flex-row justify-start items-center pb-4 border-grayNeutral pt-4 gap-3 ${borderTouse}`}
            >
              <SimpleLineIcons
                name="like"
                size={20}
                color={isDarkMode ? COLORS.gray300 : COLORS.extraLightGray}
              />
              <Text
                className={`${
                  isDarkMode ? "text-gray300" : "text-extraLightGray"
                }  text-[19px]  font-normal`}
              >
                ...
              </Text>
            </View>
          ) : (
            <TouchableOpacity
              onPress={() => reactToNews("upvote")}
              className={`flex-row justify-start items-center pb-4 border-grayNeutral mt-3 gap-3 ${borderTouse}`}
            >
              <SimpleLineIcons
                name="like"
                size={20}
                color={isDarkMode ? COLORS.gray300 : COLORS.extraLightGray}
              />
              <Text
                className={`${
                  isDarkMode ? "text-gray300" : "text-extraLightGray"
                }  text-[19px]  font-normal`}
              >
                Upvote
              </Text>
            </TouchableOpacity>
          )}

          {loading ? (
            <View
              className={`flex-row justify-start items-center pb-4 border-grayNeutral pt-4 gap-3 ${borderTouse}`}
            >
              <SimpleLineIcons
                name="dislike"
                size={20}
                color={isDarkMode ? COLORS.gray300 : COLORS.extraLightGray}
              />
              <Text
                className={`${
                  isDarkMode ? "text-gray300" : "text-extraLightGray"
                }  text-[19px]  font-normal`}
              >
                ...
              </Text>
            </View>
          ) : (
            <TouchableOpacity
              onPress={() => reactToNews("downvote")}
              className={`flex-row justify-start items-center pb-4 border-grayNeutral pt-4 gap-3 ${borderTouse}`}
            >
              <SimpleLineIcons
                name="dislike"
                size={20}
                color={isDarkMode ? COLORS.gray300 : COLORS.extraLightGray}
              />
              <Text
                className={`${
                  isDarkMode ? "text-gray300" : "text-extraLightGray"
                }  text-[19px]  font-normal`}
              >
                Show less of this
              </Text>
            </TouchableOpacity>
          )}

          {saveLoading ? (
            <Pressable
              className={`flex-row justify-start items-center pb-4 border-grayNeutral pt-4 gap-3 ${borderTouse}`}
            >
              <MaterialCommunityIcons
                name="bookmark-multiple-outline"
                size={25}
                color={isDarkMode ? COLORS.gray300 : COLORS.extraLightGray}
              />
              <Text
                className={`${
                  isDarkMode ? "text-gray300" : "text-extraLightGray"
                }  text-[19px]  font-normal`}
              >
                ...
              </Text>
            </Pressable>
          ) : (
            <TouchableOpacity
              onPress={saveNews}
              className={`flex-row justify-start items-center pb-4 border-grayNeutral pt-4 gap-3 ${borderTouse}`}
            >
              <MaterialCommunityIcons
                name="bookmark-multiple-outline"
                size={25}
                color={isDarkMode ? COLORS.gray300 : COLORS.extraLightGray}
              />
              <Text
                className={`${
                  isDarkMode ? "text-gray300" : "text-extraLightGray"
                }  text-[19px]  font-normal`}
              >
                Save
              </Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            onPress={flagNews}
            className={`flex-row justify-start items-center pb-4 border-grayNeutral pt-4 gap-3 ${borderTouse}`}
          >
            <Ionicons
              name="md-flag-outline"
              size={25}
              color={isDarkMode ? COLORS.gray300 : COLORS.extraLightGray}
            />
            <Text
              className={`${
                isDarkMode ? "text-gray300" : "text-extraLightGray"
              }  text-[19px]  font-normal`}
            >
              Flag News
            </Text>
          </TouchableOpacity>
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
}
