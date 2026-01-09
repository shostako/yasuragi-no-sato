# やすらぎの郷 - デザインシステム

## 1. デザインコンセプト

### 1.1 テーマ: 「やすらぎの木陰」
- **和モダン × ナチュラル**
- 木の温もりと自然光をイメージ
- 余白を活かした落ち着いたレイアウト
- 控えめだが印象的なアニメーション

### 1.2 デザイン原則
1. **温かみ**: 介護施設らしい安心感と親しみやすさ
2. **清潔感**: 信頼できる医療・介護サービスの印象
3. **読みやすさ**: 高齢者や家族が見やすいフォントサイズ・コントラスト
4. **シンプルさ**: 情報が整理され、迷わないナビゲーション

---

## 2. カラーパレット

### 2.1 プライマリカラー
```css
--color-base: #FAF8F5;        /* オフホワイト（背景） */
--color-base-warm: #F5F0E8;   /* 温かみのあるベージュ（セクション背景） */
--color-primary: #5D4E3A;     /* 深い茶色（メインカラー） */
--color-primary-light: #7A6B54; /* 茶色ライト（ホバー時） */
```

### 2.2 セカンダリカラー
```css
--color-secondary: #D4C4B0;       /* 温かいベージュ */
--color-secondary-light: #E8DFD3; /* ライトベージュ */
```

### 2.3 アクセントカラー
```css
--color-accent: #8B9A6D;      /* モスグリーン */
--color-accent-light: #A8B58E; /* ライトグリーン */
```

### 2.4 テキストカラー
```css
--color-text: #3D3328;        /* 濃い茶褐色（本文） */
--color-text-muted: #6B5D4D;  /* 薄い茶色（補足テキスト） */
```

### 2.5 ユーティリティ
```css
--color-border: #E0D6C8;      /* ボーダー */
```

### 2.6 カラー使用ガイド
| 用途 | カラー |
|------|--------|
| ページ背景 | base / base-warm |
| 見出し・重要テキスト | primary |
| 本文 | text |
| 補足テキスト | text-muted |
| ボタン（プライマリ） | primary → base（テキスト） |
| ボタン（セカンダリ） | secondary（ボーダー） |
| アクセント・強調 | accent |
| フッター背景 | primary |

---

## 3. タイポグラフィ

### 3.1 フォントファミリー
```css
--font-sans: "Zen Maru Gothic", "Hiragino Maru Gothic ProN", "BIZ UDGothic", sans-serif;
```

### 3.2 フォント設定
- **本文**: 400 (Regular)
- **見出し**: 500-700 (Medium-Bold)
- **行間**: 1.8（本文）/ 1.4（見出し）
- **字間**: 0.02em（本文）/ 0.05em（見出し）

### 3.3 フォントサイズ
| 要素 | デスクトップ | モバイル |
|------|-------------|----------|
| H1 | 3rem (48px) | 2.25rem (36px) |
| H2 | 1.75rem (28px) | 1.5rem (24px) |
| H3 | 1.25rem (20px) | 1.125rem (18px) |
| 本文 | 1rem (16px) | 0.9375rem (15px) |
| 小テキスト | 0.875rem (14px) | 0.875rem (14px) |
| キャプション | 0.75rem (12px) | 0.75rem (12px) |

---

## 4. スペーシング

### 4.1 セクション間隔
```css
/* デスクトップ */
padding-y: 6rem; /* 96px */

/* モバイル */
padding-y: 4rem; /* 64px */
```

### 4.2 コンテナ幅
```css
max-width: 80rem; /* 1280px */
padding-x: 1rem / 1.5rem / 2rem; /* sm / md / lg */
```

---

## 5. コンポーネント

### 5.1 ボタン

#### プライマリボタン
```css
.btn-primary {
  background: var(--color-primary);
  color: var(--color-base);
  padding: 0.875rem 2rem;
  border-radius: 9999px;
  font-weight: 500;
  box-shadow: var(--shadow-soft);
}

.btn-primary:hover {
  background: var(--color-primary-light);
  transform: translateY(-2px);
  box-shadow: var(--shadow-medium);
}
```

#### セカンダリボタン
```css
.btn-secondary {
  background: transparent;
  color: var(--color-primary);
  padding: 0.875rem 2rem;
  border: 1.5px solid var(--color-secondary);
  border-radius: 9999px;
}

.btn-secondary:hover {
  background: var(--color-secondary-light);
}
```

### 5.2 カード
```css
.card {
  background: white;
  border-radius: 1rem;
  box-shadow: var(--shadow-card);
  transition: all 300ms ease;
}

.card:hover {
  box-shadow: var(--shadow-medium);
  transform: translateY(-4px);
}
```

### 5.3 セクションタイトル
```css
.section-title {
  position: relative;
  font-size: 1.75rem;
  font-weight: 600;
  color: var(--color-primary);
}

.section-title::after {
  content: "";
  position: absolute;
  bottom: -0.5rem;
  left: 0;
  width: 3rem;
  height: 3px;
  background: var(--color-accent);
  border-radius: 2px;
}
```

---

## 6. シャドウ

```css
--shadow-soft: 0 4px 20px rgba(93, 78, 58, 0.08);
--shadow-medium: 0 8px 30px rgba(93, 78, 58, 0.12);
--shadow-card: 0 2px 12px rgba(93, 78, 58, 0.06);
```

---

## 7. アニメーション

### 7.1 イージング
```css
--ease-gentle: cubic-bezier(0.4, 0, 0.2, 1);
```

### 7.2 デュレーション
```css
--duration-fast: 150ms;
--duration-normal: 300ms;
--duration-slow: 500ms;
```

### 7.3 定義済みアニメーション
- `fadeInUp`: 下から上へフェードイン
- `fadeIn`: フェードイン
- `slideInLeft`: 左からスライドイン

---

## 8. アイコン

### 8.1 スタイル
- **線幅**: 1.5px - 2px
- **サイズ**: 16px / 20px / 24px
- **カラー**: currentColor（親要素に依存）

### 8.2 使用アイコン
- Heroicons (Outline) をベースにSVGで実装
- カスタムロゴ: 葉っぱモチーフ

---

## 9. 画像

### 9.1 アスペクト比
| 用途 | 比率 |
|------|------|
| ヒーロー | 16:9 |
| 特徴セクション | 3:2 |
| カードサムネイル | 4:3 |
| スタッフ写真 | 1:1 |

### 9.2 角丸
- 大きい画像: `border-radius: 1rem` (16px)
- 小さい画像: `border-radius: 0.5rem` (8px)
- アイコン背景: `border-radius: 9999px` (円形)

---

## 10. レスポンシブ

### 10.1 ブレークポイント
```css
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
```

### 10.2 レイアウト変化
| 要素 | Desktop | Tablet | Mobile |
|------|---------|--------|--------|
| ナビゲーション | 横並び | 横並び | ハンバーガー |
| サービスカード | 4列 | 2列 | 1列 |
| 特徴セクション | 横並び | 横並び | 縦積み |
| フッター | 5列 | 2列 | 1列 |
