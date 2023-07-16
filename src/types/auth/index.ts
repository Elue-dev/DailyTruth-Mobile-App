import { Dispatch, SetStateAction } from "react";

export interface Credentials {
  username: string;
  email: string;
  password: string;
}

export interface UserCredentialsProps {
  initiaCredentials: Credentials;
  credentials: Credentials;
  paramsPassed: string | boolean;
  setCredentials: Dispatch<SetStateAction<UserCredentialsProps["credentials"]>>;
  handleTextChange: (name: string, text: string) => void;
  prevStep: () => void;
  nextStep: () => void;
}

export interface UserInterestsProps {
  initiaCredentials: Credentials;
  credentials: Credentials;
  selectedCategories: string[];
  setSelectedCategories: Dispatch<SetStateAction<string[]>>;
  prevStep: () => void;
}
