# プロジェクト進捗状況

## 現在の状態
- **最終更新**: 2026-01-09 16:00
- **ステータス**: Phase 2完了・本番デプロイ済み

## 環境情報
- **フレームワーク**: Next.js 16.1.1 (App Router)
- **React**: 19.2.3
- **Tailwind CSS**: 4.x
- **バックエンド**: Firebase (Firestore, Auth)
- **Firebaseプロジェクト**: yasuragi-no-sato
- **GitHub**: https://github.com/shostako/yasuragi-no-sato
- **本番URL**: https://yasuragi-no-sato.vercel.app

## 直近のGitコミット
- `4191ce6` docs: 依頼者向け説明資料を追加
- `a969557` fix: ヘッダーナビゲーションの折り返し問題を修正
- `7355e05` feat: 見学予約システム・会員ログイン機能を実装

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

### その他
- [x] ヘッダーナビゲーション改善（折り返し防止）
- [x] モバイルメニュー改善（右寄せ・狭幅）
- [x] 依頼者向け説明資料作成（docs/）

## Firestoreコレクション
| コレクション | 用途 | 件数 |
|-------------|------|------|
| contacts | お問い合わせ | 1（テスト） |
| news | お知らせ | 6（シード済み） |
| reservations | 見学予約 | 1（テスト） |

## 未完了・保留
- [ ] プライバシーポリシー、利用規約ページ - 低優先度
- [ ] 画像差し替え（プレースホルダー → 実画像）
- [ ] 独自ドメイン取得・設定（依頼者判断待ち）
- [ ] 商用ホスティング検討（Vercel Pro / Cloudflare Pages等）

## 次セッションへの引き継ぎ
- **本番稼働中**: https://yasuragi-no-sato.vercel.app
- **依頼者向け資料**: docs/ フォルダに説明テキストあり
- **開発サーバー**: `npm run dev`
- **Firebase Console**: https://console.firebase.google.com/project/yasuragi-no-sato
- **Vercel**: GitHub push で自動デプロイ
