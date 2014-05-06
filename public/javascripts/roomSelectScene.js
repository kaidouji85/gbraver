function roomSelectScene(spec,my){
    var that = new Scene();
    var userId = spec.userId;
    var core = spec.core;
    var emitEnterRoom;
    var enterRoomButtonArray;
    var labelEnterRoomWait;
    that.backgroundColor = 'black';
    
    that.onEnterRoom = function(fn){
        emitEnterRoom = fn;
    };
    
    that.initSprite = function(){
        //入室ボタン
        enterRoomButtonArray = new Button('ルーム0<br>入室','blue',40,200);
        enterRoomButtonArray.x = 50;
        enterRoomButtonArray.y = 10;
        enterRoomButtonArray.addEventListener(Event.TOUCH_START,onPushEnterRoom);
        that.addChild(enterRoomButtonArray);
       
        //入室中
        labelEnterRoomWait = new Label('待機中');
        labelEnterRoomWait.color = "white";
        labelEnterRoomWait.x = 10;
        labelEnterRoomWait.y = 10;
        labelEnterRoomWait.visible = false;
        that.addChild(labelEnterRoomWait);
    };
    
    function onPushEnterRoom(){
        enterRoomButtonArray.visible = false;
        labelEnterRoomWait.visible = true;
        emitEnterRoom({
            roomId : 0
        });
    }
    
    return that;
}
