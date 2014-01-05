/**
 * ゲームメインクラス
 * @param {Object} spec
 * @param {Object} my
 */
function game(spec, my) {
    /**
     * 継承元クラス
     */
    var core = new Core(320, 320);
    
    /**
     * 定数
     */
    const MAX_PLAYER_NUM = 2;
    
    /**
     * プライベート変数の宣言
     */
    var socket = spec.socket;
    var roomId = spec.roomId;
    var userId = spec.userId;
    var enemyUserId = spec.enemyUserId;
    var playerStatus = spec.usersInfo[userId].status;
    var playerSprite;
    var enemyStatus = spec.usersInfo[enemyUserId].status;;
    var enemySprite;
    var labelUnitName;
    var labelHp;
    var labelActive;
    var labelBattery;
    var labelEnemyUnitName;
    var labelEnemyHp;
    var labelEnemyActive;
    var labelEnemyBattery;
    var labelEnemySelectBattery;
    var iconPlus;
    var iconMinus;
    var executePhase = waitPhase;
    var playerSelectBatterySprite;
    var inputs = null;
    
    /**
     * 定数の宣言
     */
    const MAX_ACTIVE = 5000;
    
    /**
     * コンストラクタ
     */
    function constructor() {
        core.fps = 60;
        preLoad();
        core.onload = function() {
            init();
            core.rootScene.addEventListener('enterframe', enterFrame);
        };
        core.start();
    };
    constructor();
    
    /**
     * 全ユーザの入力を受け取る
     */
    socket.on("resp", function(data) {
        inputs = data.inputs;
    });
    
    /**
     * リフレッシュレートごとの処理 
     * @param {Object} e
     */
    function enterFrame(e) {
        refreshMertor();
        executePhase();
    }

    /**
     * リソースのプリロード
     */
    function preLoad(){
        core.preload('/images/'+playerStatus.pictName);
        core.preload('/images/'+enemyStatus.pictName); 
        core.preload('/images/plus.png');
        core.preload('/images/minus.png');
        core.preload('/images/Battery.png');
    }
    
    /**
     * 初期化
     */
    function init(){
        playerStatus.active = 0;
        playerStatus.battery = 5;
        playerStatus.selectBattery = 0;
        
        playerSprite = new Sprite(128, 128);
        playerSprite.image = core.assets['/images/'+playerStatus.pictName];
        playerSprite.x = 192;
        playerSprite.y = 80;
        core.rootScene.addChild(playerSprite);
        
        enemyStatus.active = 0;
        enemyStatus.battery = 5;
        enemyStatus.selectBattery = 0;
        
        enemySprite = new Sprite(128, 128);
        enemySprite.image = core.assets['/images/'+enemyStatus.pictName];
        enemySprite.x = 0;
        enemySprite.y = 80;
        enemySprite.scaleX = -1;
        core.rootScene.addChild(enemySprite);
        
        labelUnitName = new Label(playerStatus.name);
        labelUnitName.x = 200;
        labelUnitName.y = 0;
        labelUnitName.color = '#fff';
        core.rootScene.addChild(labelUnitName);
        
        labelHp = new Label('HP');
        labelHp.x = 200;
        labelHp.y = 16;
        labelHp.color = '#fff';
        core.rootScene.addChild(labelHp);
        
        labelActive = new Label('Active');
        labelActive.x = 200;
        labelActive.y = 32;
        labelActive.color = '#fff';
        core.rootScene.addChild(labelActive);
        
        labelBattery = new Label('Battery');
        labelBattery.x = 200;
        labelBattery.y = 48;
        labelBattery.color = '#fff';
        core.rootScene.addChild(labelBattery);
        
        labelEnemyUnitName = new Label(enemyStatus.name);
        labelEnemyUnitName.x = 32;
        labelEnemyUnitName.y = 0;
        labelEnemyUnitName.color = '#fff';
        core.rootScene.addChild(labelEnemyUnitName);       

        labelEnemyHp = new Label('HP');
        labelEnemyHp.x = 32;
        labelEnemyHp.y = 16;
        labelEnemyHp.color = '#fff';
        core.rootScene.addChild(labelEnemyHp);
        
        labelEnemyActive = new Label('Active');
        labelEnemyActive.x = 32;
        labelEnemyActive.y = 32;
        labelEnemyActive.color = '#fff';
        core.rootScene.addChild(labelEnemyActive);
        
        labelEnemyBattery = new Label('Battery');
        labelEnemyBattery.x = 32;
        labelEnemyBattery.y = 48;
        labelEnemyBattery.color = '#fff';
        core.rootScene.addChild(labelEnemyBattery);
        
        labelEnemySelectBattery = new Label('');
        labelEnemySelectBattery.x = 32;
        labelEnemySelectBattery.y = 64;
        labelEnemySelectBattery.color = '#fff';
        core.rootScene.addChild(labelEnemySelectBattery);
        
        iconPlus = new Sprite(64, 64);
        iconPlus.image = core.assets['/images/plus.png'];
        iconPlus.x = 256;
        iconPlus.y = 180;
        iconPlus.addEventListener(Event.TOUCH_START,function(e){
            playerSelectBatterySprite.value += 1;
            playerSelectBatterySprite.frame = playerSelectBatterySprite.value;
        });
        
        iconMinus = new Sprite(64, 64);
        iconMinus.image = core.assets['/images/minus.png'];
        iconMinus.x = 180;
        iconMinus.y = 180;
        iconMinus.addEventListener(Event.TOUCH_START,function(e){
            playerSelectBatterySprite.value += -1;
            playerSelectBatterySprite.frame = playerSelectBatterySprite.value;
        });
        
        playerSelectBatterySprite = new Sprite(64,64);
        playerSelectBatterySprite.image = core.assets['/images/Battery.png'];
        playerSelectBatterySprite.x = 220;
        playerSelectBatterySprite.y = 100;
        playerSelectBatterySprite.frame = 1;
        playerSelectBatterySprite.value = 0;
        playerSelectBatterySprite.addEventListener(Event.TOUCH_START,function(e){
            //アイコンを消す
            core.rootScene.removeChild(playerSelectBatterySprite);
            core.rootScene.removeChild(iconPlus);
            core.rootScene.removeChild(iconMinus);
            
            //入寮情報を送信する
            socket.emit("input", {
                roomId : roomId,
                userId : userId,
                input : playerSelectBatterySprite.value
            });
        });
        
        core.rootScene.backgroundColor = "black";
    }
    
    /**
     * メータ系更新 
     */
    function refreshMertor() {
        labelHp.text = 'HP ' + playerStatus.hp;
        labelActive.text = 'Active ' + playerStatus.active;
        labelBattery.text = 'Battery' + playerStatus.battery;

        labelEnemyHp.text = 'HP ' + enemyStatus.hp;
        labelEnemyActive.text = 'Active ' + enemyStatus.active;
        labelEnemyBattery.text = 'Battery' + enemyStatus.battery;
    }

    /**
     * ウェイトフェイズ 
     */
    function waitPhase(){
        //アクティブゲージを加算
        playerStatus.active += playerStatus.speed;
        enemyStatus.active += enemyStatus.speed;
        
        if(playerStatus.active >= MAX_ACTIVE){
            //コマンドボタンを表示する
            core.rootScene.addChild(iconPlus);
            core.rootScene.addChild(iconMinus);
            core.rootScene.addChild(playerSelectBatterySprite);
            //攻撃バッテリー決定フェイズへ
            executePhase = atackBatteryPhase;
        } else if(enemyStatus.active >= MAX_ACTIVE) {
            //コマンドを送信する
            //待ちフェイズの場合、OKという文字を入力としてサーバへ送信する
            socket.emit("input", {
                roomId : roomId,
                userId : userId,
                input : 'OK'
            });
            //攻撃バッテリー決定待ちフェイズに遷移
            executePhase = waitAtackBatteryPhase;
        }
    }

    /**
     * 攻撃バッテリー決定フェイズ
     */
    function atackBatteryPhase(){
        if(inputs!==null){
            //サーバの入力を受け取る
            playerStatus.selectBattery = inputs[userId];
            inputs = null;
            
            //コマンドを送信する
            //待ちフェイズの場合、OKという文字を入力としてサーバへ送信する
            socket.emit("input", {
                roomId : roomId,
                userId : userId,
                input : 'OK'
            });
            
            //防御バッテリー決定待ちフェイズへ遷移
            executePhase = waitDefenthBatteryPhase;
        }
    }
    
    /**
     * 攻撃バッテリー決定待ちフェイズ
     */
    function waitAtackBatteryPhase() {
        if(inputs!==null){
            //サーバの入力を受け取る
            enemyStatus.selectBattery = inputs[enemyUserId];
            inputs = null;
            
            //コマンドボタンを表示する
            core.rootScene.addChild(iconPlus);
            core.rootScene.addChild(iconMinus);
            core.rootScene.addChild(playerSelectBatterySprite);
            
            //防御バッテリー決定フェイズに遷移
            executePhase = defenthBatteryPhase;
        }
    }
    
    /**
     * 防御バッテリー決定フェイズ
     */
    function defenthBatteryPhase() {
        if(inputs!==null){
            //サーバの入力を受け取る
            playerStatus.selectBattery = inputs[userId];
            inputs = null;
            
            console.log('player Battery : ' + playerStatus.selectBattery);
            console.log('enemy Battery : ' + enemyStatus.selectBattery);
        }
    }

    /**
     * 防御バッテリー決定待ちフェイズ
     */
    function waitDefenthBatteryPhase() {
        if(inputs!==null){
            //サーバの入力を受け取る
            enemyStatus.selectBattery = inputs[enemyUserId];
            inputs = null;
            
            console.log('player Battery : ' + playerStatus.selectBattery);
            console.log('enemy Battery : ' + enemyStatus.selectBattery);
        }        
    }

    return core;
};