import {
  View,
  Text,
  ScrollView,
  Platform,
  TouchableOpacity,
  Keyboard,
  ActivityIndicator,
  KeyboardAvoidingView,
} from "react-native";
import { useLayoutEffect, useState } from "react";
import { StepTwoProps } from "../../../types/news";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useSheet } from "../../../context/bottom_sheet/BottomSheetContext";
import { COLORS } from "../../../common/colors";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { interests } from "../../../data/interests";
import {
  actions,
  RichEditor,
  RichToolbar,
} from "react-native-pell-rich-editor";
import { styles } from "./styles";
import { useAlert } from "../../../context/alert/AlertContext";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { database, storage } from "../../../lib/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useAuth } from "../../../context/auth/AuthContext";

export default function StepTwo({
  values,
  verificationStatus,
  setVerificationStatus,
  image,
  setImage,
  category,
  setCategory,
  previousStep,
  content,
  setContent,
  richText,
  setValues,
  resetFields,
}: StepTwoProps) {
  const navigation = useNavigation<NavigationProp<any>>();
  const { isDarkMode } = useSheet();

  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<any>(0);
  const { showAlertAndContent } = useAlert();
  const { title, readTime } = values;
  const { setCurrRoute } = useAuth();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Text className="font-semibold text-[18px] text-primaryColorSec dark:text-gray300">
          Add News
        </Text>
      ),

      headerLeft: () =>
        Platform.OS === "ios" ? (
          <TouchableOpacity onPress={previousStep} className="mx-3">
            <Ionicons
              name="arrow-back-circle"
              size={29}
              color={COLORS.gray200}
            />
          </TouchableOpacity>
        ) : null,

      headerRight: () => (
        <TouchableOpacity
          className="mr-3"
          onPress={() => {
            resetFields();
            Keyboard.dismiss();
          }}
        >
          <Text className="text-darkNeutral dark:text-lightText text-base">
            Reset
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [isDarkMode]);

  async function uploadImageToStorage(): Promise<string> {
    try {
      const response = await fetch(image!);
      const blob = await response.blob();

      const storageRef = ref(storage, `DailTruth/News/${new Date().getTime()}`);
      const uploadTask = uploadBytesResumable(storageRef, blob);

      return new Promise<string>((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setUploadProgress(progress.toFixed());
          },
          (error) => {
            reject(error);
            return showAlertAndContent({
              type: "error",
              message:
                "Something went wrong with uploading your image. Please try again",
            });
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      });
    } catch (error) {
      console.log({ error });

      showAlertAndContent({
        type: "error",
        message: "Something went wrong. Please try again",
      });
      throw error;
    }
  }

  async function addNews() {
    Keyboard.dismiss();

    if (!category)
      return showAlertAndContent({
        type: "error",
        message: "Please specify news category",
      });

    if (!content)
      return showAlertAndContent({
        type: "error",
        message: "Please specify news content",
      });
    try {
      setLoading(true);
      let imageUrl;
      if (image) imageUrl = await uploadImageToStorage();
      const collectionRef = collection(database, "news");

      const data = {
        title,
        content,
        category,
        image: imageUrl || "",
        readTime,
        isVerified: verificationStatus === "Unverified" ? false : true,
        upvotes: [],
        date: serverTimestamp(),
      };
      await addDoc(collectionRef, data);
      showAlertAndContent({
        type: "success",
        message: "News added",
      });

      navigation.navigate("TabStack", { screen: "News" });
      resetFields();
      setCurrRoute("News");
      setLoading(false);
    } catch (error: any) {
      console.log({ error: error.message });
      setLoading(false);
    }
  }

  return (
    <ScrollView
      className="flex-1 bg-white dark:bg-darkNeutral"
      showsVerticalScrollIndicator={false}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        {/* CATEGORY PICKER */}
        <Picker
          selectedValue={category}
          onValueChange={(itemValue) => setCategory(itemValue)}
        >
          <Picker.Item
            label="Select news category"
            value=""
            color={isDarkMode ? COLORS.lightGray : COLORS.darkNeutral}
            enabled={false}
          />
          {interests.map((interest) => (
            <Picker.Item
              label={interest}
              value={interest}
              key={interest}
              color={isDarkMode ? COLORS.lightGray : COLORS.darkNeutral}
            />
          ))}
        </Picker>

        {/* VERIFICATION */}
        <View className="mt-4">
          <Text className="text-[20px] text-darkNeutral dark:text-lightText text-center mb-3">
            Choose verification status
          </Text>

          <View className="flex-row justify-around items-center gap-4 mb-5">
            <View className="flex-row items-center gap-1">
              <TouchableOpacity
                onPress={() => setVerificationStatus("Unverified")}
              >
                {verificationStatus === "Unverified" ? (
                  <Ionicons
                    name="ios-radio-button-on-sharp"
                    size={24}
                    color={
                      isDarkMode
                        ? COLORS.primaryColorTheme
                        : COLORS.primaryColor
                    }
                  />
                ) : (
                  <Ionicons
                    name="radio-button-off"
                    size={24}
                    color={COLORS.extraLightGray}
                  />
                )}
              </TouchableOpacity>

              <Text className="text-[18px] text-darkNeutral dark:text-lightText">
                Unverified
              </Text>
            </View>

            <View className="flex-row items-center gap-1">
              <TouchableOpacity
                onPress={() => setVerificationStatus("Verified")}
              >
                {verificationStatus === "Verified" ? (
                  <Ionicons
                    name="ios-radio-button-on-sharp"
                    size={24}
                    color={
                      isDarkMode
                        ? COLORS.primaryColorTheme
                        : COLORS.primaryColor
                    }
                  />
                ) : (
                  <Ionicons
                    name="radio-button-off"
                    size={24}
                    color={COLORS.extraLightGray}
                  />
                )}
              </TouchableOpacity>
              <Text className="text-[18px] text-darkNeutral dark:text-lightText">
                Verified
              </Text>
            </View>
          </View>
        </View>

        {/* EDITOR */}
        <View className="mx-2">
          <View className="flex-col-reverse w-full mb-2 ">
            <RichEditor
              ref={richText}
              initialContentHTML={content}
              onChange={(val) => setContent(val)}
              placeholder="Add news content..."
              style={styles.richTextEditorStyle}
              className="border-authDark dark:border-lightText"
              hideKeyboardAccessoryView={true}
              collapsable={true}
              initialHeight={250}
              editorStyle={{
                backgroundColor: isDarkMode ? COLORS.darkNeutral : "#fff",
                color: isDarkMode ? "#fff" : COLORS.darkNeutral,
              }}
              onBlur={() => {
                Keyboard.dismiss();
              }}
            />

            <RichToolbar
              editor={richText}
              selectedIconTint="#873c1e"
              iconTint="#222"
              actions={[
                actions.setBold,
                actions.setItalic,
                actions.insertBulletsList,
                actions.insertOrderedList,
                actions.insertLink,
                actions.setStrikethrough,
                actions.setUnderline,
              ]}
              style={styles.richTextToolbarStyle}
            />
          </View>
        </View>

        {/* BUTTON */}
        <View className="justify-end items-end mt-2 mx-2">
          {loading ? (
            <TouchableOpacity className="bg-primaryColorLighter py-3 rounded-md w-full">
              <ActivityIndicator color={"#fff"} size="small" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={addNews}
              className="bg-primaryColor dark:bg-primaryColorTheme py-3 rounded-md w-full mb-4"
            >
              <Text className="text-white font-semibold text-center text-xl">
                Add News
              </Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            className="mr-3 mb-16"
            onPress={() => Keyboard.dismiss()}
          >
            <Text className="text-darkNeutral dark:text-lightText text-base">
              Close keyboard
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}
