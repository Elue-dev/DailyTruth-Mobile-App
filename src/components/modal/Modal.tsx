import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useSheet } from "../../context/bottom_sheet/BottomSheetContext";
import { useModal } from "../../context/modal/ModalCotext";
import { useAlert } from "../../context/alert/AlertContext";

export default function Modal() {
  const { width } = Dimensions.get("window");
  const { isDarkMode } = useSheet();
  const { showModal, closeModal, title, message, actionBtnText } = useModal();
  const { showAlertAndContent } = useAlert();

  function flagNews() {
    closeModal();
    showAlertAndContent({
      type: "success",
      message: "Your response has been noted and will be looked into",
    });
  }

  return (
    <>
      {showModal ? (
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.overlay}
            activeOpacity={1}
            onPress={closeModal}
          />
          <View
            style={[styles.alertBox, { maxWidth: width - 50 }]}
            className="bg-white dark:bg-darkNeutral"
          >
            <Text
              style={styles.title}
              className="text-darkNeutral dark:text-lightText"
            >
              {title}
            </Text>
            <Text className="text-grayText dark:text-lightGray text-base font-normal mb-4 text-center leading-6">
              {message}
            </Text>
            <View className="flex-row justify-center items-center pt-3">
              <TouchableOpacity
                onPress={closeModal}
                className="border border-1 border-lightGray mr-3 rounded-md bg-grayNeutral"
              >
                <Text
                  className={`py-2 px-10 text-center text-base  ${
                    isDarkMode ? "bg-gray300 font-bold" : "font-semibold"
                  }`}
                  style={{ color: isDarkMode ? "#4E0F12" : "#74171C" }}
                >
                  Close
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={flagNews}
                className="border border-1 border-primaryColor dark:border-primaryColorTheme mr-3 rounded-md bg-grayNeutral"
              >
                <Text
                  className={`py-2 px-10 text-center text-base  ${
                    isDarkMode
                      ? "bg-primaryColorTheme font-bold"
                      : "bg-primaryColor font-semibold"
                  }`}
                  style={{ color: "#FFF" }}
                >
                  {actionBtnText}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    zIndex: 10,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  alertBox: {
    borderRadius: 8,
    paddingVertical: 30,
    paddingHorizontal: 16,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 8,
    textAlign: "center",
  },
  message: {
    color: "#636366",
    fontSize: 16,
    marginBottom: 16,
    fontWeight: 400,
    textAlign: "center",
    lineHeight: 22,
  },
  closeButton: {
    backgroundColor: "#888",
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: "center",
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
