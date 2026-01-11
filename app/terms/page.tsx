import Link from "next/link";
import { Header, Footer } from "../components";

export const metadata = {
  title: "利用規約 | やすらぎの郷",
  description: "やすらぎの郷ウェブサイトの利用規約についてご案内します。",
};

export default function TermsPage() {
  return (
    <>
      <Header />

      <main>
        {/* ページヘッダー */}
        <section className="pt-32 pb-16 bg-gradient-warm texture-paper">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-[var(--color-accent)] text-sm font-medium tracking-wider mb-2">
                TERMS OF SERVICE
              </p>
              <h1 className="text-3xl sm:text-4xl font-bold text-[var(--color-primary)] mb-4">
                利用規約
              </h1>
              <p className="text-[var(--color-text-muted)] max-w-2xl mx-auto">
                ウェブサイトのご利用にあたって
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
              <span className="text-[var(--color-primary)]">利用規約</span>
            </nav>
          </div>
        </div>

        {/* 本文 */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-lg max-w-none">
              <p className="text-[var(--color-text-muted)] mb-8">
                この利用規約（以下「本規約」）は、やすらぎの郷（以下「当施設」）が提供するウェブサイト（以下「本サイト」）の利用条件を定めるものです。ご利用の皆様（以下「利用者」）には、本規約に同意いただいた上で、本サイトをご利用いただきます。
              </p>

              <div className="space-y-10">
                {/* 第1条 */}
                <div className="bg-[var(--color-base)] rounded-2xl p-6 sm:p-8">
                  <h2 className="text-xl font-bold text-[var(--color-primary)] mb-4">
                    第1条（適用）
                  </h2>
                  <p className="text-[var(--color-text)] leading-relaxed">
                    本規約は、利用者と当施設との間の本サイトの利用に関わる一切の関係に適用されるものとします。当施設は本サイトに関し、本規約のほか、ご利用にあたってのルール等、各種の定め（以下「個別規定」）をすることがあります。これら個別規定はその名称のいかんに関わらず、本規約の一部を構成するものとします。
                  </p>
                </div>

                {/* 第2条 */}
                <div className="bg-[var(--color-base)] rounded-2xl p-6 sm:p-8">
                  <h2 className="text-xl font-bold text-[var(--color-primary)] mb-4">
                    第2条（禁止事項）
                  </h2>
                  <p className="text-[var(--color-text)] leading-relaxed mb-4">
                    利用者は、本サイトの利用にあたり、以下の行為をしてはなりません。
                  </p>
                  <ul className="list-disc list-inside text-[var(--color-text)] space-y-2">
                    <li>法令または公序良俗に違反する行為</li>
                    <li>犯罪行為に関連する行為</li>
                    <li>当施設、他の利用者、または第三者の知的財産権、肖像権、プライバシー、名誉その他の権利または利益を侵害する行為</li>
                    <li>当施設のサーバーまたはネットワークの機能を破壊したり、妨害したりする行為</li>
                    <li>本サイトの運営を妨害するおそれのある行為</li>
                    <li>不正アクセスをし、またはこれを試みる行為</li>
                    <li>他の利用者に関する個人情報等を収集または蓄積する行為</li>
                    <li>他の利用者に成りすます行為</li>
                    <li>当施設のサービスに関連して、反社会的勢力に対して直接または間接に利益を供与する行為</li>
                    <li>その他、当施設が不適切と判断する行為</li>
                  </ul>
                </div>

                {/* 第3条 */}
                <div className="bg-[var(--color-base)] rounded-2xl p-6 sm:p-8">
                  <h2 className="text-xl font-bold text-[var(--color-primary)] mb-4">
                    第3条（本サイトの提供の停止等）
                  </h2>
                  <p className="text-[var(--color-text)] leading-relaxed mb-4">
                    当施設は、以下のいずれかの事由があると判断した場合、利用者に事前に通知することなく本サイトの全部または一部の提供を停止または中断することができるものとします。
                  </p>
                  <ul className="list-disc list-inside text-[var(--color-text)] space-y-2">
                    <li>本サイトにかかるコンピュータシステムの保守点検または更新を行う場合</li>
                    <li>地震、落雷、火災、停電または天災などの不可抗力により、本サイトの提供が困難となった場合</li>
                    <li>コンピュータまたは通信回線等が事故により停止した場合</li>
                    <li>その他、当施設が本サイトの提供が困難と判断した場合</li>
                  </ul>
                </div>

                {/* 第4条 */}
                <div className="bg-[var(--color-base)] rounded-2xl p-6 sm:p-8">
                  <h2 className="text-xl font-bold text-[var(--color-primary)] mb-4">
                    第4条（著作権）
                  </h2>
                  <p className="text-[var(--color-text)] leading-relaxed">
                    本サイトに掲載されているコンテンツ（文章、画像、動画、音声、プログラム等）の著作権は、当施設または正当な権利を有する第三者に帰属します。利用者は、当施設の書面による事前の許可なく、これらのコンテンツを複製、転載、改変、販売、出版その他の二次利用をすることはできません。
                  </p>
                </div>

                {/* 第5条 */}
                <div className="bg-[var(--color-base)] rounded-2xl p-6 sm:p-8">
                  <h2 className="text-xl font-bold text-[var(--color-primary)] mb-4">
                    第5条（リンク）
                  </h2>
                  <p className="text-[var(--color-text)] leading-relaxed">
                    本サイトへのリンクは、営利目的でない場合に限り、原則として自由です。ただし、当施設の信用を損なう形でのリンクや、フレーム内に本サイトを表示させる形でのリンクは禁止します。本サイトからリンクしている外部サイトについては、当施設は一切の責任を負いません。
                  </p>
                </div>

                {/* 第6条 */}
                <div className="bg-[var(--color-base)] rounded-2xl p-6 sm:p-8">
                  <h2 className="text-xl font-bold text-[var(--color-primary)] mb-4">
                    第6条（免責事項）
                  </h2>
                  <p className="text-[var(--color-text)] leading-relaxed mb-4">
                    当施設は、本サイトに掲載する情報について、正確性・完全性・有用性等について保証するものではありません。利用者が本サイトを利用して行う一切の行為について、当施設は責任を負いません。
                  </p>
                  <p className="text-[var(--color-text)] leading-relaxed">
                    当施設は、利用者が本サイトを利用したことにより生じた損害について、当施設の故意または重大な過失による場合を除き、一切の責任を負いません。
                  </p>
                </div>

                {/* 第7条 */}
                <div className="bg-[var(--color-base)] rounded-2xl p-6 sm:p-8">
                  <h2 className="text-xl font-bold text-[var(--color-primary)] mb-4">
                    第7条（利用規約の変更）
                  </h2>
                  <p className="text-[var(--color-text)] leading-relaxed">
                    当施設は、必要と判断した場合には、利用者に通知することなくいつでも本規約を変更することができるものとします。変更後の利用規約は、本サイトに掲載した時点から効力を生じるものとします。
                  </p>
                </div>

                {/* 第8条 */}
                <div className="bg-[var(--color-base)] rounded-2xl p-6 sm:p-8">
                  <h2 className="text-xl font-bold text-[var(--color-primary)] mb-4">
                    第8条（準拠法・裁判管轄）
                  </h2>
                  <p className="text-[var(--color-text)] leading-relaxed">
                    本規約の解釈にあたっては、日本法を準拠法とします。本サイトに関して紛争が生じた場合には、当施設の本店所在地を管轄する裁判所を専属的合意管轄とします。
                  </p>
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
