"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../contexts/AuthContext";
import { Header, Footer } from "../components";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showResetForm, setShowResetForm] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetSent, setResetSent] = useState(false);

  const { signIn, resetPassword } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await signIn(email, password);
      router.push("/member");
    } catch (err: unknown) {
      console.error("Login error:", err);
      if (err instanceof Error) {
        if (err.message.includes("invalid-credential") || err.message.includes("wrong-password")) {
          setError("メールアドレスまたはパスワードが正しくありません");
        } else if (err.message.includes("user-not-found")) {
          setError("このメールアドレスは登録されていません");
        } else if (err.message.includes("too-many-requests")) {
          setError("ログイン試行回数が多すぎます。しばらくしてからお試しください");
        } else {
          setError("ログインに失敗しました。もう一度お試しください");
        }
      } else {
        setError("ログインに失敗しました。もう一度お試しください");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await resetPassword(resetEmail);
      setResetSent(true);
    } catch (err: unknown) {
      console.error("Reset password error:", err);
      if (err instanceof Error && err.message.includes("user-not-found")) {
        setError("このメールアドレスは登録されていません");
      } else {
        setError("パスワードリセットメールの送信に失敗しました");
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
                MEMBER LOGIN
              </p>
              <h1 className="text-3xl sm:text-4xl font-bold text-[var(--color-primary)] mb-4">
                会員ログイン
              </h1>
              <p className="text-[var(--color-text-muted)] max-w-2xl mx-auto">
                会員専用ページにログインしてください。
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
              <span className="text-[var(--color-primary)]">ログイン</span>
            </nav>
          </div>
        </div>

        {/* ログインフォーム */}
        <section className="py-16 bg-white">
          <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
            {showResetForm ? (
              // パスワードリセットフォーム
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-[var(--color-border)]">
                <h2 className="text-xl font-semibold text-[var(--color-primary)] mb-6 text-center">
                  パスワードをお忘れの方
                </h2>

                {resetSent ? (
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-[var(--color-accent)] text-white flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-[var(--color-text-muted)] mb-6">
                      パスワードリセット用のメールを送信しました。<br />
                      メールに記載されたリンクからパスワードを再設定してください。
                    </p>
                    <button
                      onClick={() => {
                        setShowResetForm(false);
                        setResetSent(false);
                        setResetEmail("");
                      }}
                      className="text-[var(--color-accent)] hover:text-[var(--color-primary)] transition-colors"
                    >
                      ログイン画面に戻る
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleResetPassword} className="space-y-6">
                    <p className="text-sm text-[var(--color-text-muted)] mb-4">
                      ご登録のメールアドレスを入力してください。パスワードリセット用のメールをお送りします。
                    </p>

                    {error && (
                      <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
                        {error}
                      </div>
                    )}

                    <div>
                      <label className="block text-sm font-medium text-[var(--color-primary)] mb-2">
                        メールアドレス
                      </label>
                      <input
                        type="email"
                        value={resetEmail}
                        onChange={(e) => setResetEmail(e.target.value)}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)] transition-all"
                        placeholder="example@email.com"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? "送信中..." : "リセットメールを送信"}
                    </button>

                    <div className="text-center">
                      <button
                        type="button"
                        onClick={() => {
                          setShowResetForm(false);
                          setError("");
                        }}
                        className="text-sm text-[var(--color-accent)] hover:text-[var(--color-primary)] transition-colors"
                      >
                        ログイン画面に戻る
                      </button>
                    </div>
                  </form>
                )}
              </div>
            ) : (
              // ログインフォーム
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-[var(--color-border)]">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
                      {error}
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-[var(--color-primary)] mb-2">
                      メールアドレス
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)] transition-all"
                      placeholder="example@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[var(--color-primary)] mb-2">
                      パスワード
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)] transition-all"
                      placeholder="パスワードを入力"
                    />
                  </div>

                  <div className="text-right">
                    <button
                      type="button"
                      onClick={() => {
                        setShowResetForm(true);
                        setError("");
                      }}
                      className="text-sm text-[var(--color-accent)] hover:text-[var(--color-primary)] transition-colors"
                    >
                      パスワードをお忘れの方
                    </button>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? "ログイン中..." : "ログイン"}
                  </button>
                </form>

                <div className="mt-8 pt-6 border-t border-[var(--color-border)] text-center">
                  <p className="text-sm text-[var(--color-text-muted)] mb-4">
                    アカウントをお持ちでない方
                  </p>
                  <Link
                    href="/register"
                    className="inline-block w-full py-3 rounded-full border-2 border-[var(--color-accent)] text-[var(--color-accent)] font-medium hover:bg-[var(--color-accent)] hover:text-white transition-colors"
                  >
                    新規会員登録
                  </Link>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
