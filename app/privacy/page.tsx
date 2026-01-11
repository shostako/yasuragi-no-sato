import Link from "next/link";
import { Header, Footer } from "../components";

export const metadata = {
  title: "プライバシーポリシー | やすらぎの郷",
  description: "やすらぎの郷のプライバシーポリシー（個人情報保護方針）についてご案内します。",
};

export default function PrivacyPage() {
  return (
    <>
      <Header />

      <main>
        {/* ページヘッダー */}
        <section className="pt-32 pb-16 bg-gradient-warm texture-paper">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-[var(--color-accent)] text-sm font-medium tracking-wider mb-2">
                PRIVACY POLICY
              </p>
              <h1 className="text-3xl sm:text-4xl font-bold text-[var(--color-primary)] mb-4">
                プライバシーポリシー
              </h1>
              <p className="text-[var(--color-text-muted)] max-w-2xl mx-auto">
                個人情報の取り扱いについて
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
              <span className="text-[var(--color-primary)]">プライバシーポリシー</span>
            </nav>
          </div>
        </div>

        {/* 本文 */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-lg max-w-none">
              <p className="text-[var(--color-text-muted)] mb-8">
                やすらぎの郷（以下「当施設」）は、ご利用者様の個人情報の保護を重要な責務と考え、以下のとおりプライバシーポリシーを定めます。
              </p>

              <div className="space-y-10">
                {/* 第1条 */}
                <div className="bg-[var(--color-base)] rounded-2xl p-6 sm:p-8">
                  <h2 className="text-xl font-bold text-[var(--color-primary)] mb-4">
                    第1条（個人情報の定義）
                  </h2>
                  <p className="text-[var(--color-text)] leading-relaxed">
                    本ポリシーにおいて「個人情報」とは、生存する個人に関する情報であって、氏名、生年月日、住所、電話番号、メールアドレス、その他の記述等により特定の個人を識別できるもの、または個人識別符号が含まれるものをいいます。
                  </p>
                </div>

                {/* 第2条 */}
                <div className="bg-[var(--color-base)] rounded-2xl p-6 sm:p-8">
                  <h2 className="text-xl font-bold text-[var(--color-primary)] mb-4">
                    第2条（個人情報の収集）
                  </h2>
                  <p className="text-[var(--color-text)] leading-relaxed mb-4">
                    当施設は、以下の場合に個人情報を収集することがあります。
                  </p>
                  <ul className="list-disc list-inside text-[var(--color-text)] space-y-2">
                    <li>サービスのご利用申し込み時</li>
                    <li>お問い合わせ・ご相談時</li>
                    <li>見学予約のお申し込み時</li>
                    <li>会員登録時</li>
                    <li>採用への応募時</li>
                  </ul>
                </div>

                {/* 第3条 */}
                <div className="bg-[var(--color-base)] rounded-2xl p-6 sm:p-8">
                  <h2 className="text-xl font-bold text-[var(--color-primary)] mb-4">
                    第3条（個人情報の利用目的）
                  </h2>
                  <p className="text-[var(--color-text)] leading-relaxed mb-4">
                    当施設は、収集した個人情報を以下の目的で利用いたします。
                  </p>
                  <ul className="list-disc list-inside text-[var(--color-text)] space-y-2">
                    <li>介護サービスの提供および運営</li>
                    <li>お問い合わせへの対応</li>
                    <li>見学・相談のご案内</li>
                    <li>サービスに関するお知らせの送付</li>
                    <li>サービスの改善・新サービスの開発</li>
                    <li>採用選考および連絡</li>
                  </ul>
                </div>

                {/* 第4条 */}
                <div className="bg-[var(--color-base)] rounded-2xl p-6 sm:p-8">
                  <h2 className="text-xl font-bold text-[var(--color-primary)] mb-4">
                    第4条（個人情報の第三者提供）
                  </h2>
                  <p className="text-[var(--color-text)] leading-relaxed mb-4">
                    当施設は、以下の場合を除き、ご本人の同意なく個人情報を第三者に提供することはありません。
                  </p>
                  <ul className="list-disc list-inside text-[var(--color-text)] space-y-2">
                    <li>法令に基づく場合</li>
                    <li>人の生命、身体または財産の保護のために必要であり、ご本人の同意を得ることが困難な場合</li>
                    <li>公衆衛生の向上または児童の健全な育成の推進のために特に必要があり、ご本人の同意を得ることが困難な場合</li>
                    <li>国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合</li>
                  </ul>
                </div>

                {/* 第5条 */}
                <div className="bg-[var(--color-base)] rounded-2xl p-6 sm:p-8">
                  <h2 className="text-xl font-bold text-[var(--color-primary)] mb-4">
                    第5条（個人情報の管理）
                  </h2>
                  <p className="text-[var(--color-text)] leading-relaxed">
                    当施設は、個人情報の正確性を保ち、これを安全に管理いたします。個人情報の紛失、破壊、改ざん、漏洩等を防止するため、適切なセキュリティ対策を講じます。
                  </p>
                </div>

                {/* 第6条 */}
                <div className="bg-[var(--color-base)] rounded-2xl p-6 sm:p-8">
                  <h2 className="text-xl font-bold text-[var(--color-primary)] mb-4">
                    第6条（個人情報の開示・訂正・削除）
                  </h2>
                  <p className="text-[var(--color-text)] leading-relaxed">
                    ご本人から個人情報の開示、訂正、削除等のご請求があった場合、ご本人確認の上、合理的な期間内に対応いたします。ご請求は下記のお問い合わせ窓口までご連絡ください。
                  </p>
                </div>

                {/* 第7条 */}
                <div className="bg-[var(--color-base)] rounded-2xl p-6 sm:p-8">
                  <h2 className="text-xl font-bold text-[var(--color-primary)] mb-4">
                    第7条（Cookieの使用）
                  </h2>
                  <p className="text-[var(--color-text)] leading-relaxed">
                    当施設のウェブサイトでは、サービス向上のためCookieを使用することがあります。Cookieの使用を希望されない場合は、ブラウザの設定により無効にすることができます。ただし、一部のサービスが正常に機能しなくなる場合があります。
                  </p>
                </div>

                {/* 第8条 */}
                <div className="bg-[var(--color-base)] rounded-2xl p-6 sm:p-8">
                  <h2 className="text-xl font-bold text-[var(--color-primary)] mb-4">
                    第8条（プライバシーポリシーの変更）
                  </h2>
                  <p className="text-[var(--color-text)] leading-relaxed">
                    当施設は、必要に応じて本ポリシーを変更することがあります。変更後のプライバシーポリシーは、当ウェブサイトに掲載した時点から効力を生じるものとします。
                  </p>
                </div>

                {/* お問い合わせ */}
                <div className="bg-[var(--color-primary)] text-white rounded-2xl p-6 sm:p-8">
                  <h2 className="text-xl font-bold mb-4">
                    お問い合わせ窓口
                  </h2>
                  <p className="leading-relaxed mb-4">
                    個人情報の取り扱いに関するお問い合わせは、下記までご連絡ください。
                  </p>
                  <div className="space-y-2 text-[var(--color-secondary)]">
                    <p>やすらぎの郷 個人情報管理責任者</p>
                    <p>電話: 0120-XXX-XXX</p>
                    <p>受付時間: 9:00〜18:00（年中無休）</p>
                  </div>
                </div>

                <p className="text-right text-[var(--color-text-muted)]">
                  制定日: 2026年1月1日
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
