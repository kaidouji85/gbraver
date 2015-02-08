機動倶楽部Gブレイバー
=======

## はじめに
機動倶楽部Gブレイバーとは、竹内佑介が趣味で作成している通信対戦ゲームです。
node.js、socket.io、enchant.jsがあれば簡単に出来るだろうという軽いノリで作りました。


## ゲームについて
詳細は以下ページをご参照ください。  
<http://gbraver.jimdo.com/%E9%81%8A%E3%81%B3%E6%96%B9/>

##環境変数の設定
本プログラムを実行する前に、以下の環境変数を設定する必要があります。

| 環境変数名 | 説明  | 必須 | デフォルト値 |
|:----------|:-----|:-----|:-----------|
| GOOGLE_CLIENT_ID | GoogleOAuth2.0のClient ID | ○ | - |
| GOOGLE_CLIENT_SECRET | GoogleOAuth2.0のGOOGLE CLIENT SECRET | ○ | - |
| PORT | 起動するポート番号 |  | 3000 |
| BASE_URL | OAuth2.0のリダイレクト先のベースURL |  | localhost |
| CONTENT_BASE_URL | 静的コンテンツの配置先URL |  | BASE_URLの値 |

##GruntConfig.jsonの作成
gruntタスクの設定ファイルであるGruntConfig.jsonを作成します。
```javascript
{
    "s3" :{
        "key": "AWSのkey",
        "secret": "AWSのsecret"
    },
    "mongo" : {
        "user": "本番環境のmongoDBのユーザ名",
        "password":"本番環境のmongoDBのパスワード",
        "url":"本番環境のmongoDBのURL"
    },
    "mongoBeta" : {
        "user": "テスト環境のmongoDBのユーザ名",
        "password":"テスト環境のmongoDBのパスワード",
        "url":"テスト環境のmongoDBのURL"
    }
}
```
##ローカル環境で開発をする
### ローカル環境への導入
(1)必須ソフトウェア  
導入の前提として、以下のソフトがインストールされている必要があります。  
・node.js  
・mongodb  

(2)githubからソースコードのコピー  
githubからプロジェクトをダウントードします。


(3)依存ライブラリのインストール  
プロジェクトフォルダのルートに移動して、以下コマンドで依存ライブラリをインストールします。  

    npm install


(4)データベースの初期化  
以下コマンドで、データベースを初期化します。  

    mongodb mongo ホスト名/gbraver dbShell/createDB.js

(5)startup.shの作成
node.jsの起動と同時に環境変数を設定するように、startup.shを作成します。
startup.shの場所はshell配下に置いて下さい。

    #!/bin/sh

    GOOGLE_CLIENT_ID="GoogleOAuth2.0のClient ID"
    GOOGLE_CLIENT_SECRET="GoogleOAuth2.0のGOOGLE CLIENT SECRET"

    export GOOGLE_CLIENT_ID
    export GOOGLE_CLIENT_SECRET

    node app.js


### ローカル環境の起動方法
以下コマンドを実行します。
   
    npm start


### ローカルでのテスト実行方法
テストフレームワークのmochaをnpmからインストールしておいてください。

    npm install mocha -g

テストの実行コマンドは以下の通りです。
####ユニットテスト

    npm test

####DAOテスト

    mocha mongoDbTest/ -R spec

####画面系テスト

    mocha seleniumTest/ -R spec

- 画面系テストはpublicForDebug配下に置かれた、*Test.jsが実行されます。
- ホスト名:ポート/testList でテスト一覧が出ます

####認証系テスト

    NODE_MAIL_ADDRESS="テスト用Googleアカウント"  NODE_PASSWORD="テスト用Googleアカウントパスワード"  mocha loginTest/ -R spec

##herokuへのデプロイ方法
(1)前提条件
・heorokuコマンドが使えるようにして下さい。

(2)herokuインスタンスの用意
herokuインスタンスを用意します。アドオンでMongoHqを追加して下さい。

(3)環境変数の登録
herokuに環境変数を登録します。ここでは環境変数登録バッチのテンプレートを示します。

    #!/bin/sh

    herokuAppName="herokuアプリ名"
    heroku config:add BASE_URL="herokuアプリのURL" --app $herokuAppName
    heroku config:add GOOGLE_CLIENT_ID="GoogleOAuth2.0のClient ID" --app $herokuAppName
    heroku config:add GOOGLE_CLIENT_SECRET="GoogleOAuth2.0のGOOGLE CLIENT SECRET" --app $herokuAppName
    heroku config:add CONTENT_BASE_URL="静的コンテンツのベースURL" --app $herokuAppName

(4)herokuへデプロイ  
以下コマンドでherokuにデプロイします。

    grunt deploy


## 素材提供
[DOGA L-3(ロボットグラフィック)](http://doga.jp/2010/programs/dogal/index.html#dogal3)  
[魔王魂(BGM)](http://maoudamashii.jokersounds.com/)  
[ザ・マッチメイカァズ様　(効果音)](http://osabisi.sakura.ne.jp/m2/)  
[Webフォントファン様 (フォント)](http://webfontfan.com)  
[キャラクターなんとか機(女の子グラフィック)](http://khmix.sakura.ne.jp/download.shtml)


## ゲームのプレイ動画
<https://www.youtube.com/watch?v=v1XIxE8y85k>


## その他
中の人のブログです。 毎日プログラム  <http://blog.livedoor.jp/kaidouji85/>    
安定版 <http://gbraver.herokuapp.com/>  
β版 <http://gbraver-beta.herokuapp.com/>