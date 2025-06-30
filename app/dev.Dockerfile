# ベースイメージ
FROM node:22.17 AS base

RUN corepack enable

# 依存関係のキャッシュ
FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .

# Next.jsのキャッシュディレクトリをボリュームとしてマウントすることで、
# ホットリロード時のパフォーマンスを向上させ、コンテナ再起動時のビルド時間を短縮
VOLUME /app/.next

# 開発サーバーのポート
EXPOSE 3000

# 開発サーバーを起動
CMD ["pnpm", "dev"]
