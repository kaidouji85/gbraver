function roomSelectScene(spec,my){
    var that = new Scene();
    that.backgroundColor = 'black';
    that.background = {};
    that.enterRoomButtonArray = new Array();
    that.prevButton = {};
    that.onEnterRoom = onEnterRoom;
    that.onPushPrevButton = onPushPrevButton;
    
    var core = enchant.Core.instance;
    var emitEnterRoom;
    var labelEnterRoomWait;
    var emitPushPrevButton = function(){};
    
    var CNT_MAX_ENTER_ROOM = 5;
    
    initSprite();
    function initSprite(){
        //背景
        that.background = new Sprite(core.SYSTEM_BG_WIDTH,core.SYSTEM_BG_HEIGHT);
        that.background.image = core.assets[core.PICT_SYSTEM_BACKGROUND];
        that.addChild(that.background);

        //入室ボタン
        for(var i=0; i<CNT_MAX_ENTER_ROOM; i++){
            var button = pictButton({
                text : 'ルーム'+i,
                pict : core.assets[core.PICT_BULUE_BUTTON]
            });
            that.enterRoomButtonArray.push(button);
        }
        that.enterRoomButtonArray.forEach(function(button,i){
            button.x = 96;
            button.y = 164+50*i;
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
        that.prevButton = pictButton({
            text : '戻る',
            pict : core.assets[core.PICT_BULUE_BUTTON]
        });
        that.prevButton.x = 96;
        that.prevButton.y = 420;
        that.prevButton.addEventListener(Event.TOUCH_END,function(e){
            pushPrevButton();
        });
        that.addChild(that.prevButton);
    };
    
    function onEnterRoom(fn){
        emitEnterRoom = fn;
    };

    function pushEnterRoom(roomId){
        that.enterRoomButtonArray.forEach(function(button){
            button.setVisible(false);
        });
        labelEnterRoomWait.visible = true;
        that.prevButton.setVisible(false);
        emitEnterRoom({
            roomId : roomId
        });
    }
    
    function onPushPrevButton(fn){
        emitPushPrevButton = fn;
    };

    function pushPrevButton(){
        emitPushPrevButton();
    }    
   
    return that;
}