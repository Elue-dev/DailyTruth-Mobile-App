import { View, Text, SafeAreaView } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../types/navigation";
import { useSheet } from "../../context/bottom_sheet/BottomSheetContext";
import VerificationStart from "./VerificationStart";
import VerificationResults from "./VerificationResults";
import { News } from "../../types/news";

export default function VerifyScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { isDarkMode } = useSheet();
  const [verificationStep, setVerificationStep] = useState("start");
  const [keyword, setKeyword] = useState("");
  const [verificationResults, setVerificationResults] = useState<News[]>([]);

  function nextStep() {
    setVerificationStep("results");
  }

  function prevStep() {
    setVerificationStep("start");
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Text className="text-primaryColorSec dark:text-gray300 font-semibold text-[18px]">
          Verify
        </Text>
      ),
    });
  }, [isDarkMode]);

  switch (verificationStep) {
    case "start":
      return (
        <VerificationStart
          nextStep={nextStep}
          keyword={keyword}
          setKeyword={setKeyword}
          setVerificationResults={setVerificationResults}
        />
      );
    case "results":
      return (
        <VerificationResults
          prevStep={prevStep}
          keyword={keyword}
          setKeyword={setKeyword}
          verificationResults={verificationResults}
          setVerificationResults={setVerificationResults}
        />
      );
  }
}
