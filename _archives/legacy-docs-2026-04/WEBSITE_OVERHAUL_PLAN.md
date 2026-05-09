# MAXIM AGENCY ウェブサイト改修計画

作成日: 2026-04-09

---

## 現状の問題点と優先度

### Critical（即対応）

1. **ヒーロー画像 2.4MB** — `n1ce-2IAr_b34820-unsplash.jpg` が2.4MBで未圧縮。表示に5秒近くかかる可能性。WebP変換＋複数サイズ（srcset）で対応
2. **スクロールアニメーションのバグ** — `.fade-in` が `opacity: 0` で開始し、IntersectionObserverが発火しないとコンテンツが永久に見えない。`<noscript>` はあるがJS有効でObserverが失敗するケースに未対応
3. **SEOメタタグ皆無** — description, OGP (og:title, og:description, og:image), Twitter Card, canonical URL がゼロ
4. **ファビコンなし** — ブラウザタブでの識別不可
5. **CTAがmailtoのみ** — 問い合わせフォームもCal予約もなく、メーラーが開くだけ。コンバージョン計測不可

### High（早期対応）

6. **ダークテーマの印象** — ヒーロー・キャッチコピー・コンタクト・フッターが暗い。全体をライトベースに統一し、信頼感・清潔感を出す
7. **プライバシーポリシーなし** — GA4導入にはCookieポリシーが必要。法的にもリスク
8. **会社情報（特商法表記）不足** — 事業者名・所在地（区レベル）・連絡先が未掲載
9. **静的HTML一枚** — コンポーネント分割なし、保守性が低い

### Medium（段階的改善）

10. **アニメーション強化** — 現在はfade-in（translateY + opacity）のみ。スクロール連動のパララックス、カウンターアニメーション、カードのstaggered entrance等を追加
11. **AI連携** — チャットボットではなく、サイト体験の中でAI活用を示すUI要素（後述）
12. **GA4導入** — イベントトラッキング（CTA clicks, scroll depth, form submission）
13. **構造化データ** — LocalBusiness, Organization の JSON-LD

---

## Phase 1: CC（Cursor）への指示書

以下をCCに渡して実行する。

### 指示1: 画像最適化

```
website/n1ce-2IAr_b34820-unsplash.jpg を以下の手順で最適化してください:

1. sharp または squoosh で WebP に変換
   - hero用: 幅1920px, quality 80 → hero-1920.webp
   - hero用: 幅1280px, quality 80 → hero-1280.webp  
   - hero用: 幅 768px, quality 75 → hero-768.webp
   - OGP用: 幅1200px×630px, quality 85 → og-image.webp + og-image.jpg（OGPはjpg必須のSNSあり）

2. index.html のヒーロー画像を <picture> + srcset に書き換え:
   <picture>
     <source srcset="hero-768.webp 768w, hero-1280.webp 1280w, hero-1920.webp 1920w" type="image/webp" sizes="100vw">
     <img src="hero-1280.jpg" alt="" aria-hidden="true" loading="eager" fetchpriority="high">
   </picture>

3. コンタクトセクションの背景画像も同様に最適化（同じ画像を使い回している）

4. 元の n1ce-2IAr_b34820-unsplash.jpg は削除してOK（gitに履歴あり）
```

### 指示2: ライトテーマ統一 + デザイン刷新

```
website/index.html を全面的にライトテーマに統一してください。

■ デザイン方針
- ベース背景: #FFFFFF / セクション交互: #F8F9FA
- テキスト: #1A1A2E (primary), #4B5563 (secondary), #6B7280 (tertiary)
- アクセント: #4a9e9a (teal) はそのまま
- ナビゲーション: 白背景 + 下線ボーダー、スクロール時 backdrop-filter: blur(12px)
- フッター: #1A1A2E (ダーク) で締める（これだけダーク、サイト全体の「底」感を出す）

■ ヒーローセクション
- 背景画像はそのまま使うが、オーバーレイを明るめに調整
- または: 背景画像を上部40%だけに使い、下部は白にグラデーションでフェード
- ロゴ: logo-black.png に差し替え（暗い背景部分では logo.png）
- サブテキストのコントラスト確保

■ キャッチコピーセクション
- 現在の var(--bg-deep) ダーク背景 → 白背景に変更
- テキストカラーをダーク系に

■ コンタクトセクション
- 背景画像+ダークオーバーレイのデザインは残してOK（CTA目立たせるため）
- ただしボタンを .btn-primary（tealベタ塗り）に変更、ghost廃止
- 「無料相談を予約する」のリンク先を後で差し替えられるようにdata属性で管理

■ CSSカスタムプロパティ
- :root のダーク系変数を削除し、ライト系をデフォルトに
- フッターとコンタクトだけ .section-dark クラスで上書き
```

