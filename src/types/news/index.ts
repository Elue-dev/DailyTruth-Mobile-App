import { Dispatch, SetStateAction } from "react";

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
