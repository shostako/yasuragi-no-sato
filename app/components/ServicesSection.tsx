"use client";

import Link from "next/link";
import { PageContentProvider } from "../contexts/PageContentContext";
import { EditableText } from "./EditableText";

// サービス一覧データ
const services = [
  {
    id: "day-service",
    title: "デイサービス",
    description: "日帰りで食事や入浴、機能訓練などのサービスを受けられます。",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
    ),
  },
  {
    id: "short-stay",
    title: "ショートステイ",
    description: "短期間の宿泊サービス。ご家族の介護負担軽減をサポートします。",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        />
      </svg>
    ),
  },
  {
    id: "home-care",
    title: "訪問介護",
    description: "ご自宅にホームヘルパーが訪問し、日常生活をサポートします。",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
  },
  {
    id: "group-home",
    title: "グループホーム",
    description: "認知症の方が少人数で共同生活を送る、家庭的な環境の施設です。",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    ),
  },
];

function ServicesContent() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* セクションヘッダー */}
        <div className="text-center mb-16">
          <p className="text-[var(--color-accent)] text-sm font-medium tracking-wider mb-2">
            SERVICES
          </p>
          <EditableText
            contentKey="services.title"
            defaultValue="サービス紹介"
            as="h2"
            className="section-title mx-auto after:left-1/2 after:-translate-x-1/2"
          />
          <EditableText
            contentKey="services.description"
            defaultValue="ご利用者様のニーズに合わせた多様なサービスをご用意しております。お気軽にご相談ください。"
            as="p"
            className="mt-8 text-[var(--color-text-muted)] max-w-2xl mx-auto"
            multiline
          />
        </div>

        {/* サービスカード */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Link
              key={service.id}
              href={`/services/${service.id}`}
              className="card p-6 group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-14 h-14 rounded-full bg-[var(--color-secondary-light)] flex items-center justify-center mb-4 text-[var(--color-primary)] group-hover:bg-[var(--color-accent)] group-hover:text-white transition-all duration-300">
                {service.icon}
              </div>
              <h3 className="text-lg font-semibold text-[var(--color-primary)] mb-2">
                {service.title}
              </h3>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                {service.description}
              </p>
              <div className="mt-4 flex items-center text-sm font-medium text-[var(--color-accent)] group-hover:text-[var(--color-primary)] transition-colors">
                詳しく見る
                <svg
                  className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform"
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
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ServicesSection() {
  return (
    <PageContentProvider pageId="home">
      <ServicesContent />
    </PageContentProvider>
  );
}
