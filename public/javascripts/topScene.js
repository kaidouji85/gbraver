function topScene(){
    var that = new Scene();
    that.backgroundColor = 'black';
    that.battleRoomButton = {};
    that.setArmdpzerButton = {};
    that.onPushSetArmdozer = onPushSetArmdozer;
    that.onPushBattleRoom = onPushBattleRoom;
    
    var core = enchant.Core.instance;
    var labelMenu;
    var emitPushSetArmdozer = function(){};
    var emitPushBattleRoom = function(){};
    
    initSprite();
    function initSprite(){
        //対戦ルーム入室ボタン
        that.battleRoomButton = new Button('対戦ルーム入室','blue',40,200);
        that.battleRoomButton.x = 50;
        that.battleRoomButton.y = 60;
        that.battleRoomButton.addEventListener(Event.TOUCH_END,function(e){
            emitPushBattleRoom();
        });        
        that.addChild(that.battleRoomButton);
        
        //アームドーザ選択ボタン
        that.setArmdpzerButton = new Button('アームドーザ選択','blue',40,200);
        that.setArmdpzerButton.x = 50;
        that.setArmdpzerButton.y = 120;
        that.setArmdpzerButton.addEventListener(Event.TOUCH_END,function(e){
            emitPushSetArmdozer();
        });
        that.addChild(that.setArmdpzerButton);
        
        //メニューラベル
        labelMenu = new Label('メニュー');
        labelMenu.color = 'white';
        labelMenu.x = 130;
        labelMenu.y = 10;        
        that.addChild(labelMenu);
    }
    
    function onPushSetArmdozer(fn){
        emitPushSetArmdozer = fn;
    }

    function onPushBattleRoom(fn){
        emitPushBattleRoom = fn;
    }
    
    return that;
}
