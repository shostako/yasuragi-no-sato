"use client";

import { useState, useEffect } from "react";
import { collection, getDocs, deleteDoc, doc, updateDoc, setDoc, query, orderBy, writeBatch } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { Calendar, Clock, User, Phone, Mail, Users, Trash2, Check, X, Filter } from "lucide-react";
import AdminAuthGuard from "../../components/admin/AdminAuthGuard";
import { Header, Footer } from "../../components";

// 予約データの型定義
interface Reservation {
  id: string;
  date: string;
  timeSlot: string;
  name: string;
  furigana: string;
  email: string;
  phone: string;
  relationship: string | null;
  participants: number;
  message: string | null;
  status: "pending" | "confirmed" | "cancelled";
  createdAt: { seconds: number; nanoseconds: number };
}

// 時間枠のラベル
const timeSlotLabels: Record<string, { label: string; time: string }> = {
  am: { label: "午前の部", time: "10:00〜11:30" },
  pm: { label: "午後の部", time: "14:00〜15:30" },
};

// ステータスのラベル
const statusLabels: Record<string, { label: string; color: string; bg: string }> = {
  pending: { label: "確認待ち", color: "text-amber-700", bg: "bg-amber-100" },
  confirmed: { label: "確定", color: "text-green-700", bg: "bg-green-100" },
  cancelled: { label: "キャンセル", color: "text-red-700", bg: "bg-red-100" },
};

// 関係性のラベル
const relationshipLabels: Record<string, string> = {
  self: "ご本人",
  family: "ご家族",
  caremgr: "ケアマネージャー",
  medical: "医療関係者",
  other: "その他",
};

