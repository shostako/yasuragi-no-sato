"use client";

import { useState, useEffect } from "react";
import { collection, getDocs, deleteDoc, doc, updateDoc, query, orderBy } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { User, Phone, Mail, MessageSquare, Trash2, Clock, CheckCircle, Filter } from "lucide-react";
import AdminAuthGuard from "../../components/admin/AdminAuthGuard";
import { Header, Footer } from "../../components";

// お問い合わせデータの型定義
interface Contact {
  id: string;
  inquiryType: string;
  name: string;
  furigana: string;
  email: string;
  phone: string;
  relationship: string | null;
  message: string;
  status: "new" | "in_progress" | "done";
  createdAt: { seconds: number; nanoseconds: number };
}

// 問い合わせ種別のラベル
const inquiryTypeLabels: Record<string, string> = {
  visit: "施設見学のご予約",
  service: "サービスに関するご相談",
  price: "料金・ご利用条件について",
  recruit: "採用に関するお問い合わせ",
  other: "その他",
};

// ステータスのラベル
const statusLabels: Record<string, { label: string; color: string; bg: string }> = {
  new: { label: "未対応", color: "text-red-700", bg: "bg-red-100" },
  in_progress: { label: "対応中", color: "text-amber-700", bg: "bg-amber-100" },
  done: { label: "完了", color: "text-green-700", bg: "bg-green-100" },
};

