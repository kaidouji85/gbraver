function topScene(){
    var that = new Scene();
    that.backgroundColor = 'black';
    
    var core = enchant.Core.instance;
    var battleRoomButton;
    var setArmdpzerButton;
    var labelMenu;
    var emitPushSetArmdozer;
    
    initSprite();
    function initSprite(){
        //対戦ルーム入室ボタン
        battleRoomButton = new Button('対戦ルーム入室','blue',40,200);
        battleRoomButton.x = 50;
        battleRoomButton.y = 60;
        battleRoomButton.addEventListener(Event.TOUCH_END,function(e){
            emitPushBattleRoom();
        });        
        that.addChild(battleRoomButton);
        
        //アームドーザ選択ボタン
        setArmdpzerButton = new Button('アームドーザ選択','blue',40,200);
        setArmdpzerButton.x = 50;
        setArmdpzerButton.y = 120;
        setArmdpzerButton.addEventListener(Event.TOUCH_END,function(e){
            emitPushSetArmdozer();
        });
        that.addChild(setArmdpzerButton);
        
        //メニューラベル
        labelMenu = new Label('メニュー');
        labelMenu.color = 'white';
        labelMenu.x = 130;
        labelMenu.y = 10;        
        that.addChild(labelMenu);
    }
    
    that.onPushSetArmdozer = function(fn){
        emitPushSetArmdozer = fn;
    };
    
    that.onPushBattleRoom = function(fn){
        emitPushBattleRoom = fn;
    };
    
    return that;
}
