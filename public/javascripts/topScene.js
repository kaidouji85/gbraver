function topScene(spec,my){
    var that = new Scene();
    var armdozerPict = spec.armdozerPict;
    var pilotPict = spec.pilotPict;

    that.backgroundColor = "black";
    that.background = {};
    that.battleRoomButton = {};
    that.selectArmdozerButton = {};
    that.mesWindow = {};
    that.selectArmdozerSprite = {};
    that.singlePlayButton = {};
    that.selectPilotButton = {};
    that.tile = {};
    that.pilotSprite = {};
    that.onPushBattleRoom = onPushBattleRoom;
    that.onPushSinglePlay = onPushSinglePlay;
    that.onPushSelectPilotButton = onPushSelectPilotButton;
    that.onPushSelectArmdozerButton = onPushSelectArmdozerButton;
    
    var core = enchant.Core.instance;
    var emitPushBattleRoom = function(){};
    var emitPushSinglePlay = function(){};
    var emitPushSelectPilotButton = function(){};
    var emitPushSelectArmdozerButton = function(){};
    
    initSprite();
    function initSprite(){
        //背景
        that.background = new Sprite(core.SYSTEM_BG_WIDTH,core.SYSTEM_BG_HEIGHT);
        that.background.image = core.assets[core.PICT_BG_GROUND2];
        that.addChild(that.background);

        //選択中アームドーザ
        that.selectArmdozerSprite = new Sprite(160,160);
        that.selectArmdozerSprite.image = core.assets[core.PICT_PREFIX+armdozerPict];
        that.selectArmdozerSprite.x = (320-160)/2;
        that.selectArmdozerSprite.y = 110;
        that.addChild(that.selectArmdozerSprite);

        //選択中パイロット
        that.pilotSprite = pilotIcon({
            windowPict : core.assets[core.PICT_WINDOW],
            pilotPict : core.assets[core.PICT_PREFIX + pilotPict]
        });
        that.pilotSprite.x = 230;
        that.pilotSprite.y = 100;
        that.addChild(that.pilotSprite);

        //シングルプレイボタン
        that.singlePlayButton = pictButton({
            text : 'シングルプレイ',
            pict : core.assets[core.PICT_WINDOW],
            subPict : core.assets[core.PICT_ACTIVE_WINDOW]
        });
        that.singlePlayButton.x = 8;
        that.singlePlayButton.y = 300;
        that.singlePlayButton.addEventListener(Event.TOUCH_END,function(){
            that.battleRoomButton.setVisible(false);
            that.selectArmdozerButton.setVisible(false);
            that.singlePlayButton.setVisible(false);
            that.selectPilotButton.setVisible(false);
            that.mesWindow.setText(core.MESSAGE_WAIT_COMMUNICATE);
            that.mesWindow.setVisible(true);
            emitPushSinglePlay();
        });
        that.addChild(that.singlePlayButton);

        //対戦ルーム入室ボタン
        that.battleRoomButton = pictButton({
            text : '対戦ルーム',
            pict : core.assets[core.PICT_WINDOW],
            subPict : core.assets[core.PICT_ACTIVE_WINDOW]
        });
        that.battleRoomButton.x = 168;
        that.battleRoomButton.y = 300;
        that.battleRoomButton.addEventListener(Event.TOUCH_END,function(e){
            that.battleRoomButton.setVisible(false);
            that.selectArmdozerButton.setVisible(false);
            that.singlePlayButton.setVisible(false);
            that.selectPilotButton.setVisible(false);
            that.mesWindow.setText(core.MESSAGE_GET_ROOMINFO);
            that.mesWindow.setVisible(true);
            emitPushBattleRoom();
        });
        that.addChild(that.battleRoomButton);

        //アームドーザ選択ボタン
        that.selectArmdozerButton = pictButton({
            text : 'アームドーザ選択',
            pict : core.assets[core.PICT_WINDOW],
            subPict : core.assets[core.PICT_ACTIVE_WINDOW]
        });
        that.selectArmdozerButton.x = 8;
        that.selectArmdozerButton.y = 364;
        that.selectArmdozerButton.addEventListener(Event.TOUCH_END,function(e){
            emitPushSelectArmdozerButton();
        });
        that.addChild(that.selectArmdozerButton);

        //パイロット選択ボタン
        that.selectPilotButton = pictButton({
            text : 'パイロット選択',
            pict : core.assets[core.PICT_WINDOW],
            subPict : core.assets[core.PICT_ACTIVE_WINDOW]
        });
        that.selectPilotButton.x = 168;
        that.selectPilotButton.y = 364;
        that.selectPilotButton.addEventListener(Event.TOUCH_END,function(e){
            emitPushSelectPilotButton();
        });
        that.addChild(that.selectPilotButton);

        //画面タイトル
        that.title = titleWindow({
            pict : core.assets[core.PICT_WINDOW],
            text : 'メニュー'
        });
        that.addChild(that.title);

        //メッセージウインドウ
        that.mesWindow = messageWindow({
            pict : core.assets[core.PICT_WINDOW]
        });
        that.mesWindow.x = 0;
        that.mesWindow.y = core.MESSAGE_WINDOW_Y;
        that.mesWindow.setVisible(false);
        that.addChild(that.mesWindow);
    }

    function onPushBattleRoom(fn){
        emitPushBattleRoom = fn;
    }

    function onPushSinglePlay(fn){
        emitPushSinglePlay = fn;
    }

    function onPushSelectPilotButton(fn){
        emitPushSelectPilotButton = fn;
    }

    function onPushSelectArmdozerButton(fn){
        emitPushSelectArmdozerButton = fn;
    }
    
    return that;
}
