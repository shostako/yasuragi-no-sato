import Link from "next/link";
import Image from "next/image";
import { Header, Footer } from "../../components";
import { accessInfo, facilityInfo } from "../../data/about";

export const metadata = {
  title: "アクセス | やすらぎの郷",
  description: "やすらぎの郷へのアクセス方法、交通案内、駐車場情報をご案内します。",
};

export default function AccessPage() {
  return (
    <>
      <Header />

      <main>
        {/* ページヘッダー */}
        <section className="pt-32 pb-16 bg-gradient-warm texture-paper">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-[var(--color-accent)] text-sm font-medium tracking-wider mb-2">
                ACCESS
              </p>
              <h1 className="text-3xl sm:text-4xl font-bold text-[var(--color-primary)] mb-4">
                アクセス
              </h1>
              <p className="text-[var(--color-text-muted)] max-w-2xl mx-auto">
                やすらぎの郷へのアクセス方法をご案内いたします。
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
              <Link href="/about" className="hover:text-[var(--color-primary)] transition-colors">
                施設案内
              </Link>
              <span>/</span>
              <span className="text-[var(--color-primary)]">アクセス</span>
            </nav>
          </div>
        </div>

        {/* 地図セクション */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* 地図 */}
              <div className="aspect-[4/3] lg:aspect-auto lg:h-full min-h-[400px] rounded-2xl overflow-hidden shadow-lg">
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

              {/* 施設情報 */}
              <div>
                <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-6">
                  {facilityInfo.name}
                </h2>

                <div className="bg-[var(--color-base)] rounded-2xl p-6 sm:p-8 mb-8">
                  <dl className="space-y-5">
                    <div className="flex gap-4">
                      <dt className="text-sm font-medium text-[var(--color-text-muted)] w-24 shrink-0">
                        住所
                      </dt>
                      <dd className="text-[var(--color-text)]">
                        {accessInfo.postalCode}<br />
                        {accessInfo.address}
                      </dd>
                    </div>
                    <div className="flex gap-4">
                      <dt className="text-sm font-medium text-[var(--color-text-muted)] w-24 shrink-0">
                        電話番号
                      </dt>
                      <dd className="text-[var(--color-text)]">
                        <a href={`tel:${accessInfo.phone.replace(/-/g, "")}`} className="hover:text-[var(--color-accent)] transition-colors">
                          {accessInfo.phone}
                        </a>
                      </dd>
                    </div>
                    <div className="flex gap-4">
                      <dt className="text-sm font-medium text-[var(--color-text-muted)] w-24 shrink-0">
                        FAX
                      </dt>
                      <dd className="text-[var(--color-text)]">
                        {accessInfo.fax}
                      </dd>
                    </div>
                    <div className="flex gap-4">
                      <dt className="text-sm font-medium text-[var(--color-text-muted)] w-24 shrink-0">
                        営業時間
                      </dt>
                      <dd className="text-[var(--color-text)]">
                        {accessInfo.businessHours}
                      </dd>
                    </div>
                  </dl>
                </div>

                {/* 外部マップリンク */}
                <div className="flex flex-wrap gap-4">
                  <a
                    href="https://maps.google.com/?q=東京都新宿区西新宿2-8-1+東京都庁"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-primary)] text-white rounded-full font-medium hover:bg-[var(--color-primary-light)] transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Google Mapsで見る
                  </a>
                  <a
                    href="https://maps.apple.com/?address=東京都新宿区西新宿2-8-1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[var(--color-primary)] text-[var(--color-primary)] rounded-full font-medium hover:bg-[var(--color-base)] transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                    </svg>
                    Apple Mapsで見る
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* アクセス方法 */}
        <section className="py-16 bg-[var(--color-base)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="section-title mx-auto after:left-1/2 after:-translate-x-1/2">
                アクセス方法
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {accessInfo.access.map((item, index) => (
                <div
                  key={item.method}
                  className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-[var(--color-accent)] flex items-center justify-center text-white">
                      {index === 0 ? (
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                        </svg>
                      ) : index === 1 ? (
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      ) : (
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 17h14M5 12h14M5 7h14" />
                        </svg>
                      )}
                    </div>
                    <h3 className="text-lg font-semibold text-[var(--color-primary)]">
                      {item.method}
                    </h3>
                  </div>
                  <p className="text-[var(--color-text)] whitespace-pre-line leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 駐車場情報 */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-[var(--color-accent)] text-sm font-medium tracking-wider mb-2">
                  PARKING
                </p>
                <h2 className="section-title mb-6">
                  駐車場のご案内
                </h2>
                <p className="text-[var(--color-text-muted)] leading-relaxed mb-6">
                  お車でお越しの方のために、施設専用駐車場をご用意しております。ご面会やお迎えの際など、お気軽にご利用ください。
                </p>

                <div className="bg-[var(--color-base)] rounded-2xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-[var(--color-accent)] flex items-center justify-center shrink-0 text-white">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-[var(--color-primary)] mb-2">
                        施設専用駐車場
                      </h3>
                      <p className="text-[var(--color-text)]">
                        {accessInfo.parking}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-amber-50 rounded-xl border border-amber-200">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <div className="text-sm text-amber-800">
                      <p className="font-medium mb-1">ご注意ください</p>
                      <p>
                        イベント開催時は駐車場が混雑する場合がございます。公共交通機関のご利用もご検討ください。
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="/images/tour.jpg"
                  alt="駐車場"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 周辺施設 */}
        <section className="py-16 bg-[var(--color-base-warm)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-[var(--color-accent)] text-sm font-medium tracking-wider mb-2">
                NEARBY
              </p>
              <h2 className="section-title mx-auto after:left-1/2 after:-translate-x-1/2">
                周辺情報
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="w-12 h-12 rounded-full bg-[var(--color-secondary-light)] flex items-center justify-center mb-4 text-[var(--color-primary)]">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="font-semibold text-[var(--color-primary)] mb-2">
                  〇〇病院
                </h3>
                <p className="text-sm text-[var(--color-text-muted)]">
                  車で約5分
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="w-12 h-12 rounded-full bg-[var(--color-secondary-light)] flex items-center justify-center mb-4 text-[var(--color-primary)]">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-[var(--color-primary)] mb-2">
                  〇〇ショッピングモール
                </h3>
                <p className="text-sm text-[var(--color-text-muted)]">
                  徒歩約10分
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="w-12 h-12 rounded-full bg-[var(--color-secondary-light)] flex items-center justify-center mb-4 text-[var(--color-primary)]">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="font-semibold text-[var(--color-primary)] mb-2">
                  〇〇公園
                </h3>
                <p className="text-sm text-[var(--color-text-muted)]">
                  徒歩約3分
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="w-12 h-12 rounded-full bg-[var(--color-secondary-light)] flex items-center justify-center mb-4 text-[var(--color-primary)]">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-[var(--color-primary)] mb-2">
                  〇〇区役所
                </h3>
                <p className="text-sm text-[var(--color-text-muted)]">
                  車で約10分
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-[var(--color-primary)] text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              施設見学のご予約
            </h2>
            <p className="text-[var(--color-secondary)] mb-8 leading-relaxed">
              お電話またはお問い合わせフォームから<br className="hidden sm:block" />
              お気軽にご連絡ください。
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href={`tel:${accessInfo.phone.replace(/-/g, "")}`}
                className="inline-flex items-center justify-center gap-2 bg-white text-[var(--color-primary)] px-8 py-4 rounded-full font-medium hover:bg-[var(--color-base)] transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {accessInfo.phone}
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-[var(--color-accent)] text-white px-8 py-4 rounded-full font-medium hover:bg-[var(--color-accent-light)] transition-colors"
              >
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
