"use client";

import Image from "next/image";
import Link from "next/link";
import { PageContentProvider } from "../contexts/PageContentContext";
import { EditableText } from "./EditableText";

function HeroContent() {
  return (
    <section className="relative min-h-screen flex items-center">
      {/* 背景画像 */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-building.png"
          alt="やすらぎの郷 施設外観"
          fill
          className="object-cover"
          priority
        />
        {/* スモークオーバーレイ（柔らかい印象に） */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-white/40 to-transparent" />
      </div>

      {/* コンテンツ */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="max-w-2xl">
          {/* キャッチコピー */}
          <EditableText
            contentKey="hero.catchphrase"
            defaultValue="心に寄り添う、あたたかな介護"
            as="p"
            className="text-[var(--color-accent)] font-medium mb-4 animate-fade-in-up"
          />
          <EditableText
            contentKey="hero.title"
            defaultValue="あなたらしい毎日をここから。"
            as="h1"
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--color-primary)] mb-6 leading-tight animate-fade-in-up delay-100"
          />
          <EditableText
            contentKey="hero.description"
            defaultValue="やすらぎの郷は、ご利用者様一人ひとりの人生に寄り添い、笑顔あふれる毎日をサポートいたします。"
            as="p"
            className="text-lg text-[var(--color-text-muted)] mb-8 leading-relaxed animate-fade-in-up delay-200"
            multiline
          />

          {/* CTAボタン */}
          <div className="flex flex-wrap gap-4 animate-fade-in-up delay-300">
            <Link href="/contact" className="btn-primary">
              見学のご予約
            </Link>
            <Link href="/services" className="btn-secondary">
              サービス詳細
            </Link>
          </div>
        </div>
      </div>

      {/* スクロールインジケーター */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-[var(--color-primary)]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
}

export function HeroSection() {
  return (
    <PageContentProvider pageId="home">
      <HeroContent />
    </PageContentProvider>
  );
}
