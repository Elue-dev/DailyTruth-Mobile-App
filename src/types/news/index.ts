import { Dispatch, SetStateAction } from "react";
import { AlertArgs } from "../alert";
import { Timestamp } from "firebase/firestore";

export interface News {
  id: string;
  title: string;
  image?: string;
  content: string;
  category: string;
  readTime: number;
  date: Timestamp;
  isVerified: boolean;
  upvotes: string[];
  sources: string[];
}
export interface SavedNews {
  id: string;
  title: string;
  image?: string;
  content: string;
  category: string;
  readTime: number;
  date: Timestamp;
  isVerified: boolean;
  upvotes: number;
  sources: string[];
  userID: string;
}

export interface SearchNews {
  location?: string;
  newsFromComponent?: News[];
  setNewsData: Dispatch<SetStateAction<News[] | undefined>>;
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  searchInitiated: boolean;
  setSearchIntiated: Dispatch<SetStateAction<boolean>>;
}

export interface NewsFilter {
  selectedOption: string;
  selectedInterest: string;
  dataToUse: News[];
  setDataToUse: Dispatch<SetStateAction<News[]>>;
  toggleBottomSheet: () => void;
  toggleOverlay: () => void;
}

export interface VerificationStartProps {
  newsData: News[];
  nextStep: () => void;
  keyword: string;
  setKeyword: Dispatch<SetStateAction<string>>;
  setVerificationResults: Dispatch<SetStateAction<News[]>>;
}

export interface VerificationResultsProps {
  prevStep: () => void;
  keyword: string;
  setKeyword: Dispatch<SetStateAction<string>>;
  verificationResults: News[];
  setVerificationResults: Dispatch<SetStateAction<News[]>>;
}