export default function AdminReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    if (!db) {
      setError("Firebase is not initialized");
      setIsLoading(false);
      return;
    }

    try {
      const reservationsQuery = query(collection(db, "reservations"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(reservationsQuery);
      const data = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as Reservation[];

      setReservations(data);
    } catch (err) {
      console.error("Error fetching reservations:", err);
      setError("予約の取得に失敗しました");
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (id: string, newStatus: "confirmed" | "cancelled") => {
    if (!db) return;

    const reservation = reservations.find((r) => r.id === id);
    if (!reservation) return;

    const actionLabel = newStatus === "confirmed" ? "確定" : "キャンセル";
    if (!confirm(`この予約を${actionLabel}にしますか？`)) return;

    try {
      // バッチ処理でアトミックに更新
      const batch = writeBatch(db);
      const slotId = `${reservation.date}_${reservation.timeSlot}`;

      // ステータス更新
      batch.update(doc(db, "reservations", id), {
        status: newStatus,
      });

      // bookedSlotsの操作
      if (newStatus === "cancelled") {
        // キャンセル時はbookedSlotsから削除
        batch.delete(doc(db, "bookedSlots", slotId));
      } else if (newStatus === "confirmed") {
        // 確定時はbookedSlotsに追加（キャンセルからの復帰用）
        batch.set(doc(db, "bookedSlots", slotId), {
          date: reservation.date,
          timeSlot: reservation.timeSlot,
          reservationId: id,
        });
      }

      await batch.commit();

      setReservations(
        reservations.map((r) =>
          r.id === id ? { ...r, status: newStatus } : r
        )
      );
    } catch (err) {
      console.error("Error updating reservation:", err);
      alert("更新に失敗しました");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("この予約を削除しますか？この操作は取り消せません。")) return;
    if (!db) return;

    const reservation = reservations.find((r) => r.id === id);
    if (!reservation) return;

    try {
      // バッチ処理でアトミックに削除
      const batch = writeBatch(db);

      // 予約ドキュメント削除
      batch.delete(doc(db, "reservations", id));

      // bookedSlotsも削除（キャンセル済みでなければ）
      if (reservation.status !== "cancelled") {
        const slotId = `${reservation.date}_${reservation.timeSlot}`;
        batch.delete(doc(db, "bookedSlots", slotId));
      }

      await batch.commit();

      setReservations(reservations.filter((r) => r.id !== id));
    } catch (err) {
      console.error("Error deleting reservation:", err);
      alert("削除に失敗しました");
    }
  };

  const filteredReservations = reservations.filter((r) =>
    filterStatus === "all" ? true : r.status === filterStatus
  );

  const formatDate = (dateStr: string) => {
    const [year, month, day] = dateStr.split("-");
    const weekDays = ["日", "月", "火", "水", "木", "金", "土"];
    const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    return `${year}/${month}/${day}（${weekDays[date.getDay()]}）`;
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
              <h1 className="text-3xl font-bold text-gray-900">予約管理</h1>
              <p className="text-gray-600 mt-1">施設見学予約の確認・管理</p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                {error}
              </div>
            )}

            {/* 統計 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-lg shadow p-4">
                <p className="text-gray-600 text-sm">総予約数</p>
                <p className="text-3xl font-bold text-gray-900">{reservations.length}</p>
              </div>
              <div className="bg-white rounded-lg shadow p-4">
                <p className="text-gray-600 text-sm">確認待ち</p>
                <p className="text-3xl font-bold text-amber-600">
                  {reservations.filter((r) => r.status === "pending").length}
                </p>
              </div>
              <div className="bg-white rounded-lg shadow p-4">
                <p className="text-gray-600 text-sm">確定済み</p>
                <p className="text-3xl font-bold text-green-600">
                  {reservations.filter((r) => r.status === "confirmed").length}
                </p>
              </div>
              <div className="bg-white rounded-lg shadow p-4">
                <p className="text-gray-600 text-sm">キャンセル</p>
                <p className="text-3xl font-bold text-red-600">
                  {reservations.filter((r) => r.status === "cancelled").length}
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
                <option value="pending">確認待ちのみ</option>
                <option value="confirmed">確定済みのみ</option>
                <option value="cancelled">キャンセルのみ</option>
              </select>
              <span className="text-sm text-gray-500">
                {filteredReservations.length}件表示
              </span>
            </div>

            {/* 予約一覧 */}
            {filteredReservations.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-12 text-center">
                <p className="text-gray-600">
                  {filterStatus === "all" ? "予約がまだありません" : "該当する予約がありません"}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredReservations.map((reservation) => {
                  const slot = timeSlotLabels[reservation.timeSlot] || { label: reservation.timeSlot, time: "" };
                  const status = statusLabels[reservation.status];
                  const isExpanded = expandedId === reservation.id;

                  return (
                    <div
                      key={reservation.id}
                      className="bg-white rounded-lg shadow hover:shadow-md transition-shadow"
                    >
                      <div className="p-6">
                        {/* メイン情報 */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h2 className="text-xl font-bold text-gray-900">
                                {reservation.name} 様
                              </h2>
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-semibold ${status.bg} ${status.color}`}
                              >
                                {status.label}
                              </span>
                            </div>

                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {formatDate(reservation.date)}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {slot.label}（{slot.time}）
                              </span>
                              <span className="flex items-center gap-1">
                                <Users className="w-4 h-4" />
                                {reservation.participants}名
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* 展開/折りたたみ詳細 */}
                        <button
                          onClick={() => setExpandedId(isExpanded ? null : reservation.id)}
                          className="text-sm text-primary hover:underline mb-4"
                        >
                          {isExpanded ? "▲ 詳細を閉じる" : "▼ 詳細を表示"}
                        </button>

                        {isExpanded && (
                          <div className="bg-gray-50 rounded-lg p-4 mb-4 space-y-3 text-sm">
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4 text-gray-500" />
                              <span className="text-gray-600">フリガナ:</span>
                              <span>{reservation.furigana}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Mail className="w-4 h-4 text-gray-500" />
                              <span className="text-gray-600">メール:</span>
                              <a href={`mailto:${reservation.email}`} className="text-primary hover:underline">
                                {reservation.email}
                              </a>
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone className="w-4 h-4 text-gray-500" />
                              <span className="text-gray-600">電話:</span>
                              <a href={`tel:${reservation.phone}`} className="text-primary hover:underline">
                                {reservation.phone}
                              </a>
                            </div>
                            {reservation.relationship && (
                              <div className="flex items-center gap-2">
                                <User className="w-4 h-4 text-gray-500" />
                                <span className="text-gray-600">ご関係:</span>
                                <span>{relationshipLabels[reservation.relationship] || reservation.relationship}</span>
                              </div>
                            )}
                            {reservation.message && (
                              <div className="pt-2 border-t border-gray-200">
                                <p className="text-gray-600 mb-1">備考:</p>
                                <p className="whitespace-pre-wrap">{reservation.message}</p>
                              </div>
                            )}
                          </div>
                        )}

                        {/* アクション */}
                        <div className="flex flex-wrap gap-2">
                          {reservation.status === "pending" && (
                            <>
                              <button
                                onClick={() => handleStatusChange(reservation.id, "confirmed")}
                                className="px-4 py-2 text-sm border border-green-300 text-green-700 rounded-lg hover:bg-green-50 flex items-center gap-2"
                              >
                                <Check className="w-4 h-4" />
                                確定する
                              </button>
                              <button
                                onClick={() => handleStatusChange(reservation.id, "cancelled")}
                                className="px-4 py-2 text-sm border border-red-300 text-red-700 rounded-lg hover:bg-red-50 flex items-center gap-2"
                              >
                                <X className="w-4 h-4" />
                                キャンセル
                              </button>
                            </>
                          )}
                          {reservation.status === "confirmed" && (
                            <button
                              onClick={() => handleStatusChange(reservation.id, "cancelled")}
                              className="px-4 py-2 text-sm border border-red-300 text-red-700 rounded-lg hover:bg-red-50 flex items-center gap-2"
                            >
                              <X className="w-4 h-4" />
                              キャンセルに変更
                            </button>
                          )}
                          {reservation.status === "cancelled" && (
                            <button
                              onClick={() => handleStatusChange(reservation.id, "confirmed")}
                              className="px-4 py-2 text-sm border border-green-300 text-green-700 rounded-lg hover:bg-green-50 flex items-center gap-2"
                            >
                              <Check className="w-4 h-4" />
                              確定に変更
                            </button>
                          )}
                          <button
                            onClick={() => handleDelete(reservation.id)}
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
