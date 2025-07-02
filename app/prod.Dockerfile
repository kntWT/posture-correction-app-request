# Stage 1: 依存関係のインストールとビルド
FROM node:22.17 AS builder

# pnpmをインストール
RUN corepack enable && \
    corepack prepare pnpm@latest --activate

WORKDIR /app

# package.jsonとpnpm-lock.yamlをコピーして依存関係をインストール
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# ソースコードをコピーしてNext.jsアプリケーションをビルド
COPY . .
RUN pnpm build

# Stage 2: 本番環境のセットアップ
FROM node:22.17 AS runner

WORKDIR /app

# 環境変数を設定 (必要に応じて追加)
ENV NODE_ENV production

# Next.jsのスタンドアロン出力ディレクトリをコピー
# Next.js 12以降のstandalone出力機能を利用
COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/public ./public

# Next.jsサーバーのポート
EXPOSE 3000

# Next.jsアプリケーションを起動
CMD ["node", "server.js"]

