# MAXIM AGENCY サイト全面刷新 - Phase 0 + Phase 1

## 状況説明

このリポジトリ(maxim-agency-website)は、現在「コンサル特化のシングルページ LP」として稼働中ですが、以下の理由で**全面刷新**します。

### 刷新の背景

別チャット(Claude with Daiki)で、ブランド戦略を全面的に見直しました:

- 屋号「間宮企画」(個人事業主)の対外的な顔として「**MAXIM AGENCY**」を親ブランド化
- MAXIM AGENCY の下に **2 つの事業ライン**を設置:
  - **Consulting 事業**(現状の延長・刷新)
  - **Products 事業**(新設、第 1 弾は Easy Cooking)
- 既に Easy Cooking LP は別リポジトリ(easycooking-lp)で実装済み・`https://easycooking.jp` で稼働中

つまりこの maxim-agency.com は、これから**親ブランドのハブサイト**として刷新されます。

---

## Phase 0: 状況把握と整理(必ず最初に実行)

### Step 0-1: 現状確認

以下を実行して、現在のリポジトリ状況を報告してください:

1. `ls -la` で全ファイル一覧
2. `git status` で未コミット変更の確認
3. `git log --oneline -20` で直近のコミット履歴
4. 現状の `index.html` のサイズ・行数(`wc -l index.html`)
5. `_archives/` フォルダの中身確認(あれば)

### Step 0-2: 未コミット変更の整理

以前のセッションで、以下の未コミット変更が残っているはずです:

- `DESIGN.md` の削除
- `_archives/` フォルダの追加
- `logo-black.png` の追加

これらを **クリーンに整理してコミット** してください。コミットメッセージ案:

```
chore: 既存資産の整理

- DESIGN.md を _archives/legacy-docs-2026-04/ へ退避済み(削除を確定)
- logo-black.png を新規追加
- _archives/ ディレクトリを正式追加

サイト全面刷新前の状態を整える作業として、未コミット変更を確定する。
```

実行前に:

- `_archives/` の中身を確認し、適切に整理されているか報告
- もし `_archives/` 内に整理すべきファイルがあれば、その提案も併せて

### Step 0-3: 既存サイトを `_archives/` へ退避

サイト全面刷新にあたり、現在のファイル群を `_archives/legacy-site-2026-04/` へ退避します。これにより、新規構築の際に古い構造に引きずられず、いつでも過去資産を参照できる状態を作ります。

退避対象(候補):

- `index.html`
- `privacy.html`
- `hero-768.webp`、`hero-1280.webp`、`hero-1280.jpg`、`hero-1920.webp`
- `og-image.jpg`、`og-image.webp`
- その他、既存の HTML/CSS/JS ファイル

退避**しない**(リポジトリのルートに残す)もの:

- `.git/`、`.gitignore`
- `CLAUDE.md`
- `README.md`(刷新後に内容も更新)
- `vercel.json`(刷新後に内容を更新)
- `robots.txt`、`sitemap.xml`(刷新後に内容を更新)
- `apple-touch-icon.png`、`favicon.ico`、`favicon.png`、`favicon.svg`(継続利用)
- `logo.png`、`logo-black.png`(継続利用候補)

### Step 0-4: 退避作業の確認とコミット

Step 0-3 の退避案を提示してから、Daiki さんが承認したら退避を実行し、以下のコミットメッセージで:

```
chore: 既存サイト一式を _archives/legacy-site-2026-04/ へ退避

サイト全面刷新の準備として、既存のシングルページ LP 構成を退避。
新構成は MAXIM AGENCY 親ブランド + 2 事業(Consulting / Products)の
複数ページ構成で再構築する。
```

---

## Phase 1: 新サイト設計案の提示

Phase 0 完了後、新サイトの設計案を以下の観点で提示してください。

### 1. 全体構造(URL マップ)

予定している URL 構造:

```
maxim-agency.com/                親ブランドトップ
maxim-agency.com/consulting/     Consulting 事業詳細
maxim-agency.com/products/       プロダクト一覧ハブ(Easy Cooking リンク含む)
maxim-agency.com/about/          About
maxim-agency.com/contact/        Contact
maxim-agency.com/legal/privacy/  プライバシーポリシー(新)
maxim-agency.com/legal/tokushoho/ 特定商取引法に基づく表記(新規)
```

### 2. ディレクトリ構造

easycooking-lp と同じ思想で、`/legal/{ページ名}/index.html` 方式の URL 構造を採用。
具体的なディレクトリツリーを提案してください。

### 3. 技術スタック

以下の前提で:

- 静的 HTML + CSS + JS(easycooking-lp と統一)
- Next.js 等のフレームワークは使わない
- Vercel デプロイ継続
- ローカル開発: `python3 -m http.server 8000` で確認

### 4. デザイン方針

別チャットで以下を確定済み:

#### カラーパレット(MAXIM AGENCY 独自)

