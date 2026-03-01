# Formella - 設計書

> メッセージカード風の形をしたフォームUIライブラリ
> "form + bella(美しい)" の造語

## 1. プロジェクト概要

### コンセプト
ハートや丸といったかわいい形のカード内にフォーム要素を配置できるUIライブラリ。
メッセージカードのような見た目で、入力フォームを楽しく彩る。

### ゴール
- かわいい形状のカードコンポーネントを提供
- カード内に自由にフォーム要素を配置可能
- shadcn/ui のパターンに倣い、コピー&ペーストで使えるコンポーネント集
- 個人利用からスタートし、将来的にnpm公開も視野に入れる

---

## 2. 技術スタック

| カテゴリ | 技術 |
|---------|------|
| フレームワーク | Next.js (App Router) |
| 言語 | TypeScript |
| スタイリング | Tailwind CSS v4 |
| UIベース | shadcn/ui |
| 形状描画 | CSS clip-path + SVG |
| アニメーション | Tailwind CSS + CSS Transitions |
| パッケージ管理 | npm |
| ビルド | tsup (ライブラリビルド用) |
| Storybook | コンポーネントカタログ・デモ用 |

---

## 3. コンポーネント設計

### 3.1 コンポーネント一覧

```
formella/
├── FormCard          # ベースとなるカード型コンテナ
├── HeartCard         # ハート型カード
├── CircleCard        # 丸型カード
├── EllipseCard       # 楕円型カード
├── FormInput         # カード内用テキスト入力
├── FormTextarea      # カード内用テキストエリア
├── FormSelect        # カード内用セレクトボックス
├── FormButton        # カード内用送信ボタン
└── FormLabel         # カード内用ラベル
```

### 3.2 propsの継承関係

各形状カード（HeartCard, CircleCard, EllipseCard）は FormCard を内部で使い、
共通propsを継承する。形状ごとの固有propsだけを追加する設計。

```
FormCardProps（共通）
├── HeartCardProps   = 共通props + tilt
├── CircleCardProps  = 共通propsのみ
└── EllipseCardProps = 共通props + aspectRatio
```

```tsx
// 共通props（FormCardから継承）
interface FormCardBaseProps {
  size?: 'sm' | 'md' | 'lg'
  theme?: 'valentine' | 'pastel' | 'nature' | 'ocean'  // プリセットテーマ
  color?: string          // 背景色（themeより優先）
  borderColor?: string    // 枠線色（themeより優先）
  shadow?: boolean        // 影をつけるか
  overflow?: 'hidden' | 'scroll' | 'visible'  // はみ出し時の挙動（デフォルト: 'hidden'）
  className?: string      // 追加のTailwindクラス
  children: React.ReactNode
}
```

> **テーマと個別colorの優先順位:** `color` / `borderColor` を指定すると `theme` の該当値を上書きする。
> 部分的にテーマを使いつつ一部だけカスタムしたい場合に便利。

### 3.3 コンポーネント詳細

#### FormCard（ベースコンポーネント）

すべての形状カードの基盤。直接使う場合は `shape` を指定する。

```tsx
interface FormCardProps extends FormCardBaseProps {
  shape: 'heart' | 'circle' | 'ellipse'
}
```

#### HeartCard

ハート型の装飾カード。内部で `<FormCard shape="heart">` を使う。

```tsx
interface HeartCardProps extends FormCardBaseProps {
  tilt?: number           // 傾き角度（-15 ~ 15度）
}

// 内部実装イメージ
function HeartCard({ tilt = 0, ...props }: HeartCardProps) {
  return <FormCard shape="heart" style={{ rotate: `${tilt}deg` }} {...props} />
}
```

**実装方式:** CSS `clip-path` でハート形状をクリッピング。
入力フォーム部分はハート下部の広いエリアに配置。

```
      ♥♥   ♥♥
    ♥♥♥♥♥♥♥♥♥♥♥
    ♥♥♥♥♥♥♥♥♥♥♥
     ♥♥♥♥♥♥♥♥♥
      ♥[入力欄]♥      ← このあたりにフォーム要素
       ♥♥♥♥♥♥♥
        ♥♥♥♥♥
         ♥♥♥
          ♥
```

#### CircleCard

