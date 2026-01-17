import Link from "next/link";
import { Header, Footer } from "./components";
import { HeroSection } from "./components/HeroSection";
import { ServicesSection } from "./components/ServicesSection";
import { FeaturesSection } from "./components/FeaturesSection";
import { CTASection } from "./components/CTASection";

// お知らせダミーデータ
const news = [
  {
    id: 1,
    date: "2026.01.08",
    category: "お知らせ",
    title: "年末年始の営業時間について",
  },
  {
    id: 2,
    date: "2026.01.05",
    category: "イベント",
    title: "新春イベント「書き初め大会」を開催します",
  },
  {
    id: 3,
    date: "2025.12.20",
    category: "採用",
    title: "介護スタッフ（正社員・パート）募集中",
  },
  {
    id: 4,
    date: "2025.12.15",
    category: "お知らせ",
    title: "クリスマス会のご報告",
  },
];

export default function Home() {
  return (
    <>
      <Header />

      <main>
        {/* ヒーローセクション */}
        <HeroSection />

        {/* サービス紹介セクション */}
        <ServicesSection />

        {/* 施設の特徴セクション */}
        <FeaturesSection />

        {/* お知らせセクション */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12">
              <div>
                <p className="text-[var(--color-accent)] text-sm font-medium tracking-wider mb-2">
                  NEWS
                </p>
                <h2 className="section-title">お知らせ</h2>
              </div>
              <Link href="/news" className="btn-secondary text-sm px-5 py-2">
                一覧を見る
              </Link>
            </div>

            <div className="divide-y divide-[var(--color-border)]">
              {news.map((item) => (
                <Link
                  key={item.id}
                  href={`/news/${item.id}`}
                  className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 py-5 group hover:bg-[var(--color-base)] -mx-4 px-4 transition-colors"
                >
                  <time className="text-sm text-[var(--color-text-muted)] shrink-0">
                    {item.date}
                  </time>
                  <span className="inline-flex items-center px-3 py-1 text-xs font-medium bg-[var(--color-secondary-light)] text-[var(--color-primary)] rounded-full shrink-0 w-fit">
                    {item.category}
                  </span>
                  <span className="text-[var(--color-text)] group-hover:text-[var(--color-primary)] transition-colors">
                    {item.title}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* アクセスセクション */}
        <section className="py-24 bg-[var(--color-base-warm)] overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <p className="text-[var(--color-accent)] text-sm font-medium tracking-wider mb-2">
                ACCESS
              </p>
              <h2 className="section-title mx-auto after:left-1/2 after:-translate-x-1/2">
                アクセス
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="w-full aspect-[4/3] lg:aspect-auto lg:h-full min-h-[300px] rounded-2xl overflow-hidden shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.4547820869913!2d139.68917131525882!3d35.689651179584654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188cd0d848d5e5%3A0x7fbd5b7b2c7c5c5c!2z5p2x5Lqs6YO95bqB!5e0!3m2!1sja!2sjp!4v1704931200000!5m2!1sja!2sjp"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="やすらぎの郷 所在地"
                ></iframe>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <h3 className="text-xl font-semibold text-[var(--color-primary)] mb-6">
                  やすらぎの郷
                </h3>

                <dl className="space-y-5">
                  <div className="flex gap-4">
                    <dt className="text-sm font-medium text-[var(--color-text-muted)] w-20 shrink-0">
                      住所
                    </dt>
                    <dd className="text-[var(--color-text)]">
                      〒XXX-XXXX
                      <br />
                      東京都〇〇区〇〇町1-2-3
                    </dd>
                  </div>
                  <div className="flex gap-4">
                    <dt className="text-sm font-medium text-[var(--color-text-muted)] w-20 shrink-0">
                      電話
                    </dt>
                    <dd className="text-[var(--color-text)]">
                      0120-XXX-XXX
                      <br />
                      <span className="text-sm text-[var(--color-text-muted)]">
                        （受付時間 9:00〜18:00）
                      </span>
                    </dd>
                  </div>
                  <div className="flex gap-4">
                    <dt className="text-sm font-medium text-[var(--color-text-muted)] w-20 shrink-0">
                      FAX
                    </dt>
                    <dd className="text-[var(--color-text)]">03-XXXX-XXXX</dd>
                  </div>
                  <div className="flex gap-4">
                    <dt className="text-sm font-medium text-[var(--color-text-muted)] w-20 shrink-0">
                      アクセス
                    </dt>
                    <dd className="text-[var(--color-text)]">
                      〇〇線「〇〇駅」より徒歩5分
                      <br />
                      〇〇バス「〇〇停留所」下車すぐ
                    </dd>
                  </div>
                </dl>

                <div className="mt-8 pt-6 border-t border-[var(--color-border)]">
                  <Link
                    href="/about/access"
                    className="inline-flex items-center text-[var(--color-accent)] font-medium hover:text-[var(--color-primary)] transition-colors"
                  >
                    詳しいアクセス情報
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTAセクション */}
        <CTASection />
      </main>

      <Footer />
    </>
  );
}
