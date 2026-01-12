"use client";

import { useState } from "react";
import { collection, doc, setDoc, getDoc } from "firebase/firestore";
import { db, auth } from "../../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { ShieldCheck, User } from "lucide-react";

export default function AdminSetupPage() {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    if (!auth) return;

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const makeCurrentUserAdmin = async () => {
    if (!currentUser || !db) {
      setMessage({ type: "error", text: "ログインしてください" });
      return;
    }

    try {
      const userRef = doc(db, "users", currentUser.uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        // 既存ユーザーのroleを更新
        await setDoc(userRef, { role: "admin" }, { merge: true });
      } else {
        // 新規ユーザードキュメントを作成
        await setDoc(userRef, {
          uid: currentUser.uid,
          email: currentUser.email,
          role: "admin",
          displayName: currentUser.displayName || "",
          createdAt: new Date().toISOString(),
        });
      }

      setMessage({
        type: "success",
        text: `${currentUser.email} を管理者に設定しました！`,
      });
    } catch (error) {
      console.error("Error setting admin:", error);
      setMessage({ type: "error", text: "管理者設定に失敗しました" });
    }
  };

  // 環境変数でガード（本番では無効化）
  if (process.env.NEXT_PUBLIC_ENABLE_ADMIN_SETUP !== "true") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center p-8">
          <div className="bg-white border-2 border-gray-200 rounded-lg p-8">
            <ShieldCheck className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              このページは無効化されています
            </h1>
            <p className="text-gray-600">
              管理者設定はFirebase Consoleから行ってください。
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">読み込み中...</div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center p-8">
          <div className="bg-white border-2 border-gray-200 rounded-lg p-8">
            <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              ログインが必要です
            </h1>
            <p className="text-gray-600 mb-6">
              管理者設定を行うには、まずログインしてください。
            </p>
            <a
              href="/login"
              className="inline-block bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors"
            >
              ログインページへ
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto p-6 pt-20">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center gap-3 mb-6">
            <ShieldCheck className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold text-gray-900">管理者設定</h1>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-800">
              <strong>注意:</strong> このページは初回セットアップ用です。
              最初の管理者を設定した後は、このページを削除することを推奨します。
            </p>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">現在のユーザー</h2>
            <div className="bg-gray-50 border rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">メールアドレス</p>
              <p className="font-mono text-gray-900">{currentUser.email}</p>
              {currentUser.displayName && (
                <>
                  <p className="text-sm text-gray-600 mt-3 mb-1">表示名</p>
                  <p className="text-gray-900">{currentUser.displayName}</p>
                </>
              )}
              <p className="text-sm text-gray-600 mt-3 mb-1">UID</p>
              <p className="font-mono text-xs text-gray-900">{currentUser.uid}</p>
            </div>
          </div>

          {message && (
            <div
              className={`mb-6 p-4 rounded-lg border-2 ${
                message.type === "success"
                  ? "bg-green-50 border-green-200 text-green-800"
                  : "bg-red-50 border-red-200 text-red-800"
              }`}
            >
              {message.text}
            </div>
          )}

          <button
            onClick={makeCurrentUserAdmin}
            className="w-full bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-5 h-5" />
            このユーザーを管理者に設定
          </button>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="font-semibold mb-2">設定後の手順</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600">
              <li>管理者に設定されたことを確認</li>
              <li>
                <a href="/admin/news" className="text-primary hover:underline">
                  管理画面
                </a>
                にアクセスできるか確認
              </li>
              <li>このページ（/admin/setup）を削除</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
