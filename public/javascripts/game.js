// enchant.js本体やクラスをエクスポートする
enchant();

//定数
const MAX_PLAYER_NUM = 2;

//グローバル変数
var socket;         //socket.ioオブジェクトを格納するグローバル変数
var roomId;         //ルームID
var userId;         //ユーザID
var enemyUserId;    //敵ユーザID
var inputs = null;  //全ユーザの入力情報

// ページが読み込まれたときに実行される関数
window.onload = function() {
    socket = io.connect(location.origin);
    roomId = $("#roomId").val();
    userId = $("#userId").val();

    //全プレイヤーの入室処理が完了した時に呼び出させる処理
    socket.on("startGame", function(data) {
        console.log(data);
        for(uid in data){
            if(uid != userId){
                enemyUserId = uid;
            }
        }
        game(data);
    });

    //サーバから全ユーザのコマンド入力情報が返される
    socket.on("resp", function(data) {
        inputs = data.inputs;
    });

    //ルームへ入室する
    socket.emit("enterRoom", {
        roomId : roomId,
        userId : userId
    });

};

//ゲームメイン関数
function game(spec, my) {
    var core = new Core(640, 480);
    core.fps = 60;
    
    var playerStatus = spec[userId].status;
    playerStatus.active = 0;
    playerStatus.battery = 5;
    var playerSprite = new Sprite(256, 256);
    core.preload('/images/'+playerStatus.pictName);
    
    var enemyStatus = spec[enemyUserId].status;
    enemyStatus.active = 0;
    enemyStatus.battery = 5;
    var enemySprite = new Sprite(256, 256);
    core.preload('/images/'+enemyStatus.pictName);
    
    // ファイルのプリロードが完了したときに実行される関数
    core.onload = function() {
        playerSprite.image = core.assets['/images/'+playerStatus.pictName];
        playerSprite.x = 400;
        playerSprite.y = 128;
        core.rootScene.addChild(playerSprite);
        
        enemySprite.image = core.assets['/images/'+enemyStatus.pictName];
        enemySprite.x = 32;
        enemySprite.y = 128;
        enemySprite.scaleX = -1;
        core.rootScene.addChild(enemySprite);
        
        var labelUnitName = new Label(playerStatus.name);
        labelUnitName.x = 400;
        labelUnitName.y = 0;
        core.rootScene.addChild(labelUnitName);
        
        var labelHp = new Label('HP');
        labelHp.x = 400;
        labelHp.y = 16;
        core.rootScene.addChild(labelHp);
        
        var labelActive = new Label('Active');
        labelActive.x = 400;
        labelActive.y = 32;
        core.rootScene.addChild(labelActive);
        
        var labelBattery = new Label('Battery');
        labelBattery.x = 400;
        labelBattery.y = 48;
        core.rootScene.addChild(labelBattery);
        
        var labelEnemyUnitName = new Label(enemyStatus.name);
        labelEnemyUnitName.x = 32;
        labelEnemyUnitName.y = 0;
        core.rootScene.addChild(labelEnemyUnitName);       

        var labelEnemyHp = new Label('HP');
        labelEnemyHp.x = 32;
        labelEnemyHp.y = 16;
        core.rootScene.addChild(labelEnemyHp);
        
        var labelEnemyActive = new Label('Active');
        labelEnemyActive.x = 32;
        labelEnemyActive.y = 32;
        core.rootScene.addChild(labelEnemyActive);
        
        var labelEnemyBattery = new Label('Battery');
        labelEnemyBattery.x = 32;
        labelEnemyBattery.y = 48;
        core.rootScene.addChild(labelEnemyBattery);

        //リフレッシュレートごとの処理
        core.rootScene.addEventListener('enterframe', function(e) {
            //メータ系更新
            labelHp.text = 'HP ' + playerStatus.hp;
            labelActive.text = 'Active ' + playerStatus.active;
            labelBattery.text = 'Battery' + playerStatus.battery;
            
            labelEnemyHp.text = 'HP ' + enemyStatus.hp;
            labelEnemyActive.text = 'Active ' + enemyStatus.active;
            labelEnemyBattery.text = 'Battery' + enemyStatus.battery;
            
        });
    };

    // ゲームスタート
    core.start();
};