function topScene(spec,my){
    var that = new Scene();
    var armdozerPict = spec.armdozerPict;
    that.background = {};
    that.battleRoomButton = {};
    that.setArmdpzerButton = {};
    that.mesWindow = {};
    that.selectArmdozerSprite = {};
    that.onPushSetArmdozer = onPushSetArmdozer;
    that.onPushBattleRoom = onPushBattleRoom;
    
    var core = enchant.Core.instance;
    var labelMenu;
    var emitPushSetArmdozer = function(){};
    var emitPushBattleRoom = function(){};
    
    initSprite();
    function initSprite(){
        //背景
        that.background = new Sprite(core.SYSTEM_BG_WIDTH,core.SYSTEM_BG_HEIGHT);
        that.background.image = core.assets[core.PICT_BG_GROUND];
        that.addChild(that.background);

        //選択中アームドーザ
        that.selectArmdozerSprite = new Sprite(128,128);
        that.selectArmdozerSprite.image = core.assets[core.PICT_PREFIX+armdozerPict];
        that.selectArmdozerSprite.x = (320 - 128)/2;
        that.selectArmdozerSprite.y = 140;
        that.addChild(that.selectArmdozerSprite);

        //対戦ルーム入室ボタン
        that.battleRoomButton = pictButton({
            text : '対戦ルーム入室',
            pict : core.assets[core.PICT_BULUE_BUTTON]
        });
        that.battleRoomButton.x = 16;
        that.battleRoomButton.y = 300;
        that.battleRoomButton.addEventListener(Event.TOUCH_END,function(e){
            labelMenu.visible = false;
            that.battleRoomButton.setVisible(false);
            that.setArmdpzerButton.setVisible(false);
            that.mesWindow.setText(core.MESSAGE_GET_ROOMINFO);
            that.mesWindow.setVisible(true);
            emitPushBattleRoom();
        });        
        that.addChild(that.battleRoomButton);
        
        //アームドーザ選択ボタン
        that.setArmdpzerButton = pictButton({
            text : 'アームドーザ選択',
            pict : core.assets[core.PICT_BULUE_BUTTON]
        });
        that.setArmdpzerButton.x = 176;
        that.setArmdpzerButton.y = 300;
        that.setArmdpzerButton.addEventListener(Event.TOUCH_END,function(e){
            labelMenu.visible = false;
            that.battleRoomButton.setVisible(false);
            that.setArmdpzerButton.setVisible(false);
            that.mesWindow.setText(core.MESSAGE_WAIT_COMMUNICATE);
            that.mesWindow.setVisible(true);
            emitPushSetArmdozer();
        });
        that.addChild(that.setArmdpzerButton);
        
        //メニューラベル
        labelMenu = new Label('メニュー');
        labelMenu.color = 'white';
        labelMenu.x = 130;
        labelMenu.y = 10;        
        that.addChild(labelMenu);

        //メッセージウインドウ
        that.mesWindow = messageWindow({
            pict : core.assets[core.PICT_WINDOW]
        });
        that.mesWindow.x = 0;
        that.mesWindow.y = core.MESSAGE_WINDOW_Y;
        that.mesWindow.setVisible(false);
        that.addChild(that.mesWindow);
    }
    
    function onPushSetArmdozer(fn){
        emitPushSetArmdozer = fn;
    }

    function onPushBattleRoom(fn){
        emitPushBattleRoom = fn;
    }
    
    return that;
}
