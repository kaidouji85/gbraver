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
    var statusMap = {};
    var playerSprite;
    var enemySprite;
    var labelUnitName;
    var labelHp;
    var labelActive;
    var labelBattery;
    var labelEnemyUnitName;
    var labelEnemyHp;
    var labelEnemyActive;
    var labelEnemyBattery;
    var labelDamage;
    var iconAtack;
    var iconCharge;
    var iconPlus;
    var iconMinus;
    var iconOk;
    var iconPrev;
    var executePhase = waitPhase;
    var playerSelectBatterySprite;
    var enemySelectBatterySprite;
    var inputs = null;
    var atackUserId = null;
    var defenthUserId = null;
    var counter = 0;
    
    /**
     * 定数の宣言
     */
    const MAX_ACTIVE = 5000;
    
    /**
     * コンストラクタ
     */
    function constructor() {
        //FPSの設定
        core.fps = 60;
        
        //キャラクターのステータスをセット
        statusMap[userId] = spec.usersInfo[userId].status;
        statusMap[enemyUserId] = spec.usersInfo[enemyUserId].status;
        
        //素材のプリロード
        preLoad();
        
        //プリロード完了後の処理
        core.onload = function() {
            init();
            core.rootScene.addEventListener('enterframe', enterFrame);
        };
        
        //ゲーム開始処理
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
     * リソースのプリロード
     */
    function preLoad(){
        core.preload('/images/'+statusMap[userId].pictName);
        core.preload('/images/'+statusMap[enemyUserId].pictName); 
        core.preload('/images/Battery.png');
        core.preload('/images/iconAtack.png');
        core.preload('/images/iconCharge.png');
        core.preload('/images/iconPlus.png');
        core.preload('/images/iconMinus.png');
        core.preload('/images/iconOk.png');
        core.preload('/images/iconPrev.png');
    }    
    
    /**
     * リフレッシュレートごとの処理 
     * @param {Object} e
     */
    function enterFrame(e) {
        refreshMertor();
        executePhase();
        counter ++;
    }
    
    /**
     * 初期化
     */
    function init(){
        //ステータス初期
        for(var uid in statusMap){
            statusMap[uid].active = 0;
            statusMap[uid].battery = 5;
            statusMap[uid].selectBattery = 0;
        }
        
        //プレイヤースプライト
        playerSprite = new Sprite(128, 128);
        playerSprite.image = core.assets['/images/'+statusMap[userId].pictName];
        playerSprite.x = 192;
        playerSprite.y = 80;
        core.rootScene.addChild(playerSprite);
        
        //敵キャラスプライト
        enemySprite = new Sprite(128, 128);
        enemySprite.image = core.assets['/images/'+statusMap[enemyUserId].pictName];
        enemySprite.x = 0;
        enemySprite.y = 80;
        enemySprite.scaleX = -1;
        core.rootScene.addChild(enemySprite);
        
        //プレイヤーユニット名ラベル
        labelUnitName = new Label();
        labelUnitName.x = 200;
        labelUnitName.y = 0;
        labelUnitName.color = '#fff';
        core.rootScene.addChild(labelUnitName);
        
        //プレイヤーHPラベル
        labelHp = new Label('HP');
        labelHp.x = 200;
        labelHp.y = 16;
        labelHp.color = '#fff';
        core.rootScene.addChild(labelHp);
        
        //プレイヤーアクティブポイントラベル
        labelActive = new Label('Active');
        labelActive.x = 200;
        labelActive.y = 32;
        labelActive.color = '#fff';
        core.rootScene.addChild(labelActive);
        
        //プレイヤーバッテリーラベル
        labelBattery = new Label('Battery');
        labelBattery.x = 200;
        labelBattery.y = 48;
        labelBattery.color = '#fff';
        core.rootScene.addChild(labelBattery);
        
        //敵ユニット名ラベル
        labelEnemyUnitName = new Label();
        labelEnemyUnitName.x = 32;
        labelEnemyUnitName.y = 0;
        labelEnemyUnitName.color = '#fff';
        core.rootScene.addChild(labelEnemyUnitName);       

        //敵HPラベル
        labelEnemyHp = new Label('HP');
        labelEnemyHp.x = 32;
        labelEnemyHp.y = 16;
        labelEnemyHp.color = '#fff';
        core.rootScene.addChild(labelEnemyHp);
        
        //敵アクティブポイント
        labelEnemyActive = new Label('Active');
        labelEnemyActive.x = 32;
        labelEnemyActive.y = 32;
        labelEnemyActive.color = '#fff';
        core.rootScene.addChild(labelEnemyActive);
        
        //敵バッテリーラベル
        labelEnemyBattery = new Label('Battery');
        labelEnemyBattery.x = 32;
        labelEnemyBattery.y = 48;
        labelEnemyBattery.color = '#fff';
        core.rootScene.addChild(labelEnemyBattery);
        
        //ダメージ表示ラベル
        labelDamage = new Label('1000');
        labelDamage.y = 200;
        labelDamage.color = "#fff";
        
        //攻撃アイコン
        iconAtack = new Sprite(96,48);
        iconAtack.image = core.assets['/images/iconAtack.png'];
        iconAtack.x = 100;
        iconAtack.y = 100;
        iconAtack.addEventListener(Event.TOUCH_START,function(e){
            //攻撃、チャージアイコンを消す
            core.rootScene.removeChild(iconAtack);
            core.rootScene.removeChild(iconCharge);
            
            //バッテリー決定関連アイコンを出す
            core.rootScene.addChild(iconPlus);
            core.rootScene.addChild(iconMinus);
            core.rootScene.addChild(iconOk);
            core.rootScene.addChild(iconPrev);            
            core.rootScene.addChild(playerSelectBatterySprite);
        });        
        
        //チャージアイコン
        iconCharge = new Sprite(96,48);
        iconCharge.image = core.assets['/images/iconCharge.png'];
        iconCharge.x = 100;
        iconCharge.y = 100 + 55;
        iconCharge.addEventListener(Event.TOUCH_START,function(e){
                
        });
        
        //バッテリープラスアイコン
        iconPlus = new Sprite(96, 48);
        iconPlus.image = core.assets['/images/iconPlus.png'];
        iconPlus.x = 100;
        iconPlus.y = 100;
        iconPlus.addEventListener(Event.TOUCH_START,function(e){
            if(playerSelectBatterySprite.frame <5) {
                playerSelectBatterySprite.frame ++;
            }
        });
        
        //バッテリーマイナスアイコン
        iconMinus = new Sprite(96, 48);
        iconMinus.image = core.assets['/images/iconMinus.png'];
        iconMinus.x = 100;
        iconMinus.y = 100 + 55;
        iconMinus.addEventListener(Event.TOUCH_START,function(e){
            if(playerSelectBatterySprite.frame>1) {
                playerSelectBatterySprite.frame --;
            }
        });
        
        //決定アイコン
        iconOk = new Sprite(96, 48);
        iconOk.image = core.assets['/images/iconOk.png'];
        iconOk.x = 100;
        iconOk.y = 100 + 55*2;
        iconOk.addEventListener(Event.TOUCH_START,function(e){
            //バッテリー決定関連アイコンを消す
            core.rootScene.removeChild(iconPlus);
            core.rootScene.removeChild(iconMinus);
            core.rootScene.removeChild(iconOk);
            core.rootScene.removeChild(iconPrev);            
            core.rootScene.removeChild(playerSelectBatterySprite);
            
            //入寮情報を送信する
            socket.emit("input", {
                roomId : roomId,
                userId : userId,
                input : playerSelectBatterySprite.frame
            });
        }); 
        
        //戻るアイコン
        iconPrev = new Sprite(96, 48);
        iconPrev.image = core.assets['/images/iconPrev.png'];
        iconPrev.x = 100;
        iconPrev.y = 100 + 55*3;
        iconPrev.addEventListener(Event.TOUCH_START,function(e){
            //バッテリー決定関連アイコンを消す
            core.rootScene.removeChild(iconPlus);
            core.rootScene.removeChild(iconMinus);
            core.rootScene.removeChild(iconOk);
            core.rootScene.removeChild(iconPrev);            
            core.rootScene.removeChild(playerSelectBatterySprite);
            
            //攻撃、チャージアイコンを出す
            core.rootScene.addChild(iconAtack);
            core.rootScene.addChild(iconCharge);
        });               
        
        //プレイヤーが出したバッテリーの値
        playerSelectBatterySprite = new Sprite(64,64);
        playerSelectBatterySprite.image = core.assets['/images/Battery.png'];
        playerSelectBatterySprite.x = 220;
        playerSelectBatterySprite.y = 100;
        playerSelectBatterySprite.frame = 1;
        
        //敵が出したバッテリーの値
        enemySelectBatterySprite = new Sprite(64,64);
        enemySelectBatterySprite.image = core.assets['/images/Battery.png'];
        enemySelectBatterySprite.x = 32;
        enemySelectBatterySprite.y = 100;
        enemySelectBatterySprite.frame = 1;
        enemySelectBatterySprite.value = 1;        
        
        core.rootScene.backgroundColor = "black";
    }
    
    /**
     * フェイズを変更する
     * phase 変更するフェイズ
     */
    function changePhase(phase){
        counter = 0;
        executePhase = phase;
    }
    
    /**
     * メータ系更新 
     */
    function refreshMertor() {
        labelHp.text = 'HP ' + statusMap[userId].hp;
        labelActive.text = 'Active ' + statusMap[userId].active;
        labelBattery.text = 'Battery' + statusMap[userId].battery;

        labelEnemyHp.text = 'HP ' + statusMap[enemyUserId].hp;
        labelEnemyActive.text = 'Active ' + statusMap[enemyUserId].active;
        labelEnemyBattery.text = 'Battery' + statusMap[enemyUserId].battery;
    }

    /**
     * ウェイトフェイズ 
     */
    function waitPhase(){
        //アクティブゲージを加算
        for(var uid in statusMap){
            statusMap[uid].active += statusMap[uid].speed;
        }

        if(statusMap[userId].active >= MAX_ACTIVE){
            //プレイヤーを攻撃側に設定する
            atackUserId = userId;
            defenthUserId = enemyUserId;
            
            //コマンドボタンを表示する
            core.rootScene.addChild(iconAtack);
            core.rootScene.addChild(iconCharge);
            
            //攻撃バッテリー決定フェイズへ
            changePhase(atackBatteryPhase);
        } else if(statusMap[enemyUserId].active >= MAX_ACTIVE) {
            //敵を攻撃側に設定する
            atackUserId = enemyUserId;
            defenthUserId = userId;
            
            //コマンドを送信する
            //待ちフェイズの場合、OKという文字を入力としてサーバへ送信する
            socket.emit("input", {
                roomId : roomId,
                userId : userId,
                input : 'OK'
            });
            
            //攻撃バッテリー決定フェイズに遷移
            changePhase(atackBatteryPhase);
        }
    }
    
    /**
     * 攻撃バッテリー決定フェイズ
     */
    function atackBatteryPhase(){
        //サーバからのレスポンスがない場合、関数を終了する
        if(inputs === null){
            return;
        }
        
        //サーバの入力を受け取る
        statusMap[atackUserId].selectBattery = inputs[atackUserId];
        inputs = null;

        //攻撃側がプレイヤーの場合
        if (atackUserId === userId) {
            //コマンドを送信する
            //待ちフェイズの場合、OKという文字を入力としてサーバへ送信する
            socket.emit("input", {
                roomId : roomId,
                userId : userId,
                input : 'OK'
            });
        }
        //攻撃側が敵の場合
        else {
            //バッテリー決定関連アイコンを出す
            core.rootScene.addChild(iconPlus);
            core.rootScene.addChild(iconMinus);
            core.rootScene.addChild(iconOk);          
            core.rootScene.addChild(playerSelectBatterySprite);
        }

        //防御バッテリー決定待フェイズへ遷移
        changePhase(defenthBatteryPhase);
    }

    /**
     * 防御バッテリー決定フェイズ
     */
    function defenthBatteryPhase(){
        //サーバからのレスポンスがない場合、関数を終了する
        if(inputs === null){
            return;
        }
        
        //サーバの入力を受け取る
        statusMap[defenthUserId].selectBattery = inputs[defenthUserId];
        inputs = null;
        
        //バッテリー表示の準備
        playerSelectBatterySprite.frame = statusMap[userId].selectBattery;
        enemySelectBatterySprite.frame = statusMap[enemyUserId].selectBattery;
        core.rootScene.addChild(playerSelectBatterySprite);
        core.rootScene.addChild(enemySelectBatterySprite);

        //バッテリー表示フェイズに遷移
        changePhase(viewBatteryPhase);
    }
    
    /**
     * バッテリー表示フェイズ
     */
    function viewBatteryPhase() {
        if(counter > 120) {
            //ダメージ計算
            var damage = 0;
            var hit = 0;    //0:Miss 1:Hit 2:Defenth
            var atackBattery = statusMap[atackUserId].selectBattery;
            var defenthBattery = statusMap[defenthUserId].selectBattery;
            if(atackBattery > defenthBattery){
                damage = 1000;
                hit = 1;
            } else if(atackBattery === defenthBattery) {
                damage = 500;
                hit = 2;
            } else {
                damage = 0;
                hit = 0;
            }
            
            //HPからダメージをひく
            statusMap[defenthUserId].hp -= damage;
            
            //ダメージ表示ラベル可視化
            labelDamage.text = damage;
            if(atackUserId === userId){
                labelDamage.x = 32;
            } else {
                labelDamage.x = 180;
            }
            core.rootScene.addChild(labelDamage);
            
            //バッテリーラベル表示ラベルを消す
            core.rootScene.removeChild(playerSelectBatterySprite);
            core.rootScene.removeChild(enemySelectBatterySprite);
            
            //ダメージ表示フェイズに遷移
            changePhase(viewDamagePhase);
        }
    }
    
    /**
     * ダメージ表示フェイズ
     */
    function viewDamagePhase(){
        if(counter > 120) {
            //ダメージ表示ラベルを消す
            core.rootScene.removeChild(labelDamage);
            
            //攻撃側のアクティブゲージを0にする
            statusMap[atackUserId].active = 0;
            
            //ウェイトフェイズに遷移
            changePhase(waitPhase);
        }
    }

    return core;
};