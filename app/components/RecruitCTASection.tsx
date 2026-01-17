"use client";

import Link from "next/link";
import { PageContentProvider } from "../contexts/PageContentContext";
import { EditableText } from "./EditableText";

function RecruitCTAContent() {
  return (
    <section className="py-20 bg-[var(--color-bg-secondary)]">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <EditableText
            contentKey="cta.title"
            defaultValue="ご応募・お問い合わせはこちら"
            as="h2"
            className="text-3xl md:text-4xl font-bold text-[var(--color-text)] mb-6"
          />
          <EditableText
            contentKey="cta.description"
            defaultValue="まずはお気軽にお問い合わせください。施設見学も随時受け付けております。"
            as="p"
            className="text-lg text-[var(--color-text-light)] mb-10"
            multiline
          />
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-[var(--color-primary)] text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-[var(--color-primary-dark)] transition-colors"
            >
              応募・お問い合わせ
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
              className="inline-flex items-center justify-center gap-2 bg-white text-[var(--color-primary)] px-10 py-4 rounded-full font-bold text-lg border-2 border-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition-colors"
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
          <p className="mt-6 text-sm text-[var(--color-text-light)]">
            受付時間：9:00〜18:00（年中無休）
          </p>
        </div>
      </div>
    </section>
  );
}

export function RecruitCTASection() {
  return (
    <PageContentProvider pageId="recruit">
      <RecruitCTAContent />
    </PageContentProvider>
  );
}