丸型の装飾カード。内部で `<FormCard shape="circle">` を使う。

```tsx
interface CircleCardProps extends FormCardBaseProps {}
```

#### EllipseCard

楕円型の装飾カード。内部で `<FormCard shape="ellipse">` を使う。

```tsx
interface EllipseCardProps extends FormCardBaseProps {
  aspectRatio?: string    // 縦横比（デフォルト: '4/3'）
}
```

**CircleCard / EllipseCard 実装方式:** `border-radius: 50%` + overflow制御。
フォーム要素は中央に配置。

```
       ╭────────╮
     ╱            ╲
    │   [ラベル]    │
    │   [入力欄]    │      ← 中央エリアにフォーム要素
    │   [ボタン]    │
     ╲            ╱
       ╰────────╯
```

#### フォーム要素（FormInput, FormTextarea, FormSelect, FormButton, FormLabel）

shadcn/ui のフォーム要素をベースに、カード内で見栄えよく表示されるようスタイル調整。

**形状は全て四角（角丸）で統一。** カード形状に関わらず、フォーム要素の見た目は矩形で固定する。
テキスト入力は本質的に横書きであり、四角以外の形状は入力体験を損なうため。

```tsx
// FormInput: shadcn の Input をラップ
interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: 'default' | 'underline' | 'ghost'  // 入力欄のスタイル
}

// FormTextarea: shadcn の Textarea をラップ
interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: 'default' | 'underline' | 'ghost'
  maxLength?: number
  showCount?: boolean    // 文字数カウント表示
}

// FormButton: shadcn の Button をラップ
interface FormButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost'
}
```

#### フォーム最大幅

フォーム要素の最大幅は、カードサイズと形状から算出される安全エリアの幅に自動で制約される。
カードサイズごとの具体的な寸法は以下の通り。

```tsx
// カード全体のサイズ（px）
const CARD_SIZE = {
  sm: { width: 240, height: 240 },
  md: { width: 360, height: 360 },
  lg: { width: 480, height: 480 },
}

// 安全エリアのパディング率から算出されるフォーム最大幅（px）
// フォーム要素は width: 100% で安全エリアいっぱいに広がる
//
//   フォーム最大幅 = カード幅 × (1 - left率 - right率)
//
// 例: HeartCard md の場合
//   360 × (1 - 0.20 - 0.20) = 216px
//
const FORM_MAX_WIDTH = {
  heart:   { sm: 144, md: 216, lg: 288 },  // カード幅の60%
  circle:  { sm: 168, md: 252, lg: 336 },  // カード幅の70%
  ellipse: { sm: 182, md: 274, lg: 365 },  // カード幅の76%
}
```

| 形状 | sm | md | lg | 利用率 |
|------|-----|-----|-----|--------|
| heart | 144px | 216px | 288px | 60% |
| circle | 168px | 252px | 336px | 70% |
| ellipse | 182px | 274px | 365px | 76% |

> フォーム要素は `width: 100%` で安全エリアに収まるため、
> 利用者が個別に max-width を指定する必要はない。

---

## 4. 形状の実装方針

### 4.1 ハート形状

**CSS clip-path 方式を採用**

```css
.heart-shape {
  clip-path: path('M256 456
    C56 256, 0 144, 128 80
    C192 32, 256 128, 256 128
    S320 32, 384 80
    C512 144, 456 256, 256 456Z');
}
```

メリット:
- ピュアCSSで実現可能
- レスポンシブに対応しやすい
- アニメーション可能

### 4.2 丸・楕円形状

**border-radius 方式を採用**

```css
.circle-shape {
  border-radius: 50%;
  aspect-ratio: 1;
}

.ellipse-shape {
  border-radius: 50%;
  aspect-ratio: 4/3;
}
```

### 4.3 形状内のフォーム配置

形状の「安全エリア」（内接矩形）内にフォーム要素を配置する。

```tsx
// 各形状に応じた内側パディングを計算
const SAFE_AREA_PADDING = {
  heart: { top: '30%', left: '20%', right: '20%', bottom: '15%' },
  circle: { top: '15%', left: '15%', right: '15%', bottom: '15%' },
  ellipse: { top: '20%', left: '12%', right: '12%', bottom: '20%' },
}
```

