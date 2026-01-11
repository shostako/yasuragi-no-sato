"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

const navItems = [
  { href: "/", label: "ホーム" },
  { href: "/services", label: "サービス紹介" },
  { href: "/about", label: "施設案内" },
  { href: "/news", label: "お知らせ" },
  { href: "/recruit", label: "採用情報" },
  { href: "/reservation", label: "見学予約" },
  { href: "/contact", label: "お問い合わせ" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, loading } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* ロゴ */}
          <Link
            href="/"
            className="flex items-center gap-3 group"
          >
            {/* 葉っぱのアイコン */}
            <div className="relative w-10 h-10">
              <svg
                viewBox="0 0 40 40"
                fill="none"
                className="w-full h-full"
              >
                <path
                  d="M20 4C12 4 6 12 6 20C6 28 12 36 20 36C20 28 16 20 20 12C24 20 20 28 20 36C28 36 34 28 34 20C34 12 28 4 20 4Z"
                  fill="var(--color-accent)"
                  className="transition-all duration-300 group-hover:fill-[var(--color-accent-light)]"
                />
                <path
                  d="M20 12V36"
                  stroke="var(--color-primary)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-[var(--color-primary)] tracking-wider">
                やすらぎの郷
              </span>
              <span className="text-[10px] text-[var(--color-text-muted)] tracking-widest">
                YASURAGI NO SATO
              </span>
            </div>
          </Link>

          {/* デスクトップナビゲーション */}
          <nav className="hidden xl:flex items-center gap-0.5">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative px-3 py-2 text-sm font-medium text-[var(--color-text)]
                         whitespace-nowrap
                         hover:text-[var(--color-primary)] transition-colors duration-200
                         after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2
                         after:w-0 after:h-0.5 after:bg-[var(--color-accent)]
                         after:transition-all after:duration-300
                         hover:after:w-2/3"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTAボタン */}
          <div className="hidden xl:flex items-center gap-3">
            <a
              href="tel:0120-XXX-XXX"
              className="flex items-center gap-1.5 text-sm text-[var(--color-text-muted)] whitespace-nowrap"
            >
              <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="font-medium">0120-XXX-XXX</span>
            </a>
            {!loading && (
              user ? (
                <Link
                  href="/member"
                  className="flex items-center gap-1.5 text-sm px-4 py-2 rounded-full border-2 border-[var(--color-accent)] text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-white transition-colors whitespace-nowrap"
                >
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  会員ページ
                </Link>
              ) : (
                <Link
                  href="/login"
                  className="flex items-center gap-1.5 text-sm px-4 py-2 rounded-full border-2 border-[var(--color-border)] text-[var(--color-text)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors whitespace-nowrap"
                >
                  ログイン
                </Link>
              )
            )}
            <Link
              href="/reservation"
              className="btn-primary text-sm px-4 py-2 whitespace-nowrap"
            >
              見学予約
            </Link>
          </div>

          {/* モバイルメニューボタン */}
          <button
            className="xl:hidden p-2 text-[var(--color-primary)]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="メニュー"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* モバイルメニュー */}
      <div
        className={`xl:hidden absolute top-20 right-0 overflow-hidden transition-all duration-300 ${
          isMobileMenuOpen ? "max-h-screen" : "max-h-0"
        }`}
      >
        <nav className="bg-white border-t border-l border-[var(--color-border)] px-4 py-2 w-64 shadow-lg">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block py-2.5 text-sm text-[var(--color-text)] hover:text-[var(--color-primary)]
                       border-b border-[var(--color-border)] last:border-0"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-3 pt-3 border-t border-[var(--color-border)]">
            <a
              href="tel:0120-XXX-XXX"
              className="flex items-center justify-center gap-2 py-2 text-sm text-[var(--color-text-muted)]"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="font-medium">0120-XXX-XXX</span>
            </a>
            {!loading && (
              user ? (
                <Link
                  href="/member"
                  className="block w-full text-center py-2.5 text-sm rounded-full border-2 border-[var(--color-accent)] text-[var(--color-accent)] font-medium mt-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  会員ページ
                </Link>
              ) : (
                <Link
                  href="/login"
                  className="block w-full text-center py-2.5 text-sm rounded-full border-2 border-[var(--color-border)] text-[var(--color-text)] font-medium mt-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  ログイン
                </Link>
              )
            )}
            <Link
              href="/reservation"
              className="block w-full text-center btn-primary text-sm py-2.5 mt-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              見学予約
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
