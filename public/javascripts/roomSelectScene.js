function roomSelectScene(spec,my){
    var that = new Scene();
    var userId = spec.userId;
    var core = spec.core;
    var emitEnterRoom;
    var enterRoomButton;
    var labelEnterRoomWait;
    that.backgroundColor = 'black';
    
    that.onEnterRoom = function(fn){
        emitEnterRoom = fn;
    };
    
    that.initSprite = function(){
        //入室ボタン
        enterRoomButton = new Sprite(200,40);
        enterRoomButton.image = core.assets[core.PICT_ENTER_ROOM_BUTTON];
        enterRoomButton.x = 10;
        enterRoomButton.y = 10;
        enterRoomButton.addEventListener(Event.TOUCH_START,onPushEnterRoom);
        that.addChild(enterRoomButton);
        
        //入室中
        labelEnterRoomWait = new Label('待機中');
        labelEnterRoomWait.color = "white";
        labelEnterRoomWait.x = 10;
        labelEnterRoomWait.y = 10;
        labelEnterRoomWait.visible = false;
        that.addChild(labelEnterRoomWait);
    };
    
    function onPushEnterRoom(){
        enterRoomButton.visible = false;
        labelEnterRoomWait.visible = true;
        emitEnterRoom({
            roomId : 0
        });
    }
    
    return that;
}
