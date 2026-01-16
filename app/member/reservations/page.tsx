"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useAuth } from "../../contexts/AuthContext";
import { Header, Footer } from "../../components";
import { Calendar, Clock, Users, CheckCircle, XCircle, AlertCircle } from "lucide-react";

interface Reservation {
  id: string;
  date: string;
  timeSlot: string;
  name: string;
  participants: number;
  status: "pending" | "confirmed" | "cancelled";
  createdAt: { seconds: number; nanoseconds: number };
}

const timeSlotLabels: Record<string, { label: string; time: string }> = {
  am: { label: "午前の部", time: "10:00〜11:30" },
  pm: { label: "午後の部", time: "14:00〜15:30" },
};

const statusLabels: Record<string, { label: string; icon: React.ReactNode; color: string; bg: string }> = {
  pending: {
    label: "確認待ち",
    icon: <AlertCircle className="w-4 h-4" />,
    color: "text-amber-700",
    bg: "bg-amber-100",
  },
  confirmed: {
    label: "確定",
    icon: <CheckCircle className="w-4 h-4" />,
    color: "text-green-700",
    bg: "bg-green-100",
  },
  cancelled: {
    label: "キャンセル",
    icon: <XCircle className="w-4 h-4" />,
    color: "text-red-700",
    bg: "bg-red-100",
  },
};

export default function MemberReservationsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    const fetchReservations = async () => {
      if (!user || !db) return;

      try {
        const reservationsQuery = query(
          collection(db, "reservations"),
          where("uid", "==", user.uid),
          orderBy("createdAt", "desc")
        );
        const snapshot = await getDocs(reservationsQuery);
        const data = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        })) as Reservation[];

        setReservations(data);
      } catch (err) {
        console.error("Error fetching reservations:", err);
        setError("予約履歴の取得に失敗しました");
      } finally {
        setIsLoadingData(false);
      }
    };

    if (user) {
      fetchReservations();
    }
  }, [user]);

  const formatDate = (dateStr: string) => {
    const [year, month, day] = dateStr.split("-");
    const weekDays = ["日", "月", "火", "水", "木", "金", "土"];
    const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    return `${year}/${month}/${day}（${weekDays[date.getDay()]}）`;
  };

  if (loading || isLoadingData) {
    return (
      <>
        <Header />
        <main className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--color-primary)]"></div>
        </main>
        <Footer />
      </>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <>
      <Header />

      <main>
        {/* ページヘッダー */}
        <section className="pt-32 pb-16 bg-gradient-warm texture-paper">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-[var(--color-accent)] text-sm font-medium tracking-wider mb-2">
                RESERVATION HISTORY
              </p>
              <h1 className="text-3xl sm:text-4xl font-bold text-[var(--color-primary)] mb-4">
                予約履歴
              </h1>
              <p className="text-[var(--color-text-muted)] max-w-2xl mx-auto">
                過去の施設見学予約を確認できます
              </p>
            </div>
          </div>
        </section>

        {/* パンくずリスト */}
        <div className="bg-[var(--color-base)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
              <Link href="/" className="hover:text-[var(--color-primary)] transition-colors">
                ホーム
              </Link>
              <span>/</span>
              <Link href="/member" className="hover:text-[var(--color-primary)] transition-colors">
                会員ページ
              </Link>
              <span>/</span>
              <span className="text-[var(--color-primary)]">予約履歴</span>
            </nav>
          </div>
        </div>

        {/* メインコンテンツ */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                {error}
              </div>
            )}

            {reservations.length === 0 ? (
              <div className="bg-[var(--color-base)] rounded-2xl p-12 text-center">
                <Calendar className="w-12 h-12 text-[var(--color-text-muted)] mx-auto mb-4" />
                <p className="text-[var(--color-text-muted)] mb-4">予約履歴がありません</p>
                <Link href="/reservation" className="btn-primary inline-block">
                  施設見学を予約する
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {reservations.map((reservation) => {
                  const slot = timeSlotLabels[reservation.timeSlot] || { label: reservation.timeSlot, time: "" };
                  const status = statusLabels[reservation.status];

                  return (
                    <div
                      key={reservation.id}
                      className="bg-[var(--color-base)] rounded-2xl p-6 hover:shadow-md transition-shadow"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${status.bg} ${status.color}`}
                            >
                              {status.icon}
                              {status.label}
                            </span>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-[var(--color-primary)]">
                              <Calendar className="w-5 h-5" />
                              <span className="font-semibold text-lg">
                                {formatDate(reservation.date)}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-[var(--color-text-muted)]">
                              <Clock className="w-4 h-4" />
                              <span>{slot.label}（{slot.time}）</span>
                            </div>
                            <div className="flex items-center gap-2 text-[var(--color-text-muted)]">
                              <Users className="w-4 h-4" />
                              <span>見学人数: {reservation.participants}名</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* 戻るリンク */}
            <div className="mt-8 text-center">
              <Link
                href="/member"
                className="text-[var(--color-accent)] hover:text-[var(--color-primary)] transition-colors"
              >
                ← 会員ページに戻る
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
