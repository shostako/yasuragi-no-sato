"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useAuth } from "../../contexts/AuthContext";
import { Header, Footer } from "../../components";
import { Bell, Calendar, Lock } from "lucide-react";

interface News {
  id: string;
  title: string;
  category: string;
  summary: string;
  date: string;
  memberOnly: boolean;
}

export default function MemberNotificationsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [news, setNews] = useState<News[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    const fetchMemberNews = async () => {
      if (!user || !db) return;

      try {
        // 会員限定の公開済み記事を取得
        const newsQuery = query(
          collection(db, "news"),
          where("published", "==", true),
          where("memberOnly", "==", true),
          orderBy("date", "desc")
        );
        const snapshot = await getDocs(newsQuery);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as News[];

        setNews(data);
      } catch (err) {
        console.error("Error fetching member news:", err);
        setError("お知らせの取得に失敗しました");
      } finally {
        setIsLoadingData(false);
      }
    };

    if (user) {
      fetchMemberNews();
    }
  }, [user]);

  if (loading || isLoadingData) {
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
                MEMBER NOTIFICATIONS
              </p>
              <h1 className="text-3xl sm:text-4xl font-bold text-[var(--color-primary)] mb-4">
                会員限定お知らせ
              </h1>
              <p className="text-[var(--color-text-muted)] max-w-2xl mx-auto">
                会員様向けの特別なお知らせをご確認いただけます
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
              <span className="text-[var(--color-primary)]">会員限定お知らせ</span>
            </nav>
          </div>
        </div>

        {/* メインコンテンツ */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                {error}
              </div>
            )}

            {news.length === 0 ? (
              <div className="bg-[var(--color-base)] rounded-2xl p-12 text-center">
                <Bell className="w-12 h-12 text-[var(--color-text-muted)] mx-auto mb-4" />
                <p className="text-[var(--color-text-muted)] mb-4">会員限定のお知らせはまだありません</p>
                <Link href="/news" className="btn-secondary inline-block">
                  一般のお知らせを見る
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {news.map((item) => (
                  <Link
                    key={item.id}
                    href={`/news/${item.id}`}
                    className="block bg-[var(--color-base)] rounded-2xl p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                      <div className="flex items-center gap-3">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[var(--color-accent)] text-white flex items-center gap-1">
                          <Lock className="w-3 h-3" />
                          会員限定
                        </span>
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[var(--color-secondary-light)] text-[var(--color-primary)]">
                          {item.category}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-[var(--color-text-muted)]">
                        <Calendar className="w-4 h-4" />
                        {item.date}
                      </div>
                    </div>

                    <h2 className="text-lg font-semibold text-[var(--color-primary)] mb-2 hover:text-[var(--color-accent)] transition-colors">
                      {item.title}
                    </h2>

                    {item.summary && (
                      <p className="text-[var(--color-text-muted)] text-sm line-clamp-2">
                        {item.summary}
                      </p>
                    )}
                  </Link>
                ))}
              </div>
            )}

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