### 指示3: スクロールアニメーション修正 + 強化

```
website/index.html のアニメーションを修正・強化してください。

■ バグ修正
- .fade-in のフォールバック: IntersectionObserverが非対応 or エラー時、
  全 .fade-in に .visible を付与するフォールバック処理を追加
- 既にビューポート内にある要素は即座に .visible にする
  （ページ途中リロード時の対応）

■ アニメーション強化
1. Staggered entrance: カードグリッド内の各カードに transition-delay を
   インデックス×100ms でずらす
   例: .card-grid .fade-in:nth-child(1) { transition-delay: 0ms; }
       .card-grid .fade-in:nth-child(2) { transition-delay: 100ms; }
   → JSで動的に付与する方が保守的

2. ヒーローセクション: ロゴ → ライン → サブテキストの順にフェードイン
   （CSS animation + animation-delay で実装、JSは不要）

3. 数字カウントアップ: Processセクションの 01〜05 のステップ番号を
   スクロールで画面に入ったときにカウントアップ風に表示

4. スムーズスクロール: 既に scroll-smooth あるが、
   ナビリンクのクリック時にアクティブ状態を反映する
   （スクロール位置に応じてナビリンクにアンダーラインを付ける）

5. パララックス（軽量）: ヒーロー背景画像に transform: translateY() の
   軽いパララックス効果（requestAnimationFrame使用、
   prefers-reduced-motion対応）

■ ライブラリは使わない（バニラJS + CSS）
■ prefers-reduced-motion: reduce では全アニメーションを無効化
```

### 指示4: SEO + メタタグ + 構造化データ

```
website/index.html の <head> に以下を追加してください。

■ 基本メタタグ
<meta name="description" content="MAXIM AGENCY — 中小企業・個人事業主のためのAI導入・DX推進パートナー。経営者目線で、AI導入から定着まで伴走します。東京都港区。">
<meta name="keywords" content="AI導入, DX推進, 中小企業, コンサルティング, 業務改善, デジタル化, AI活用">
<link rel="canonical" href="https://maxim-agency.com/">

■ OGP
<meta property="og:title" content="MAXIM AGENCY | 中小企業のためのAI導入・DX推進パートナー">
<meta property="og:description" content="経営者目線で、AI導入から定着まで伴走します。無料相談受付中。">
<meta property="og:image" content="https://maxim-agency.com/og-image.jpg">
<meta property="og:url" content="https://maxim-agency.com/">
<meta property="og:type" content="website">
<meta property="og:locale" content="ja_JP">
<meta property="og:site_name" content="MAXIM AGENCY">

■ Twitter Card
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="MAXIM AGENCY | AI導入・DX推進パートナー">
<meta name="twitter:description" content="中小企業・個人事業主のためのAI導入・DX推進。経営者目線で伴走します。">
<meta name="twitter:image" content="https://maxim-agency.com/og-image.jpg">

■ ファビコン
- logo.pngから32x32, 16x16のfavicon.icoを生成
- apple-touch-icon (180x180) も生成
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">

■ 構造化データ（JSON-LD）
<script> タグ内に以下を追加:
- @type: "ProfessionalService" 
- name: "MAXIM AGENCY"
- description: 上記descriptionと同じ
- url: "https://maxim-agency.com/"
- address: { @type: PostalAddress, addressLocality: "港区", addressRegion: "東京都", addressCountry: "JP" }
- email: "info@maxim-agency.com"
- sameAs: [] (SNSアカウント作成後に追加)
- areaServed: "JP"

■ robots.txt を新規作成
User-agent: *
Allow: /
Sitemap: https://maxim-agency.com/sitemap.xml

■ sitemap.xml を新規作成
```

### 指示5: CTA改善

```
■ 問い合わせCTA
現在: <a href="mailto:info@maxim-agency.com">無料相談を予約する</a>
→ 当面の改善: Googleフォームまたはフォームサービスを埋め込み
   - 名前、メールアドレス、会社名（任意）、相談内容（自由記述）
   - 送信後にサンクスメッセージ表示
   
→ 理想: Cal.com や Calendly で30分枠を直接予約できるように
   - 「無料相談を予約する」→ Calendlyのポップアップ or 埋め込み

■ CTAの配置強化
- ヒーローセクション直下のキャッチコピーにCTAボタンあり → OK
- Servicesセクションの下にもCTAバナーを追加
  「あなたのビジネスに最適なAI活用法を一緒に見つけませんか？」+ ボタン
- About後にもCTAを配置（信頼感→行動の導線）
- フローティングCTA（スマホ時、画面下部に固定のバー）検討
```

---

## Phase 2: GitHub Pages → Vercel 移行 + フォーム接続

