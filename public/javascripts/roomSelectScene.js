function roomSelectScene(spec,my){
    var that = new Scene();
    var userId = spec.userId;
    var core = spec.core;
    var emitEnterRoom;
    var enterRoomButtonArray = new Array();
    var labelEnterRoomWait;
    
    var CNT_MAX_ENTER_ROOM = 5;
    
    that.backgroundColor = 'black';
    
    that.onEnterRoom = function(fn){
        emitEnterRoom = fn;
    };
    
    that.initSprite = function(){
        //入室ボタン
        for(var i=0; i<CNT_MAX_ENTER_ROOM; i++){
            var button = new Button('ルーム'+i+'<br>入室','blue',40,200);
            enterRoomButtonArray.push(button);
        }
        enterRoomButtonArray.forEach(function(button,i){
            button.x = 50;
            button.y = 10+60*i;
            button.addEventListener(Event.TOUCH_END,function(e){
                pushEnterRoom(i);
            });            
            that.addChild(button);
        });    
       
        //入室中
        labelEnterRoomWait = new Label('待機中');
        labelEnterRoomWait.color = "white";
        labelEnterRoomWait.x = 10;
        labelEnterRoomWait.y = 10;
        labelEnterRoomWait.visible = false;
        that.addChild(labelEnterRoomWait);
    };
    
    function pushEnterRoom(roomId){
        enterRoomButtonArray.forEach(function(button){
            button.visible = false;
        });
        labelEnterRoomWait.visible = true;
        emitEnterRoom({
            roomId : roomId
        });
    }
   
    return that;
}
