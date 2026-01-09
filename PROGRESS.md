# プロジェクト進捗状況

## 現在の状態
- **最終更新**: 2026-01-09 11:10
- **アクティブタスク**: Phase 2進行中（Firebase連携完了）

## 環境情報
- **フレームワーク**: Next.js 16.1.1 (App Router)
- **React**: 19.2.3
- **Tailwind CSS**: 4.x
- **バックエンド**: Firebase (Firestore)
- **Firebaseプロジェクト**: yasuragi-no-sato
- **GitHub**: 未連携

## 直近のGitコミット
- `774d23f` docs: PROGRESS.md更新・作業ログ追加
- `6eb9c53` feat: FAQページを実装（/faq）
- `16cdd6c` feat: 採用情報ページを実装（/recruit）

## 完了済み
### Phase 1: 基本ページ
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
- [x] サービスページ（/services, /services/[slug]）
- [x] お問い合わせページ（/contact）
- [x] お知らせページ（/news, /news/[id]）
- [x] 施設案内ページ（/about, /about/philosophy, /about/staff, /about/access）
- [x] 採用情報ページ（/recruit）
- [x] FAQページ（/faq）

### Phase 2: Firebase連携
- [x] Firebaseプロジェクト作成（yasuragi-no-sato）
- [x] Firebase SDK導入
- [x] Firestore DB作成（東京リージョン）
- [x] お問い合わせフォーム → Firestore連携（contactsコレクション）
- [x] お知らせ機能 → Firestore連携（newsコレクション）
- [x] シードツール作成（/admin/seed）

## Firestoreコレクション
| コレクション | 用途 | 件数 |
|-------------|------|------|
| contacts | お問い合わせ | 1（テスト） |
| news | お知らせ | 6（シード済み） |

## 未完了・保留
- [ ] プライバシーポリシー、利用規約 - 低優先度
- [ ] 見学予約システム - Phase 2
- [ ] 会員ログイン（Firebase Auth）- Phase 2
- [ ] デプロイ（Vercel）

## 次セッションへの引き継ぎ
- **次のアクション**: 見学予約システム、会員ログイン、またはデプロイ
- **開発サーバー**: `npm run dev` で http://localhost:3001（ポート3000が使用中の場合）
- **Firebase Console**: https://console.firebase.google.com/project/yasuragi-no-sato
- **画像**: プレースホルダー（picsum.photos）使用中、本番前に差し替え必要
- **環境変数**: `.env.local` にFirebase設定あり（gitignore済み）
