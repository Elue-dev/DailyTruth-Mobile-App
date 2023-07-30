import { Dispatch, ReactNode, SetStateAction } from "react";

export interface Credentials {
  username: string;
  email: string;
  password: string;
}

export interface UserCredentialsProps {
  initiaCredentials: Credentials;
  credentials: Credentials;
  paramsPassed: string;
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

export interface User {
  id: string;
  username: string;
  email: string;
  interests: string[];
  avatar: string;
  isDeactivated: boolean;
}

export interface AuthState {
  user: User | null;
}

export type AuthAction =
  | { type: "SET_ACTIVE_USER"; payload: User | null }
  | { type: "REMOVE_ACTIVE_USER" };

export interface AuthProviderProps {
  children: ReactNode;
}