### 4.4 はみ出し制御（overflow）

形状カードの中にフォーム要素を配置すると、内容量によっては安全エリアをはみ出す可能性がある。
この挙動を **利用者が `overflow` prop で選択できる** ようにする。

| 値 | 挙動 | 用途 |
|----|------|------|
| `hidden`（デフォルト） | はみ出た部分を非表示にする | 見た目を優先したいとき |
| `scroll` | 安全エリア内でスクロール可能にする | 入力量が多いフォーム向け |
| `visible` | はみ出しを許容する（形状の外に描画される） | 自分でレイアウト制御したいとき |

#### 実装イメージ

```tsx
// 安全エリアを内部divとして切り出し、overflow propを適用
function FormCard({ shape, overflow = 'hidden', children }: FormCardProps) {
  const padding = SAFE_AREA_PADDING[shape]

  return (
    <div className={shapeClass}>
      {/* 形状の背景レイヤー */}
      <div className="absolute inset-0 shape-background" />

      {/* 安全エリア: ここにフォーム要素が入る */}
      <div
        className="relative"
        style={{
          paddingTop: padding.top,
          paddingLeft: padding.left,
          paddingRight: padding.right,
          paddingBottom: padding.bottom,
          overflow: overflow,  // 利用者が選択した挙動
        }}
      >
        {children}
      </div>
    </div>
  )
}
```

#### 使用例

```tsx
// デフォルト: はみ出し非表示
<HeartCard size="md">
  <FormInput placeholder="短いメッセージ" />
</HeartCard>

// スクロール: 長い入力に対応
<HeartCard size="md" overflow="scroll">
  <FormTextarea placeholder="長文OK！" />
  <FormInput placeholder="名前" />
  <FormButton>送る</FormButton>
</HeartCard>

// visible: 自由配置（上級者向け）
<CircleCard size="sm" overflow="visible">
  <FormInput placeholder="はみ出てもOK" />
</CircleCard>
```

---

## 5. テーマ・カスタマイズ

### 5.1 適用方法

**`theme` propでカードごとに指定する方式を採用。**

```tsx
// テーマ指定
<HeartCard theme="valentine">...</HeartCard>

// テーマ + 一部カスタム（colorがthemeより優先）
<HeartCard theme="valentine" color="#FF69B4">...</HeartCard>

// テーマなし、全て手動指定
<HeartCard color="#FFD700" borderColor="#DAA520">...</HeartCard>

// テーマ未指定時のデフォルト: グレー系のニュートラルカラー
<HeartCard>...</HeartCard>
```

> Provider方式は採用しない。カードごとに見た目を変えたいケースが多く、
> propの方がシンプルで直感的なため。

### 5.2 プリセットテーマ

```tsx
interface FormellaTheme {
  primary: string       // カード背景色
  border: string        // 枠線色
  text: string          // テキスト色
  inputBg: string       // フォーム入力欄の背景色
}

const themes: Record<string, FormellaTheme> = {
  valentine: {
    primary: '#FCE4EC',
    border: '#F48FB1',
    text: '#880E4F',
    inputBg: '#FFFFFF',
  },
  pastel: {
    primary: '#F3E5F5',
    border: '#CE93D8',
    text: '#4A148C',
    inputBg: '#FFFFFF',
  },
  nature: {
    primary: '#E8F5E9',
    border: '#81C784',
    text: '#1B5E20',
    inputBg: '#FFFFFF',
  },
  ocean: {
    primary: '#E3F2FD',
    border: '#64B5F6',
    text: '#0D47A1',
    inputBg: '#FFFFFF',
  },
}

// テーマ未指定時のデフォルト
const defaultTheme: FormellaTheme = {
  primary: '#F5F5F5',
  border: '#E0E0E0',
  text: '#424242',
  inputBg: '#FFFFFF',
}
```

### 5.3 テーマの内部実装

カードコンポーネント内でCSS変数に変換して適用する。

```tsx
function FormCard({ theme, color, borderColor, ...props }: FormCardProps) {
  const resolved = themes[theme] ?? defaultTheme

  const style = {
    '--formella-primary': color ?? resolved.primary,
    '--formella-border': borderColor ?? resolved.border,
    '--formella-text': resolved.text,
    '--formella-input-bg': resolved.inputBg,
  } as React.CSSProperties

  return <div style={style}>...</div>
}
```

