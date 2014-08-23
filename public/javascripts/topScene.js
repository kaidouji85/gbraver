function topScene(){
    var that = new Scene();
    that.background = {};
    that.battleRoomButton = {};
    that.setArmdpzerButton = {};
    that.mesWindow = {};
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
        that.background.image = core.assets[core.PICT_SYSTEM_BACKGROUND];
        that.addChild(that.background);

        //対戦ルーム入室ボタン
        that.battleRoomButton = pictButton({
            text : '対戦ルーム入室',
            pict : core.assets[core.PICT_BULUE_BUTTON]
        });
        that.battleRoomButton.x = 16;
        that.battleRoomButton.y = 300;
        that.battleRoomButton.addEventListener(Event.TOUCH_END,function(e){
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
            pict : core.assets[core.PICT_MESSAGE_WINDOW]
        });
        that.mesWindow.x = 0;
        that.mesWindow.y = core.MESSAGE_WINDOW_Y;
        that.mesWindow.setVisible(false);
        that.mesWindow.setText(core.MESSAGE_WAIT_COMMUNICATE);
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
