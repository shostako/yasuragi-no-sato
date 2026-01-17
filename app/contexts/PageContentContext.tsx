"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useAuth } from "./AuthContext";

interface PageContentContextType {
  contents: Record<string, string>;
  loading: boolean;
  updateContent: (key: string, value: string) => Promise<void>;
}

const PageContentContext = createContext<PageContentContextType | undefined>(
  undefined
);

interface PageContentProviderProps {
  pageId: string;
  children: ReactNode;
}

export function PageContentProvider({
  pageId,
  children,
}: PageContentProviderProps) {
  const [contents, setContents] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // Firestoreからページコンテンツを取得
  useEffect(() => {
    const fetchContents = async () => {
      if (!db) {
        setLoading(false);
        return;
      }

      try {
        const docRef = doc(db, "pageContents", pageId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setContents(data.contents || {});
        }
      } catch (error) {
        console.error("Error fetching page contents:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContents();
  }, [pageId]);

  // コンテンツを更新
  const updateContent = useCallback(
    async (key: string, value: string) => {
      if (!db || !user) {
        throw new Error("Database or user not available");
      }

      // ローカル状態を即時更新（楽観的更新）
      setContents((prev) => ({ ...prev, [key]: value }));

      try {
        const docRef = doc(db, "pageContents", pageId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          // 既存ドキュメントを更新
          const existingContents = docSnap.data().contents || {};
          await setDoc(docRef, {
            contents: { ...existingContents, [key]: value },
            updatedAt: serverTimestamp(),
            updatedBy: user.uid,
          });
        } else {
          // 新規ドキュメントを作成
          await setDoc(docRef, {
            contents: { [key]: value },
            updatedAt: serverTimestamp(),
            updatedBy: user.uid,
          });
        }
      } catch (error) {
        console.error("Error updating content:", error);
        // エラー時はローカル状態を元に戻す（ロールバック）
        const docRef = doc(db, "pageContents", pageId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setContents(docSnap.data().contents || {});
        }
        throw error;
      }
    },
    [pageId, user]
  );

  return (
    <PageContentContext.Provider value={{ contents, loading, updateContent }}>
      {children}
    </PageContentContext.Provider>
  );
}

export function usePageContent() {
  const context = useContext(PageContentContext);
  if (context === undefined) {
    throw new Error(
      "usePageContent must be used within a PageContentProvider"
    );
  }
  return context;
}
