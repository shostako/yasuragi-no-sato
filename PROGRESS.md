# プロジェクト進捗状況

## 現在の状態
- **最終更新**: 2026-01-15 20:37
- **ステータス**: 管理者アカウント再設定・インデックス作成完了

## 環境情報
- **フレームワーク**: Next.js 16.1.1 (App Router)
- **React**: 19.2.3
- **Tailwind CSS**: 4.x
- **バックエンド**: Firebase (Firestore, Auth, Storage)
- **Firebaseプロジェクト**: yasuragi-no-sato
- **GitHub**: https://github.com/shostako/yasuragi-no-sato
- **本番URL**: https://yasuragi-no-sato.vercel.app

## 直近のGitコミット
- `f4ddbf7` chore: 一時ファイル削除
- `d89377e` chore: .gitignoreにtmpclaude-*追加、一時ファイル削除
- `700549a` docs: PROGRESS.md更新・作業ログ追加（newsクエリ修正・動作確認）
- `f3bd01c` fix: newsクエリにwhere published条件追加（Security Rules対応）

## 完了済み
### Phase 1: 基本ページ
- [x] プロジェクト作成（create-next-app）
- [x] ディレクトリ構造整備
- [x] 仕様書作成
- [x] デザインシステム実装（globals.css）
- [x] 共通コンポーネント（Header, Footer）
- [x] トップページ実装
- [x] サービスページ（/services, /services/[slug]）
- [x] お問い合わせページ（/contact）
- [x] お知らせページ（/news, /news/[id]）
- [x] 施設案内ページ（/about, /about/philosophy, /about/staff, /about/access）
- [x] 採用情報ページ（/recruit）
- [x] FAQページ（/faq）
- [x] プライバシーポリシーページ（/privacy）
- [x] 利用規約ページ（/terms）
- [x] サイトマップページ（/sitemap）

### Phase 2: Firebase連携・機能実装
- [x] Firebaseプロジェクト作成（yasuragi-no-sato）
- [x] Firebase SDK導入
- [x] Firestore DB作成（東京リージョン）
- [x] お問い合わせフォーム → Firestore連携
- [x] お知らせ機能 → Firestore連携
- [x] シードツール作成（/admin/seed）
- [x] 見学予約システム（/reservation）
- [x] 会員ログイン（/login, /register, /member）
- [x] Vercelデプロイ

### Phase 3: 管理画面・複数画像対応
- [x] Firebase Storage導入
- [x] お知らせ管理画面（/admin/news）
- [x] お知らせ新規作成画面（/admin/news/new）
- [x] お知らせ編集画面（/admin/news/[id]/edit）
- [x] 複数画像アップロード機能（ドラッグ&ドロップ対応）
- [x] 画像レイアウト選択UI（1列・2列・3列・スライダー）
- [x] フロントエンド複数画像表示コンポーネント
- [x] 管理画面認証ガード（管理者権限チェック）
- [x] ロールベース権限管理（admin / member）
- [x] 管理者設定ページ（/admin/setup）
- [x] 公開/下書き切り替え機能
- [x] 投稿削除機能

### Phase 4: セキュリティ改善（2026-01-13）
- [x] Firestore Security Rules作成・デプロイ
- [x] /admin/setupに環境変数ガード追加
- [x] /admin/seedにAdminAuthGuard追加
- [x] ESLintエラー5件修正
- [x] CLAUDE.md修正（Supabase→Firebase記載更新）
- [x] next.config.tsにFirebase Storageドメイン追加
- [x] img→next/image変換（7箇所）
- [x] newsクエリにwhere published条件追加（Security Rules対応）
- [x] 本番サイト全ページ動作確認（Playwright MCP）

### Phase 5: 管理者設定・インデックス（2026-01-15）
- [x] Firebase Authentication: ダミーアカウント削除
- [x] 本番用管理者アカウント作成（shostakovich1117@gmail.com）
- [x] Firestore usersコレクション更新（role: admin）
- [x] Firestoreコンポジットインデックス作成（news: published + date）

### その他
- [x] ヘッダーナビゲーション改善（折り返し防止）
- [x] モバイルメニュー改善（右寄せ・狭幅・外タップで閉じる）
- [x] 依頼者向け説明資料作成（docs/）
- [x] 画像差し替え（プレースホルダー → 実画像・スモークオーバーレイ追加）
- [x] お知らせ用AI生成画像追加（Nano Banana Pro / Gemini 3 Pro Image）
- [x] アクセスページGoogle Maps埋め込み（都庁の住所で仮設定）
- [x] モバイル表示の横はみ出し問題修正
- [x] 管理者モード機能（編集モードトグル、インライン編集ボタン）
- [x] 管理画面に共通Header/Footer追加

