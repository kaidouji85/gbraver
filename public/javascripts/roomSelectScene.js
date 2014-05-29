function roomSelectScene(spec,my){
    var that = new Scene();
    that.backgroundColor = 'black';
    that.enterRoomButtonArray = new Array();
    
    var core = enchant.Core.instance;
    var emitEnterRoom;
    var labelEnterRoomWait;
    var prevButton;
    var emitPushPrevButton = function(){};
    
    var CNT_MAX_ENTER_ROOM = 5;
    
    initSprite();
    function initSprite(){
        //入室ボタン
        for(var i=0; i<CNT_MAX_ENTER_ROOM; i++){
            var button = new Button('ルーム'+i,'blue',40,200);
            that.enterRoomButtonArray.push(button);
        }
        that.enterRoomButtonArray.forEach(function(button,i){
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
        
        //戻るボタン
        prevButton = new Button('戻る','blue',40,200);
        prevButton.x = 50;
        prevButton.y = 340;
        prevButton.addEventListener(Event.TOUCH_END,function(e){
            pushPrevButton();
        });
        that.addChild(prevButton);
    };
        
    that.onEnterRoom = function(fn){
        emitEnterRoom = fn;
    };

    //TODO : pushEnterRoom()をプライベート化したい
    that.pushEnterRoom = pushEnterRoom;
    function pushEnterRoom(roomId){
        that.enterRoomButtonArray.forEach(function(button){
            button.visible = false;
        });
        labelEnterRoomWait.visible = true;
        prevButton.visible = false;
        emitEnterRoom({
            roomId : roomId
        });
    }
    
    that.onPushPrevButton = function(fn){
        emitPushPrevButton = fn;
    };
    
    //TODO : テスト用関数　いつか消したい
    function pushPrevButton(){
        emitPushPrevButton();
    }    
   
    return that;
}
