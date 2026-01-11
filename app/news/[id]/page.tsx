"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams, notFound } from "next/navigation";
import { doc, getDoc, collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { Header, Footer } from "../../components";
import { categoryStyles } from "../../data/news";
import NewsImageGallery from "../../components/NewsImageGallery";
import { NewsImage, ImageLayout } from "../../types/news";
import { useAuth } from "../../contexts/AuthContext";

interface NewsItem {
  id: string;
  date: string;
  category: string;
  title: string;
  summary: string;
  content: string;
  image?: string;
  images?: NewsImage[];
  imageLayout?: ImageLayout;
  published: boolean;
}

// Markdown風テキストを簡易的にHTMLに変換
function parseContent(content: string): string {
  return content
    .split("\n\n")
    .map((paragraph) => {
      // 見出し（##）
      if (paragraph.startsWith("## ")) {
        return `<h2 class="text-xl font-semibold text-[var(--color-primary)] mt-8 mb-4">${paragraph.slice(3)}</h2>`;
      }
      // 見出し（###）
      if (paragraph.startsWith("### ")) {
        return `<h3 class="text-lg font-semibold text-[var(--color-primary)] mt-6 mb-3">${paragraph.slice(4)}</h3>`;
      }
      // テーブル
      if (paragraph.includes("|") && paragraph.includes("---")) {
        const lines = paragraph.split("\n").filter((line) => line.trim());
        const headerLine = lines[0];
        const dataLines = lines.slice(2);

        const headers = headerLine
          .split("|")
          .filter((cell) => cell.trim())
          .map((cell) => `<th class="px-4 py-2 border-b border-[var(--color-border)] text-left font-medium">${cell.trim()}</th>`)
          .join("");

        const rows = dataLines
          .map((line) => {
            const cells = line
              .split("|")
              .filter((cell) => cell.trim())
              .map((cell) => `<td class="px-4 py-2 border-b border-[var(--color-border)]">${cell.trim()}</td>`)
              .join("");
            return `<tr>${cells}</tr>`;
          })
          .join("");

        return `<table class="w-full my-6 border-collapse"><thead><tr>${headers}</tr></thead><tbody>${rows}</tbody></table>`;
      }
      // リスト
      if (paragraph.startsWith("- ") || paragraph.match(/^\d+\. /)) {
        const items = paragraph.split("\n").map((line) => {
          const text = line.replace(/^[-\d.]\s*/, "");
          return `<li class="ml-4">${text}</li>`;
        });
        const isOrdered = paragraph.match(/^\d+\. /);
        return isOrdered
          ? `<ol class="list-decimal list-inside my-4 space-y-1">${items.join("")}</ol>`
          : `<ul class="list-disc list-inside my-4 space-y-1">${items.join("")}</ul>`;
      }
      // 強調テキスト
      const processed = paragraph
        .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold">$1</strong>')
        .replace(/\n/g, "<br />");

      return `<p class="my-4 leading-relaxed">${processed}</p>`;
    })
    .join("");
}

export default function NewsDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const { adminMode } = useAuth();

  const [news, setNews] = useState<NewsItem | null>(null);
  const [otherNews, setOtherNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [notFoundState, setNotFoundState] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      if (!db || !id) {
        setIsLoading(false);
        return;
      }

      try {
        // 記事を取得
        const docRef = doc(db, "news", id);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists() || !docSnap.data().published) {
          setNotFoundState(true);
          setIsLoading(false);
          return;
        }

        const data = docSnap.data();
        setNews({
          id: docSnap.id,
          date: data.date,
          category: data.category,
          title: data.title,
          summary: data.summary,
          content: data.content,
          image: data.image,
          images: data.images,
          imageLayout: data.imageLayout,
          published: data.published,
        });

        // 他のお知らせを取得
        const newsRef = collection(db, "news");
        const q = query(newsRef, orderBy("date", "desc"), limit(10));
        const snapshot = await getDocs(q);

        const others: NewsItem[] = [];
        snapshot.forEach((doc) => {
          const d = doc.data();
          if (doc.id !== id && d.published && others.length < 3) {
            others.push({
              id: doc.id,
              date: d.date,
              category: d.category,
              title: d.title,
              summary: d.summary,
              content: d.content,
              image: d.image,
              published: d.published,
            });
          }
        });
        setOtherNews(others);
      } catch (error) {
        console.error("Error fetching news:", error);
        setNotFoundState(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, [id]);

  if (isLoading) {
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

  if (notFoundState || !news) {
    notFound();
  }

  const parsedContent = parseContent(news.content);

  return (
    <>
      <Header />

      <main>
        {/* ページヘッダー */}
        <section className="pt-32 pb-16 bg-gradient-warm texture-paper">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <time className="text-[var(--color-text-muted)]">{news.date}</time>
              <span
                className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full ${
                  categoryStyles[news.category] || "bg-gray-100 text-gray-800"
                }`}
              >
                {news.category}
              </span>
              {/* 管理者モード: 編集ボタン */}
              {adminMode && (
                <Link
                  href={`/admin/news/${id}/edit`}
                  className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)] transition-colors"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  編集
                </Link>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--color-primary)] leading-tight">
              {news.title}
            </h1>
          </div>
        </section>

        {/* パンくずリスト */}
        <div className="bg-[var(--color-base)]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
              <Link href="/" className="hover:text-[var(--color-primary)] transition-colors">
                ホーム
              </Link>
              <span>/</span>
              <Link href="/news" className="hover:text-[var(--color-primary)] transition-colors">
                お知らせ
              </Link>
              <span>/</span>
              <span className="text-[var(--color-primary)] truncate max-w-[200px]">
                {news.title}
              </span>
            </nav>
          </div>
        </div>

        {/* 記事本文 */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <article className="bg-white">
              {/* 画像（複数対応） */}
              {news.images && news.images.length > 0 ? (
                <NewsImageGallery
                  images={news.images}
                  layout={news.imageLayout || "single"}
                />
              ) : news.image ? (
                <div className="relative aspect-[2/1] rounded-2xl overflow-hidden mb-8">
                  <Image
                    src={news.image}
                    alt={news.title}
                    fill
                    sizes="(max-width: 896px) 100vw, 896px"
                    className="object-cover"
                    priority
                    unoptimized
                  />
                </div>
              ) : null}

              {/* 本文 */}
              <div
                className="text-[var(--color-text)] prose-custom"
                dangerouslySetInnerHTML={{ __html: parsedContent }}
              />

              {/* シェアボタン */}
              <div className="mt-12 pt-8 border-t border-[var(--color-border)]">
                <p className="text-sm text-[var(--color-text-muted)] mb-3">この記事をシェア</p>
                <div className="flex gap-3">
                  <button className="w-10 h-10 rounded-full bg-[var(--color-base)] flex items-center justify-center text-[var(--color-text-muted)] hover:bg-[var(--color-secondary-light)] transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </button>
                  <button className="w-10 h-10 rounded-full bg-[var(--color-base)] flex items-center justify-center text-[var(--color-text-muted)] hover:bg-[var(--color-secondary-light)] transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </button>
                  <button className="w-10 h-10 rounded-full bg-[var(--color-base)] flex items-center justify-center text-[var(--color-text-muted)] hover:bg-[var(--color-secondary-light)] transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
                    </svg>
                  </button>
                </div>
              </div>
            </article>

            {/* 一覧へ戻る */}
            <div className="mt-12 text-center">
              <Link
                href="/news"
                className="inline-flex items-center gap-2 text-[var(--color-accent)] font-medium hover:text-[var(--color-primary)] transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                お知らせ一覧へ戻る
              </Link>
            </div>
          </div>
        </section>

        {/* 他のお知らせ */}
        {otherNews.length > 0 && (
          <section className="py-16 bg-[var(--color-base)]">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="section-title mb-8">その他のお知らせ</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {otherNews.map((item) => (
                  <Link
                    key={item.id}
                    href={`/news/${item.id}`}
                    className="card p-5 group"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <time className="text-xs text-[var(--color-text-muted)]">
                        {item.date}
                      </time>
                      <span
                        className={`inline-flex items-center px-2 py-0.5 text-[10px] font-medium rounded-full ${
                          categoryStyles[item.category] || "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {item.category}
                      </span>
                    </div>
                    <h3 className="text-sm font-medium text-[var(--color-primary)] group-hover:text-[var(--color-accent)] transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}
