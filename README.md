# MAXIM AGENCY

`https://maxim-agency.com` の公式サイト。

MAXIM AGENCY は屋号「間宮企画」(個人事業主) の対外的な親ブランドで、以下 2 事業を展開:

- **Consulting** — 既存事業の延長
- **Products** — 第 1 弾は Easy Cooking (`https://easycooking.jp`)

## 構成

静的 HTML + CSS + JS。フレームワークは使わない。

```
├── index.html                  親ブランドトップ
├── consulting/                 Consulting 事業詳細
├── products/                   プロダクト一覧ハブ
├── legal/privacy/              プライバシーポリシー
├── assets/css/style.css        共通スタイル
├── assets/js/main.js           共通スクリプト
└── _archives/                  過去資産（参照用）
```

## ローカル開発

```bash
python3 -m http.server 8000
```

ブラウザで `http://localhost:8000/` を開く。

## デプロイ

Vercel に main ブランチ push で自動デプロイ。設定は `vercel.json`。

## 関連リポジトリ

- Easy Cooking LP: `~/dev/mamiya-projects/products/easycooking-lp/`
- Easy Cooking ブランド資料: `~/dev/mamiya-projects/products/easy-cooking/docs/BRAND_COPY.md`