// 関係性のラベル
const relationshipLabels: Record<string, string> = {
  self: "ご本人",
  family: "ご家族",
  caremgr: "ケアマネージャー",
  medical: "医療関係者",
  other: "その他",
};

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    if (!db) {
      setError("Firebase is not initialized");
      setIsLoading(false);
      return;
    }

    try {
      const contactsQuery = query(collection(db, "contacts"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(contactsQuery);
      const data = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as Contact[];

      setContacts(data);
    } catch (err) {
      console.error("Error fetching contacts:", err);
      setError("お問い合わせの取得に失敗しました");
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (id: string, newStatus: "new" | "in_progress" | "done") => {
    if (!db) return;

    try {
      await updateDoc(doc(db, "contacts", id), {
        status: newStatus,
      });

      setContacts(
        contacts.map((c) =>
          c.id === id ? { ...c, status: newStatus } : c
        )
      );
    } catch (err) {
      console.error("Error updating contact:", err);
      alert("更新に失敗しました");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("このお問い合わせを削除しますか？この操作は取り消せません。")) return;
    if (!db) return;

    try {
      await deleteDoc(doc(db, "contacts", id));
      setContacts(contacts.filter((c) => c.id !== id));
    } catch (err) {
      console.error("Error deleting contact:", err);
      alert("削除に失敗しました");
    }
  };

  const filteredContacts = contacts.filter((c) =>
    filterStatus === "all" ? true : c.status === filterStatus
  );

  const formatDate = (timestamp: { seconds: number; nanoseconds: number }) => {
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
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
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900">お問い合わせ管理</h1>
              <p className="text-gray-600 mt-1">受信したお問い合わせの確認・対応状況管理</p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                {error}
              </div>
            )}

            {/* 統計 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-lg shadow p-4">
                <p className="text-gray-600 text-sm">総件数</p>
                <p className="text-3xl font-bold text-gray-900">{contacts.length}</p>
              </div>
              <div className="bg-white rounded-lg shadow p-4">
                <p className="text-gray-600 text-sm">未対応</p>
                <p className="text-3xl font-bold text-red-600">
                  {contacts.filter((c) => c.status === "new").length}
                </p>
              </div>
              <div className="bg-white rounded-lg shadow p-4">
                <p className="text-gray-600 text-sm">対応中</p>
                <p className="text-3xl font-bold text-amber-600">
                  {contacts.filter((c) => c.status === "in_progress").length}
                </p>
              </div>
              <div className="bg-white rounded-lg shadow p-4">
                <p className="text-gray-600 text-sm">完了</p>
                <p className="text-3xl font-bold text-green-600">
                  {contacts.filter((c) => c.status === "done").length}
                </p>
              </div>
            </div>

            {/* フィルター */}
            <div className="mb-6 flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-500" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="all">すべて表示</option>
                <option value="new">未対応のみ</option>
                <option value="in_progress">対応中のみ</option>
                <option value="done">完了のみ</option>
              </select>
              <span className="text-sm text-gray-500">
                {filteredContacts.length}件表示
              </span>
            </div>

            {/* お問い合わせ一覧 */}
            {filteredContacts.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-12 text-center">
                <p className="text-gray-600">
                  {filterStatus === "all" ? "お問い合わせがまだありません" : "該当するお問い合わせがありません"}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredContacts.map((contact) => {
                  const status = statusLabels[contact.status];
                  const isExpanded = expandedId === contact.id;

                  return (
                    <div
                      key={contact.id}
                      className="bg-white rounded-lg shadow hover:shadow-md transition-shadow"
                    >
                      <div className="p-6">
                        {/* メイン情報 */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h2 className="text-xl font-bold text-gray-900">
                                {contact.name} 様
                              </h2>
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-semibold ${status.bg} ${status.color}`}
                              >
                                {status.label}
                              </span>
                            </div>

                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-2">
                              <span className="flex items-center gap-1">
                                <MessageSquare className="w-4 h-4" />
                                {inquiryTypeLabels[contact.inquiryType] || contact.inquiryType}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {formatDate(contact.createdAt)}
                              </span>
                            </div>

                            {/* メッセージプレビュー */}
                            <p className="text-gray-700 line-clamp-2">
                              {contact.message}
                            </p>
                          </div>
                        </div>

                        {/* 展開/折りたたみ詳細 */}
                        <button
                          onClick={() => setExpandedId(isExpanded ? null : contact.id)}
                          className="text-sm text-primary hover:underline mb-4"
                        >
                          {isExpanded ? "▲ 詳細を閉じる" : "▼ 詳細を表示"}
                        </button>

                        {isExpanded && (
                          <div className="bg-gray-50 rounded-lg p-4 mb-4 space-y-3 text-sm">
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4 text-gray-500" />
                              <span className="text-gray-600">フリガナ:</span>
                              <span>{contact.furigana}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Mail className="w-4 h-4 text-gray-500" />
                              <span className="text-gray-600">メール:</span>
                              <a href={`mailto:${contact.email}`} className="text-primary hover:underline">
                                {contact.email}
                              </a>
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone className="w-4 h-4 text-gray-500" />
                              <span className="text-gray-600">電話:</span>
                              <a href={`tel:${contact.phone}`} className="text-primary hover:underline">
                                {contact.phone}
                              </a>
                            </div>
                            {contact.relationship && (
                              <div className="flex items-center gap-2">
                                <User className="w-4 h-4 text-gray-500" />
                                <span className="text-gray-600">ご関係:</span>
                                <span>{relationshipLabels[contact.relationship] || contact.relationship}</span>
                              </div>
                            )}
                            <div className="pt-2 border-t border-gray-200">
                              <p className="text-gray-600 mb-1">お問い合わせ内容:</p>
                              <p className="whitespace-pre-wrap">{contact.message}</p>
                            </div>
                          </div>
                        )}

                        {/* アクション */}
                        <div className="flex flex-wrap gap-2">
                          {contact.status === "new" && (
                            <button
                              onClick={() => handleStatusChange(contact.id, "in_progress")}
                              className="px-4 py-2 text-sm border border-amber-300 text-amber-700 rounded-lg hover:bg-amber-50 flex items-center gap-2"
                            >
                              <Clock className="w-4 h-4" />
                              対応中にする
                            </button>
                          )}
                          {(contact.status === "new" || contact.status === "in_progress") && (
                            <button
                              onClick={() => handleStatusChange(contact.id, "done")}
                              className="px-4 py-2 text-sm border border-green-300 text-green-700 rounded-lg hover:bg-green-50 flex items-center gap-2"
                            >
                              <CheckCircle className="w-4 h-4" />
                              完了にする
                            </button>
                          )}
                          {contact.status === "done" && (
                            <button
                              onClick={() => handleStatusChange(contact.id, "new")}
                              className="px-4 py-2 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-2"
                            >
                              未対応に戻す
                            </button>
                          )}
                          <button
                            onClick={() => handleDelete(contact.id)}
                            className="px-4 py-2 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-2"
                          >
                            <Trash2 className="w-4 h-4" />
                            削除
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </main>
        <Footer />
      </>
    </AdminAuthGuard>
  );
}
