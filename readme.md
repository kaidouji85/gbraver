機動倶楽部Gブレイバー
===========

This software is released under the MIT License, see LICENSE.txt.


## はじめに
socket.ioとenchant.jsで作られた対戦ゲームです。
Yuusuke Takeuchiが趣味として作っています。


## 環境変数の設定

| 環境変数名               | 説明                                   | 必須 | デフォルト値    |
|:------------------------|:--------------------------------------|:-----|:--------------|
| GOOGLE_CLIENT_ID        | GoogleOAuth2.0のClient ID             | ○    |               |
| GOOGLE_CLIENT_SECRET    | GoogleOAuth2.0のGOOGLE CLIENT SECRET  | ○    | -             |
| TWITTER_CONSUMER_KEY    | Twitter Oauth認証用のconsume key       | ○    | -             |
| TWITTER_CONSUMER_SECRET | Twitter Oauth認証用のconsumer secret   | ○    | -             |
| PORT                    | 起動するポート番号                      |       | 3000          |
| BASE_URL                | OAuth2.0のリダイレクト先のベースURL      |       | localhost     |
| CONTENT_BASE_URL        | 静的コンテンツの配置先URL                |       | BASE_URLの値  |

## GruntConfig.jsonの作成
gruntタスクの設定ファイルであるGruntConfig.jsonを作成します。
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
## ローカル環境での開発
### 開発環境構築
(1)必須ソフトウェア  
導入の前提として、以下のソフトがインストールされている必要があります。  
・node.js
・mongodb  

(2)githubからソースコードのコピー  
githubからプロジェクトをダウンロードします。

(3)依存ライブラリのインストール  
  
    npm install -g mocha
    npm install -g grunt-cli
    npm install -g karma-cli
    npm install


(4)データベースの初期化  

    grunt mongoLocal


### フロントエンドのビルド

#### プロダクト

```bash
# 通常ビルド
grunt build
    
# watch
grunt watch
```

#### ユニットテスト

```bash
# 通常ビルド
grunt buildUnitTest
    
# watch
grunt watchUnitTest
```    

#### 画面テスト
```
 # 通常ビルド
 grunt buildGameTest

 # ファイル単体のビルド
 grunt buildGameTest --target テストファイル名
    
 # watch
 grunt watchGameTest
    
 # ファイル単体のwatch
 grunt watchGameTest --target テストファイル名
```

単体ビルドのファイル名はtest/game/srcの下から書くこと

### サーバの起動

```
npm start
```

### テスト実行

#### サーバサイドのユニットテスト

```
mocha test/server/*
```
 
※サーバサイドのユニットテストは一気に実行すると、1、２個落ちることがある。その場合は、落ちたテストだけ個別に実行すること。

#### クライアントサイドのユニットテスト

```
karma start
```

#### 画面テスト
事前にサーバを起動させる。

(1)個別に実行
- http://localhot:3000/testList を開く
- テスト一覧が表示されるので、任意のテストをクリックする

(2)一斉に実行

```
mocha --timeout 100000 test/game/clientTest
```


##herokuへのデプロイ方法
(1)前提条件
・heorokuコマンドが使えるようにして下さい。

(2)herokuインスタンスの用意
herokuインスタンスを用意します。アドオンでMongoHqを追加して下さい。

(3)herokuへデプロイ  

    #プロダクション環境へのデプロイ
    grunt deploy
    
    # ベータ環境へのデプロイ
    grunt deployBeta

## 素材提供
[DOGA L-3(ロボットグラフィック)](http://doga.jp/2010/programs/dogal/index.html#dogal3)  
[魔王魂(BGM)](http://maoudamashii.jokersounds.com/)  
[ザ・マッチメイカァズ様　(効果音)](http://osabisi.sakura.ne.jp/m2/)  
[Webフォントファン様 (フォント)](http://webfontfan.com)  
[キャラクターなんとか機(女の子グラフィック)](http://khmix.sakura.ne.jp/download.shtml)


## その他
中の人のブログです。 毎日プログラム  <http://blog.livedoor.jp/kaidouji85/>    
安定版 <http://gbraver.herokuapp.com/>  