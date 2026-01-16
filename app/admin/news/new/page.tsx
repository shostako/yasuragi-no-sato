"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { collection, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db, storage } from "../../../lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { NewsFormData, NewsCategory, ImageLayout, NewsImage } from "../../../types/news";
import ImageUploader from "../../../components/admin/ImageUploader";
import ImageLayoutSelector from "../../../components/admin/ImageLayoutSelector";
import AdminAuthGuard from "../../../components/admin/AdminAuthGuard";
import { Header, Footer } from "../../../components";
import { ArrowLeft, Save, Eye } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const categories: NewsCategory[] = ["お知らせ", "イベント", "採用", "メディア"];

export default function NewNewsPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const [formData, setFormData] = useState<NewsFormData>({
    title: "",
    category: "お知らせ",
    summary: "",
    content: "",
    images: [],
    imageLayout: "single",
    date: new Date().toISOString().split("T")[0].replace(/-/g, "."),
    published: false,
    memberOnly: false,
  });

  const handleImageChange = (images: NewsImage[]) => {
    setFormData({ ...formData, images });
  };

  const handleLayoutChange = (layout: ImageLayout) => {
    setFormData({ ...formData, imageLayout: layout });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!db || !storage) {
      setError("Firebase is not initialized");
      return;
    }

    if (!formData.title.trim()) {
      setError("タイトルを入力してください");
      return;
    }

    setIsLoading(true);

    try {
      // 新しいドキュメントIDを生成
      const newsRef = doc(collection(db, "news"));
      const newsId = newsRef.id;

      // base64画像をFirebase Storageにアップロード
      const uploadedImages: NewsImage[] = [];
      for (let i = 0; i < formData.images.length; i++) {
        const image = formData.images[i];

        // base64データの場合のみアップロード
        if (image.url.startsWith("data:")) {
          const response = await fetch(image.url);
          const blob = await response.blob();
          const timestamp = Date.now();
          const filename = `${timestamp}-${i}.jpg`;
          const storageRef = ref(storage, `news-images/${newsId}/${filename}`);

          await uploadBytes(storageRef, blob);
          const downloadURL = await getDownloadURL(storageRef);

          uploadedImages.push({
            url: downloadURL,
            alt: image.alt,
            caption: image.caption,
          });
        } else {
          // 既にURLの場合はそのまま
          uploadedImages.push(image);
        }
      }

      // Firestoreに保存
      await setDoc(newsRef, {
        id: newsId,
        title: formData.title,
        category: formData.category,
        summary: formData.summary,
        content: formData.content,
        images: uploadedImages,
        imageLayout: formData.imageLayout,
        date: formData.date,
        published: formData.published,
        memberOnly: formData.memberOnly,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      router.push("/admin/news");
    } catch (err) {
      console.error("Error creating news:", err);
      setError("投稿の作成に失敗しました");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AdminAuthGuard>
      <>
        <Header />
        <main className="pt-32 pb-16 min-h-screen bg-gray-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ヘッダー */}
        <div className="mb-6">
          <Link
            href="/admin/news"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-primary mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            お知らせ一覧に戻る
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">新規投稿作成</h1>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 基本情報 */}
          <div className="bg-white rounded-lg shadow p-6 space-y-4">
            <h2 className="text-xl font-semibold mb-4">基本情報</h2>

            {/* タイトル */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                タイトル <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="例: 新春イベント「書き初め大会」を開催します"
              />
            </div>

            {/* カテゴリと日付 */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  カテゴリ
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value as NewsCategory })
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  公開日
                </label>
                <input
                  type="text"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="2026.01.08"
                />
              </div>
            </div>

            {/* サマリー */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                要約
              </label>
              <textarea
                value={formData.summary}
                onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                rows={2}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="記事の要約を入力（一覧ページに表示されます）"
              />
            </div>

            {/* 本文 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                本文
              </label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows={12}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-mono text-sm"
                placeholder="Markdown形式で記事本文を入力&#10;&#10;## 見出し&#10;&#10;本文..."
              />
              <p className="text-sm text-gray-500 mt-1">
                Markdown記法が使えます（##見出し、**太字**など）
              </p>
            </div>
          </div>

          {/* 画像 */}
          <div className="bg-white rounded-lg shadow p-6 space-y-4">
            <h2 className="text-xl font-semibold mb-4">画像</h2>

            <ImageUploader images={formData.images} onChange={handleImageChange} />

            {formData.images.length > 0 && (
              <ImageLayoutSelector
                value={formData.imageLayout}
                onChange={handleLayoutChange}
                imageCount={formData.images.length}
              />
            )}
          </div>

          {/* 公開設定 */}
          <div className="bg-white rounded-lg shadow p-6 space-y-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.published}
                onChange={(e) =>
                  setFormData({ ...formData, published: e.target.checked })
                }
                className="w-5 h-5 text-primary rounded focus:ring-2 focus:ring-primary"
              />
              <span className="text-gray-700">
                この記事を公開する
                {!formData.published && (
                  <span className="ml-2 text-sm text-gray-500">（下書き保存）</span>
                )}
              </span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.memberOnly}
                onChange={(e) =>
                  setFormData({ ...formData, memberOnly: e.target.checked })
                }
                className="w-5 h-5 text-primary rounded focus:ring-2 focus:ring-primary"
              />
              <span className="text-gray-700">
                会員限定記事にする
                {formData.memberOnly && (
                  <span className="ml-2 text-sm text-gray-500">（ログインユーザーのみ閲覧可）</span>
                )}
              </span>
            </label>
          </div>

          {/* 送信ボタン */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Save className="w-5 h-5" />
              {isLoading ? "保存中..." : "投稿を保存"}
            </button>

            <button
              type="button"
              onClick={() => setShowPreview(!showPreview)}
              className="px-6 py-3 border-2 border-gray-300 rounded-lg font-semibold hover:border-primary hover:text-primary flex items-center gap-2"
            >
              <Eye className="w-5 h-5" />
              プレビュー
            </button>
          </div>
        </form>

        {/* プレビュー */}
        {showPreview && (
          <div className="mt-8 bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4">プレビュー</h2>
            <div className="prose max-w-none">
              <h1>{formData.title || "タイトル未入力"}</h1>
              <p className="text-gray-600">{formData.date} | {formData.category}</p>
              {formData.summary && (
                <p className="text-lg text-gray-700">{formData.summary}</p>
              )}
              {formData.content && (
                <div className="whitespace-pre-wrap">{formData.content}</div>
              )}
              {formData.images.length > 0 && (
                <div className="mt-6">
                  <p className="text-sm text-gray-500 mb-2">
                    画像レイアウト: {formData.imageLayout}
                  </p>
                  <div
                    className={`
                      grid gap-4
                      ${formData.imageLayout === "grid-2" ? "grid-cols-2" : ""}
                      ${formData.imageLayout === "grid-3" ? "grid-cols-3" : ""}
                    `}
                  >
                    {formData.images.map((img, i) => (
                      <div key={i}>
                        <div className="relative aspect-video">
                          <Image src={img.url} alt={img.alt} fill className="rounded-lg object-cover" />
                        </div>
                        {img.caption && (
                          <p className="text-sm text-gray-600 mt-1">{img.caption}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
          </div>
        </main>
        <Footer />
      </>
    </AdminAuthGuard>
  );
}
