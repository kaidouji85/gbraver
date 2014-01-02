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
    var core;
    var playerStatus;
    var playerSprite;
    var enemyStatus;
    var enemySprite;
    var labelUnitName;
    var labelHp;
    var labelActive;
    var labelBattery;
    var labelEnemyUnitName;
    var labelEnemyHp;
    var labelEnemyActive;
    var labelEnemyBattery;
    
    core = new Core(640, 480);
    core.fps = 60;
    
    playerStatus = spec[userId].status;
    enemyStatus = spec[enemyUserId].status;
   
    preLoad();
    
    // ファイルのプリロードが完了したときに実行される関数
    core.onload = function() {
        init();

        //リフレッシュレートごとの処理
        core.rootScene.addEventListener('enterframe', function(e) {
            refreshMertor();
            
        });
    };

    // ゲームスタート
    core.start();
    
    //リソースのプリロード
    function preLoad(){
        core.preload('/images/'+playerStatus.pictName);
        core.preload('/images/'+enemyStatus.pictName); 
    }
    
    //初期化
    function init(){
        playerStatus.active = 0;
        playerStatus.battery = 5;
        playerSprite = new Sprite(256, 256);
    
        enemyStatus.active = 0;
        enemyStatus.battery = 5;
        enemySprite = new Sprite(256, 256);
    
        playerSprite.image = core.assets['/images/'+playerStatus.pictName];
        playerSprite.x = 400;
        playerSprite.y = 128;
        core.rootScene.addChild(playerSprite);
        
        enemySprite.image = core.assets['/images/'+enemyStatus.pictName];
        enemySprite.x = 32;
        enemySprite.y = 128;
        enemySprite.scaleX = -1;
        core.rootScene.addChild(enemySprite);
        
        labelUnitName = new Label(playerStatus.name);
        labelUnitName.x = 400;
        labelUnitName.y = 0;
        core.rootScene.addChild(labelUnitName);
        
        labelHp = new Label('HP');
        labelHp.x = 400;
        labelHp.y = 16;
        core.rootScene.addChild(labelHp);
        
        labelActive = new Label('Active');
        labelActive.x = 400;
        labelActive.y = 32;
        core.rootScene.addChild(labelActive);
        
        labelBattery = new Label('Battery');
        labelBattery.x = 400;
        labelBattery.y = 48;
        core.rootScene.addChild(labelBattery);
        
        labelEnemyUnitName = new Label(enemyStatus.name);
        labelEnemyUnitName.x = 32;
        labelEnemyUnitName.y = 0;
        core.rootScene.addChild(labelEnemyUnitName);       

        labelEnemyHp = new Label('HP');
        labelEnemyHp.x = 32;
        labelEnemyHp.y = 16;
        core.rootScene.addChild(labelEnemyHp);
        
        labelEnemyActive = new Label('Active');
        labelEnemyActive.x = 32;
        labelEnemyActive.y = 32;
        core.rootScene.addChild(labelEnemyActive);
        
        labelEnemyBattery = new Label('Battery');
        labelEnemyBattery.x = 32;
        labelEnemyBattery.y = 48;
        core.rootScene.addChild(labelEnemyBattery);
    }
    
    //メータ系更新
    function refreshMertor() {
        labelHp.text = 'HP ' + playerStatus.hp;
        labelActive.text = 'Active ' + playerStatus.active;
        labelBattery.text = 'Battery' + playerStatus.battery;

        labelEnemyHp.text = 'HP ' + enemyStatus.hp;
        labelEnemyActive.text = 'Active ' + enemyStatus.active;
        labelEnemyBattery.text = 'Battery' + enemyStatus.battery;
    }

    
    return core;
};