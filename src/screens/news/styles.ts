import { Platform, StyleSheet } from "react-native";
import { COLORS } from "../../common/colors";

export const styles = StyleSheet.create({
  noComments: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noCommentsHeadingText: {
    fontSize: 24,
    fontWeight: "700",
    paddingTop: 10,
  },
  noCommentsSubText: {
    paddingTop: 10,
    fontSize: 16,
  },
  addCommentwrap: {
    paddingHorizontal: 10,
    marginBottom: 30,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  //   adjustedHeight: {
  //     marginBottom: Platform.OS === "ios" ? 350 : 20,
  //   },
  input: {
    flex: 2,
    paddingHorizontal: 15,
    fontSize: 15,
  },
  activeText: {
    fontWeight: "700",
    fontSize: 17,
  },
  disabledtext: {
    color: COLORS.authDark,
    fontWeight: "600",
    fontSize: 17,
  },
  commentsWrap: {
    paddingTop: 10,
    paddingHorizontal: 10,
    paddingBottom: 15,
  },
  commentsContent: {
    flexDirection: "row",
    gap: 10,
  },
  topSec: {
    flexDirection: "row",
    gap: 5,
  },
  authorNames: {
    fontSize: 14,
  },
  comment: {
    paddingTop: 6,
    fontSize: 16,
  },
  replyingTo: {
    paddingVertical: 2,
    color: COLORS.grayNeutral,
    textAlign: "center",
  },
  avatarStyle: {
    height: 30,
    width: 30,
    borderRadius: 50,
    backgroundColor: COLORS.primaryColorTheme,
  },
});
