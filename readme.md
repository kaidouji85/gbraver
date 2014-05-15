機動倶楽部Gブレイバー
=======

## はじめに
機動倶楽部Gブレイバーとは、竹内佑介が趣味で作成している通信対戦ゲームです。
node.js、socket.io、enchant.jsがあれば簡単に出来るだろうという軽いノリで作りました。


## ゲームについて
ジャンルは1対1の対戦PRGですが、バッテリーシステムという独自要素を実施しました。
詳細は以下の通りです。
* 攻撃側、防御側でバッテリーポイントと呼ばれる行動ポイントを出し合います
* 攻撃の当たり判定は全てバッテリーポイントの大小だけで決まります
* 攻撃側、防御側でポイントが同じだった場合、防御ということでダメージが半減されます
* 防御側がバッテリー0を出した場合、被ダメージが2倍になります  

詳細はこのスライドを参照して下さい。  
<http://www.slideshare.net/yuusuketakeuchi96/g-33989023>


## 導入方法
1. 必須ソフトウェア
導入の前提として、以下のソフトがインストールされている必要があります。  
# node.js
# mongodb

2. githubからソースコードのコピー
githubからプロジェクトをダウントードします。


3. 依存ライブラリのインストール
プロジェクトフォルダのルートに移動して、以下コマンドで依存ライブラリをインストールします。  

`npm install`


4. データベースの初期化
以下コマンドで、データベースを初期化します。  

`mongodb mongo ホスト名/gbraver createDB.js`


## 起動方法
以下コマンドで、node.jsを起動します。なお、Gブレイバーはデフォルトで3000番ポートを利用するので、被らないようにして下さい。

`BASE_URL="http://ホスト名" node app.js`


## テスト実行方法
テストの実行コマンドは以下の通りです。

ユニットテスト
`npm test`

DAOテスト
`mocha mongoDbTest/ -R spec`

Seleniumテスト
`NODE_MAIL_ADDRESS="テスト用Googleアカウント"  NODE_PASSWORD="テスト用Googleアカウントパスワード" mocha seleniumTest/ -R spec`


## ゲームのプレイ動画

<https://www.youtube.com/watch?v=yX4XXKsnl4A>


## その他
中の人のブログです。  
毎日プログラム  <http://blog.livedoor.jp/kaidouji85/>  
α版公開サイト <http://gbraver.herokuapp.com/>  