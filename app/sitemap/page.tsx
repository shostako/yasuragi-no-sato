import Link from "next/link";
import { Header, Footer } from "../components";

export const metadata = {
  title: "サイトマップ | やすらぎの郷",
  description: "やすらぎの郷ウェブサイトのサイトマップです。",
};

const sitemapData = [
  {
    title: "トップ",
    links: [
      { name: "ホーム", href: "/" },
    ],
  },
  {
    title: "サービス",
    links: [
      { name: "サービス紹介", href: "/services" },
      { name: "デイサービス", href: "/services/day-service" },
      { name: "ショートステイ", href: "/services/short-stay" },
      { name: "訪問介護", href: "/services/home-care" },
      { name: "グループホーム", href: "/services/group-home" },
    ],
  },
  {
    title: "施設案内",
    links: [
      { name: "施設案内", href: "/about" },
      { name: "理念・方針", href: "/about/philosophy" },
      { name: "スタッフ紹介", href: "/about/staff" },
      { name: "アクセス", href: "/about/access" },
    ],
  },
  {
    title: "インフォメーション",
    links: [
      { name: "お知らせ", href: "/news" },
      { name: "採用情報", href: "/recruit" },
      { name: "よくある質問", href: "/faq" },
    ],
  },
  {
    title: "お問い合わせ・予約",
    links: [
      { name: "お問い合わせ", href: "/contact" },
      { name: "見学予約", href: "/reservation" },
    ],
  },
  {
    title: "会員",
    links: [
      { name: "ログイン", href: "/login" },
      { name: "新規登録", href: "/register" },
      { name: "会員ページ", href: "/member" },
    ],
  },
  {
    title: "その他",
    links: [
      { name: "プライバシーポリシー", href: "/privacy" },
      { name: "利用規約", href: "/terms" },
      { name: "サイトマップ", href: "/sitemap" },
    ],
  },
];

export default function SitemapPage() {
  return (
    <>
      <Header />

      <main>
        {/* ページヘッダー */}
        <section className="pt-32 pb-16 bg-gradient-warm texture-paper">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-[var(--color-accent)] text-sm font-medium tracking-wider mb-2">
                SITEMAP
              </p>
              <h1 className="text-3xl sm:text-4xl font-bold text-[var(--color-primary)] mb-4">
                サイトマップ
              </h1>
              <p className="text-[var(--color-text-muted)] max-w-2xl mx-auto">
                当サイトのページ一覧です
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
              <span className="text-[var(--color-primary)]">サイトマップ</span>
            </nav>
          </div>
        </div>

        {/* サイトマップ本文 */}
        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {sitemapData.map((category) => (
                <div key={category.title} className="bg-[var(--color-base)] rounded-2xl p-6">
                  <h2 className="text-lg font-bold text-[var(--color-primary)] mb-4 pb-2 border-b-2 border-[var(--color-accent)]">
                    {category.title}
                  </h2>
                  <ul className="space-y-3">
                    {category.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="flex items-center gap-2 text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors"
                        >
                          <svg
                            className="w-4 h-4 text-[var(--color-accent)]"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
