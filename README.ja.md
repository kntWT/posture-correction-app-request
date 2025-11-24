# 姿勢推定 API 利用申請（研究室内向け）

このリポジトリは、[姿勢推定 API](https://github.com/kntWT/posture-correction-backend)を使ったアプリを作成するための AppId を取得するためのものです．

# 起動方法

## 環境変数を設定する

- プロジェクトルート
  - `.env.sample`を参考に適切な環境変数を設定してください
  - 必要に応じて`BACK_END_HOST`の数は調整し，[docker-compose.yml](docker-compose.yml)と[nginx/default.conf](nginx/default.conf.template.sample)も同様に調整してください
- app（[README.md](app/README.md)）
- nginx（[README.md](nginx/README.md)）

## 起動

- `docker compose up --build`で起動してください
  - 環境変数の設定に応じて開発用または本番用の環境で起動できます

# 申請フロー

- 設定したバックエンドホストの中から利用したい方を選択してください
- その後 Google ログインを行い，そのバックエンドにユーザデータを登録（またはサインイン）します
- 申請フォームページにいき，プロジェクト名を入力します
- 作成ボタンを押すと`appId`が表示されるので，メモしてください．（基本的に 1 度しか表示されないので注意してください）

# 注意事項

- 姿勢推定 API を使ったアプリ開発をする際は，このアプリで取得した`appId`をリクエストヘッダーに含めるようにしてください（詳細は[リポジトリの README](https://github.com/kntWT/posture-correction-backend)を参照してください）
- また，ホストの選択を間違えないように注意してください（選択したホスト以外にはとデータが保存されていません）
