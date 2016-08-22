機動倶楽部Gブレイバー
==================

This software is released under the MIT License, see LICENSE.txt.


## はじめに
socket.ioとenchant.jsで作られた対戦ゲームです。
Yuusuke Takeuchiが趣味として作っています。

## 開発環境構築
(1)必須ソフトウェアのインストール
・node.js
・mongodb  

(2)環境変数の設定

| 環境変数名               | 説明                                   |
|:------------------------|:--------------------------------------|
| GOOGLE_CLIENT_ID        | GoogleOAuth2.0のClient ID             |
| GOOGLE_CLIENT_SECRET    | GoogleOAuth2.0のGOOGLE CLIENT SECRET  |
| TWITTER_CONSUMER_KEY    | Twitter Oauth認証用のconsume key       |
| TWITTER_CONSUMER_SECRET | Twitter Oauth認証用のconsumer secret   |

(3)GruntConfig.jsonの作成
gruntタスクの設定ファイルであるGruntConfig.jsonを、readme.mdがある階層に作成します。

```javascript
{
    "s3" :{
        "key": "AWSのkey",
        "secret": "AWSのsecret"
    },
    "mongo" : {
        "product": {
            "user": "本番環境のmongoDBのユーザ名",
            "password":"本番環境のmongoDBのパスワード",
            "url":"本番環境のmongoDBのURL"
        },
        "beta": {
            "user": "テスト環境のmongoDBのユーザ名",
            "password":"テスト環境のmongoDBのパスワード",
            "url":"テスト環境のmongoDBのURL"
        }
    }
}
```

(4)依存ライブラリのインストール
```  
npm install -g mocha
npm install -g grunt-cli
npm install -g karma-cli
npm install
```

(5)データベースの初期化  
```
grunt mongoLocal
```


## ローカル環境での起動方法 
### 通常起動
(1)サーバの起動
```
npm start
```

(2)サーバにアクセス
ブラウザを開いて以下にアクセスする
http://localhost:3000


### デバッグ実行


(1)サーバをデバッグモードで起動
以下コマンドを実行する
```
npm run debug
```

コマンドラインに「chrome-devtools://...」と表示されるので、これをコピーしてchromeのurlに貼り付ける

(2)サーバにアクセス
ブラウザを開いて以下にアクセスする
http://localhost:3000

元ネタ
http://qiita.com/y_fujieda/items/c190cbcc2fab6dd49809


## テスト実行方法
#### サーバサイドのユニットテスト

```
mocha test/server/*
```
※サーバサイドのユニットテストは一気に実行すると、1、２個落ちることがある。その場合は、落ちたテストだけ個別に実行すること。

#### クライアントサイドのユニットテスト
```
grunt buildUnitTest
karma start
```

#### 画面テスト
##### 個別に実行
(1)テストのビルド
```
grunt buildGameTest
```
(2)ブラウザでアクセス
http://localhot:3000/testList を開く。
テスト一覧が表示されるので、任意のテストをクリックする。

#### 一斉に実行
```
grunt buildGameTest
mocha --timeout 100000 test/game/clientTest
```

##herokuへのデプロイ方法
### 前提
- heroku-toolbeltをインストールしている
- ステージング環境、本番環境の2環境があるとします

### ステージング環境へのデプロイ
(1)環境変数の設定
以下の環境変数をherokuに設定する。
この操作は1回行いえば、以降はやらなくよい。

| 環境変数名               | 説明                                   |
|:------------------------|:--------------------------------------|
| GOOGLE_CLIENT_ID        | GoogleOAuth2.0のClient ID             |
| GOOGLE_CLIENT_SECRET    | GoogleOAuth2.0のGOOGLE CLIENT SECRET  |
| TWITTER_CONSUMER_KEY    | Twitter Oauth認証用のconsume key       |
| TWITTER_CONSUMER_SECRET | Twitter Oauth認証用のconsumer secret   |
| BASE_URL                | デプロイ先のheroku環境のベースURL        |


(2)デプロイコマンド
```
grunt deployBeta
```

### 本番環境へのデプロイ
(1)環境変数の設定
ステージング環境で設定したものに加え、以下を追加で設定する。
これもステージング環境同様、1回だけ設定すればいい。

| 環境変数名               | 説明                                   |
|:------------------------|:--------------------------------------|
| CONTENT_BASE_URL        | 静的コンテンツの配置先URL                |


(2)デプロイコマンド
```
grunt deploy
```

## 素材提供
[DOGA L-3(ロボットグラフィック)](http://doga.jp/2010/programs/dogal/index.html#dogal3)  
[魔王魂(BGM)](http://maoudamashii.jokersounds.com/)  
[ザ・マッチメイカァズ様　(効果音)](http://osabisi.sakura.ne.jp/m2/)  
[Webフォントファン様 (フォント)](http://webfontfan.com)  
[キャラクターなんとか機(女の子グラフィック)](http://khmix.sakura.ne.jp/download.shtml)


## 付録
### タスク一覧

| コマンド                                      | 説明 |
|:---------------------------------------------|:----|
| npm start                                    | プロダクトの実行 |
| npm run debug                                | プロダクトのデバッグ実行 |
| mocha test/server/*                          | サーバ側のユニットテスト |
| grunt build                                  | プロダクトのビルド |
| grunt watch                                  | プロダクトのインクリメンタルビルド |
| grunt buildUnitTest                          | クライアント側ユニットテストのビルド |
| grunt watchUnitTest                          | クライアント側ユニットテストのインクリメンタルビルド |
| grunt buildGameTest                          | 全てのの画面テストのビルド |
| grunt buildGameTest --target テストファイル名  | ファイル単体での画面、テストファイル名はtest/game/srcの下から書くこと |

### 環境変数一覧

| 環境変数名               | 説明                                   | 必須 | デフォルト値    |
|:------------------------|:--------------------------------------|:-----|:--------------|
| GOOGLE_CLIENT_ID        | GoogleOAuth2.0のClient ID             | ○    |               |
| GOOGLE_CLIENT_SECRET    | GoogleOAuth2.0のGOOGLE CLIENT SECRET  | ○    | -             |
| TWITTER_CONSUMER_KEY    | Twitter Oauth認証用のconsume key       | ○    | -             |
| TWITTER_CONSUMER_SECRET | Twitter Oauth認証用のconsumer secret   | ○    | -             |
| PORT                    | 起動するポート番号                      |       | 3000          |
| BASE_URL                | OAuth2.0のリダイレクト先のベースURL      |       | localhost     |
| CONTENT_BASE_URL        | 静的コンテンツの配置先URL                |       | BASE_URLの値  |

## その他
中の人のブログです。 毎日プログラム  <http://blog.livedoor.jp/kaidouji85/>    
サービス公開先 <http://gbraver.herokuapp.com/>  