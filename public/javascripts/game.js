// enchant.js本体やクラスをエクスポートする
enchant();

//定数
const MAX_PLAYER_NUM = 2;

//グローバル変数
var socket;         //socket.ioオブジェクトを格納するグローバル変数
var roomId;         //ルームID
var userId;         //ユーザID
var inputs = null;  //全ユーザの入力情報
var core;           //enchant.js coreオブジェクト

// ページが読み込まれたときに実行される関数
window.onload = function() {
    socket = io.connect(location.origin);
    roomId = $("#roomId").val();
    userId = $("#userId").val();

    socket.on("startGame", function(data) {
        game(data);
    });

    socket.on("resp", function(data) {
        console.log(data);
        inputs = data.inputs;
    });

    socket.emit("enterRoom", {
        roomId : roomId,
        userId : userId
    });

};

//ゲームメイン関数
function game(spec, my) {
    //コアオブジェクト生成
    core = new Core(320, 320);
    core.fps = 60;

    //画像ファイルの読み込み
    core.preload('/images/betty.png');

    // ファイルのプリロードが完了したときに実行される関数
    core.onload = function() {
        //リフレッシュレートごとの処理
        core.rootScene.addEventListener('enterframe', function(e) {
        });
    };

    // ゲームスタート
    core.start();
};