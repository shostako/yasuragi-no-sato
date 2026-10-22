# 変更履歴

このリポジトリの主な変更を新しい順に書く。日付は日本時間。

## 2026-10-22

### セキュリティ
- 脆弱性のある部品を更新した（#1）。`npm audit` は 39 件（critical 4・high 19・moderate 14・low 2）から 9 件（high のみ）になった。
  - next / eslint-config-next 16.1.1 → 16.4.2、react / react-dom 19.2.3 → 19.2.9
  - firebase ^12.19.0、resend ^6.34.1、firebase-admin ^14.5.0（開発用。`scripts/seed-news.ts` だけが使う）
  - critical だった next（リクエストの密輸、サーバー部品の DoS など）、protobufjs（任意のコード実行）、fast-xml-parser、websocket-driver を解消した。
  - 残る 9 件は、firebase が固定している `@grpc/grpc-js` 1.9 系（上流で未修正、サーバーとして使うときの問題）と、lint 専用の `eslint-config-next` の配下。どちらも、サイトの利用者からは突けない。

### 変更
- 動かす Node を 22 以上と `package.json` の `engines` に書いた。firebase-admin 14 が Node 22 以上を要るため。Vercel のプロジェクト（hpbuild）の設定は 24.x。
