import Link from "next/link";
import Image from "next/image";
import { Header, Footer } from "../../components";
import { philosophy } from "../../data/about";

export const metadata = {
  title: "理念・方針 | やすらぎの郷",
  description: "やすらぎの郷の経営理念・ケア方針をご紹介します。「心に寄り添う、あたたかな介護」を理念に、ご利用者様一人ひとりの尊厳を大切にしています。",
};

// アイコンコンポーネント
function ValueIcon({ icon }: { icon: string }) {
  switch (icon) {
    case "heart":
      return (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      );
    case "shield":
      return (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      );
    case "users":
      return (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      );
    case "trending-up":
      return (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      );
    default:
      return null;
  }
}

export default function PhilosophyPage() {
  return (
    <>
      <Header />

      <main>
        {/* ページヘッダー */}
        <section className="pt-32 pb-16 bg-gradient-warm texture-paper">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-[var(--color-accent)] text-sm font-medium tracking-wider mb-2">
                PHILOSOPHY
              </p>
              <h1 className="text-3xl sm:text-4xl font-bold text-[var(--color-primary)] mb-4">
                理念・方針
              </h1>
              <p className="text-[var(--color-text-muted)] max-w-2xl mx-auto">
                私たちが大切にしている想いと、日々のケアに込める姿勢をお伝えします。
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
              <span className="text-[var(--color-primary)]">理念・方針</span>
            </nav>
          </div>
        </div>

        {/* 経営理念 */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="mb-12">
              <p className="text-sm text-[var(--color-accent)] font-medium tracking-wider mb-4">
                MISSION
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--color-primary)] leading-tight mb-6">
                {philosophy.mission}
              </h2>
              <div className="w-16 h-1 bg-[var(--color-accent)] mx-auto"></div>
            </div>

            <p className="text-lg text-[var(--color-text)] leading-relaxed mb-8">
              {philosophy.vision}
            </p>

            <p className="text-[var(--color-text-muted)] leading-loose whitespace-pre-line">
              {philosophy.description}
            </p>
          </div>
        </section>

        {/* 大切にする価値観 */}
        <section className="py-20 bg-[var(--color-base-warm)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <p className="text-[var(--color-accent)] text-sm font-medium tracking-wider mb-2">
                VALUES
              </p>
              <h2 className="section-title mx-auto after:left-1/2 after:-translate-x-1/2">
                大切にする価値観
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {philosophy.values.map((value, index) => (
                <div
                  key={value.title}
                  className="bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-16 h-16 rounded-full bg-[var(--color-secondary-light)] flex items-center justify-center mx-auto mb-6 text-[var(--color-primary)]">
                    <ValueIcon icon={value.icon} />
                  </div>
                  <div className="text-4xl font-bold text-[var(--color-secondary)] mb-2">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <h3 className="text-xl font-semibold text-[var(--color-primary)] mb-4">
                    {value.title}
                  </h3>
                  <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 施設長メッセージ */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <p className="text-[var(--color-accent)] text-sm font-medium tracking-wider mb-2">
                MESSAGE
              </p>
              <h2 className="section-title mx-auto after:left-1/2 after:-translate-x-1/2">
                施設長メッセージ
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
              {/* 写真 */}
              <div className="lg:col-span-1">
                <div className="relative aspect-square max-w-sm mx-auto rounded-2xl overflow-hidden shadow-lg">
                  <Image
                    src={philosophy.presidentMessage.image}
                    alt={philosophy.presidentMessage.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="text-center mt-6">
                  <p className="text-sm text-[var(--color-accent)] font-medium">
                    {philosophy.presidentMessage.title}
                  </p>
                  <p className="text-xl font-semibold text-[var(--color-primary)]">
                    {philosophy.presidentMessage.name}
                  </p>
                </div>
              </div>

              {/* メッセージ */}
              <div className="lg:col-span-2">
                <div className="bg-[var(--color-base)] rounded-2xl p-8 sm:p-10 relative">
                  {/* 装飾的な引用符 */}
                  <div className="absolute top-4 left-6 text-6xl text-[var(--color-secondary)] font-serif opacity-30">
                    "
                  </div>
                  <div className="relative">
                    <p className="text-[var(--color-text)] leading-loose whitespace-pre-line pt-8">
                      {philosophy.presidentMessage.message}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ケア方針 */}
        <section className="py-20 bg-[var(--color-base)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <p className="text-[var(--color-accent)] text-sm font-medium tracking-wider mb-2">
                CARE POLICY
              </p>
              <h2 className="section-title mx-auto after:left-1/2 after:-translate-x-1/2">
                ケア方針
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <div className="w-12 h-12 rounded-full bg-[var(--color-accent)] flex items-center justify-center mb-6 text-white">
                  <span className="text-xl font-bold">1</span>
                </div>
                <h3 className="text-lg font-semibold text-[var(--color-primary)] mb-4">
                  自立支援
                </h3>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                  ご利用者様が持つ能力を最大限に活かし、できることはご自身で行っていただけるよう支援します。「やってあげる」ではなく「一緒にやる」ケアを心がけています。
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <div className="w-12 h-12 rounded-full bg-[var(--color-accent)] flex items-center justify-center mb-6 text-white">
                  <span className="text-xl font-bold">2</span>
                </div>
                <h3 className="text-lg font-semibold text-[var(--color-primary)] mb-4">
                  個別ケア
                </h3>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                  お一人おひとりの生活歴、価値観、好みを尊重し、その方らしい暮らしができるよう、個別のケアプランを作成しています。
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <div className="w-12 h-12 rounded-full bg-[var(--color-accent)] flex items-center justify-center mb-6 text-white">
                  <span className="text-xl font-bold">3</span>
                </div>
                <h3 className="text-lg font-semibold text-[var(--color-primary)] mb-4">
                  多職種連携
                </h3>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                  介護士、看護師、理学療法士、管理栄養士など、多職種のスタッフがチームとなって、包括的なケアを提供します。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-[var(--color-primary)] text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              私たちの想いを感じてください
            </h2>
            <p className="text-[var(--color-secondary)] mb-8 leading-relaxed">
              施設見学では、スタッフの雰囲気や施設の様子を<br className="hidden sm:block" />
              直接ご覧いただけます。
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white text-[var(--color-primary)] px-8 py-4 rounded-full font-medium hover:bg-[var(--color-base)] transition-colors"
              >
                施設見学のご予約
              </Link>
              <Link
                href="/about/staff"
                className="inline-flex items-center justify-center gap-2 border-2 border-white text-white px-8 py-4 rounded-full font-medium hover:bg-white/10 transition-colors"
              >
                スタッフ紹介を見る
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
