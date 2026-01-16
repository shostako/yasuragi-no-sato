"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { updateProfile } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useAuth } from "../../contexts/AuthContext";
import { auth, db } from "../../lib/firebase";
import { Header, Footer } from "../../components";
import { User, Mail, Calendar, Shield, Save, KeyRound } from "lucide-react";

interface UserProfile {
  displayName: string;
  email: string;
  role: string;
  createdAt: string;
}

export default function MemberProfilePage() {
  const { user, loading, resetPassword } = useAuth();
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [displayName, setDisplayName] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [isResettingPassword, setIsResettingPassword] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user || !db) return;

      try {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setProfile({
            displayName: data.displayName || "",
            email: data.email || user.email || "",
            role: data.role || "member",
            createdAt: data.createdAt || "",
          });
          setDisplayName(data.displayName || "");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        setMessage({ type: "error", text: "プロフィールの取得に失敗しました" });
      } finally {
        setIsLoadingProfile(false);
      }
    };

    if (user) {
      fetchProfile();
    }
  }, [user]);

  const handleSave = async () => {
    if (!user || !db || !auth?.currentUser) return;

    setIsSaving(true);
    setMessage(null);

    try {
      // Firebase Auth の displayName を更新
      await updateProfile(auth.currentUser, { displayName });

      // Firestore の users ドキュメントを更新
      await updateDoc(doc(db, "users", user.uid), {
        displayName,
      });

      setProfile((prev) => prev ? { ...prev, displayName } : null);
      setMessage({ type: "success", text: "プロフィールを更新しました" });
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage({ type: "error", text: "更新に失敗しました" });
    } finally {
      setIsSaving(false);
    }
  };

  const handlePasswordReset = async () => {
    if (!user?.email) return;

    setIsResettingPassword(true);
    setMessage(null);

    try {
      await resetPassword(user.email);
      setMessage({ type: "success", text: "パスワードリセットメールを送信しました。メールをご確認ください。" });
    } catch (error) {
      console.error("Error sending password reset:", error);
      setMessage({ type: "error", text: "パスワードリセットメールの送信に失敗しました" });
    } finally {
      setIsResettingPassword(false);
    }
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "-";
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString("ja-JP", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  if (loading || isLoadingProfile) {
    return (
      <>
        <Header />
        <main className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--color-primary)]"></div>
        </main>
        <Footer />
      </>
    );
  }

  if (!user || !profile) {
    return null;
  }

  return (
    <>
      <Header />

      <main>
        {/* ページヘッダー */}
        <section className="pt-32 pb-16 bg-gradient-warm texture-paper">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-[var(--color-accent)] text-sm font-medium tracking-wider mb-2">
                MEMBER PROFILE
              </p>
              <h1 className="text-3xl sm:text-4xl font-bold text-[var(--color-primary)] mb-4">
                会員情報
              </h1>
              <p className="text-[var(--color-text-muted)] max-w-2xl mx-auto">
                登録情報の確認・変更
              </p>
            </div>
          </div>
        </section>

        {/* パンくずリスト */}
        <div className="bg-[var(--color-base)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
              <Link href="/" className="hover:text-[var(--color-primary)] transition-colors">
                ホーム
              </Link>
              <span>/</span>
              <Link href="/member" className="hover:text-[var(--color-primary)] transition-colors">
                会員ページ
              </Link>
              <span>/</span>
              <span className="text-[var(--color-primary)]">会員情報</span>
            </nav>
          </div>
        </div>

        {/* メインコンテンツ */}
        <section className="py-16 bg-white">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* メッセージ */}
            {message && (
              <div
                className={`mb-6 p-4 rounded-lg ${
                  message.type === "success"
                    ? "bg-green-50 border border-green-200 text-green-700"
                    : "bg-red-50 border border-red-200 text-red-700"
                }`}
              >
                {message.text}
              </div>
            )}

            {/* プロフィール情報 */}
            <div className="bg-[var(--color-base)] rounded-2xl p-6 md:p-8 mb-8">
              <h2 className="text-lg font-semibold text-[var(--color-primary)] mb-6 flex items-center gap-2">
                <User className="w-5 h-5" />
                基本情報
              </h2>

              <div className="space-y-6">
                {/* 表示名（編集可能） */}
                <div>
                  <label className="block text-sm font-medium text-[var(--color-text-muted)] mb-2">
                    お名前
                  </label>
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)] transition-all"
                    placeholder="お名前を入力"
                  />
                </div>

                {/* メールアドレス（読み取り専用） */}
                <div>
                  <label className="block text-sm font-medium text-[var(--color-text-muted)] mb-2 flex items-center gap-1">
                    <Mail className="w-4 h-4" />
                    メールアドレス
                  </label>
                  <div className="px-4 py-3 rounded-xl bg-gray-50 text-[var(--color-text)] border border-gray-200">
                    {profile.email}
                  </div>
                  <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                    ※メールアドレスの変更はサポートまでお問い合わせください
                  </p>
                </div>

                {/* 会員種別（読み取り専用） */}
                <div>
                  <label className="block text-sm font-medium text-[var(--color-text-muted)] mb-2 flex items-center gap-1">
                    <Shield className="w-4 h-4" />
                    会員種別
                  </label>
                  <div className="px-4 py-3 rounded-xl bg-gray-50 text-[var(--color-text)] border border-gray-200">
                    {profile.role === "admin" ? "管理者" : "一般会員"}
                  </div>
                </div>

                {/* 登録日（読み取り専用） */}
                <div>
                  <label className="block text-sm font-medium text-[var(--color-text-muted)] mb-2 flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    登録日
                  </label>
                  <div className="px-4 py-3 rounded-xl bg-gray-50 text-[var(--color-text)] border border-gray-200">
                    {formatDate(profile.createdAt)}
                  </div>
                </div>

                {/* 保存ボタン */}
                <div className="pt-4">
                  <button
                    onClick={handleSave}
                    disabled={isSaving || displayName === profile.displayName}
                    className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSaving ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        保存中...
                      </>
                    ) : (
                      <>
                        <Save className="w-5 h-5" />
                        変更を保存
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* パスワード変更 */}
            <div className="bg-[var(--color-base)] rounded-2xl p-6 md:p-8">
              <h2 className="text-lg font-semibold text-[var(--color-primary)] mb-4 flex items-center gap-2">
                <KeyRound className="w-5 h-5" />
                パスワード変更
              </h2>
              <p className="text-sm text-[var(--color-text-muted)] mb-4">
                パスワードを変更する場合は、リセットメールを送信します。
                メールに記載されたリンクから新しいパスワードを設定してください。
              </p>
              <button
                onClick={handlePasswordReset}
                disabled={isResettingPassword}
                className="px-6 py-3 border border-[var(--color-border)] rounded-xl text-[var(--color-primary)] hover:bg-white transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isResettingPassword ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[var(--color-primary)]"></div>
                    送信中...
                  </>
                ) : (
                  <>
                    <Mail className="w-5 h-5" />
                    パスワードリセットメールを送信
                  </>
                )}
              </button>
            </div>

            {/* 戻るリンク */}
            <div className="mt-8 text-center">
              <Link
                href="/member"
                className="text-[var(--color-accent)] hover:text-[var(--color-primary)] transition-colors"
              >
                ← 会員ページに戻る
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
