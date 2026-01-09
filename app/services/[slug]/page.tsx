import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header, Footer } from "../../components";
import { services, getServiceById } from "../../data/services";

// 静的パラメータ生成
export function generateStaticParams() {
  return services.map((service) => ({
    slug: service.id,
  }));
}

// メタデータ生成
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceById(slug);
  if (!service) {
    return { title: "サービスが見つかりません | やすらぎの郷" };
  }
  return {
    title: `${service.title} | やすらぎの郷`,
    description: service.description,
  };
}

// サービスアイコンコンポーネント
function ServiceIcon({ type, className = "w-8 h-8" }: { type: string; className?: string }) {
  const icons: Record<string, React.ReactNode> = {
    "day-service": (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    "short-stay": (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    "home-care": (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    "group-home": (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  };
  return <>{icons[type] || null}</>;
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceById(slug);

  if (!service) {
    notFound();
  }

  // 他のサービスを取得（現在のサービス以外）
  const otherServices = services.filter((s) => s.id !== service.id);

  return (
    <>
      <Header />

      <main>
        {/* ページヘッダー */}
        <section className="pt-32 pb-16 bg-gradient-warm texture-paper">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center text-[var(--color-primary)]">
                <ServiceIcon type={service.id} className="w-10 h-10" />
              </div>
              <div>
                <p className="text-[var(--color-accent)] text-sm font-medium tracking-wider mb-1">
                  SERVICE
                </p>
                <h1 className="text-3xl sm:text-4xl font-bold text-[var(--color-primary)]">
                  {service.title}
                </h1>
              </div>
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
              <Link href="/services" className="hover:text-[var(--color-primary)] transition-colors">
                サービス一覧
              </Link>
              <span>/</span>
              <span className="text-[var(--color-primary)]">{service.title}</span>
            </nav>
          </div>
        </div>

        {/* メインコンテンツ */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* メインカラム */}
              <div className="lg:col-span-2">
                {/* メイン画像 */}
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-8">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

                {/* 説明文 */}
                <div className="prose prose-lg max-w-none mb-12">
                  <p className="text-[var(--color-text)] leading-relaxed text-lg">
                    {service.fullDescription}
                  </p>
                </div>

                {/* サービスの特徴 */}
                <div className="mb-12">
                  <h2 className="section-title mb-8">{service.title}の特徴</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {service.features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-4 bg-[var(--color-base)] rounded-xl"
                      >
                        <div className="w-6 h-6 rounded-full bg-[var(--color-accent)] text-white flex items-center justify-center shrink-0 mt-0.5">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-[var(--color-text)]">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ギャラリー */}
                <div className="mb-12">
                  <h2 className="section-title mb-8">施設・サービスの様子</h2>
                  <div className="grid grid-cols-3 gap-4">
                    {service.gallery.map((image, index) => (
                      <div
                        key={index}
                        className="relative aspect-[4/3] rounded-xl overflow-hidden"
                      >
                        <Image
                          src={image}
                          alt={`${service.title}の様子 ${index + 1}`}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* サイドバー */}
              <div className="lg:col-span-1">
                {/* サービス概要カード */}
                <div className="bg-[var(--color-base-warm)] rounded-2xl p-6 mb-8 sticky top-24">
                  <h3 className="text-lg font-semibold text-[var(--color-primary)] mb-6">
                    サービス概要
                  </h3>
                  <dl className="space-y-4">
                    <div>
                      <dt className="text-sm font-medium text-[var(--color-text-muted)] mb-1">
                        対象者
                      </dt>
                      <dd className="text-[var(--color-text)]">{service.targetAudience}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-[var(--color-text-muted)] mb-1">
                        ご利用時間
                      </dt>
                      <dd className="text-[var(--color-text)]">{service.schedule}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-[var(--color-text-muted)] mb-1">
                        定員
                      </dt>
                      <dd className="text-[var(--color-text)]">{service.capacity}</dd>
                    </div>
                  </dl>

                  <div className="mt-8 pt-6 border-t border-[var(--color-border)]">
                    <p className="text-sm text-[var(--color-text-muted)] mb-4">
                      ご利用料金や詳細については、お気軽にお問い合わせください。
                    </p>
                    <Link
                      href="/contact"
                      className="btn-primary w-full text-center block"
                    >
                      お問い合わせ
                    </Link>
                    <a
                      href="tel:0120-XXX-XXX"
                      className="btn-secondary w-full text-center block mt-3"
                    >
                      0120-XXX-XXX
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 他のサービス */}
        <section className="py-16 bg-[var(--color-base)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="section-title mb-8">その他のサービス</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {otherServices.map((s) => (
                <Link
                  key={s.id}
                  href={`/services/${s.id}`}
                  className="card p-6 group"
                >
                  <div className="w-12 h-12 rounded-full bg-[var(--color-secondary-light)] flex items-center justify-center mb-4 text-[var(--color-primary)] group-hover:bg-[var(--color-accent)] group-hover:text-white transition-all duration-300">
                    <ServiceIcon type={s.id} />
                  </div>
                  <h3 className="text-lg font-semibold text-[var(--color-primary)] mb-2">
                    {s.title}
                  </h3>
                  <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                    {s.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-[var(--color-primary)] text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold mb-4">
              {service.title}についてのご相談
            </h2>
            <p className="text-[var(--color-secondary)] mb-8">
              ご利用を検討されている方、詳しい説明をご希望の方は
              <br className="hidden sm:block" />
              お気軽にお問い合わせください。施設見学も随時受け付けております。
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                見学予約・お問い合わせ
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
