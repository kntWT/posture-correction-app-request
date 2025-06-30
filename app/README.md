# Posture Correction App Request

このリポジトリは、Next.js + TypeScript + Firebase + SWR + Zod + Tailwind CSS などを用いた姿勢矯正アプリのリクエスト管理 Web アプリです。\
研究室の Galleria2 台のうちどちらを使うか選べます．（選択肢たもの以外にはデータが登録されないので注意してください）

## 主な機能

- Google 認証によるログイン
- プロジェクト作成
- バックエンドホストの選択

## ディレクトリ構成

```
app/
  ├─ src/
  │   ├─ app/         # Next.js App Router配下のページ
  │   ├─ components/  # UI・フォーム・共通部品
  │   ├─ contexts/    # React Context (認証・プロジェクト)
  │   ├─ lib/         # APIクライアント・バリデーションスキーマ等
  │   ├─ configs/     # バックエンドホスト等の設定
  ├─ public/          # 静的ファイル
  ├─ package.json     # 依存パッケージ
  ├─ ...
```

## セットアップ方法

1. 依存パッケージのインストール

```bash
pnpm install
```

2. 開発サーバ起動

```bash
pnpm dev
```

3. ブラウザで [http://localhost:3000](http://localhost:3000) を開く

## Docker での起動

1. `.env` ファイルをプロジェクトルートに作成し、必要な環境変数を記載
2. 下記コマンドで起動

```bash
docker compose up --build
```

## 主な技術スタック

- Next.js 15 (App Router)
- React 19
- TypeScript
- Firebase Auth
- SWR (API 通信)
- react-hook-form + zod (バリデーション)
- Tailwind CSS, shadcn/ui, lucide-react (UI)

## 環境変数

- env.d.ts を参考に適切な環境変数を設定してください
- BACKEND_HOST は必要に応じて増減してください\
  また，バックエンドホストの選択肢を`app/src/configs/backend-host/backendHost.ts`で定義しています．同じディレクトリの`sample.ts`を参考に定義してください．\
  この時，`as const`をつけないと型情報がおかしくなるので注意してください．

## 開発 Tips

- バックエンドホストやユーザ情報は localStorage で永続化され、リロードしても保持されます。
- API 連携は SWR のカスタムフックで行っています。
- 型安全なバリデーションは zod で実装。

---

ご不明点・要望は Issue または PR でご連絡ください。
