import Link from "next/link";
import Image from "next/image";
import { Header, Footer } from "../../components";
import { staffMembers } from "../../data/about";

export const metadata = {
  title: "スタッフ紹介 | やすらぎの郷",
  description: "やすらぎの郷で働くスタッフをご紹介します。経験豊富な専門スタッフが、心を込めてケアいたします。",
};

export default function StaffPage() {
  return (
    <>
      <Header />

      <main>
        {/* ページヘッダー */}
        <section className="pt-32 pb-16 bg-gradient-warm texture-paper">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-[var(--color-accent)] text-sm font-medium tracking-wider mb-2">
                STAFF
              </p>
              <h1 className="text-3xl sm:text-4xl font-bold text-[var(--color-primary)] mb-4">
                スタッフ紹介
              </h1>
              <p className="text-[var(--color-text-muted)] max-w-2xl mx-auto">
                経験豊富な専門スタッフが、心を込めてケアいたします。<br className="hidden sm:block" />
                お気軽にお声がけください。
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
              <span className="text-[var(--color-primary)]">スタッフ紹介</span>
            </nav>
          </div>
        </div>

        {/* スタッフ紹介 */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-[var(--color-accent)] text-sm font-medium tracking-wider mb-2">
                OUR TEAM
              </p>
              <h2 className="section-title mx-auto after:left-1/2 after:-translate-x-1/2">
                チームメンバー
              </h2>
              <p className="mt-6 text-[var(--color-text-muted)] max-w-2xl mx-auto">
                様々な専門分野のスタッフがチームとなって、<br className="hidden sm:block" />
                ご利用者様の生活をサポートしています。
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {staffMembers.map((staff) => (
                <div
                  key={staff.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-[var(--color-border)]"
                >
                  {/* 写真 */}
                  <div className="relative aspect-square bg-[var(--color-base)]">
                    <Image
                      src={staff.image}
                      alt={staff.name}
                      fill
                      className="object-cover"
                    />
                    {/* 部門バッジ */}
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center px-3 py-1 text-xs font-medium bg-white/90 text-[var(--color-primary)] rounded-full backdrop-blur-sm">
                        {staff.department}
                      </span>
                    </div>
                  </div>

                  {/* 情報 */}
                  <div className="p-6">
                    <div className="mb-4">
                      <p className="text-sm text-[var(--color-accent)] font-medium mb-1">
                        {staff.role}
                      </p>
                      <h3 className="text-xl font-semibold text-[var(--color-primary)]">
                        {staff.name}
                      </h3>
                    </div>

                    {/* 資格 */}
                    {staff.qualifications && staff.qualifications.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {staff.qualifications.map((qualification) => (
                          <span
                            key={qualification}
                            className="inline-flex items-center px-2 py-1 text-[10px] font-medium bg-[var(--color-secondary-light)] text-[var(--color-primary)] rounded"
                          >
                            {qualification}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* メッセージ */}
                    <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                      {staff.message}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* チーム体制 */}
        <section className="py-16 bg-[var(--color-base-warm)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-[var(--color-accent)] text-sm font-medium tracking-wider mb-2">
                TEAM STRUCTURE
              </p>
              <h2 className="section-title mx-auto after:left-1/2 after:-translate-x-1/2">
                チーム体制
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
                <div className="w-14 h-14 rounded-full bg-[var(--color-secondary-light)] flex items-center justify-center mx-auto mb-4 text-[var(--color-primary)]">
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-[var(--color-primary)] mb-2">
                  介護スタッフ
                </h3>
                <p className="text-3xl font-bold text-[var(--color-accent)] mb-2">30+</p>
                <p className="text-sm text-[var(--color-text-muted)]">名</p>
              </div>

              <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
                <div className="w-14 h-14 rounded-full bg-[var(--color-secondary-light)] flex items-center justify-center mx-auto mb-4 text-[var(--color-primary)]">
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-[var(--color-primary)] mb-2">
                  看護スタッフ
                </h3>
                <p className="text-3xl font-bold text-[var(--color-accent)] mb-2">5</p>
                <p className="text-sm text-[var(--color-text-muted)]">名</p>
              </div>

              <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
                <div className="w-14 h-14 rounded-full bg-[var(--color-secondary-light)] flex items-center justify-center mx-auto mb-4 text-[var(--color-primary)]">
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-[var(--color-primary)] mb-2">
                  リハビリスタッフ
                </h3>
                <p className="text-3xl font-bold text-[var(--color-accent)] mb-2">3</p>
                <p className="text-sm text-[var(--color-text-muted)]">名</p>
              </div>

              <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
                <div className="w-14 h-14 rounded-full bg-[var(--color-secondary-light)] flex items-center justify-center mx-auto mb-4 text-[var(--color-primary)]">
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-[var(--color-primary)] mb-2">
                  相談員
                </h3>
                <p className="text-3xl font-bold text-[var(--color-accent)] mb-2">4</p>
                <p className="text-sm text-[var(--color-text-muted)]">名</p>
              </div>
            </div>
          </div>
        </section>

        {/* 研修・教育 */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-[var(--color-accent)] text-sm font-medium tracking-wider mb-2">
                  TRAINING
                </p>
                <h2 className="section-title mb-6">
                  研修・教育体制
                </h2>
                <p className="text-[var(--color-text-muted)] leading-relaxed mb-6">
                  やすらぎの郷では、スタッフの成長と専門性向上を重視し、充実した研修制度を設けています。新人からベテランまで、すべてのスタッフが継続的に学び、より質の高いケアを提供できるよう努めています。
                </p>

                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-[var(--color-accent)] flex items-center justify-center shrink-0 text-white">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-[var(--color-primary)] mb-1">新人研修プログラム</h4>
                      <p className="text-sm text-[var(--color-text-muted)]">入職後3ヶ月間の充実した研修で、安心してケアに臨めます</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-[var(--color-accent)] flex items-center justify-center shrink-0 text-white">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-[var(--color-primary)] mb-1">定期勉強会</h4>
                      <p className="text-sm text-[var(--color-text-muted)]">月1回の勉強会で最新の介護知識・技術を学びます</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-[var(--color-accent)] flex items-center justify-center shrink-0 text-white">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-[var(--color-primary)] mb-1">資格取得支援</h4>
                      <p className="text-sm text-[var(--color-text-muted)]">介護福祉士等の資格取得を費用面・時間面でサポート</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-[var(--color-accent)] flex items-center justify-center shrink-0 text-white">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-[var(--color-primary)] mb-1">外部研修派遣</h4>
                      <p className="text-sm text-[var(--color-text-muted)]">学会や外部セミナーへの参加を積極的に支援</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="/images/facility-info.jpg"
                  alt="研修の様子"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 採用情報CTA */}
        <section className="py-16 bg-[var(--color-primary)] text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              私たちと一緒に働きませんか？
            </h2>
            <p className="text-[var(--color-secondary)] mb-8 leading-relaxed">
              やすらぎの郷では、経験者はもちろん未経験者も歓迎しています。<br className="hidden sm:block" />
              充実した研修制度で、安心してスタートできます。
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/recruit"
                className="inline-flex items-center justify-center gap-2 bg-white text-[var(--color-primary)] px-8 py-4 rounded-full font-medium hover:bg-[var(--color-base)] transition-colors"
              >
                採用情報を見る
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 border-2 border-white text-white px-8 py-4 rounded-full font-medium hover:bg-white/10 transition-colors"
              >
                お問い合わせ
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
