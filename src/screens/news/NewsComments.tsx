import {
  Text,
  ScrollView,
  Platform,
  View,
  Image,
  TextInput,
} from "react-native";
import React, { useLayoutEffect, useRef, useState } from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../types/navigation";
import { useSheet } from "../../context/bottom_sheet/BottomSheetContext";
import { TouchableOpacity } from "react-native-gesture-handler";
import { COLORS } from "../../common/colors";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles";
import { useAuth } from "../../context/auth/AuthContext";
import { DEFAULT_AVATAR } from "../../utils";

export default function NewsComments() {
  const [showInput, setShowInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [comment, setComment] = useState("");
  const [heightAdjust, setHeightAdjust] = useState(false);
  const inputRef = useRef<any>();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { isDarkMode } = useSheet();
  const {
    state: { user },
  } = useAuth();

  const handleInputFocus = () => {
    setHeightAdjust(true);
  };

  const handleInputBlur = () => {
    setIsReplying(false);
    setHeightAdjust(false);
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Text
          className={`${
            isDarkMode ? "text-gray300" : "text-primaryColorSec"
          }  font-semibold text-[18px]`}
        >
          Comments
        </Text>
      ),

      headerLeft: () =>
        Platform.OS === "ios" ? (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons
              name="arrow-back-circle"
              size={29}
              color={COLORS.gray200}
            />
          </TouchableOpacity>
        ) : null,
    });
  }, [isDarkMode]);

  return (
    <ScrollView
      className="flex-1 bg-white dark:bg-darkNeutral"
      showsVerticalScrollIndicator={false}
    >
      <View className="justify-center items-center pt-64 flex-1">
        <Text className="text-[24px] font-bold pt-3 text-darkNeutral dark:text-lightGray">
          No comments yet
        </Text>
        <Text className="pt-3 text-[16px] text-darkNeutral dark:text-lightGray">
          Be the first to add a comment to this news
        </Text>
      </View>

      {/* <View>
        {!showInput && (
          <View className="border-t-2 border-t-x-dark dark:border-t-neutral-700">
            {isReplying && (
              <View style={{ marginHorizontal: 10 }}>
                <Text style={styles.replyingTo}>Replying to user</Text>
              </View>
            )}
            <View
              style={[
                styles.addCommentwrap,
                heightAdjust && Platform.OS === "ios"
                  ? { marginBottom: 20 }
                  : null,
              ]}
            >
              <Image
                source={{ uri: user?.avatar || DEFAULT_AVATAR }}
                style={styles.avatarStyle}
              />
              <TextInput
                ref={inputRef}
                style={styles.input}
                className="text-grayNeutral dark:text-lightText"
                value={comment}
                onChangeText={(newComment) => setComment(newComment)}
                placeholder="Add a comment..."
                placeholderTextColor="#888"
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
              />

              {comment.length === 0 ? (
                <Text style={styles.disabledtext}>Send</Text>
              ) : loading ? (
                <Text style={styles.disabledtext}>Sending...</Text>
              ) : (
                <>
                  {!loading && (
                    <TouchableOpacity>
                      <Text
                        style={styles.activeText}
                        className="text-primaryColor dark:text-primaryColorTheme"
                      >
                        Send
                      </Text>
                    </TouchableOpacity>
                  )}
                </>
              )}
            </View>
          </View>
        )}
      </View> */}
    </ScrollView>
  );
}
