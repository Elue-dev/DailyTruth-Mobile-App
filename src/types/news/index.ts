import { Dispatch, SetStateAction } from "react";
import { AlertArgs } from "../alert";

export interface News {
  id: string;
  title: string;
  image?: string;
  content: string;
  category: string;
  readTime: number;
  date: string;
  isVerified: boolean;
  upvotes: number;
  sources: string[];
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
  newsData: News[];
  setDataToUse: Dispatch<SetStateAction<News[]>>;
  toggleBottomSheet: () => void;
  toggleOverlay: () => void;
  showAlertAndContent: ({ type, message }: AlertArgs) => void;
}
