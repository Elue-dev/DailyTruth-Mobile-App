import { useLayoutEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import {
  actions,
  RichEditor,
  RichToolbar,
} from "react-native-pell-rich-editor";
import { COLORS } from "../../common/colors";
import { useSheet } from "../../context/bottom_sheet/BottomSheetContext";
import * as ImagePicker from "expo-image-picker";
import { Image } from "react-native";
import { styles } from "./styles";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { database, storage } from "../../lib/firebase";
import { interests } from "../../data/interests";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useAlert } from "../../context/alert/AlertContext";

export default function AddNews() {
  const richText = useRef<any>();
  const [title, setTitle] = useState("");
  const [readTime, setReadTime] = useState("");
  const [descHTML, setDescHTML] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [showDescError, setShowDescError] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState("Unverified");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<any>(0);
  const { showAlertAndContent } = useAlert();

  const { isDarkMode } = useSheet();
  const navigation = useNavigation<NavigationProp<any>>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Text className="font-semibold text-[18px] text-primaryColorSec dark:text-gray300">
          Add News
        </Text>
      ),
    });
  }, [isDarkMode]);

  const richTextHandle = (descriptionText: string) => {
    if (descriptionText) {
      setShowDescError(false);
      setDescHTML(descriptionText);
    } else {
      setShowDescError(true);
      setDescHTML("");
    }
  };

  async function pickImageAsync() {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) setImage(result.assets[0].uri);
  }

  const submitContentHandle = () => {
    const replaceHTML = descHTML.replace(/<(.|\n)*?>/g, "").trim();
    const replaceWhiteSpace = replaceHTML.replace(/&nbsp;/g, "").trim();

    console.log({ replaceWhiteSpace });

    if (replaceWhiteSpace.length <= 0) {
      setShowDescError(true);
    } else {
      // send data to your server!
    }
  };

  //   <TouchableOpacity onPress={() => Keyboard.dismiss()}>
  //   <Text className="text-white">Close</Text>
  // </TouchableOpacity>

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
    setLoading(true);
    try {
      const imageUrl = await uploadImageToStorage();
      const collectionRef = collection(database, "news");

      const data = {
        title,
        content: descHTML,
        category,
        image: imageUrl,
        readTime,
        isVerified: verificationStatus === "Unverified" ? false : true,
        upvotes: 0,
        date: serverTimestamp(),
      };
      await addDoc(collectionRef, data);
      showAlertAndContent({
        type: "success",
        message: "News added",
      });
      navigation.navigate("TabStack");
      setLoading(false);
    } catch (error) {
      console.log({ error });
      setLoading(false);
    }
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => Keyboard.dismiss()}
      className="pb-20"
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          className="flex-1 bg-white dark:bg-darkNeutral"
          keyboardShouldPersistTaps="handled"
        >
          {/* TITLE */}
          <View
            className={`mt-8 px-3 pb-4 mb-4 mx-2 shadow-sm rounded-lg flex-row justify-between items-center border-gray300 dark:border-gray200 ${
              Platform.OS === "android" ? "border-4 dark:border" : "border"
            }`}
            style={{
              elevation: 1,
              backgroundColor: isDarkMode ? "transparent" : "#FFF",
            }}
          >
            <TextInput
              value={title}
              onChangeText={(value) => setTitle(value)}
              className="text-base mt-2 text-darkNeutral dark:text-grayNeutral w-[90%]"
              placeholder="Enter news title"
              placeholderTextColor={isDarkMode ? "white" : COLORS.grayText}
              selectionColor={
                isDarkMode ? COLORS.primaryColorTheme : COLORS.primaryColor
              }
            />
          </View>
          {/* READ TIME */}
          <View
            className={`px-3 pb-4 mx-2 shadow-sm rounded-lg flex-row justify-between items-center border-gray300 dark:border-gray200 ${
              Platform.OS === "android" ? "border-4 dark:border" : "border"
            }`}
            style={{
              elevation: 1,
              backgroundColor: isDarkMode ? "transparent" : "#FFF",
            }}
          >
            <TextInput
              value={readTime}
              onChangeText={(value) => setReadTime(value)}
              keyboardType="numeric"
              className="text-base mt-2 text-darkNeutral dark:text-grayNeutral w-[90%]"
              placeholder="Enter read time"
              placeholderTextColor={isDarkMode ? "white" : COLORS.grayText}
              selectionColor={
                isDarkMode ? COLORS.primaryColorTheme : COLORS.primaryColor
              }
            />
          </View>

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

          {/* IMAGE */}
          <View className="mx-2">
            <TouchableOpacity onPress={pickImageAsync}>
              <View
                style={styles.imgWrap}
                className="border-lightBorder dark:border-lightText"
              >
                {image ? (
                  <Image
                    source={{ uri: image }}
                    style={{
                      height: "100%",
                      width: "100%",
                      resizeMode: "cover",
                    }}
                  />
                ) : (
                  <View style={styles.textWrap}>
                    <View className="flex-row items-center gap-1">
                      <Ionicons
                        name="ios-image-outline"
                        size={30}
                        color={
                          isDarkMode
                            ? COLORS.primaryColorTheme
                            : COLORS.primaryColor
                        }
                      />
                      <Text className="text-primaryColor dark:text-primaryColorTheme text-[20px]">
                        {" "}
                        Click to add image
                      </Text>
                    </View>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          </View>

          {/* VERIFICATION */}
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

                <Text className="text-[20px] text-darkNeutral dark:text-lightText">
                  Unverified
                </Text>
              </TouchableOpacity>
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

                <Text className="text-[20px] text-darkNeutral dark:text-lightText">
                  Verified
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* EDITOR */}
          <View className="mx-2">
            <View className="flex-col-reverse w-full mb-2 ">
              <RichEditor
                ref={richText}
                onChange={richTextHandle}
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
                  console.log("BLURRED");
                }}
                onFocus={() => console.log("FOC")}
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
          <View className="justify-end items-end mt-2 mx-2 pb-20">
            {loading ? (
              <TouchableOpacity className="bg-primaryColorLighter py-3 rounded-md">
                <ActivityIndicator color={"#fff"} size="small" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={addNews}
                className="bg-primaryColor dark:bg-primaryColorTheme py-3 rounded-md w-full"
              >
                <Text className="text-white font-semibold text-center text-xl">
                  Add News
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
