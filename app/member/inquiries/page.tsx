"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useAuth } from "../../contexts/AuthContext";
import { Header, Footer } from "../../components";
import { MessageSquare, Clock, CheckCircle, AlertCircle } from "lucide-react";

interface Contact {
  id: string;
  inquiryType: string;
  message: string;
  status: "new" | "in_progress" | "done";
  createdAt: { seconds: number; nanoseconds: number };
}

const inquiryTypeLabels: Record<string, string> = {
  visit: "施設見学のご予約",
  service: "サービスに関するご相談",
  price: "料金・ご利用条件について",
  recruit: "採用に関するお問い合わせ",
  other: "その他",
};

const statusLabels: Record<string, { label: string; icon: React.ReactNode; color: string; bg: string }> = {
  new: {
    label: "未対応",
    icon: <AlertCircle className="w-4 h-4" />,
    color: "text-red-700",
    bg: "bg-red-100",
  },
  in_progress: {
    label: "対応中",
    icon: <Clock className="w-4 h-4" />,
    color: "text-amber-700",
    bg: "bg-amber-100",
  },
  done: {
    label: "完了",
    icon: <CheckCircle className="w-4 h-4" />,
    color: "text-green-700",
    bg: "bg-green-100",
  },
};

export default function MemberInquiriesPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    const fetchContacts = async () => {
      if (!user || !db) return;

      try {
        const contactsQuery = query(
          collection(db, "contacts"),
          where("uid", "==", user.uid),
          orderBy("createdAt", "desc")
        );
        const snapshot = await getDocs(contactsQuery);
        const data = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        })) as Contact[];

        setContacts(data);
      } catch (err) {
        console.error("Error fetching contacts:", err);
        setError("お問い合わせ履歴の取得に失敗しました");
      } finally {
        setIsLoadingData(false);
      }
    };

    if (user) {
      fetchContacts();
    }
  }, [user]);

  const formatDate = (timestamp: { seconds: number; nanoseconds: number }) => {
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
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
                INQUIRY HISTORY
              </p>
              <h1 className="text-3xl sm:text-4xl font-bold text-[var(--color-primary)] mb-4">
                お問い合わせ履歴
              </h1>
              <p className="text-[var(--color-text-muted)] max-w-2xl mx-auto">
                過去のお問い合わせを確認できます
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
              <span className="text-[var(--color-primary)]">お問い合わせ履歴</span>
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

            {contacts.length === 0 ? (
              <div className="bg-[var(--color-base)] rounded-2xl p-12 text-center">
                <MessageSquare className="w-12 h-12 text-[var(--color-text-muted)] mx-auto mb-4" />
                <p className="text-[var(--color-text-muted)] mb-4">お問い合わせ履歴がありません</p>
                <Link href="/contact" className="btn-primary inline-block">
                  お問い合わせする
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {contacts.map((contact) => {
                  const status = statusLabels[contact.status];
                  const isExpanded = expandedId === contact.id;

                  return (
                    <div
                      key={contact.id}
                      className="bg-[var(--color-base)] rounded-2xl p-6 hover:shadow-md transition-shadow"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                        <div className="flex items-center gap-3">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${status.bg} ${status.color}`}
                          >
                            {status.icon}
                            {status.label}
                          </span>
                          <span className="text-sm text-[var(--color-text-muted)]">
                            {formatDate(contact.createdAt)}
                          </span>
                        </div>
                      </div>

                      <div className="mb-3">
                        <span className="inline-block px-3 py-1 bg-white rounded-lg text-sm text-[var(--color-primary)] border border-[var(--color-border)]">
                          {inquiryTypeLabels[contact.inquiryType] || contact.inquiryType}
                        </span>
                      </div>

                      <p className={`text-[var(--color-text)] ${!isExpanded ? "line-clamp-2" : ""}`}>
                        {contact.message}
                      </p>

                      {contact.message.length > 100 && (
                        <button
                          onClick={() => setExpandedId(isExpanded ? null : contact.id)}
                          className="mt-2 text-sm text-[var(--color-accent)] hover:underline"
                        >
                          {isExpanded ? "▲ 閉じる" : "▼ 続きを読む"}
                        </button>
                      )}
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
