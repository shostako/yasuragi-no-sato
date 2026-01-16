"use client";

import { useState } from "react";
import Link from "next/link";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useAuth } from "../contexts/AuthContext";
import { Header, Footer } from "../components";

// お問い合わせ種別
const inquiryTypes = [
  { id: "visit", label: "施設見学のご予約" },
  { id: "service", label: "サービスに関するご相談" },
  { id: "price", label: "料金・ご利用条件について" },
  { id: "recruit", label: "採用に関するお問い合わせ" },
  { id: "other", label: "その他" },
];

// フォームの型定義
interface FormData {
  inquiryType: string;
  name: string;
  furigana: string;
  email: string;
  phone: string;
  relationship: string;
  message: string;
  privacy: boolean;
}

export default function ContactPage() {
  const { user } = useAuth();
  const [formData, setFormData] = useState<FormData>({
    inquiryType: "",
    name: "",
    furigana: "",
    email: "",
    phone: "",
    relationship: "",
    message: "",
    privacy: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!formData.inquiryType) {
      newErrors.inquiryType = "お問い合わせ種別を選択してください";
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
    if (!formData.message.trim()) {
      newErrors.message = "お問い合わせ内容を入力してください";
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
      // Firestoreにお問い合わせを保存
      await addDoc(collection(db, "contacts"), {
        inquiryType: formData.inquiryType,
        name: formData.name,
        furigana: formData.furigana,
        email: formData.email,
        phone: formData.phone,
        relationship: formData.relationship || null,
        message: formData.message,
        status: "new", // 未対応
        uid: user?.uid || null, // ログインユーザーのID（紐付け用）
        createdAt: serverTimestamp(),
      });

      // メール通知（失敗しても送信は成功扱い）
      try {
        const inquiryLabel = inquiryTypes.find((t) => t.id === formData.inquiryType)?.label || formData.inquiryType;
        await fetch("/api/notify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "contact",
            data: {
              name: formData.name,
              email: formData.email,
              message: `【${inquiryLabel}】\n${formData.message}`,
            },
          }),
        });
      } catch (notifyError) {
        console.error("Email notify error:", notifyError);
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting contact form:", error);
      alert("送信に失敗しました。もう一度お試しください。");
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
      [name]: type === "checkbox" ? checked : value,
    }));

    // エラーをクリア
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  // 送信完了画面
  if (isSubmitted) {
    return (
      <>
        <Header />
        <main>
          <section className="pt-32 pb-16 bg-gradient-warm texture-paper">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <p className="text-[var(--color-accent)] text-sm font-medium tracking-wider mb-2">
                  CONTACT
                </p>
                <h1 className="text-3xl sm:text-4xl font-bold text-[var(--color-primary)] mb-4">
                  送信完了
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
                お問い合わせありがとうございます
              </h2>
              <p className="text-[var(--color-text-muted)] mb-8 leading-relaxed">
                お問い合わせを受け付けました。<br />
                担当者より2営業日以内にご連絡させていただきます。<br />
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
                CONTACT
              </p>
              <h1 className="text-3xl sm:text-4xl font-bold text-[var(--color-primary)] mb-4">
                お問い合わせ
              </h1>
              <p className="text-[var(--color-text-muted)] max-w-2xl mx-auto">
                施設見学や介護に関するご相談など、
                <br className="hidden sm:block" />
                お気軽にお問い合わせください。
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
              <span className="text-[var(--color-primary)]">お問い合わせ</span>
            </nav>
          </div>
        </div>

        {/* お問い合わせ情報 */}
        <section className="py-12 bg-[var(--color-base-warm)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 電話 */}
              <div className="bg-white rounded-2xl p-6 flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-[var(--color-secondary-light)] flex items-center justify-center text-[var(--color-primary)] shrink-0">
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-[var(--color-text-muted)] mb-1">お電話でのお問い合わせ</p>
                  <a href="tel:0120-XXX-XXX" className="text-2xl font-bold text-[var(--color-primary)] hover:text-[var(--color-accent)] transition-colors">
                    0120-XXX-XXX
                  </a>
                  <p className="text-xs text-[var(--color-text-muted)] mt-1">受付時間 9:00〜18:00（日祝除く）</p>
                </div>
              </div>

              {/* FAX */}
              <div className="bg-white rounded-2xl p-6 flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-[var(--color-secondary-light)] flex items-center justify-center text-[var(--color-primary)] shrink-0">
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-[var(--color-text-muted)] mb-1">FAXでのお問い合わせ</p>
                  <p className="text-2xl font-bold text-[var(--color-primary)]">
                    03-XXXX-XXXX
                  </p>
                  <p className="text-xs text-[var(--color-text-muted)] mt-1">24時間受付</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* フォーム */}
        <section className="py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="section-title mx-auto after:left-1/2 after:-translate-x-1/2">
                フォームからのお問い合わせ
              </h2>
              <p className="mt-6 text-[var(--color-text-muted)]">
                以下のフォームに必要事項をご入力の上、送信してください。
                <br />
                <span className="text-[var(--color-accent)]">*</span> は必須項目です。
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* お問い合わせ種別 */}
              <div>
                <label className="block text-sm font-medium text-[var(--color-primary)] mb-2">
                  お問い合わせ種別 <span className="text-[var(--color-accent)]">*</span>
                </label>
                <select
                  name="inquiryType"
                  value={formData.inquiryType}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.inquiryType
                      ? "border-red-400 focus:ring-red-200"
                      : "border-[var(--color-border)] focus:ring-[var(--color-secondary)]"
                  } bg-white focus:outline-none focus:ring-2 transition-all`}
                >
                  <option value="">選択してください</option>
                  {inquiryTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.label}
                    </option>
                  ))}
                </select>
                {errors.inquiryType && (
                  <p className="mt-1 text-sm text-red-500">{errors.inquiryType}</p>
                )}
              </div>

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

              {/* ご関係 */}
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

              {/* お問い合わせ内容 */}
              <div>
                <label className="block text-sm font-medium text-[var(--color-primary)] mb-2">
                  お問い合わせ内容 <span className="text-[var(--color-accent)]">*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  placeholder="お問い合わせ内容をご記入ください"
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.message
                      ? "border-red-400 focus:ring-red-200"
                      : "border-[var(--color-border)] focus:ring-[var(--color-secondary)]"
                  } bg-white focus:outline-none focus:ring-2 transition-all resize-none`}
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-500">{errors.message}</p>
                )}
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
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      送信する
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
