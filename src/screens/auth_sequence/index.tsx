import React, { useState } from "react";
import UserCredentials from "../../components/auth/UserCredentials";
import UserInterests from "../../components/auth/UserInterests";
import { Credentials } from "../../types/auth";
import { useRoute } from "@react-navigation/native";

const initiaCredentials: Credentials = {
  username: "",
  email: "",
  password: "",
};

interface PageParams {
  state: string;
}

export default function AuthSequence() {
  const { state } = useRoute().params as PageParams;
  const [authStep, setAuthStep] = useState("credentials");
  const [credentials, setCredentials] = useState(initiaCredentials);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

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
          paramsPassed={state}
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
