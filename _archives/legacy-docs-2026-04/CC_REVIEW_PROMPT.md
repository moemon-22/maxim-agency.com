# CC（Claude Code / Cursor）用プロンプト — Website リニューアル確認・デプロイ

**作成日**: 2026-04-13（更新: 2026-04-14）
**目的**: Coworkで実施した `website/index.html` の修正を、CCで最終確認・クリーンアップ・コミット・プッシュする

---

## 【Cursor/Claude Codeに貼り付けるプロンプト本体】

以下をCursor/Claude Codeに丸ごと貼り付けてください。

---

````
website/index.html のリニューアル修正が Cowork（別セッション）で実施されました。以下の内容をレビューし、未使用コードのクリーンアップとデプロイまで対応してください。

## プロジェクト前提

MAXIM AGENCY（間宮企画）のコーポレートサイト。
- タグライン: We Carry AX Into Your Business（ロゴ内に含まれるため、ヒーロー内テキストとしての重複掲載はしない）
- ブランドトーン: 煽らない、盛らない、結果にコミット
- 代表者名（間宮大揮）はサイトに掲載しない
- 屋号「間宮企画」もサイト上には基本的に見せない（例外: 必要な法的表記のみ）
- 顔出しなし
- Webサイトはブランディング目的。集客・成約は狙わない
- ターゲットは業種非特化（クリニック限定ではない）

## 今回の修正方針（既に反映済み）

Webサイトを「ブランディングに特化した静かな存在感」のある構造に再設計。原則：

1. USP明確化: 「マーケター × 経営者 × AIエンジニア」の三位一体を旗印に
2. 集客要素の徹底削除: 「無料相談」等のCTA・集客コピーを全削除
3. 個人感を消す: MAXIM AGENCYという「組織・ブランド」主語で語る
4. 業種特化の排除: 3STEP構造等の歯科特化要素は載せない
5. 「伴走」という言葉は使わない: 「設計・実装します」等に統一
6. 屋号「間宮企画」は非掲載

## 反映済みの変更内容

### 削除したセクション
- Catchcopy セクション（「AIの導入、何から始めればいい？」）
- Challenges セクション（4つの課題提示）
- 中間CTAバナー ×2（after Services、after About）
- モバイルフローティングCTA
- 全ての「無料相談」「予約する」表現
- 補助金活用の訴求文

### 修正したセクション

- **Hero**
  - サブコピーを三位一体USPに変更: 「AI・マーケティング・経営の3視点で、中小企業・プロジェクトのデジタル変革を設計・実装します。」
  - CTAボタン（無料相談）削除
  - 当初追加した「We Carry AX Into Your Business」のタグライン表記は、ロゴ内に既にあるため冗長となり削除

- **Navigation / Mobile Menu**
  - nav-cta（無料相談）削除
  - リンク構成: Services / Process / About / Contact

- **Our Approach**
  - 見出しを「3つの視点で、デジタル変革を設計する」に変更
  - 3本柱を「マーケター視点／経営者視点／AIエンジニア視点」に再構成
  - 「家業」「建設会社」などの個人経歴の具体性を削除

- **Services**
  - 見出しを「取り扱う領域」に変更
  - 各サービスから「伴走」表現を削除

- **Process（復活・改善）**
  - 一度削除したが「現状（v4方針）に合わせて改善」して復活
  - 5ステップ構成: (01) お問い合わせ → (02) ヒアリング・現状分析 → (03) ご提案・お見積り → (04) ご契約・キックオフ → (05) 実装・納品・引き継ぎ
  - 変更点: 「無料相談」→「お問い合わせ」、期間表記（1〜2週間等）削除、「伴走」表現を全排除、予約ボタンは追加しない

- **About**
  - 見出しを「MAXIM AGENCYについて」に
  - 主語を「MAXIM AGENCY（組織）」に書き換え。「個人」感を消す
  - 個人経歴の具体性（家業・建設会社・広告代理店での具体的社名）を削除、「3つのフィールドを横断したバックグラウンド」という抽象化された表現に
  - 屋号「（間宮企画）」の表記を削除

- **Contact**
  - 見出しを「Contact」に（シンプル化）
  - 「まずは無料相談から。」→「プロジェクトのご相談は、メールにて承ります。」
  - 送信ボタン「無料相談を申し込む」→「送信する」
  - フォームの placeholder「株式会社○○ / ○○クリニック」→「株式会社○○」（業種非特化）
  - hidden input の件名: "MAXIM AGENCY 無料相談のお申し込み" → "MAXIM AGENCY お問い合わせ"

- **Footer**
  - `© 2026 MAXIM AGENCY / 間宮企画` → `© 2026 MAXIM AGENCY`（屋号削除）

- **title / meta / OGP / Twitter Card / 構造化データ**
  - 新タグライン・新説明に統一
  - title: `MAXIM AGENCY | We Carry AX Into Your Business`
  - description: `AI・マーケティング・経営の3視点で、中小企業・プロジェクトのデジタル変革を設計・実装するコンサルティングブランド。`

### 削除した未使用要素（HTML）
- `#mobileCta` 要素

## CCにお願いしたいこと