### 2-A: フォームバックエンド接続（Formspree）

Phase 1の指示5で作成したデモフォームに、Formspreeのバックエンドを接続する。

#### CC向け指示:
```
website/index.html のコンタクトフォームにFormspreeを接続してください。

■ 手順
1. フォームの <form> タグに以下を追加:
   - action="https://formspree.io/f/{FORM_ID}" （FORM_IDは後で差し替え）
   - method="POST"

2. 各 input に name 属性を確認・追加:
   - name="name" （名前）
   - name="email" （メールアドレス）
   - name="company" （会社名・クリニック名）
   - name="message" （相談内容）

3. 隠しフィールドでスパム対策:
   <input type="hidden" name="_subject" value="MAXIM AGENCY 無料相談のお申し込み">
   <input type="text" name="_gotcha" style="display:none"> <!-- ハニーポット -->

4. 送信後のリダイレクト:
   <input type="hidden" name="_next" value="https://maxim-agency.com/#contact-thanks">
   ※ フォーム送信後に #contact-thanks セクション（サンクスメッセージ）を表示する処理を追加

5. 既存のデモ動作（JSでのフォーム送信ハンドリング）を削除し、
   Formspreeへの通常のHTTPフォーム送信に切り替え

6. git commit -m "feat: Formspreeでフォームバックエンド接続"
```

#### Daiki側の作業（CCの前に）:
1. https://formspree.io/ でアカウント作成（GitHub連携 or メール）
2. 新しいフォームを作成 → FORM_ID を取得（例: xrgvalob）
3. FORM_ID をCCに伝える

### 2-B: Vercel移行

#### なぜ移行するか
- GitHub Pages: 静的HTMLのみ、ビルドステップなし、リダイレクトルール不可
- Vercel: Next.js対応、画像最適化（next/image）、エッジ配信、Analyticsダッシュボード、リダイレクト・ヘッダー設定可能

#### 推奨: 2段階で移行
**Step 1（今すぐ可能）: 静的HTMLのままVercelにデプロイ**
- Next.js化不要。今のindex.htmlがそのまま動く
- CDN配信でPageSpeed改善、ヘッダー制御、プレビューデプロイが使える

**Step 2（後日）: Next.js化**
- 業種別パーソナライズ等の動的機能を実装する段階で着手
- 歯科クライアント向けの練習にもなる

#### CC向け指示（Step 1: 静的デプロイ）:
```
website/ を静的サイトとしてVercelにデプロイできるよう準備してください。

■ 手順
1. website/ のルートに vercel.json を作成:
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" }
      ]
    },
    {
      "source": "/(.*)\\.(jpg|jpeg|png|webp|svg|ico)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    }
  ],
  "redirects": [
    { "source": "/index.html", "destination": "/", "permanent": true }
  ]
}

2. .gitignore に .vercel/ を追加

3. CNAME ファイルはVercel移行完了後に削除するため、今はそのまま残す

4. git commit -m "feat: Vercelデプロイ用設定ファイル追加"
```

#### Daiki側の作業（CCの後に）:
1. https://vercel.com/ でアカウント作成（GitHub連携）
2. 「Import Git Repository」→ maxim-agency の website リポジトリを選択
3. Framework Preset: 「Other」を選択（Next.jsではない）
4. Root Directory: `./` （website/ がリポジトリのルートの場合）
5. Deploy → プレビューURLで動作確認
6. Settings → Domains → maxim-agency.com を追加
7. ドメインのDNS設定を変更:
   - CNAME: `cname.vercel-dns.com` に向ける
   - または A: `76.76.21.21`
8. DNS浸透待ち（通常数分〜数時間、最大48時間）
9. SSL自動発行を確認
10. 動作確認後、GitHubリポジトリの Settings → Pages を無効化
11. CNAME ファイルを削除 → git push

---

## Phase 3: GA4 導入

