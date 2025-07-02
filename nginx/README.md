# プロキシサーバ

VPN 接続したホストを SSL でアクセスしたページからリクエストを送ると HTTPS でないためエラーを吐かれるため，nginx を介してサーバサイドでプロキシする

# 設定方法

```sh
cp default.conf.template.sample default.conf.template
```

を実行し，環境変数を含んだテンプレートを作成してください．\
ここでは環境変数を埋め込むことができます．（`$`などシェルスクリプトの特殊文字を扱う場合は`entrypoint.sh`を編集して sed でリプレースしてください）
