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
