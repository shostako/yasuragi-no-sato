"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { collection, addDoc, serverTimestamp, query, where, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useAuth } from "../contexts/AuthContext";
import { Header, Footer } from "../components";

// 時間枠の定義
const timeSlots = [
  { id: "am", label: "午前の部", time: "10:00〜11:30" },
  { id: "pm", label: "午後の部", time: "14:00〜15:30" },
];

// フォームの型定義
interface FormData {
  date: string;
  timeSlot: string;
  name: string;
  furigana: string;
  email: string;
  phone: string;
  relationship: string;
  participants: number;
  message: string;
  privacy: boolean;
}

// カレンダー用のヘルパー関数
function getCalendarDays(year: number, month: number) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startDayOfWeek = firstDay.getDay();

  const days: (number | null)[] = [];

  // 先月の空白
  for (let i = 0; i < startDayOfWeek; i++) {
    days.push(null);
  }

  // 今月の日付
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  return days;
}

function formatDate(year: number, month: number, day: number): string {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export default function ReservationPage() {
  const { user } = useAuth();
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [bookedSlots, setBookedSlots] = useState<Record<string, string[]>>({});

  const [formData, setFormData] = useState<FormData>({
    date: "",
    timeSlot: "",
    name: "",
    furigana: "",
    email: "",
    phone: "",
    relationship: "",
    participants: 1,
    message: "",
    privacy: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  // 予約済み時間枠を取得
  useEffect(() => {
    const fetchBookedSlots = async () => {
      if (!db) return;

      try {
        const reservationsRef = collection(db, "reservations");
        const q = query(reservationsRef, where("status", "!=", "cancelled"));
        const snapshot = await getDocs(q);

        const slots: Record<string, string[]> = {};
        snapshot.forEach((doc) => {
          const data = doc.data();
          if (!slots[data.date]) {
            slots[data.date] = [];
          }
          slots[data.date].push(data.timeSlot);
        });

        setBookedSlots(slots);
      } catch (error) {
        console.error("Error fetching booked slots:", error);
      }
    };

    fetchBookedSlots();
  }, []);

  const calendarDays = getCalendarDays(currentYear, currentMonth);
  const weekDays = ["日", "月", "火", "水", "木", "金", "土"];

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentYear(currentYear - 1);
      setCurrentMonth(11);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentYear(currentYear + 1);
      setCurrentMonth(0);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const isDateSelectable = (day: number): boolean => {
    const date = new Date(currentYear, currentMonth, day);
    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);

    // 過去の日付は選択不可
    if (date < todayDate) return false;

    // 今日から3日以内は選択不可（準備期間）
    const minDate = new Date(todayDate);
    minDate.setDate(minDate.getDate() + 3);
    if (date < minDate) return false;

    // 日曜・祝日は選択不可（簡易的に日曜のみ）
    if (date.getDay() === 0) return false;

    return true;
  };

  const isSlotAvailable = (date: string, slotId: string): boolean => {
    if (!bookedSlots[date]) return true;
    return !bookedSlots[date].includes(slotId);
  };

  const selectDate = (day: number) => {
    if (!isDateSelectable(day)) return;

    const dateStr = formatDate(currentYear, currentMonth, day);
    setFormData((prev) => ({ ...prev, date: dateStr, timeSlot: "" }));

    if (errors.date) {
      setErrors((prev) => ({ ...prev, date: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!formData.date) {
      newErrors.date = "ご希望日を選択してください";
    }
    if (!formData.timeSlot) {
      newErrors.timeSlot = "時間枠を選択してください";
    }
    if (!formData.name.trim()) {
      newErrors.name = "お名前を入力してください";
    }
    if (!formData.furigana.trim()) {
      newErrors.furigana = "フリガナを入力してください";
    }
    if (!formData.email.trim()) {
      newErrors.email = "メールアドレスを入力してください";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "正しいメールアドレスを入力してください";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "電話番号を入力してください";
    }
    if (formData.participants < 1 || formData.participants > 5) {
      newErrors.participants = "見学人数は1〜5名で入力してください";
    }
    if (!formData.privacy) {
      newErrors.privacy = "プライバシーポリシーに同意してください";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      if (!db) {
        throw new Error("Firebase is not initialized");
      }

      // Firestoreに予約を保存
      await addDoc(collection(db, "reservations"), {
        date: formData.date,
        timeSlot: formData.timeSlot,
        name: formData.name,
        furigana: formData.furigana,
        email: formData.email,
        phone: formData.phone,
        relationship: formData.relationship || null,
        participants: formData.participants,
        message: formData.message || null,
        status: "pending", // 確認待ち
        uid: user?.uid || null, // ログインユーザーのID（紐付け用）
        createdAt: serverTimestamp(),
      });

      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting reservation:", error);
      alert("予約の送信に失敗しました。もう一度お試しください。");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : type === "number" ? parseInt(value) || 1 : value,
    }));

    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  // 送信完了画面
  if (isSubmitted) {
    const selectedSlot = timeSlots.find((s) => s.id === formData.timeSlot);

    return (
      <>
        <Header />
        <main>
          <section className="pt-32 pb-16 bg-gradient-warm texture-paper">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <p className="text-[var(--color-accent)] text-sm font-medium tracking-wider mb-2">
                  RESERVATION
                </p>
                <h1 className="text-3xl sm:text-4xl font-bold text-[var(--color-primary)] mb-4">
                  予約受付完了
                </h1>
              </div>
            </div>
          </section>

          <section className="py-16 bg-white">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <div className="w-20 h-20 rounded-full bg-[var(--color-accent)] text-white flex items-center justify-center mx-auto mb-8">
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-4">
                ご予約ありがとうございます
              </h2>

              <div className="bg-[var(--color-base)] rounded-2xl p-6 mb-8 text-left">
                <h3 className="font-semibold text-[var(--color-primary)] mb-4">ご予約内容</h3>
                <dl className="space-y-2 text-sm">
                  <div className="flex">
                    <dt className="w-24 text-[var(--color-text-muted)]">ご希望日</dt>
                    <dd className="text-[var(--color-text)]">{formData.date.replace(/-/g, "/")}（{weekDays[new Date(formData.date).getDay()]}）</dd>
                  </div>
                  <div className="flex">
                    <dt className="w-24 text-[var(--color-text-muted)]">時間枠</dt>
                    <dd className="text-[var(--color-text)]">{selectedSlot?.label}（{selectedSlot?.time}）</dd>
                  </div>
                  <div className="flex">
                    <dt className="w-24 text-[var(--color-text-muted)]">お名前</dt>
                    <dd className="text-[var(--color-text)]">{formData.name} 様</dd>
                  </div>
                  <div className="flex">
                    <dt className="w-24 text-[var(--color-text-muted)]">見学人数</dt>
                    <dd className="text-[var(--color-text)]">{formData.participants}名</dd>
                  </div>
                </dl>
              </div>

              <p className="text-[var(--color-text-muted)] mb-8 leading-relaxed">
                ご入力いただいたメールアドレスに確認メールをお送りしました。<br />
                担当者より1営業日以内にご連絡させていただきます。<br />
                今しばらくお待ちくださいませ。
              </p>
              <Link href="/" className="btn-primary">
                トップページへ戻る
              </Link>
            </div>
          </section>
        </main>
        <Footer />
      </>
    );
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
                RESERVATION
              </p>
              <h1 className="text-3xl sm:text-4xl font-bold text-[var(--color-primary)] mb-4">
                施設見学予約
              </h1>
              <p className="text-[var(--color-text-muted)] max-w-2xl mx-auto">
                やすらぎの郷の施設見学をご希望の方は、
                <br className="hidden sm:block" />
                こちらからご予約ください。
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
              <span className="text-[var(--color-primary)]">施設見学予約</span>
            </nav>
          </div>
        </div>

        {/* 見学案内 */}
        <section className="py-12 bg-[var(--color-base-warm)]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl p-6 md:p-8">
              <h2 className="text-lg font-semibold text-[var(--color-primary)] mb-4">施設見学について</h2>
              <ul className="space-y-3 text-sm text-[var(--color-text)]">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[var(--color-accent)] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>見学時間は約1時間〜1時間半程度です</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[var(--color-accent)] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>ご家族様同伴でのご見学を歓迎いたします（最大5名様まで）</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[var(--color-accent)] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>駐車場を完備しております（無料）</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[var(--color-accent)] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>ご予約は見学希望日の3日前までにお願いいたします</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 予約フォーム */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <form onSubmit={handleSubmit} className="space-y-12">
              {/* ステップ1: 日時選択 */}
              <div>
                <h2 className="text-xl font-semibold text-[var(--color-primary)] mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-[var(--color-accent)] text-white flex items-center justify-center text-sm font-bold">1</span>
                  ご希望日時の選択
                </h2>

                {/* カレンダー */}
                <div className="bg-[var(--color-base)] rounded-2xl p-4 md:p-6 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <button
                      type="button"
                      onClick={prevMonth}
                      className="p-2 rounded-full hover:bg-white transition-colors"
                    >
                      <svg className="w-5 h-5 text-[var(--color-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <h3 className="text-lg font-semibold text-[var(--color-primary)]">
                      {currentYear}年{currentMonth + 1}月
                    </h3>
                    <button
                      type="button"
                      onClick={nextMonth}
                      className="p-2 rounded-full hover:bg-white transition-colors"
                    >
                      <svg className="w-5 h-5 text-[var(--color-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>

                  <div className="grid grid-cols-7 gap-1">
                    {weekDays.map((day, i) => (
                      <div
                        key={day}
                        className={`text-center text-sm font-medium py-2 ${
                          i === 0 ? "text-red-500" : i === 6 ? "text-blue-500" : "text-[var(--color-text-muted)]"
                        }`}
                      >
                        {day}
                      </div>
                    ))}

                    {calendarDays.map((day, index) => {
                      if (day === null) {
                        return <div key={`empty-${index}`} className="p-2" />;
                      }

                      const dateStr = formatDate(currentYear, currentMonth, day);
                      const isSelectable = isDateSelectable(day);
                      const isSelected = formData.date === dateStr;
                      const dayOfWeek = new Date(currentYear, currentMonth, day).getDay();

                      return (
                        <button
                          key={day}
                          type="button"
                          onClick={() => selectDate(day)}
                          disabled={!isSelectable}
                          className={`p-2 text-center rounded-lg transition-all ${
                            isSelected
                              ? "bg-[var(--color-accent)] text-white font-semibold"
                              : isSelectable
                              ? "hover:bg-white text-[var(--color-text)] cursor-pointer"
                              : "text-gray-300 cursor-not-allowed"
                          } ${dayOfWeek === 0 && isSelectable ? "text-red-400" : ""} ${
                            dayOfWeek === 6 && isSelectable ? "text-blue-400" : ""
                          }`}
                        >
                          {day}
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-4 flex flex-wrap gap-4 text-xs text-[var(--color-text-muted)]">
                    <div className="flex items-center gap-1">
                      <span className="w-4 h-4 rounded bg-gray-100"></span>
                      <span>選択不可</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="w-4 h-4 rounded bg-[var(--color-accent)]"></span>
                      <span>選択中</span>
                    </div>
                  </div>
                </div>

                {errors.date && (
                  <p className="text-sm text-red-500 mb-4">{errors.date}</p>
                )}

                {/* 時間枠選択 */}
                {formData.date && (
                  <div className="space-y-3">
                    <p className="text-sm font-medium text-[var(--color-primary)]">
                      時間枠を選択してください <span className="text-[var(--color-accent)]">*</span>
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {timeSlots.map((slot) => {
                        const available = isSlotAvailable(formData.date, slot.id);
                        const isSelected = formData.timeSlot === slot.id;

                        return (
                          <button
                            key={slot.id}
                            type="button"
                            onClick={() => {
                              if (available) {
                                setFormData((prev) => ({ ...prev, timeSlot: slot.id }));
                                if (errors.timeSlot) {
                                  setErrors((prev) => ({ ...prev, timeSlot: undefined }));
                                }
                              }
                            }}
                            disabled={!available}
                            className={`p-4 rounded-xl border-2 transition-all text-left ${
                              isSelected
                                ? "border-[var(--color-accent)] bg-[var(--color-accent)]/5"
                                : available
                                ? "border-[var(--color-border)] hover:border-[var(--color-secondary)]"
                                : "border-gray-200 bg-gray-50 cursor-not-allowed"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <p className={`font-semibold ${available ? "text-[var(--color-primary)]" : "text-gray-400"}`}>
                                  {slot.label}
                                </p>
                                <p className={`text-sm ${available ? "text-[var(--color-text-muted)]" : "text-gray-400"}`}>
                                  {slot.time}
                                </p>
                              </div>
                              {!available && (
                                <span className="text-xs bg-gray-200 text-gray-500 px-2 py-1 rounded">
                                  予約済
                                </span>
                              )}
                              {isSelected && (
                                <svg className="w-6 h-6 text-[var(--color-accent)]" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                </svg>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                    {errors.timeSlot && (
                      <p className="text-sm text-red-500">{errors.timeSlot}</p>
                    )}
                  </div>
                )}
              </div>

              {/* ステップ2: お客様情報 */}
              <div>
                <h2 className="text-xl font-semibold text-[var(--color-primary)] mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-[var(--color-accent)] text-white flex items-center justify-center text-sm font-bold">2</span>
                  お客様情報の入力
                </h2>

                <div className="space-y-6">
                  {/* 名前・フリガナ */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-[var(--color-primary)] mb-2">
                        お名前 <span className="text-[var(--color-accent)]">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="山田 太郎"
                        className={`w-full px-4 py-3 rounded-xl border ${
                          errors.name
                            ? "border-red-400 focus:ring-red-200"
                            : "border-[var(--color-border)] focus:ring-[var(--color-secondary)]"
                        } bg-white focus:outline-none focus:ring-2 transition-all`}
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[var(--color-primary)] mb-2">
                        フリガナ <span className="text-[var(--color-accent)]">*</span>
                      </label>
                      <input
                        type="text"
                        name="furigana"
                        value={formData.furigana}
                        onChange={handleChange}
                        placeholder="ヤマダ タロウ"
                        className={`w-full px-4 py-3 rounded-xl border ${
                          errors.furigana
                            ? "border-red-400 focus:ring-red-200"
                            : "border-[var(--color-border)] focus:ring-[var(--color-secondary)]"
                        } bg-white focus:outline-none focus:ring-2 transition-all`}
                      />
                      {errors.furigana && (
                        <p className="mt-1 text-sm text-red-500">{errors.furigana}</p>
                      )}
                    </div>
                  </div>

                  {/* メール・電話 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-[var(--color-primary)] mb-2">
                        メールアドレス <span className="text-[var(--color-accent)]">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="example@email.com"
                        className={`w-full px-4 py-3 rounded-xl border ${
                          errors.email
                            ? "border-red-400 focus:ring-red-200"
                            : "border-[var(--color-border)] focus:ring-[var(--color-secondary)]"
                        } bg-white focus:outline-none focus:ring-2 transition-all`}
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[var(--color-primary)] mb-2">
                        電話番号 <span className="text-[var(--color-accent)]">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="090-1234-5678"
                        className={`w-full px-4 py-3 rounded-xl border ${
                          errors.phone
                            ? "border-red-400 focus:ring-red-200"
                            : "border-[var(--color-border)] focus:ring-[var(--color-secondary)]"
                        } bg-white focus:outline-none focus:ring-2 transition-all`}
                      />
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                      )}
                    </div>
                  </div>

                  {/* 関係・人数 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-[var(--color-primary)] mb-2">
                        ご利用者様とのご関係
                      </label>
                      <select
                        name="relationship"
                        value={formData.relationship}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)] transition-all"
                      >
                        <option value="">選択してください</option>
                        <option value="self">ご本人</option>
                        <option value="family">ご家族</option>
                        <option value="caremgr">ケアマネージャー</option>
                        <option value="medical">医療関係者</option>
                        <option value="other">その他</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[var(--color-primary)] mb-2">
                        見学人数 <span className="text-[var(--color-accent)]">*</span>
                      </label>
                      <select
                        name="participants"
                        value={formData.participants}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-xl border ${
                          errors.participants
                            ? "border-red-400 focus:ring-red-200"
                            : "border-[var(--color-border)] focus:ring-[var(--color-secondary)]"
                        } bg-white focus:outline-none focus:ring-2 transition-all`}
                      >
                        {[1, 2, 3, 4, 5].map((n) => (
                          <option key={n} value={n}>
                            {n}名
                          </option>
                        ))}
                      </select>
                      {errors.participants && (
                        <p className="mt-1 text-sm text-red-500">{errors.participants}</p>
                      )}
                    </div>
                  </div>

                  {/* 備考 */}
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-primary)] mb-2">
                      ご質問・ご要望など
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      placeholder="見学時にご確認されたいことなどございましたらご記入ください"
                      className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)] transition-all resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* プライバシーポリシー */}
              <div className="bg-[var(--color-base)] rounded-xl p-6">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="privacy"
                    name="privacy"
                    checked={formData.privacy}
                    onChange={handleChange}
                    className="mt-1 w-5 h-5 rounded border-[var(--color-border)] text-[var(--color-accent)] focus:ring-[var(--color-secondary)]"
                  />
                  <label htmlFor="privacy" className="text-sm text-[var(--color-text)]">
                    <Link
                      href="/privacy"
                      className="text-[var(--color-accent)] underline hover:text-[var(--color-primary)]"
                      target="_blank"
                    >
                      プライバシーポリシー
                    </Link>
                    に同意の上、送信してください。
                    <span className="text-[var(--color-accent)]">*</span>
                  </label>
                </div>
                {errors.privacy && (
                  <p className="mt-2 text-sm text-red-500">{errors.privacy}</p>
                )}
              </div>

              {/* 送信ボタン */}
              <div className="text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary inline-flex items-center gap-2 px-12 py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      送信中...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      予約を確定する
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
