import Link from "next/link";

const footerLinks = {
  services: [
    { href: "/services/day-service", label: "デイサービス" },
    { href: "/services/short-stay", label: "ショートステイ" },
    { href: "/services/home-care", label: "訪問介護" },
    { href: "/services/group-home", label: "グループホーム" },
  ],
  about: [
    { href: "/about", label: "施設案内" },
    { href: "/about/philosophy", label: "理念・方針" },
    { href: "/about/staff", label: "スタッフ紹介" },
    { href: "/about/access", label: "アクセス" },
  ],
  info: [
    { href: "/news", label: "お知らせ" },
    { href: "/recruit", label: "採用情報" },
    { href: "/faq", label: "よくある質問" },
    { href: "/contact", label: "お問い合わせ" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[var(--color-primary)] text-[var(--color-secondary-light)]">
      {/* メインフッター */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* ロゴ・施設情報 */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="relative w-10 h-10">
                <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
                  <path
                    d="M20 4C12 4 6 12 6 20C6 28 12 36 20 36C20 28 16 20 20 12C24 20 20 28 20 36C28 36 34 28 34 20C34 12 28 4 20 4Z"
                    fill="var(--color-accent)"
                  />
                  <path
                    d="M20 12V36"
                    stroke="var(--color-secondary-light)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-white tracking-wider">
                  やすらぎの郷
                </span>
                <span className="text-[10px] text-[var(--color-secondary)] tracking-widest">
                  YASURAGI NO SATO
                </span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed mb-6 text-[var(--color-secondary)]">
              ご利用者様一人ひとりに寄り添い、<br />
              心温まる介護サービスを提供いたします。
            </p>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>〒XXX-XXXX<br />東京都〇〇区〇〇町1-2-3</span>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>0120-XXX-XXX（受付 9:00〜18:00）</span>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>info@yasuragi-example.jp</span>
              </div>
            </div>
          </div>

          {/* サービス */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm tracking-wider">
              サービス
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--color-secondary)] hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 施設案内 */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm tracking-wider">
              施設案内
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.about.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--color-secondary)] hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* インフォメーション */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm tracking-wider">
              インフォメーション
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.info.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--color-secondary)] hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* サブフッター */}
      <div className="border-t border-[var(--color-primary-light)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap justify-center gap-4 text-xs text-[var(--color-secondary)]">
              <Link href="/privacy" className="hover:text-white transition-colors">
                プライバシーポリシー
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                利用規約
              </Link>
              <Link href="/sitemap" className="hover:text-white transition-colors">
                サイトマップ
              </Link>
            </div>
            <p className="text-xs text-[var(--color-secondary)]">
              &copy; {new Date().getFullYear()} やすらぎの郷. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
