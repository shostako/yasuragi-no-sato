"use client";

import { useState } from "react";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../lib/firebase";
import AdminAuthGuard from "../../components/admin/AdminAuthGuard";

const newsItems = [
  {
    id: 1,
    date: "2026.01.08",
    category: "お知らせ",
    title: "年末年始の営業時間について",
    summary: "年末年始期間中の営業時間についてお知らせいたします。",
    content: `いつもやすらぎの郷をご利用いただき、誠にありがとうございます。

年末年始期間中の営業時間について、下記のとおりお知らせいたします。

## 年末年始の営業日程

| 日程 | 営業状況 |
|------|----------|
| 12月29日（月） | 通常営業 |
| 12月30日（火） | 通常営業 |
| 12月31日（水） | 短縮営業（9:00〜15:00） |
| 1月1日（木） | 休業 |
| 1月2日（金） | 休業 |
| 1月3日（土） | 休業 |
| 1月4日（日） | 通常営業 |`,
    image: "/images/news/new-year.jpg",
    published: true,
  },
  {
    id: 2,
    date: "2026.01.05",
    category: "イベント",
    title: "新春イベント「書き初め大会」を開催します",
    summary: "1月15日に恒例の書き初め大会を開催いたします。ご家族の方もぜひご参加ください。",
    content: `新年あけましておめでとうございます。

やすらぎの郷では、毎年恒例の新春イベント「書き初め大会」を開催いたします。

## イベント概要

- **日時**: 2026年1月15日（木） 14:00〜16:00
- **場所**: やすらぎの郷 多目的ホール
- **対象**: ご利用者様、ご家族様
- **参加費**: 無料`,
    image: "/images/news/kakizome.jpg",
    published: true,
  },
  {
    id: 3,
    date: "2025.12.20",
    category: "採用",
    title: "介護スタッフ（正社員・パート）募集中",
    summary: "私たちと一緒に働きませんか？経験不問、研修制度も充実しています。",
    content: `やすらぎの郷では、介護スタッフを募集しております。

## 募集職種

### 正社員
- **職種**: 介護スタッフ
- **給与**: 月給22万円〜30万円（経験・資格により優遇）
- **勤務時間**: シフト制（実働8時間）
- **休日**: 週休2日制（シフト制）、年間休日110日`,
    image: "/images/news/staff-training.jpg",
    published: true,
  },
  {
    id: 4,
    date: "2025.12.15",
    category: "イベント",
    title: "クリスマス会のご報告",
    summary: "12月15日に開催したクリスマス会の様子をご報告いたします。",
    content: `12月15日（日）に開催いたしましたクリスマス会のご報告です。

## イベント概要

当日は50名を超えるご利用者様とご家族様にご参加いただき、
賑やかで温かいクリスマス会となりました。`,
    image: "/images/news/christmas.jpg",
    published: true,
  },
  {
    id: 5,
    date: "2025.12.01",
    category: "お知らせ",
    title: "インフルエンザ対策について",
    summary: "インフルエンザ流行シーズンに向けた当施設の感染対策についてお知らせいたします。",
    content: `インフルエンザ流行シーズンを迎えるにあたり、当施設の感染対策についてお知らせいたします。

## 施設での取り組み

### 予防対策
- 職員の予防接種実施（接種率100%）
- 手指消毒の徹底
- 施設内の換気強化
- 加湿器の設置`,
    image: "/images/news/infection-prevention.jpg",
    published: true,
  },
  {
    id: 6,
    date: "2025.11.20",
    category: "メディア",
    title: "地域情報誌に掲載されました",
    summary: "地域情報誌「〇〇タウン」に当施設が紹介されました。",
    content: `このたび、地域情報誌「〇〇タウン」12月号に、当施設の特集記事が掲載されました。

## 掲載内容

「地域に根ざした介護施設」をテーマに、当施設の取り組みや特徴について取材いただきました。`,
    image: "/images/news/media-coverage.jpg",
    published: true,
  },
];

export default function SeedPage() {
  const [status, setStatus] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const seedNews = async () => {
    if (!db) {
      setStatus("Error: Firebase is not initialized");
      return;
    }

    setIsLoading(true);
    setStatus("Seeding news data...");

    try {
      for (const news of newsItems) {
        const docRef = doc(db, "news", String(news.id));
        await setDoc(docRef, {
          ...news,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
        setStatus((prev) => prev + `\nAdded: ${news.title}`);
      }
      setStatus((prev) => prev + "\n\nSeed completed successfully!");
    } catch (error) {
      console.error("Seed error:", error);
      setStatus((prev) => prev + `\n\nError: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AdminAuthGuard>
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold mb-4">Database Seed Tool</h1>
          <p className="text-gray-600 mb-6">
            Click the button below to seed the news collection with initial data.
          </p>

          <button
            onClick={seedNews}
            disabled={isLoading}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Seeding..." : "Seed News Data"}
          </button>

          {status && (
            <pre className="mt-6 p-4 bg-gray-900 text-green-400 rounded overflow-auto whitespace-pre-wrap text-sm">
              {status}
            </pre>
          )}
        </div>
      </div>
    </AdminAuthGuard>
  );
}