> CSS変数として注入するため、子のフォーム要素は `var(--formella-primary)` 等で
> 自動的にテーマカラーを参照できる。利用者がCSS変数を直接上書きすることも可能。

---

## 6. ディレクトリ構造

```
formella/
├── app/                          # Next.js App Router（デモサイト）
│   ├── layout.tsx
│   ├── page.tsx                  # トップページ（デモ一覧）
│   ├── demo/
│   │   ├── heart/page.tsx        # ハートカードデモ
│   │   ├── circle/page.tsx       # 丸カードデモ
│   │   └── ellipse/page.tsx      # 楕円カードデモ
│   └── globals.css
├── components/
│   ├── ui/                       # shadcn/ui コンポーネント
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── textarea.tsx
│   │   ├── select.tsx
│   │   └── label.tsx
│   └── formella/                 # Formellaコンポーネント
│       ├── form-card.tsx         # ベースカード
│       ├── heart-card.tsx        # ハート型カード
│       ├── circle-card.tsx       # 丸型カード
│       ├── ellipse-card.tsx      # 楕円型カード
│       ├── form-input.tsx        # フォーム入力
│       ├── form-textarea.tsx     # テキストエリア
│       ├── form-select.tsx       # セレクトボックス
│       ├── form-button.tsx       # ボタン
│       ├── form-label.tsx        # ラベル
│       ├── themes.ts             # テーマ定義
│       └── index.ts              # エクスポート集約
├── lib/
│   └── utils.ts                  # ユーティリティ（cn関数など）
├── stories/                      # Storybook
│   ├── HeartCard.stories.tsx
│   ├── CircleCard.stories.tsx
│   └── EllipseCard.stories.tsx
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.ts
└── DESIGN.md                     # この設計書
```

---

## 7. 使用イメージ

### 基本的な使い方

```tsx
import { HeartCard, FormInput, FormTextarea, FormButton } from '@/components/formella'

export default function MessageForm() {
  return (
    <HeartCard size="lg" color="pink">
      <FormLabel>メッセージを入力</FormLabel>
      <FormTextarea
        placeholder="お誕生日おめでとう！"
        variant="ghost"
        maxLength={200}
        showCount
      />
      <FormButton>送る</FormButton>
    </HeartCard>
  )
}
```

### テーマ付き

```tsx
import { CircleCard, FormInput, FormButton } from '@/components/formella'

export default function QuickNote() {
  return (
    <CircleCard size="md" theme="ocean">
      <FormInput placeholder="ひとこと" variant="underline" />
      <FormButton variant="ghost">送信</FormButton>
    </CircleCard>
  )
}
```

---

## 8. 開発フェーズ

### Phase 1: 基盤構築
- [ ] Next.js + Tailwind CSS + shadcn/ui プロジェクトセットアップ
- [ ] ディレクトリ構造作成
- [ ] ベースコンポーネント（FormCard）実装
- [ ] ユーティリティ関数（cn関数）整備

### Phase 2: 形状カード実装
- [ ] HeartCard 実装（CSS clip-path）
- [ ] CircleCard 実装（border-radius）
- [ ] EllipseCard 実装（border-radius）
- [ ] 各形状の安全エリア（内接矩形）計算・配置

### Phase 3: フォーム要素
- [ ] FormInput 実装
- [ ] FormTextarea 実装
- [ ] FormSelect 実装
- [ ] FormButton 実装
- [ ] FormLabel 実装

### Phase 4: テーマ・スタイリング
- [ ] プリセットテーマ実装（valentine, pastel, nature, ocean）
- [ ] CSS変数によるカスタマイズ機能
- [ ] レスポンシブ対応

### Phase 5: デモ・ドキュメント
- [ ] デモページ作成
- [ ] Storybook セットアップ・ストーリー作成
- [ ] 使い方ドキュメント

---

## 9. 将来の拡張案（スコープ外）

- 追加形状: 星、吹き出し、雲、花びら
- アニメーション: カード登場アニメーション、ホバーエフェクト
- npm公開: tsupでビルドしてnpmパッケージ化
- テンプレート: よくあるフォームパターンのプリセット