```css
:root {
  /* ベース: ウォームグレー基調(知的・誠実・暖かみ) */
  --color-bg: #F8F7F4;             /* メイン背景・白に少しベージュ */
  --color-bg-card: #FFFFFF;        /* カード背景 */
  --color-bg-deep: #2C2C2E;        /* ダーク要素・フッター等 */

  /* テキスト */
  --color-text: #2C2C2E;           /* 本文・濃いダークグレー */
  --color-text-muted: #6E6E73;     /* サブテキスト */
  --color-text-light: #FFFFFF;     /* ダーク背景上のテキスト */

  /* ボーダー */
  --color-border: #E5E5EA;         /* 区切り線 */

  /* アクセント(テラコッタ・親ブランドらしい深み) */
  --color-accent: #C65D3D;         /* CTA・リンク・強調 */
  --color-accent-hover: #A84B30;   /* ホバー状態(より深く) */

  /* フォント */
  --font-sans: "Noto Sans JP", system-ui, sans-serif;
  --font-en: "Inter", "Helvetica Neue", system-ui, sans-serif;
}
```

意図(重要):

- **ベース**: ウォームグレー(知的・上品・コンサル業の信頼感)
- **アクセント**: テラコッタ #C65D3D
  - Easy Cooking の #EE7F6F(明るいコーラル)と**同系色だが、深く落ち着いた色**
  - 親ブランドらしい大人っぽさ・コンサル業の重厚感を表現
  - ブランドファミリー感は保ちつつ、親ブランドの独立性を確保
- **EC LP との関係**: 完全一致ではなく、「親が深く、子が明るい」という階層を色で表現
  - 親ブランド MAXIM AGENCY → テラコッタ(深い・大人)
  - 子ブランド Easy Cooking → コーラル(明るい・親しみやすい)

#### アクセント色の使い方

**限定的に使用** してください:

- CTA ボタン
- リンクホバー
- セクション見出しの小ラベル(例: `OUR APPROACH` 等のバッジ)
- Easy Cooking カードの強調(Products ページ)

**使わない箇所**:

- 大きな背景色として(ベースはあくまでウォームグレー)
- 本文テキストの色
- フッター背景

ウォームグレー基調を主役にし、アクセントは「目を引く要素」として効かせる方針。

#### タイポグラフィ・レイアウト方針

- 大胆なヒーロー見出し(Easy Cooking と統一感)
- 余白多めのミニマルレイアウト
- セクション見出しに小ラベル(例: `OUR APPROACH` `SERVICES` 等を Easy Cooking の `WORKFLOW` `FEATURES` と同様のスタイルで)
- フォント: 和文 Noto Sans JP、英文 Inter

#### 重要な方針

- 「ザ・Claude 生成感」を嫌う、マイルド + 暖かみ方向
- 「個人運営感」を出さない、組織風のトーン
- 海の写真(hero-1280.webp 等)は**当面保留**、新サイトでの活用は別チャットで判断

### 5. ナビゲーション構造

現状: Services / Process / About / Contact(シングルページ内アンカー)

新構造案:

```
[ヘッダーナビ]
- Consulting
- Products
- About
- Contact

[フッター]
列1: ナビ(Consulting / Products / About / Contact)
列2: 法的情報(プライバシーポリシー / 特定商取引法に基づく表記)
列3: 連絡先(info@maxim-agency.com)
最下段: © 2026 MAXIM AGENCY
```

### 6. フッター構造

Easy Cooking LP のフッター(`easycooking-lp/index.html` の構造)を参考にしつつ、MAXIM AGENCY 用に調整。詳細は実装段階で。

### 7. 問い合わせフォームの扱い

現状: お名前・メール・会社名・相談内容のフォーム + 送信ボタン

**新方針: フォームは完全撤廃**

理由:
- 紹介案件中心の運用方針
- フォームは保守コストが高い(送信先設定・スパム対策・送信失敗時のハンドリング等)
- メールリンク(mailto:)で十分

実装方針:

```html
<!-- Contact ページの本文 -->
<p>プロジェクトのご相談は、メールにて承ります。</p>
<a href="mailto:info@maxim-agency.com" class="contact-button">
  info@maxim-agency.com
</a>
<p>ご縁のあるクライアントと、じっくりとお付き合いすることを大切にしています。</p>
```

---

## Phase 1 の出力形式

以下の形式で設計案を提示してください:

### 1. ディレクトリ構造案(tree 形式)

```
maxim-agency-website/
├── ...
```

### 2. URL マッピング表

| URL | ファイル | 状態 |
|---|---|---|
| / | index.html | 新規作成 |
| ... | ... | ... |

### 3. CSS 設計方針

- 単一ファイル / 分割の判断
- カスタムプロパティの使い方
- 各ページ共通スタイル / ページ独自スタイルの境界

### 4. JS 方針

- 必要最小限の機能(モバイルナビ・スムーススクロール等)

### 5. 確認事項(別チャットへ問い合わせる項目)

不明点があれば、Phase 2 実装前に確認したい事項としてリストアップしてください。

---

## 制約

- Phase 0 と Phase 1 完了で**いったん停止**してください
- Phase 2(実装)には**まだ進まない**でください
- 設計案を提示し、承認待ちの状態にしてください
- 不明点・判断に迷う点があれば、明示的に質問してください

設計案が出たら、別チャットで確認の上、Phase 2 実装に進みます。

---

## 参照リソース

- 別チャットで確定した親ブランドの全コピー(Hero / Consulting / About / Contact / Products): 別チャットで参照する形なので、このリポジトリ内には未配置
- Easy Cooking LP のコード(参考): `~/dev/mamiya-projects/products/easycooking-lp/`
- Easy Cooking のブランドカラー正本: `~/dev/mamiya-projects/products/easy-cooking/docs/BRAND_COPY.md`

確定済みのコピーは別チャットから順次共有します。Phase 2 実装の段階で必要になります。
