"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../contexts/AuthContext";
import { Header, Footer } from "../components";

export default function MemberPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (loading) {
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

  if (!user) {
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
                MEMBER PAGE
              </p>
              <h1 className="text-3xl sm:text-4xl font-bold text-[var(--color-primary)] mb-4">
                会員ページ
              </h1>
              <p className="text-[var(--color-text-muted)] max-w-2xl mx-auto">
                {user.displayName || user.email} 様、ようこそ。
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
              <span className="text-[var(--color-primary)]">会員ページ</span>
            </nav>
          </div>
        </div>

        {/* メインコンテンツ */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* ユーザー情報カード */}
            <div className="bg-[var(--color-base)] rounded-2xl p-6 md:p-8 mb-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-[var(--color-accent)] text-white flex items-center justify-center text-2xl font-bold">
                  {(user.displayName || user.email || "U").charAt(0).toUpperCase()}
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-[var(--color-primary)]">
                    {user.displayName || "会員"}
                  </h2>
                  <p className="text-sm text-[var(--color-text-muted)]">{user.email}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="text-sm text-[var(--color-accent)] hover:text-[var(--color-primary)] transition-colors"
              >
                ログアウト
              </button>
            </div>

            {/* メニュー */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 予約履歴 */}
              <Link
                href="/member/reservations"
                className="block bg-white rounded-2xl p-6 border border-[var(--color-border)] hover:shadow-lg transition-shadow group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[var(--color-secondary-light)] flex items-center justify-center text-[var(--color-primary)] group-hover:bg-[var(--color-accent)] group-hover:text-white transition-colors">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--color-primary)] group-hover:text-[var(--color-accent)] transition-colors">
                      予約履歴
                    </h3>
                    <p className="text-sm text-[var(--color-text-muted)]">
                      過去の見学予約を確認
                    </p>
                  </div>
                </div>
              </Link>

              {/* お問い合わせ履歴 */}
              <Link
                href="/member/inquiries"
                className="block bg-white rounded-2xl p-6 border border-[var(--color-border)] hover:shadow-lg transition-shadow group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[var(--color-secondary-light)] flex items-center justify-center text-[var(--color-primary)] group-hover:bg-[var(--color-accent)] group-hover:text-white transition-colors">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--color-primary)] group-hover:text-[var(--color-accent)] transition-colors">
                      お問い合わせ履歴
                    </h3>
                    <p className="text-sm text-[var(--color-text-muted)]">
                      過去のお問い合わせを確認
                    </p>
                  </div>
                </div>
              </Link>

              {/* お知らせ */}
              <Link
                href="/member/notifications"
                className="block bg-white rounded-2xl p-6 border border-[var(--color-border)] hover:shadow-lg transition-shadow group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[var(--color-secondary-light)] flex items-center justify-center text-[var(--color-primary)] group-hover:bg-[var(--color-accent)] group-hover:text-white transition-colors">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--color-primary)] group-hover:text-[var(--color-accent)] transition-colors">
                      お知らせ
                    </h3>
                    <p className="text-sm text-[var(--color-text-muted)]">
                      施設からのお知らせ
                    </p>
                  </div>
                </div>
              </Link>

              {/* 会員情報編集 */}
              <Link
                href="/member/profile"
                className="block bg-white rounded-2xl p-6 border border-[var(--color-border)] hover:shadow-lg transition-shadow group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[var(--color-secondary-light)] flex items-center justify-center text-[var(--color-primary)] group-hover:bg-[var(--color-accent)] group-hover:text-white transition-colors">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--color-primary)] group-hover:text-[var(--color-accent)] transition-colors">
                      会員情報
                    </h3>
                    <p className="text-sm text-[var(--color-text-muted)]">
                      登録情報の確認・変更
                    </p>
                  </div>
                </div>
              </Link>
            </div>

            {/* お知らせエリア */}
            <div className="mt-12">
              <h2 className="section-title mb-6">会員様へのお知らせ</h2>
              <div className="bg-[var(--color-base-warm)] rounded-2xl p-6">
                <p className="text-[var(--color-text-muted)] text-center">
                  現在、会員様向けの新着お知らせはありません。
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
