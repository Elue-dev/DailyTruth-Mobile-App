import { View, Text } from "react-native";
import { VerificationResultsProps } from "../../types/news";

export default function VerificationResults({
  keyword,
  setKeyword,
  verificationResults,
  setVerificationResults,
}: VerificationResultsProps) {
  return (
    <View>
      <Text>VerificationResults</Text>
    </View>
  );
}
