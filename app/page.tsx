import Image from "next/image";
import Link from "next/link";
import { Header, Footer } from "./components";

// サービス一覧データ
const services = [
  {
    id: "day-service",
    title: "デイサービス",
    description: "日帰りで食事や入浴、機能訓練などのサービスを受けられます。",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
  {
    id: "short-stay",
    title: "ショートステイ",
    description: "短期間の宿泊サービス。ご家族の介護負担軽減をサポートします。",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    id: "home-care",
    title: "訪問介護",
    description: "ご自宅にホームヘルパーが訪問し、日常生活をサポートします。",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    id: "group-home",
    title: "グループホーム",
    description: "認知症の方が少人数で共同生活を送る、家庭的な環境の施設です。",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
];

// 施設の特徴データ
const features = [
  {
    title: "24時間体制のケア",
    description: "経験豊富なスタッフが24時間体制で見守り、緊急時にも迅速に対応いたします。",
    image: "https://picsum.photos/seed/care1/600/400",
  },
  {
    title: "充実したリハビリ設備",
    description: "専門の理学療法士による機能訓練で、自立した生活をサポートします。",
    image: "https://picsum.photos/seed/rehab1/600/400",
  },
  {
    title: "栄養バランスの取れた食事",
    description: "管理栄養士監修の献立で、美味しく健康的なお食事を提供いたします。",
    image: "https://picsum.photos/seed/meal1/600/400",
  },
];

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
        {/* ============================================
            ヒーローセクション
            ============================================ */}
        <section className="relative min-h-screen flex items-center bg-gradient-warm texture-paper">
          {/* 背景画像 */}
          <div className="absolute inset-0 z-0">
            <Image
              src="https://picsum.photos/seed/hero1/1920/1080"
              alt="施設イメージ"
              fill
              className="object-cover opacity-20"
              priority
            />
          </div>

          {/* コンテンツ */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
            <div className="max-w-2xl">
              {/* キャッチコピー */}
              <p className="text-[var(--color-accent)] font-medium mb-4 animate-fade-in-up">
                心に寄り添う、あたたかな介護
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--color-primary)] mb-6 leading-tight animate-fade-in-up delay-100">
                あなたらしい<br />
                毎日を<br />
                ここから。
              </h1>
              <p className="text-lg text-[var(--color-text-muted)] mb-8 leading-relaxed animate-fade-in-up delay-200">
                やすらぎの郷は、ご利用者様一人ひとりの<br className="hidden sm:block" />
                人生に寄り添い、笑顔あふれる毎日を<br className="hidden sm:block" />
                サポートいたします。
              </p>

              {/* CTAボタン */}
              <div className="flex flex-wrap gap-4 animate-fade-in-up delay-300">
                <Link href="/contact" className="btn-primary">
                  見学のご予約
                </Link>
                <Link href="/services" className="btn-secondary">
                  サービス詳細
                </Link>
              </div>
            </div>
          </div>

          {/* スクロールインジケーター */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <svg className="w-6 h-6 text-[var(--color-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </section>

        {/* ============================================
            サービス紹介セクション
            ============================================ */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* セクションヘッダー */}
            <div className="text-center mb-16">
              <p className="text-[var(--color-accent)] text-sm font-medium tracking-wider mb-2">
                SERVICES
              </p>
              <h2 className="section-title mx-auto after:left-1/2 after:-translate-x-1/2">
                サービス紹介
              </h2>
              <p className="mt-8 text-[var(--color-text-muted)] max-w-2xl mx-auto">
                ご利用者様のニーズに合わせた多様なサービスをご用意しております。
                <br />
                お気軽にご相談ください。
              </p>
            </div>

            {/* サービスカード */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service, index) => (
                <Link
                  key={service.id}
                  href={`/services/${service.id}`}
                  className="card p-6 group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-14 h-14 rounded-full bg-[var(--color-secondary-light)] flex items-center justify-center mb-4 text-[var(--color-primary)] group-hover:bg-[var(--color-accent)] group-hover:text-white transition-all duration-300">
                    {service.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-[var(--color-primary)] mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                    {service.description}
                  </p>
                  <div className="mt-4 flex items-center text-sm font-medium text-[var(--color-accent)] group-hover:text-[var(--color-primary)] transition-colors">
                    詳しく見る
                    <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================
            施設の特徴セクション
            ============================================ */}
        <section className="py-24 bg-[var(--color-base-warm)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* セクションヘッダー */}
            <div className="text-center mb-16">
              <p className="text-[var(--color-accent)] text-sm font-medium tracking-wider mb-2">
                FEATURES
              </p>
              <h2 className="section-title mx-auto after:left-1/2 after:-translate-x-1/2">
                施設の特徴
              </h2>
            </div>

            {/* 特徴カード */}
            <div className="space-y-16">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className={`flex flex-col ${
                    index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  } gap-8 lg:gap-16 items-center`}
                >
                  {/* 画像 */}
                  <div className="w-full lg:w-1/2">
                    <div className="relative aspect-[3/2] rounded-2xl overflow-hidden shadow-lg">
                      <Image
                        src={feature.image}
                        alt={feature.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>

                  {/* テキスト */}
                  <div className="w-full lg:w-1/2">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-4xl font-bold text-[var(--color-secondary)]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div className="w-12 h-px bg-[var(--color-accent)]"></div>
                    </div>
                    <h3 className="text-2xl font-semibold text-[var(--color-primary)] mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-[var(--color-text-muted)] leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================
            お知らせセクション
            ============================================ */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* セクションヘッダー */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12">
              <div>
                <p className="text-[var(--color-accent)] text-sm font-medium tracking-wider mb-2">
                  NEWS
                </p>
                <h2 className="section-title">お知らせ</h2>
              </div>
              <Link
                href="/news"
                className="btn-secondary text-sm px-5 py-2"
              >
                一覧を見る
              </Link>
            </div>

            {/* ニュース一覧 */}
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

        {/* ============================================
            アクセスセクション
            ============================================ */}
        <section className="py-24 bg-[var(--color-base-warm)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* セクションヘッダー */}
            <div className="text-center mb-16">
              <p className="text-[var(--color-accent)] text-sm font-medium tracking-wider mb-2">
                ACCESS
              </p>
              <h2 className="section-title mx-auto after:left-1/2 after:-translate-x-1/2">
                アクセス
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* 地図（プレースホルダー） */}
              <div className="aspect-[4/3] lg:aspect-auto lg:h-full min-h-[300px] bg-[var(--color-secondary-light)] rounded-2xl flex items-center justify-center">
                <div className="text-center text-[var(--color-text-muted)]">
                  <svg className="w-12 h-12 mx-auto mb-3 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                  <p className="text-sm">Google Maps埋め込み予定</p>
                </div>
              </div>

              {/* 施設情報 */}
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
                      〒XXX-XXXX<br />
                      東京都〇〇区〇〇町1-2-3
                    </dd>
                  </div>
                  <div className="flex gap-4">
                    <dt className="text-sm font-medium text-[var(--color-text-muted)] w-20 shrink-0">
                      電話
                    </dt>
                    <dd className="text-[var(--color-text)]">
                      0120-XXX-XXX<br />
                      <span className="text-sm text-[var(--color-text-muted)]">（受付時間 9:00〜18:00）</span>
                    </dd>
                  </div>
                  <div className="flex gap-4">
                    <dt className="text-sm font-medium text-[var(--color-text-muted)] w-20 shrink-0">
                      FAX
                    </dt>
                    <dd className="text-[var(--color-text)]">
                      03-XXXX-XXXX
                    </dd>
                  </div>
                  <div className="flex gap-4">
                    <dt className="text-sm font-medium text-[var(--color-text-muted)] w-20 shrink-0">
                      アクセス
                    </dt>
                    <dd className="text-[var(--color-text)]">
                      〇〇線「〇〇駅」より徒歩5分<br />
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
                    <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================
            CTAセクション
            ============================================ */}
        <section className="py-20 bg-[var(--color-primary)] text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              まずはお気軽にご相談ください
            </h2>
            <p className="text-[var(--color-secondary)] mb-8 leading-relaxed">
              施設見学や介護に関するご相談など、<br className="hidden sm:block" />
              お気軽にお問い合わせください。
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="tel:0120-XXX-XXX"
                className="inline-flex items-center justify-center gap-2 bg-white text-[var(--color-primary)] px-8 py-4 rounded-full font-medium hover:bg-[var(--color-base)] transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                0120-XXX-XXX
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-[var(--color-accent)] text-white px-8 py-4 rounded-full font-medium hover:bg-[var(--color-accent-light)] transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                お問い合わせフォーム
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
