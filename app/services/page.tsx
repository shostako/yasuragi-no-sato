import Image from "next/image";
import Link from "next/link";
import { Header, Footer } from "../components";
import { services } from "../data/services";

// サービスアイコンコンポーネント
function ServiceIcon({ type }: { type: string }) {
  const icons: Record<string, React.ReactNode> = {
    "day-service": (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    "short-stay": (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    "home-care": (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    "group-home": (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  };
  return <>{icons[type] || null}</>;
}

export const metadata = {
  title: "サービス一覧 | やすらぎの郷",
  description: "やすらぎの郷が提供するデイサービス、ショートステイ、訪問介護、グループホームのご紹介。",
};

export default function ServicesPage() {
  return (
    <>
      <Header />

      <main>
        {/* ページヘッダー */}
        <section className="pt-32 pb-16 bg-gradient-warm texture-paper">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-[var(--color-accent)] text-sm font-medium tracking-wider mb-2">
                SERVICES
              </p>
              <h1 className="text-3xl sm:text-4xl font-bold text-[var(--color-primary)] mb-4">
                サービス一覧
              </h1>
              <p className="text-[var(--color-text-muted)] max-w-2xl mx-auto">
                ご利用者様のニーズに合わせた多様なサービスをご用意しております。
                <br className="hidden sm:block" />
                お気軽にご相談ください。
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
              <span className="text-[var(--color-primary)]">サービス一覧</span>
            </nav>
          </div>
        </div>

        {/* サービス一覧 */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <Link
                  key={service.id}
                  href={`/services/${service.id}`}
                  className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-[var(--color-border)]"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* 画像 */}
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-[var(--color-primary)]">
                        <ServiceIcon type={service.id} />
                      </div>
                    </div>
                  </div>

                  {/* コンテンツ */}
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-[var(--color-primary)] mb-2 group-hover:text-[var(--color-accent)] transition-colors">
                      {service.title}
                    </h2>
                    <p className="text-[var(--color-text-muted)] text-sm leading-relaxed mb-4">
                      {service.description}
                    </p>

                    {/* メタ情報 */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="inline-flex items-center px-3 py-1 text-xs font-medium bg-[var(--color-secondary-light)] text-[var(--color-primary)] rounded-full">
                        {service.targetAudience}
                      </span>
                    </div>

                    <div className="flex items-center text-sm font-medium text-[var(--color-accent)] group-hover:text-[var(--color-primary)] transition-colors">
                      詳しく見る
                      <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* お問い合わせ誘導 */}
        <section className="py-16 bg-[var(--color-base-warm)]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-4">
              サービスについてのご相談
            </h2>
            <p className="text-[var(--color-text-muted)] mb-8">
              どのサービスが適しているかわからない場合も、お気軽にご相談ください。
              <br className="hidden sm:block" />
              専門のスタッフがご利用者様の状況に合わせてご提案いたします。
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="tel:0120-XXX-XXX"
                className="btn-secondary inline-flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                0120-XXX-XXX
              </a>
              <Link href="/contact" className="btn-primary">
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
