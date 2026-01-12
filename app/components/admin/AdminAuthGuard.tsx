"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../lib/firebase";
import { ShieldAlert } from "lucide-react";

interface AdminAuthGuardProps {
  children: React.ReactNode;
}

export default function AdminAuthGuard({ children }: AdminAuthGuardProps) {
  const router = useRouter();
  // auth/dbが存在しない場合は最初からローディング完了とする
  const [isLoading, setIsLoading] = useState(Boolean(auth && db));
  const [isAdmin, setIsAdmin] = useState(false);
  const [accessDenied, setAccessDenied] = useState(false);

  useEffect(() => {
    if (!auth || !db) {
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        // ログインしていない場合はログインページへリダイレクト
        router.push("/login?redirect=/admin/news");
        setIsLoading(false);
        return;
      }

      if (!db) {
        setIsLoading(false);
        return;
      }

      try {
        // Firestoreからユーザー情報を取得
        const userDoc = await getDoc(doc(db, "users", user.uid));

        if (userDoc.exists()) {
          const userData = userDoc.data();

          // 管理者権限チェック
          if (userData.role === "admin") {
            setIsAdmin(true);
            setAccessDenied(false);
          } else {
            setIsAdmin(false);
            setAccessDenied(true);
          }
        } else {
          // ユーザードキュメントが存在しない場合はアクセス拒否
          setIsAdmin(false);
          setAccessDenied(true);
        }
      } catch (error) {
        console.error("Error checking admin status:", error);
        setIsAdmin(false);
        setAccessDenied(true);
      }

      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">認証を確認中...</p>
        </div>
      </div>
    );
  }

  if (accessDenied) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center p-8">
          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-8">
            <ShieldAlert className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              アクセス権限がありません
            </h1>
            <p className="text-gray-600 mb-6">
              この管理画面にアクセスするには管理者権限が必要です。
            </p>
            <button
              onClick={() => router.push("/")}
              className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors"
            >
              トップページに戻る
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return <>{children}</>;
}
