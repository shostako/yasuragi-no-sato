"use client";

import Image from "next/image";
import { PageContentProvider } from "../contexts/PageContentContext";
import { EditableText } from "./EditableText";

// 施設の特徴データ
const features = [
  {
    id: "care",
    title: "24時間体制のケア",
    description:
      "経験豊富なスタッフが24時間体制で見守り、緊急時にも迅速に対応いたします。",
    image: "/images/care-scene.jpg",
  },
  {
    id: "rehab",
    title: "充実したリハビリ設備",
    description:
      "専門の理学療法士による機能訓練で、自立した生活をサポートします。",
    image: "/images/walking-practice.jpg",
  },
  {
    id: "meal",
    title: "栄養バランスの取れた食事",
    description:
      "管理栄養士監修の献立で、美味しく健康的なお食事を提供いたします。",
    image: "/images/common-space.jpg",
  },
];

function FeaturesContent() {
  return (
    <section className="py-24 bg-[var(--color-base-warm)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* セクションヘッダー */}
        <div className="text-center mb-16">
          <p className="text-[var(--color-accent)] text-sm font-medium tracking-wider mb-2">
            FEATURES
          </p>
          <EditableText
            contentKey="features.title"
            defaultValue="施設の特徴"
            as="h2"
            className="section-title mx-auto after:left-1/2 after:-translate-x-1/2"
          />
        </div>

        {/* 特徴カード */}
        <div className="space-y-16">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              className={`flex flex-col ${
                index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              } gap-8 lg:gap-16 items-center`}
            >
              {/* 画像 */}
              <div className="w-full lg:w-1/2">
                <div className="relative aspect-[3/2] rounded-2xl overflow-hidden shadow-lg">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* テキスト */}
              <div className="w-full lg:w-1/2">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-4xl font-bold text-[var(--color-secondary)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="w-12 h-px bg-[var(--color-accent)]"></div>
                </div>
                <EditableText
                  contentKey={`features.${feature.id}.title`}
                  defaultValue={feature.title}
                  as="h3"
                  className="text-2xl font-semibold text-[var(--color-primary)] mb-4"
                />
                <EditableText
                  contentKey={`features.${feature.id}.description`}
                  defaultValue={feature.description}
                  as="p"
                  className="text-[var(--color-text-muted)] leading-relaxed"
                  multiline
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FeaturesSection() {
  return (
    <PageContentProvider pageId="home">
      <FeaturesContent />
    </PageContentProvider>
  );
}