## Firestoreコレクション
| コレクション | 用途 | フィールド |
|-------------|------|----------|
| contacts | お問い合わせ | name, email, message, createdAt |
| news | お知らせ | title, category, content, images[], imageLayout, published, date |
| reservations | 見学予約 | name, email, phone, date, time, createdAt |
| users | ユーザー管理 | uid, email, displayName, role (admin/member), createdAt |

## Firestoreインデックス
| コレクション | フィールド | 用途 |
|-------------|-----------|------|
| news | published (↑), date (↓) | 公開済み記事を日付降順で取得 |

## 未完了・保留
- [ ] 独自ドメイン取得・設定（依頼者判断待ち）
- [ ] 商用ホスティング検討（Vercel Pro / Cloudflare Pages等）
- [ ] 実際の施設情報への差し替え（住所、電話番号、アクセス方法等）

## 次セッションへの引き継ぎ

### Codexレビュー残課題（2026-01-13）
| 優先度 | 問題 | 詳細 | 状態 |
|--------|------|------|------|
| 高 | 無認証書き込み | contacts/reservationsの`allow create: if true`、フィールド検証なし | 未対応 |
| 中 | newsクエリ不整合 | news取得で`where(published == true)`がなかった | **修正済** |
| 中 | XSSリスク | news詳細ページでサニタイズなし | 未対応 |
| 低 | admin/setup矛盾 | role更新がrulesで禁止されている | 未対応 |

### 環境・アクセス情報
- **本番稼働中**: https://yasuragi-no-sato.vercel.app
- **管理画面**: http://localhost:3000/admin/news（ログイン必要）
- **依頼者向け資料**: docs/ フォルダに説明テキストあり
- **開発サーバー**: `npm run dev`
- **Firebase Console**: https://console.firebase.google.com/project/yasuragi-no-sato
- **Vercel**: GitHub push で自動デプロイ

### 管理画面の使い方

#### 管理者アカウント（2026-01-15設定）
| 項目 | 値 |
|------|-----|
| メール | shostakovich1117@gmail.com |
| パスワード | changeme（**本番運用前に要変更**） |
| UID | IbFyQ3JcYRbnznKSsXuBesLT9np1 |

#### 通常の使い方（管理者モード）
1. `/login` から管理者アカウントでログイン
2. ヘッダーの「編集」ボタンをクリック → 「編集中」に変わる
3. お知らせ一覧ページ → 「新規投稿」ボタンが表示
4. お知らせ詳細ページ → 「編集」ボタンが表示
5. ボタンクリックで編集画面（/admin/news/[id]/edit）へ遷移

#### 従来の管理画面
- `/admin/news` で管理画面に直接アクセスも可能
- 一覧画面から編集・削除・公開切り替えが可能

**重要**: 一般会員（role: "member"）は管理画面・管理者モードにアクセスできません。管理者（role: "admin"）のみ利用可能です。

## 知見メモ
### Figma活用ワークフロー
次回プロジェクトでは、最初にFigma Communityでテンプレートを探すことを検討：
1. Figma Community で「corporate」「healthcare」等で検索
2. 気に入ったテンプレートをDuplicate
3. URLをClaudeに渡す → Figma MCPでデザイン読み取り → コード化
4. ゼロからデザインを考える手間が省ける

Figma MCP接続済み（菊池剛アカウント）、Starterプラン（無料・3ファイルまで）

### Nano Banana Pro（AI画像生成）
- **モデル**: `gemini-3-pro-image-preview`（Google AI Studio API）
- **Claude Code Skill**: `~/.claude/skills/nano-banana-pro/SKILL.md`
- **スクリプト**: `~/.claude/scripts/nano-banana-pro.py`
- **APIキー**: `~/.claude/.env` に保存

#### 機能
| モード | 使い方 |
|--------|--------|
| 新規生成 | `python nano-banana-pro.py "プロンプト" -o "出力パス"` |
| 画像編集 | `python nano-banana-pro.py "指示" --image "元画像" -o "出力パス"` |

#### マーキングツール（Annotate風）
- **スクリプト**: `~/.claude/scripts/mark-image.py`
- **操作**: ドラッグで自由サイズの赤い丸を描画 → 閉じると保存
- **編集時**: 赤い丸は自動的に最終画像から削除される

#### 料金（Tier 1 / 有料プラン）
| 解像度 | 料金 |
|--------|------|
| 1K〜2K | $0.134/枚（約20円） |
| 4K | $0.24/枚（約36円） |

- **無料枠**: Free Tierは毎日リセット（太平洋時間0時）だが制限厳しい
- **Tier 1**: 1枚目から課金、安定して使える
