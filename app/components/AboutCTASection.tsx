"use client";

import Link from "next/link";
import { PageContentProvider } from "../contexts/PageContentContext";
import { EditableText } from "./EditableText";

function AboutCTAContent() {
  return (
    <section className="py-16 bg-[var(--color-primary)] text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <EditableText
          contentKey="cta.title"
          defaultValue="施設見学を受け付けています"
          as="h2"
          className="text-2xl sm:text-3xl font-bold mb-4"
        />
        <EditableText
          contentKey="cta.description"
          defaultValue="実際の施設の雰囲気をご覧いただけます。お気軽にお問い合わせください。"
          as="p"
          className="text-[var(--color-secondary)] mb-8 leading-relaxed"
        />
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="tel:0120-XXX-XXX"
            className="inline-flex items-center justify-center gap-2 bg-white text-[var(--color-primary)] px-8 py-4 rounded-full font-medium hover:bg-[var(--color-base)] transition-colors"
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
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 bg-[var(--color-accent)] text-white px-8 py-4 rounded-full font-medium hover:bg-[var(--color-accent-light)] transition-colors"
          >
            見学のご予約
          </Link>
        </div>
      </div>
    </section>
  );
}

export function AboutCTASection() {
  return (
    <PageContentProvider pageId="about">
      <AboutCTAContent />
    </PageContentProvider>
  );
}