### 1. コードレビュー
`website/index.html` 全体を確認し、以下をチェック：
- [ ] 構文エラー・タグ閉じ忘れがないか
- [ ] 削除漏れしたリンク（#challenges 等）がないか（#process は復活済みなのでOK）
- [ ] 「無料相談」「予約する」「伴走」表現が完全に消えているか
- [ ] 「家業」「建設会社」等の個人経歴を示す記述が残っていないか
- [ ] 「間宮企画」表記がサイト上に残っていないか
- [ ] タグラインが適切に扱われているか（ロゴ内に含まれるため、テキストでの重複掲載はしていない）

### 2. 未使用CSS/JSのクリーンアップ

以下は削除済みセクション用のCSS/JSが残存しています。他で使われていないなら削除してください：

**未使用CSS（削除候補）:**
- `.catchcopy` 系（310行付近）
- `.challenges` 系（362行付近）— `.card-grid`, `.card`, `.card-icon` は他で使われていないので削除対象
- `.cta-banner` 系（584-598行付近）
- `.mobile-cta` 系（653-667行付近）

**残す CSS:**
- `.process`, `.process-steps`, `.step`, `.step-num` 系（Processセクションが復活したため残す）

**未使用JS（削除候補）:**
- `const mobileCta = document.getElementById('mobileCta');` 周辺のIntersectionObserver処理
- `document.querySelectorAll('.card-grid, .pillar-grid, .service-grid, .process-steps')` の `.card-grid` のみ除去（`.process-steps` は復活した要素なので残す）

削除する前に、各CSSクラスが他の場所で使われていないことを `grep` で確認してください。

### 3. ブラウザ確認
ローカルで動作確認してください：
- [ ] Hero のサブコピーが意図通り表示される（追加タグラインは無し、ロゴ内タグラインのみ）
- [ ] ナビゲーション（PC・モバイル両方）が Services / Process / About / Contact の4つ
- [ ] Catchcopy / Challenges / 中間CTAバナー / モバイルフローティングCTA が完全に消えている
- [ ] Process セクションが表示され、5ステップが意図通り並んでいる
- [ ] About に「間宮企画」「家業」「建設会社」等の文言が無い
- [ ] Contact フォームが正常に表示・送信できる（送信ボタンが「送信する」になっている）
- [ ] Footer が「© 2026 MAXIM AGENCY」のみ
- [ ] モバイル表示で崩れがない
- [ ] Lighthouse スコア（パフォーマンス・SEO・アクセシビリティ）が維持されている

### 4. Git コミット & プッシュ

確認・クリーンアップが終わったら：

```bash
cd ~/Desktop/dev/maxim-agency/website
git add -A
git status  # 変更内容を確認
git commit -m "Rebrand website: minimalist brand-focused structure

- Remove Catchcopy/Challenges/Mid-CTA/Mobile-Float sections (集客要素削除)
- Rewrite Hero/About with three-pillar USP (マーケター×経営者×AIエンジニア)
- Revive Process section with updated, non-salesy copy (お問い合わせ起点)
- Remove '間宮企画' label and personal-history specifics
- Strip all '無料相談'/'伴走' references
- Unify title/meta/OGP to new tagline context
- Clean up unused CSS/JS"
git push origin main
```

Vercel がGitHubを監視しているので、プッシュ後に自動デプロイされます。

### 5. デプロイ後の確認
- [ ] https://maxim-agency.com/ で変更が反映されているか
- [ ] OGPカードが意図通りか（Twitter Card Validator 等で確認）
- [ ] モバイル/デスクトップ双方でセクション構成が意図通りか
- [ ] Google Search Console でインデックス更新を促す

## 関連ドキュメント

- `../clients/dental/research/20260413_pricing_model_v4.md` — 料金モデル（歯科特化）
- `../brand/templates/MAXIM_AGENCY_Service_Guide_Dental.html` — Service Guide（歯科特化）
- `../operations/legal/contracts/20260413_contract_template_v4.docx` — 契約書テンプレート

## 注意事項

- Webサイトには価格情報を載せない方針（ブランディング重視のため）
- 業種特化版（3STEP構造等）はService Guide側に集中させる
- 将来、業種別ランディングページ（歯科、飲食等）を作る可能性あり。これは今回の修正では対応しない
- 未使用CSSを削除する際は、他のセクションで同じクラス名が使われていないか必ず確認（特に `.card` `.card-grid` は他で使われていないか grep してから判断）
````

---

## 【補足メモ】

### 最終的なサイト構造（6セクション）

1. **Hero** — ロゴ + サブコピー（三位一体USP）
2. **Our Approach** — 3つの視点で、デジタル変革を設計する
3. **Services** — 取り扱う領域（4つ）
4. **Process** — ご相談から実装までの流れ（5ステップ）
5. **About** — MAXIM AGENCYについて
6. **Contact** — プロジェクトのご相談はメールにて

### Daikiさんが CC セッション開始時にやること

1. Cursor で `~/Desktop/dev/maxim-agency/` を開く
2. このファイル（`CC_REVIEW_PROMPT.md`）を Cursor で開く
3. 三連バッククォートで囲まれたプロンプト本体を選択コピー
4. Claude Code（または Cursor のAI）に貼り付けて実行
5. CC が動作確認・クリーンアップ・デプロイまで進める

---

**補足**: もしCCでの確認中に、Coworkで行った修正に問題があれば、そのフィードバックをもとにCoworkで追加修正することも可能です。
