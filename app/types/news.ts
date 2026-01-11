import { Timestamp } from "firebase/firestore";

export type NewsCategory = "お知らせ" | "イベント" | "採用" | "メディア";
export type ImageLayout = "single" | "grid-2" | "grid-3" | "slider";

export interface NewsImage {
  url: string;
  alt: string;
  caption?: string;
}

export interface News {
  id: string;
  title: string;
  category: NewsCategory;
  summary: string;
  content: string;
  images: NewsImage[];
  imageLayout: ImageLayout;
  date: string; // "2026.01.08" format
  published: boolean;
  createdAt: Timestamp | null;
  updatedAt: Timestamp | null;
}

export interface NewsFormData {
  title: string;
  category: NewsCategory;
  summary: string;
  content: string;
  images: NewsImage[];
  imageLayout: ImageLayout;
  date: string;
  published: boolean;
}