### 設定手順（CC or 手動）
1. Google Analytics 4 でプロパティ作成（maxim-agency.com）
2. 測定ID（G-XXXXXXXX）を取得
3. index.html の `<head>` 内に gtag.js スニペットを追加:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXX');
</script>
```
4. イベント設定:
   - CTA クリック: `gtag('event', 'cta_click', { location: 'hero' | 'services' | 'contact' })`
   - 電話タップ（将来）: `gtag('event', 'phone_tap')`
   - スクロール深度: GA4のデフォルト（Enhanced Measurement）で取得可能
   - フォーム送信: `gtag('event', 'form_submit')`
5. Google Search Console にサイト登録、サイトマップ送信
6. Looker Studio テンプレート接続（月次レポート用 — 歯科クライアントにも同様に提供するため練習）

### プライバシーポリシーの必要性
GA4はCookieを使用するため、プライバシーポリシーページが必須。
- `privacy.html` を新規作成
- 内容: Cookie使用の告知、GA4によるアクセス解析の説明、個人情報の取り扱い
- フッターからリンク

---

## Phase 4: AI連携（チャットボット以外）

Daikiが「チャットボットではない」と明言しているため、以下のアプローチを提案:

### A. AIを使って作っていること自体を見せる（ブランディング）
- Aboutセクションやフッターに「このサイトはAI技術を活用して制作・運用されています」のバッジ
- Webサイト制作プロセスにAIを組み込んでいることを示す（AI-assisted development）

### B. パーソナライズド・コンテンツ（将来・Next.js化後）
- 訪問者の業種を選択するUI → 業種別の課題・事例を動的表示
  例: 「あなたの業種は？」→ 飲食 / クリニック / 建設 / その他
  → 選択した業種に合わせた課題カード・導入事例が切り替わる
- **これがAI連携の本命**: 業種別のパーソナライズこそ、静的サイトにはない付加価値

### C. AI診断ツール（EQUIPMENTs事業との連携）
- 「あなたのビジネスのDX度を無料診断」— 5問程度の簡易アンケート
- AIが回答を分析し、改善の方向性をレポート
- メールアドレス入力で結果送信 → リード獲得
- これ自体がEQUIPMENTs事業のプロダクトになり得る

### D. AI要約・FAQ生成
- サービスページのコンテンツをAIが要約して表示するUI
- 「よくある質問」をAI生成で定期更新（ブログ・SNS投稿と連動）

**推奨優先度: B > C > A > D**

---

## CC向け統合プロンプト（一括実行用）

以下はCursorに一括で渡す場合のプロンプト:

```
website/index.html を以下の方針で全面改修してください。
一度に全部やらず、指示1→2→3→4→5の順で、各ステップ完了後にコミットしてください。

【前提】
- 単一の index.html + CSS + JS（フレームワークなし）
- GitHub Pages でホスティング中（後日Vercelに移行予定）
- ロゴ: logo.png（白背景用）、logo-black.png（ダーク背景用）
- ブランドカラー: teal #4a9e9a
- 代表者フルネームはサイトに掲載しない
- 料金はサイトに掲載しない

【指示1: 画像最適化】
- n1ce-2IAr_b34820-unsplash.jpg (2.4MB) を WebP に変換
- 3サイズ生成 (768w, 1280w, 1920w)
- <picture> + srcset に書き換え
- OGP用画像 (1200x630) も生成

【指示2: ライトテーマ統一】
- ベース: 白 #FFFFFF / 交互セクション: #F8F9FA
- ナビ: 白背景、スクロール時 blur
- ヒーロー: 背景画像を上部に限定、下部は白へグラデーション
- キャッチコピー: 白背景に変更
- フッター: ダーク #1A1A2E（ここだけダーク）
- コンタクト: ダークオーバーレイは維持、ボタンを teal ベタ塗りに

【指示3: アニメーション修正・強化】
- fade-in フォールバック追加（Observerエラー時）
- staggered entrance（カード100msずらし）
- ヒーロー: ロゴ→ライン→テキスト順にフェードイン
- ナビリンクのアクティブ状態反映
- ヒーロー背景に軽いパララックス
- prefers-reduced-motion 対応

【指示4: SEO】
- meta description, OGP, Twitter Card 追加
- favicon生成 (32x32, apple-touch-icon 180x180)
- JSON-LD (ProfessionalService) 追加
- robots.txt, sitemap.xml 新規作成
- canonical URL 設定

【指示5: CTA改善】
- mailto を Googleフォーム or 埋め込みフォームに差し替え
- Servicesセクション下に中間CTA追加
- スマホ時のフローティングCTAバー検討
- 各CTAに data-cta-location 属性（GA4イベント用）

各ステップ完了後に git commit してください。
コミットメッセージは日本語で、変更内容がわかるように。
```

---

## チェックリスト（改修完了後の確認）

- [ ] PageSpeed Insights: モバイル90+、デスクトップ95+
- [ ] Lighthouse: Performance, Accessibility, Best Practices, SEO すべて90+
- [ ] OGP確認: https://ogp.me/ のバリデータで確認
- [ ] Google Search Console: サイトマップ送信済み
- [ ] GA4: リアルタイムレポートでデータ受信確認
- [ ] 全デバイス表示確認 (iPhone SE, iPhone 15, iPad, デスクトップ)
- [ ] リンク切れチェック
- [ ] アニメーション: スクロール時に全セクション表示されることを確認
- [ ] prefers-reduced-motion: アニメーション無効化の確認
- [ ] プライバシーポリシーページの存在確認
