"use client";

import { useState, useEffect } from "react";
import { collection, getDocs, deleteDoc, doc, updateDoc, query, orderBy } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { News } from "../../types/news";
import Link from "next/link";
import Image from "next/image";
import { Plus, Edit, Trash2, Eye, EyeOff, Calendar, Tag } from "lucide-react";
import AdminAuthGuard from "../../components/admin/AdminAuthGuard";
import { Header, Footer } from "../../components";

export default function AdminNewsPage() {
  const [newsList, setNewsList] = useState<News[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    if (!db) {
      setError("Firebase is not initialized");
      setIsLoading(false);
      return;
    }

    try {
      const newsQuery = query(collection(db, "news"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(newsQuery);
      const news = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as News[];

      setNewsList(news);
    } catch (err) {
      console.error("Error fetching news:", err);
      setError("お知らせの取得に失敗しました");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("この投稿を削除しますか？")) return;
    if (!db) return;

    try {
      await deleteDoc(doc(db, "news", id));
      setNewsList(newsList.filter((news) => news.id !== id));
    } catch (err) {
      console.error("Error deleting news:", err);
      alert("削除に失敗しました");
    }
  };

  const togglePublished = async (id: string, currentStatus: boolean) => {
    if (!db) return;

    try {
      await updateDoc(doc(db, "news", id), {
        published: !currentStatus,
      });

      setNewsList(
        newsList.map((news) =>
          news.id === id ? { ...news, published: !currentStatus } : news
        )
      );
    } catch (err) {
      console.error("Error updating news:", err);
      alert("更新に失敗しました");
    }
  };

  if (isLoading) {
    return (
      <AdminAuthGuard>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-gray-600">読み込み中...</div>
        </div>
      </AdminAuthGuard>
    );
  }

  return (
    <AdminAuthGuard>
      <>
        <Header />
        <main className="pt-32 pb-16 min-h-screen bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ヘッダー */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">お知らせ管理</h1>
            <p className="text-gray-600 mt-1">投稿の作成・編集・削除</p>
          </div>
          <Link
            href="/admin/news/new"
            className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            新規投稿
          </Link>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        {/* 統計 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-gray-600 text-sm">総投稿数</p>
            <p className="text-3xl font-bold text-gray-900">{newsList.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-gray-600 text-sm">公開中</p>
            <p className="text-3xl font-bold text-green-600">
              {newsList.filter((n) => n.published).length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-gray-600 text-sm">下書き</p>
            <p className="text-3xl font-bold text-amber-600">
              {newsList.filter((n) => !n.published).length}
            </p>
          </div>
        </div>

        {/* 投稿一覧 */}
        {newsList.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <p className="text-gray-600 mb-4">投稿がまだありません</p>
            <Link
              href="/admin/news/new"
              className="inline-flex items-center gap-2 text-primary hover:underline"
            >
              <Plus className="w-4 h-4" />
              最初の投稿を作成
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {newsList.map((news) => (
              <div
                key={news.id}
                className="bg-white rounded-lg shadow hover:shadow-md transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h2 className="text-xl font-bold text-gray-900">
                          {news.title}
                        </h2>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            news.published
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {news.published ? "公開中" : "下書き"}
                        </span>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {news.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Tag className="w-4 h-4" />
                          {news.category}
                        </span>
                        {news.images && news.images.length > 0 && (
                          <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
                            画像{news.images.length}枚
                          </span>
                        )}
                      </div>

                      <p className="text-gray-700">{news.summary}</p>
                    </div>

                    {/* サムネイル */}
                    {news.images && news.images.length > 0 && (
                      <div className="ml-4 w-32 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 relative">
                        <Image
                          src={news.images[0].url}
                          alt={news.images[0].alt}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                  </div>

                  {/* アクション */}
                  <div className="flex gap-2">
                    <Link
                      href={`/news/${news.id}`}
                      target="_blank"
                      className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
                    >
                      <Eye className="w-4 h-4" />
                      表示
                    </Link>

                    <Link
                      href={`/admin/news/${news.id}/edit`}
                      className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
                    >
                      <Edit className="w-4 h-4" />
                      編集
                    </Link>

                    <button
                      onClick={() => togglePublished(news.id, news.published)}
                      className={`px-4 py-2 text-sm border rounded-lg flex items-center gap-2 ${
                        news.published
                          ? "border-amber-300 text-amber-700 hover:bg-amber-50"
                          : "border-green-300 text-green-700 hover:bg-green-50"
                      }`}
                    >
                      {news.published ? (
                        <>
                          <EyeOff className="w-4 h-4" />
                          非公開にする
                        </>
                      ) : (
                        <>
                          <Eye className="w-4 h-4" />
                          公開する
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => handleDelete(news.id)}
                      className="px-4 py-2 text-sm border border-red-300 text-red-700 rounded-lg hover:bg-red-50 flex items-center gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      削除
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
          </div>
        </main>
        <Footer />
      </>
    </AdminAuthGuard>
  );
}
