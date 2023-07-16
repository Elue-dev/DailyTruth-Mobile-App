import { View, Text } from "react-native";
import React, { useState } from "react";
import UserCredentials from "../../components/auth/UserCredentials";
import UserInterests from "../../components/auth/UserInterests";
import { Credentials } from "../../types/auth";
import {
  NavigationProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";

const initiaCredentials: Credentials = {
  username: "",
  email: "",
  password: "",
};

export default function AuthSequence() {
  const navigation = useNavigation<NavigationProp<any>>();
  const params: any = useRoute().params;
  const [authStep, setAuthStep] = useState("credentials");
  const [credentials, setCredentials] = useState(initiaCredentials);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [paramsPassed] = useState<string | boolean>(params?.state || false);

  function nextStep() {
    setAuthStep("interests");
  }

  function prevStep() {
    setAuthStep("credentials");
  }

  function handleTextChange(name: string, text: string) {
    setCredentials({ ...credentials, [name]: text });
  }

  switch (authStep) {
    case "credentials":
      return (
        <UserCredentials
          nextStep={nextStep}
          prevStep={prevStep}
          paramsPassed={paramsPassed}
          initiaCredentials={initiaCredentials}
          credentials={credentials}
          setCredentials={setCredentials}
          handleTextChange={handleTextChange}
        />
      );
    case "interests":
      return (
        <UserInterests
          prevStep={prevStep}
          initiaCredentials={initiaCredentials}
          credentials={credentials}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
        />
      );
    default:
      return null;
  }
}
