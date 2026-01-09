"use client";

import { useState } from "react";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import Link from "next/link";
import { faqCategories, faqItems } from "@/app/data/faq";

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 9l-7 7-7-7"
      />
    </svg>
  );
}

function FAQAccordion({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-[var(--color-border)] rounded-xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-5 flex items-center justify-between gap-4 text-left bg-white hover:bg-[var(--color-bg-secondary)] transition-colors"
      >
        <div className="flex items-start gap-4">
          <span className="flex-shrink-0 w-8 h-8 bg-[var(--color-primary)] text-white rounded-full flex items-center justify-center font-bold text-sm">
            Q
          </span>
          <span className="font-bold text-[var(--color-text)] pt-0.5">
            {question}
          </span>
        </div>
        <ChevronDownIcon
          className={`w-5 h-5 text-[var(--color-text-light)] flex-shrink-0 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="bg-[var(--color-bg-secondary)] p-5 border-t border-[var(--color-border)]">
          <div className="flex items-start gap-4">
            <span className="flex-shrink-0 w-8 h-8 bg-[var(--color-accent)] text-[var(--color-primary-dark)] rounded-full flex items-center justify-center font-bold text-sm">
              A
            </span>
            <p className="text-[var(--color-text)] pt-0.5 leading-relaxed">
              {answer}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredItems = activeCategory
    ? faqItems.filter((item) => item.categoryId === activeCategory)
    : faqItems;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* ヘッダーセクション */}
        <section className="bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] text-white py-16 md:py-20">
          <div className="container mx-auto px-4">
            <p className="text-[var(--color-accent)] font-medium mb-2">FAQ</p>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              よくある質問
            </h1>
            <p className="text-lg opacity-80">
              お客様からよくいただくご質問にお答えします
            </p>
          </div>
        </section>

        {/* パンくずリスト */}
        <div className="bg-[var(--color-bg-secondary)] py-3">
          <div className="container mx-auto px-4">
            <nav className="text-sm text-[var(--color-text-light)]">
              <Link href="/" className="hover:text-[var(--color-primary)]">
                ホーム
              </Link>
              <span className="mx-2">/</span>
              <span className="text-[var(--color-text)]">よくある質問</span>
            </nav>
          </div>
        </div>

        {/* FAQセクション */}
        <section className="py-16 md:py-20 bg-white">
          <div className="container mx-auto px-4">
            {/* カテゴリタブ */}
            <div className="flex flex-wrap gap-3 mb-10 justify-center">
              <button
                onClick={() => setActiveCategory(null)}
                className={`px-5 py-2.5 rounded-full font-medium transition-colors ${
                  activeCategory === null
                    ? "bg-[var(--color-primary)] text-white"
                    : "bg-[var(--color-bg-secondary)] text-[var(--color-text)] hover:bg-[var(--color-primary)]/10"
                }`}
              >
                すべて
              </button>
              {faqCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-5 py-2.5 rounded-full font-medium transition-colors ${
                    activeCategory === category.id
                      ? "bg-[var(--color-primary)] text-white"
                      : "bg-[var(--color-bg-secondary)] text-[var(--color-text)] hover:bg-[var(--color-primary)]/10"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* FAQ一覧 */}
            <div className="max-w-3xl mx-auto space-y-4">
              {filteredItems.map((item) => (
                <FAQAccordion
                  key={item.id}
                  question={item.question}
                  answer={item.answer}
                />
              ))}
            </div>

            {filteredItems.length === 0 && (
              <p className="text-center text-[var(--color-text-light)] py-10">
                該当するご質問がありません
              </p>
            )}
          </div>
        </section>

        {/* CTAセクション */}
        <section className="py-16 bg-[var(--color-bg-secondary)]">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-text)] mb-4">
                ご不明な点がございましたら
              </h2>
              <p className="text-[var(--color-text-light)] mb-8">
                こちらに掲載されていないご質問や、より詳しい情報をお求めの場合は、
                お気軽にお問い合わせください。
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-[var(--color-primary)] text-white px-8 py-4 rounded-full font-bold hover:bg-[var(--color-primary-dark)] transition-colors"
                >
                  お問い合わせ
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </Link>
                <a
                  href="tel:0120-XXX-XXX"
                  className="inline-flex items-center justify-center gap-2 bg-white text-[var(--color-primary)] px-8 py-4 rounded-full font-bold border-2 border-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  0120-XXX-XXX
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
