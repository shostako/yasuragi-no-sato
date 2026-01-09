import Link from "next/link";
import Image from "next/image";
import { Header, Footer } from "../components";
import { facilityInfo, philosophy, history, facilityGallery } from "../data/about";

export const metadata = {
  title: "施設案内 | やすらぎの郷",
  description: "やすらぎの郷の施設概要、設備、沿革をご紹介します。地域に根ざした介護サービスを提供しています。",
};

// サブページリンク
const subPages = [
  {
    href: "/about/philosophy",
    title: "理念・方針",
    description: "私たちが大切にしている想いをお伝えします",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
  {
    href: "/about/staff",
    title: "スタッフ紹介",
    description: "経験豊富なスタッフがお待ちしています",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    href: "/about/access",
    title: "アクセス",
    description: "施設への交通案内・駐車場情報",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

export default function AboutPage() {
  return (
    <>
      <Header />

      <main>
        {/* ページヘッダー */}
        <section className="pt-32 pb-16 bg-gradient-warm texture-paper">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-[var(--color-accent)] text-sm font-medium tracking-wider mb-2">
                ABOUT
              </p>
              <h1 className="text-3xl sm:text-4xl font-bold text-[var(--color-primary)] mb-4">
                施設案内
              </h1>
              <p className="text-[var(--color-text-muted)] max-w-2xl mx-auto">
                やすらぎの郷は、地域に根ざした介護サービスを提供し、<br className="hidden sm:block" />
                ご利用者様の「自分らしい生活」をサポートしています。
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
              <span className="text-[var(--color-primary)]">施設案内</span>
            </nav>
          </div>
        </div>

        {/* サブページナビゲーション */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {subPages.map((page) => (
                <Link
                  key={page.href}
                  href={page.href}
                  className="card p-6 group flex flex-col items-center text-center"
                >
                  <div className="w-14 h-14 rounded-full bg-[var(--color-secondary-light)] flex items-center justify-center mb-4 text-[var(--color-primary)] group-hover:bg-[var(--color-accent)] group-hover:text-white transition-all duration-300">
                    {page.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-[var(--color-primary)] mb-2">
                    {page.title}
                  </h3>
                  <p className="text-sm text-[var(--color-text-muted)]">
                    {page.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 施設概要 */}
        <section className="py-16 bg-[var(--color-base-warm)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="section-title mx-auto after:left-1/2 after:-translate-x-1/2">
                施設概要
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* 施設画像 */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="/images/hero-building.png"
                  alt="やすらぎの郷 外観"
                  fill
                  className="object-cover"
                />
              </div>

              {/* 施設情報テーブル */}
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <h3 className="text-xl font-semibold text-[var(--color-primary)] mb-6">
                  {facilityInfo.name}
                  <span className="ml-2 text-sm font-normal text-[var(--color-text-muted)]">
                    {facilityInfo.nameEn}
                  </span>
                </h3>

                <dl className="space-y-4">
                  <div className="flex border-b border-[var(--color-border)] pb-3">
                    <dt className="w-28 shrink-0 text-sm font-medium text-[var(--color-text-muted)]">
                      設立
                    </dt>
                    <dd className="text-[var(--color-text)]">
                      {facilityInfo.established}
                    </dd>
                  </div>
                  <div className="flex border-b border-[var(--color-border)] pb-3">
                    <dt className="w-28 shrink-0 text-sm font-medium text-[var(--color-text-muted)]">
                      施設長
                    </dt>
                    <dd className="text-[var(--color-text)]">
                      {facilityInfo.president}
                    </dd>
                  </div>
                  <div className="flex border-b border-[var(--color-border)] pb-3">
                    <dt className="w-28 shrink-0 text-sm font-medium text-[var(--color-text-muted)]">
                      従業員数
                    </dt>
                    <dd className="text-[var(--color-text)]">
                      {facilityInfo.employeeCount}
                    </dd>
                  </div>
                  <div className="flex border-b border-[var(--color-border)] pb-3">
                    <dt className="w-28 shrink-0 text-sm font-medium text-[var(--color-text-muted)]">
                      所在地
                    </dt>
                    <dd className="text-[var(--color-text)]">
                      {facilityInfo.postalCode}<br />
                      {facilityInfo.address}
                    </dd>
                  </div>
                  <div className="flex border-b border-[var(--color-border)] pb-3">
                    <dt className="w-28 shrink-0 text-sm font-medium text-[var(--color-text-muted)]">
                      電話
                    </dt>
                    <dd className="text-[var(--color-text)]">
                      {facilityInfo.phone}
                    </dd>
                  </div>
                  <div className="flex border-b border-[var(--color-border)] pb-3">
                    <dt className="w-28 shrink-0 text-sm font-medium text-[var(--color-text-muted)]">
                      営業時間
                    </dt>
                    <dd className="text-[var(--color-text)]">
                      {facilityInfo.businessHours}
                    </dd>
                  </div>
                  <div className="flex">
                    <dt className="w-28 shrink-0 text-sm font-medium text-[var(--color-text-muted)]">
                      サービス
                    </dt>
                    <dd className="text-[var(--color-text)]">
                      {facilityInfo.services.join(" / ")}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </section>

        {/* 理念プレビュー */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-warm rounded-2xl p-8 sm:p-12 text-center">
              <p className="text-[var(--color-accent)] text-sm font-medium tracking-wider mb-4">
                PHILOSOPHY
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-[var(--color-primary)] mb-6">
                {philosophy.mission}
              </h2>
              <p className="text-[var(--color-text-muted)] max-w-2xl mx-auto mb-8 leading-relaxed">
                {philosophy.vision}
              </p>
              <Link
                href="/about/philosophy"
                className="btn-primary"
              >
                理念・方針を詳しく見る
              </Link>
            </div>
          </div>
        </section>

        {/* 施設ギャラリー */}
        <section className="py-16 bg-[var(--color-base)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-[var(--color-accent)] text-sm font-medium tracking-wider mb-2">
                GALLERY
              </p>
              <h2 className="section-title mx-auto after:left-1/2 after:-translate-x-1/2">
                施設ギャラリー
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {facilityGallery.map((item) => (
                <div
                  key={item.id}
                  className="group relative aspect-[4/3] rounded-2xl overflow-hidden shadow-sm"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <h3 className="font-semibold mb-1">{item.title}</h3>
                      <p className="text-sm text-white/80">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 沿革 */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-[var(--color-accent)] text-sm font-medium tracking-wider mb-2">
                HISTORY
              </p>
              <h2 className="section-title mx-auto after:left-1/2 after:-translate-x-1/2">
                沿革
              </h2>
            </div>

            <div className="relative">
              {/* タイムラインの線 */}
              <div className="absolute left-8 sm:left-1/2 top-0 bottom-0 w-px bg-[var(--color-border)] -translate-x-1/2"></div>

              <div className="space-y-8">
                {history.map((item, index) => (
                  <div
                    key={item.year}
                    className={`relative flex items-start gap-6 ${
                      index % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
                    }`}
                  >
                    {/* ドット */}
                    <div className="absolute left-8 sm:left-1/2 w-4 h-4 rounded-full bg-[var(--color-accent)] -translate-x-1/2 mt-1.5 z-10"></div>

                    {/* コンテンツ */}
                    <div className={`ml-16 sm:ml-0 sm:w-[calc(50%-2rem)] ${
                      index % 2 === 0 ? "sm:pr-8 sm:text-right" : "sm:pl-8"
                    }`}>
                      <p className="text-[var(--color-accent)] font-semibold mb-1">
                        {item.year}
                      </p>
                      <p className="text-[var(--color-text)]">
                        {item.event}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-[var(--color-primary)] text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              施設見学を受け付けています
            </h2>
            <p className="text-[var(--color-secondary)] mb-8 leading-relaxed">
              実際の施設の雰囲気をご覧いただけます。<br className="hidden sm:block" />
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
                見学のご予約
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
