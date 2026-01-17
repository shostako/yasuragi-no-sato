"use client";

import Link from "next/link";
import { PageContentProvider } from "../contexts/PageContentContext";
import { EditableText } from "./EditableText";

function RecruitHeroContent() {
  return (
    <section className="relative bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] text-white py-24 md:py-32">
      <div className="absolute inset-0 bg-[url('/images/hero-building.png')] bg-cover bg-center opacity-20"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <p className="text-[var(--color-accent)] font-medium mb-4 tracking-wider">
            RECRUIT
          </p>
          <EditableText
            contentKey="hero.title"
            defaultValue="一緒に、笑顔を届けませんか"
            as="h1"
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
          />
          <EditableText
            contentKey="hero.subtitle"
            defaultValue="やすらぎの郷で、あなたの力を"
            as="p"
            className="text-xl md:text-2xl mb-8 opacity-90"
          />
          <EditableText
            contentKey="hero.description"
            defaultValue="私たちは、ご利用者様の笑顔のために日々努力しています。あなたも一緒に、温かい介護の現場で働いてみませんか？未経験の方も、ブランクのある方も大歓迎です。"
            as="p"
            className="text-lg leading-relaxed opacity-80 max-w-2xl"
            multiline
          />
          <div className="mt-10">
            <Link
              href="#positions"
              className="inline-flex items-center gap-2 bg-white text-[var(--color-primary)] px-8 py-4 rounded-full font-bold text-lg hover:bg-[var(--color-accent)] hover:text-[var(--color-primary-dark)] transition-colors"
            >
              募集職種を見る
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
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function RecruitHeroSection() {
  return (
    <PageContentProvider pageId="recruit">
      <RecruitHeroContent />
    </PageContentProvider>
  );
}
