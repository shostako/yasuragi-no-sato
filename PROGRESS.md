# プロジェクト進捗状況

## 現在の状態
- **最終更新**: 2026-01-09 10:14
- **アクティブタスク**: Phase 2準備中

## 環境情報
- **フレームワーク**: Next.js 16.1.1 (App Router)
- **React**: 19.2.3
- **Tailwind CSS**: 4.x
- **バックエンド**: Supabase（未セットアップ）
- **GitHub**: 未連携

## 直近のGitコミット
- `6eb9c53` feat: FAQページを実装（/faq）
- `16cdd6c` feat: 採用情報ページを実装（/recruit）

## 完了済み
- [x] プロジェクト作成（create-next-app）
- [x] ディレクトリ構造整備
- [x] 仕様書作成
  - [x] `.tmp/requirements.md` - 要件定義書
  - [x] `.tmp/design.md` - デザインシステム
  - [x] `.tmp/tasks.md` - タスク一覧
- [x] デザインシステム実装（globals.css）
- [x] 共通コンポーネント
  - [x] Header（スクロール対応、モバイルメニュー）
  - [x] Footer
- [x] トップページ実装
  - [x] ヒーローセクション
  - [x] サービス紹介セクション
  - [x] 施設の特徴セクション
  - [x] お知らせセクション
  - [x] アクセスセクション
  - [x] CTAセクション
- [x] サービスページ
  - [x] `/services` - サービス一覧
  - [x] `/services/[slug]` - サービス詳細（4サービス対応）
  - [x] `app/data/services.ts` - サービスデータ
- [x] お問い合わせページ
  - [x] `/contact` - フォーム（バリデーション付き、送信完了画面）
- [x] お知らせページ
  - [x] `/news` - お知らせ一覧
  - [x] `/news/[id]` - お知らせ詳細（6記事対応）
  - [x] `app/data/news.ts` - お知らせデータ
- [x] 施設案内ページ
  - [x] `/about` - 施設案内トップ（概要、ギャラリー、沿革）
  - [x] `/about/philosophy` - 理念・方針（ミッション、価値観、施設長メッセージ）
  - [x] `/about/staff` - スタッフ紹介（6名、チーム体制、研修制度）
  - [x] `/about/access` - アクセス（交通案内、駐車場、周辺情報）
  - [x] `app/data/about.ts` - 施設案内データ
- [x] 採用情報ページ
  - [x] `/recruit` - 採用情報（4職種、福利厚生、先輩の声、選考フロー、FAQ）
  - [x] `app/data/recruit.ts` - 採用情報データ
- [x] FAQページ
  - [x] `/faq` - よくある質問（4カテゴリ、15件、アコーディオン形式）
  - [x] `app/data/faq.ts` - FAQデータ

## 未完了・保留
- [ ] プライバシーポリシー、利用規約 - 低優先度
- [ ] Supabaseプロジェクト作成・連携
- [ ] デプロイ（Vercel）

## 次セッションへの引き継ぎ
- **次のアクション**: Phase 2（Supabase連携）またはプライバシーポリシー等
- **開発サーバー**: `npm run dev` で http://localhost:3000
- **画像**: 現在プレースホルダー（picsum.photos）使用中、本番前に差し替え必要
- **参照ドキュメント**:
  - `.tmp/requirements.md` - 要件定義
  - `.tmp/design.md` - デザインシステム
  - `.tmp/tasks.md` - タスク一覧
