"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { collection, query, orderBy, where, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";
import { Header, Footer } from "../components";
import { categoryStyles } from "../data/news";
import { useAuth } from "../contexts/AuthContext";

interface NewsItem {
  id: string;
  date: string;
  category: string;
  title: string;
  summary: string;
  image?: string;
  published: boolean;
}

export default function NewsPage() {
  const { adminMode } = useAuth();
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      if (!db) {
        setIsLoading(false);
        return;
      }

      try {
        const newsRef = collection(db, "news");
        const q = query(
          newsRef,
          where("published", "==", true),
          orderBy("date", "desc")
        );
        const snapshot = await getDocs(q);

        const items: NewsItem[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          items.push({
            id: doc.id,
            date: data.date,
            category: data.category,
            title: data.title,
            summary: data.summary,
            image: data.image,
            published: data.published,
          });
        });

        setNewsItems(items);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <>
      <Header />

      <main>
        {/* ページヘッダー */}
        <section className="pt-32 pb-16 bg-gradient-warm texture-paper">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-[var(--color-accent)] text-sm font-medium tracking-wider mb-2">
                NEWS
              </p>
              <h1 className="text-3xl sm:text-4xl font-bold text-[var(--color-primary)] mb-4">
                お知らせ
              </h1>
              <p className="text-[var(--color-text-muted)] max-w-2xl mx-auto">
                やすらぎの郷からのお知らせ、イベント情報をお届けします。
              </p>
              {/* 管理者モード: 新規投稿ボタン */}
              {adminMode && (
                <Link
                  href="/admin/news/new"
                  className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-[var(--color-primary)] text-white rounded-full font-medium hover:bg-[var(--color-primary-dark)] transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  新規投稿
                </Link>
              )}
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
              <span className="text-[var(--color-primary)]">お知らせ</span>
            </nav>
          </div>
        </div>

        {/* お知らせ一覧 */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {isLoading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--color-primary)]"></div>
              </div>
            ) : newsItems.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-[var(--color-text-muted)]">お知らせはありません</p>
              </div>
            ) : (
              <div className="space-y-6">
                {newsItems.map((item) => (
                  <Link
                    key={item.id}
                    href={`/news/${item.id}`}
                    className="block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-[var(--color-border)] group"
                  >
                    <div className="flex flex-col sm:flex-row">
                      {/* 画像（あれば表示） */}
                      {item.image && (
                        <div className="relative sm:w-48 h-40 sm:h-auto shrink-0">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}

                      {/* コンテンツ */}
                      <div className="p-6 flex-1">
                        <div className="flex flex-wrap items-center gap-3 mb-3">
                          <time className="text-sm text-[var(--color-text-muted)]">
                            {item.date}
                          </time>
                          <span
                            className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full ${
                              categoryStyles[item.category] || "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {item.category}
                          </span>
                        </div>
                        <h2 className="text-lg font-semibold text-[var(--color-primary)] mb-2 group-hover:text-[var(--color-accent)] transition-colors">
                          {item.title}
                        </h2>
                        <p className="text-sm text-[var(--color-text-muted)] line-clamp-2">
                          {item.summary}
                        </p>
                        <div className="mt-4 flex items-center text-sm font-medium text-[var(--color-accent)] group-hover:text-[var(--color-primary)] transition-colors">
                          続きを読む
                          <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* ページネーション */}
            {!isLoading && newsItems.length > 0 && (
              <div className="mt-12 flex justify-center">
                <p className="text-sm text-[var(--color-text-muted)]">
                  全{newsItems.length}件を表示中
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
