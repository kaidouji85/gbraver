/**
 * ゲームメインクラス
 * @param {Object} spec
 * @param {Object} my
 */
function game(spec, my) {
    //定数
    const MAX_ACTIVE = 5000;
    const MAX_PLAYER_NUM = 2;
    const CHARGE_WAIT_FRAME = 30;
    
    //スーパークラス
    var core = new Core(320, 320);
    core.fps = 60;
    core.rootScene.backgroundColor = "black";

    //ゲーム進行関連変数
    var usersInfo = spec.usersInfo;
    var roomId = spec.roomId;
    var userId = spec.userId;
    var enemyUserId = null;
    var statusArray = {};
    for(uid in usersInfo){
        statusArray[uid] = usersInfo[uid].status;
        statusArray[uid].active = 0;
        statusArray[uid].battery = 5;
        statusArray[uid].selectBattery = 0;
        if(uid != userId){
            enemyUserId = uid;
        }
    }
    var Battle = battle({statusArray:statusArray});

    //スプライト
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
    var labelWeaponDescription;
    
    //サーバにコマンド送信する
    var sendInput = null;
    core.onSendInput = function(fn){
        sendInput = fn;
    };
    
    //サーバからのレスポンスを受け取る
    var inputs = null;
    core.emitResp = function(data){
        console.log('input');
        console.log(data);
        inputs = data.inputs;
    };
    
    //ルームが破棄された
    core.emitDisconnect = function(data){
        console.log('disconnect');
    };
    
    //攻撃、防御側のユーザIDを格納
    var atackUserId = null;
    var defenthUserId = null;
    
    /**
     * ゲームメイン処理
     */
    var counter = 0;
    preloadPict();
    core.onload = function() {
        initSprite();
        core.rootScene.addEventListener('enterframe', function(e){
            refreshMertor();
            executePhase();
            counter ++;
        });
    };
    
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
        labelHp.text = 'HP ' + statusArray[userId].hp;
        labelActive.text = 'Active ' + (statusArray[userId].active>0 ? statusArray[userId].active : 0);
        labelBattery.text = 'Battery' + statusArray[userId].battery;

        labelEnemyHp.text = 'HP ' + statusArray[enemyUserId].hp;
        labelEnemyActive.text = 'Active ' + (statusArray[enemyUserId].active >0 ? statusArray[enemyUserId].active : 0);
        labelEnemyBattery.text = 'Battery' + statusArray[enemyUserId].battery;
    }

    /**
     * ウェイトフェイズ 
     */
    var waitPhaseTurn = 0;
    function waitPhase(){
        if(counter == 0) {
            //最初のウェイトフェイズの準備をする
            var ret = Battle.doWaitPhase();
            atackUserId = ret.atackUserId;
            waitPhaseTurn = ret.turn;
            for(var uid in statusArray){
                if(uid != atackUserId){
                    defenthUserId = uid;
                    break;
                }
            }
        }
        
        //アクティブゲージを加算
        for(var uid in statusArray){
            statusArray[uid].active += statusArray[uid].speed;
        }
        
        if(counter >= waitPhaseTurn-1){
            if (atackUserId === userId) {
                atackUserId = userId;
                defenthUserId = enemyUserId;

                core.rootScene.addChild(iconAtack);
                core.rootScene.addChild(iconCharge);
                playerSelectBatterySprite.minValue = 1;
            } else {
                atackUserId = enemyUserId;
                defenthUserId = userId;

                sendInput({
                    input : 'OK'
                });
            }

            if (statusArray[atackUserId].battery < 5) {
                statusArray[atackUserId].battery++;
            }
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
        var command = inputs[atackUserId];
        inputs = null;
        
        //チャージの場合
        if(command === 'charge') {
            statusArray[atackUserId].battery = 5;
            statusArray[atackUserId].active = -statusArray[atackUserId].speed*CHARGE_WAIT_FRAME;
            
            //ウェイトフェイズに遷移
            changePhase(waitPhase);
            return;    
        } 
        //攻撃の場合
        else {
            //攻撃バッテリー設定
            statusArray[atackUserId].selectBattery = command;
            
            //防御バッテリー決定待フェイズへ遷移
            changePhase(defenthBatteryPhase);
            
            if(atackUserId === userId){
                //コマンドを送信する
                //待ちフェイズの場合、OKという文字を入力としてサーバへ送信する
                sendInput({
                    input : 'OK'
                });
            } else {
                //バッテリー決定関連アイコンを出す
                core.rootScene.addChild(iconPlus);
                core.rootScene.addChild(iconMinus);
                core.rootScene.addChild(iconOk);
                core.rootScene.addChild(playerSelectBatterySprite);
                
                if(statusArray[userId].battery >= 1) {
                    playerSelectBatterySprite.frame = 1;
                } else {
                    playerSelectBatterySprite.frame = 0;
                }
                playerSelectBatterySprite.minValue = 0;
            }
        }
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
        statusArray[defenthUserId].selectBattery = inputs[defenthUserId];
        inputs = null;
        
        //消費バッテリーを引く
        statusArray[userId].battery -= statusArray[userId].selectBattery;
        statusArray[enemyUserId].battery -= statusArray[enemyUserId].selectBattery;
        
        //バッテリー表示の準備
        playerSelectBatterySprite.frame = statusArray[userId].selectBattery;
        enemySelectBatterySprite.frame = statusArray[enemyUserId].selectBattery;
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
            var hit = 0;    //0:Miss 1:Hit 2:Defenth 3:critical
            var atackBattery = statusArray[atackUserId].selectBattery;
            var defenthBattery = statusArray[defenthUserId].selectBattery;
            var damage = statusArray[atackUserId].weapons[atackBattery].power;
            
            if(defenthBattery === 0) {
                damage = damage*2;
                hit = 3;
            }else if(atackBattery > defenthBattery){
                damage = damage;
                hit = 1;
            } else if(atackBattery === defenthBattery) {
                damage = damage/2;
                hit = 2;
            } else {
                damage = 0;
                hit = 0;
            }
            
            //HPからダメージをひく
            statusArray[defenthUserId].hp -= damage;
            
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
            statusArray[atackUserId].active = 0;
            
            //ウェイトフェイズに遷移
            changePhase(waitPhase);
        }
    }
    
    
    
    /**
     * 画像のプリロード 
     */
    function preloadPict() {
        core.preload('/images/' + statusArray[userId].pictName);
        core.preload('/images/' + statusArray[enemyUserId].pictName);
        core.preload('/images/Battery.png');
        core.preload('/images/iconAtack.png');
        core.preload('/images/iconCharge.png');
        core.preload('/images/iconPlus.png');
        core.preload('/images/iconMinus.png');
        core.preload('/images/iconOk.png');
        core.preload('/images/iconPrev.png'); 
    }
    
    /**
     * スプライト初期化
     */
    function initSprite(){
        //プレイヤースプライト
        playerSprite = new Sprite(128, 128);
        playerSprite.image = core.assets['/images/'+statusArray[userId].pictName];
        playerSprite.x = 192;
        playerSprite.y = 80;
        core.rootScene.addChild(playerSprite);
        
        //敵キャラスプライト
        enemySprite = new Sprite(128, 128);
        enemySprite.image = core.assets['/images/'+statusArray[enemyUserId].pictName];
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
                
        //武器説明ラベル
        labelWeaponDescription = new Label('バスターナックル<br>攻撃力：3200');
        labelWeaponDescription.x = 8;
        labelWeaponDescription.y = 256;
        labelWeaponDescription.color = "#fff";
        //core.rootScene.addChild(labelWeaponDescription);
        
        //攻撃アイコン
        iconAtack = new Sprite(96,30);
        iconAtack.image = core.assets['/images/iconAtack.png'];
        iconAtack.x = 100;
        iconAtack.y = 80;
        iconAtack.addEventListener(Event.TOUCH_START,function(e){
            if(statusArray[userId].battery >= 1){
                playerSelectBatterySprite.frame = 1;
                 //攻撃、チャージアイコンを消す
                core.rootScene.removeChild(iconAtack);
                core.rootScene.removeChild(iconCharge);
                
                //バッテリー決定関連オブジェクトを表示する
                core.rootScene.addChild(iconPlus);
                core.rootScene.addChild(iconMinus);
                core.rootScene.addChild(iconOk);
                core.rootScene.addChild(iconPrev);            
                core.rootScene.addChild(playerSelectBatterySprite);
                
                labelWeaponDescription.text = statusArray[userId].weapons[playerSelectBatterySprite.frame].power;
                labelWeaponDescription.text = getWeaponDescription(statusArray[userId].weapons,1);
                core.rootScene.addChild(labelWeaponDescription);
            }
        });        
        
        //チャージアイコン
        iconCharge = new Sprite(96,30);
        iconCharge.image = core.assets['/images/iconCharge.png'];
        iconCharge.x = 100;
        iconCharge.y = 80 + 40*1;
        iconCharge.addEventListener(Event.TOUCH_START,function(e){
            //攻撃、チャージアイコンを消す
            core.rootScene.removeChild(iconAtack);
            core.rootScene.removeChild(iconCharge);
            
            //入力情報を送信する
           sendInput({
               input : 'charge'
           });
        });
        
        //バッテリープラスアイコン
        iconPlus = new Sprite(96, 30);
        iconPlus.image = core.assets['/images/iconPlus.png'];
        iconPlus.x = 100;
        iconPlus.y = 80;
        iconPlus.addEventListener(Event.TOUCH_START,function(e){
            if(playerSelectBatterySprite.frame < statusArray[userId].battery) {
                playerSelectBatterySprite.frame ++;
                labelWeaponDescription.text = getWeaponDescription(statusArray[userId].weapons,playerSelectBatterySprite.frame);
            }
        });
        
        //バッテリーマイナスアイコン
        iconMinus = new Sprite(96, 30);
        iconMinus.image = core.assets['/images/iconMinus.png'];
        iconMinus.x = 100;
        iconMinus.y = 80 + 40*1;
        iconMinus.addEventListener(Event.TOUCH_START,function(e){
            if(playerSelectBatterySprite.frame>playerSelectBatterySprite.minValue) {
                playerSelectBatterySprite.frame --;
                labelWeaponDescription.text = getWeaponDescription(statusArray[userId].weapons,playerSelectBatterySprite.frame);
            }
        });
        
        //決定アイコン
        iconOk = new Sprite(96, 30);
        iconOk.image = core.assets['/images/iconOk.png'];
        iconOk.x = 100;
        iconOk.y = 80 + 40*2;
        iconOk.addEventListener(Event.TOUCH_START,function(e){
            //バッテリー決定関連オブジェクトを消す
            core.rootScene.removeChild(iconPlus);
            core.rootScene.removeChild(iconMinus);
            core.rootScene.removeChild(iconOk);
            core.rootScene.removeChild(iconPrev);            
            core.rootScene.removeChild(playerSelectBatterySprite);
            core.rootScene.removeChild(labelWeaponDescription);
            
            //入力情報を送信する
            sendInput({
                input : playerSelectBatterySprite.frame
            });
        }); 
        
        //戻るアイコン
        iconPrev = new Sprite(96, 30);
        iconPrev.image = core.assets['/images/iconPrev.png'];
        iconPrev.x = 100;
        iconPrev.y = 80 + 40*3;
        iconPrev.addEventListener(Event.TOUCH_START,function(e){
            //バッテリー決定関連オブジェクトを消す
            core.rootScene.removeChild(iconPlus);
            core.rootScene.removeChild(iconMinus);
            core.rootScene.removeChild(iconOk);
            core.rootScene.removeChild(iconPrev);            
            core.rootScene.removeChild(playerSelectBatterySprite);
            core.rootScene.removeChild(labelWeaponDescription);
            
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
        playerSelectBatterySprite.minValue = 0;
        
        //敵が出したバッテリーの値
        enemySelectBatterySprite = new Sprite(64,64);
        enemySelectBatterySprite.image = core.assets['/images/Battery.png'];
        enemySelectBatterySprite.x = 32;
        enemySelectBatterySprite.y = 100;
        enemySelectBatterySprite.frame = 1;
        enemySelectBatterySprite.value = 1;
    }
    
    /**
     * 武器の説明文を生成する
     */
    function getWeaponDescription(weapons,battery){
        var description = weapons[battery].name + "    " + weapons[battery].power;
        return description;
    }

    return core;
};