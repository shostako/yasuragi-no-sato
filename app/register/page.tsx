"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../contexts/AuthContext";
import { Header, Footer } from "../components";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    privacy: false,
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { signUp } = useAuth();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // バリデーション
    if (formData.password.length < 6) {
      setError("パスワードは6文字以上で入力してください");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("パスワードが一致しません");
      return;
    }

    if (!formData.privacy) {
      setError("プライバシーポリシーに同意してください");
      return;
    }

    setIsLoading(true);

    try {
      await signUp(formData.email, formData.password, formData.name);
      router.push("/member");
    } catch (err: unknown) {
      console.error("Registration error:", err);
      if (err instanceof Error) {
        if (err.message.includes("email-already-in-use")) {
          setError("このメールアドレスは既に登録されています");
        } else if (err.message.includes("invalid-email")) {
          setError("有効なメールアドレスを入力してください");
        } else if (err.message.includes("weak-password")) {
          setError("パスワードが弱すぎます。6文字以上で入力してください");
        } else {
          setError("登録に失敗しました。もう一度お試しください");
        }
      } else {
        setError("登録に失敗しました。もう一度お試しください");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />

      <main>
        {/* ページヘッダー */}
        <section className="pt-32 pb-16 bg-gradient-warm texture-paper">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-[var(--color-accent)] text-sm font-medium tracking-wider mb-2">
                MEMBER REGISTRATION
              </p>
              <h1 className="text-3xl sm:text-4xl font-bold text-[var(--color-primary)] mb-4">
                新規会員登録
              </h1>
              <p className="text-[var(--color-text-muted)] max-w-2xl mx-auto">
                会員登録をすると、施設からのお知らせや<br className="hidden sm:block" />
                特別なサービスをご利用いただけます。
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
              <span className="text-[var(--color-primary)]">新規会員登録</span>
            </nav>
          </div>
        </div>

        {/* 登録フォーム */}
        <section className="py-16 bg-white">
          <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-[var(--color-border)]">
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
                    {error}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-[var(--color-primary)] mb-2">
                    お名前 <span className="text-[var(--color-accent)]">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)] transition-all"
                    placeholder="山田 太郎"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--color-primary)] mb-2">
                    メールアドレス <span className="text-[var(--color-accent)]">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)] transition-all"
                    placeholder="example@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--color-primary)] mb-2">
                    パスワード <span className="text-[var(--color-accent)]">*</span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength={6}
                    className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)] transition-all"
                    placeholder="6文字以上"
                  />
                  <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                    6文字以上で入力してください
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--color-primary)] mb-2">
                    パスワード（確認） <span className="text-[var(--color-accent)]">*</span>
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)] transition-all"
                    placeholder="パスワードを再入力"
                  />
                </div>

                <div className="bg-[var(--color-base)] rounded-xl p-4">
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
                      と
                      <Link
                        href="/terms"
                        className="text-[var(--color-accent)] underline hover:text-[var(--color-primary)]"
                        target="_blank"
                      >
                        利用規約
                      </Link>
                      に同意します
                      <span className="text-[var(--color-accent)]">*</span>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "登録中..." : "会員登録する"}
                </button>
              </form>

              <div className="mt-8 pt-6 border-t border-[var(--color-border)] text-center">
                <p className="text-sm text-[var(--color-text-muted)]">
                  すでにアカウントをお持ちの方は
                  <Link
                    href="/login"
                    className="text-[var(--color-accent)] hover:text-[var(--color-primary)] transition-colors ml-1"
                  >
                    ログイン
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
