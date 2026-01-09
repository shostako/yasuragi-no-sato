import Link from "next/link";
import Image from "next/image";
import { Header, Footer } from "../components";
import { newsItems, categoryStyles } from "../data/news";

export const metadata = {
  title: "お知らせ | やすらぎの郷",
  description: "やすらぎの郷からのお知らせ、イベント情報、採用情報などをお届けします。",
};

export default function NewsPage() {
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
                            categoryStyles[item.category]
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

            {/* ページネーション（将来用のプレースホルダー） */}
            <div className="mt-12 flex justify-center">
              <p className="text-sm text-[var(--color-text-muted)]">
                全{newsItems.length}件を表示中
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
