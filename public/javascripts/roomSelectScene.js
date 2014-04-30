function roomSelectScene(spec,my){
    var that = new Scene();
    var userId = spec.userId;
    var core = spec.core;
    var emitEnterRoom;
    var enterRoomButton;
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
    };
    
    function onPushEnterRoom(){
        emitEnterRoom(0);
    }
    
    return that;
}
