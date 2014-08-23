function roomSelectScene(spec,my){
    var that = new Scene();
    that.backgroundColor = 'black';
    that.background = {};
    that.enterRoomButtonArray = new Array();
    that.prevButton = {};
    that.leaveRoomButton = {};
    that.mesWindow = {};
    that.onEnterRoom = onEnterRoom;
    that.onPushPrevButton = onPushPrevButton;
    that.emitSuccesEnterRoom = emitSuccesEnterRoom;
    that.onLeaveRoom = onLeaveRoom;
    that.emitSuccesLeaveRoom = emitSuccesLeaveRoom;
    
    var core = enchant.Core.instance;
    var emitEnterRoom;
    var emitPushPrevButton = function(){};
    var emitLeaveRoom = function(){};
    
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

        //退室ボタン
        that.leaveRoomButton = pictButton({
            text : '退室',
            pict : core.assets[core.PICT_BULUE_BUTTON]
        });
        that.leaveRoomButton.x = 96;
        that.leaveRoomButton.y = 420;
        that.leaveRoomButton.setVisible(false);
        that.leaveRoomButton.addEventListener(Event.TOUCH_END,pushLeaveRoomButton);
        that.addChild(that.leaveRoomButton);

        //メッセージウインドウ
        that.mesWindow = messageWindow({
            pict : core.assets[core.PICT_MESSAGE_WINDOW]
        });
        that.mesWindow.x = 0;
        that.mesWindow.y = core.MESSAGE_WINDOW_Y;
        that.mesWindow.setVisible(false);
        that.addChild(that.mesWindow);
    };
    
    function onEnterRoom(fn){
        emitEnterRoom = fn;
    };

    function pushEnterRoom(roomId){
        that.enterRoomButtonArray.forEach(function(button){
            button.setVisible(false);
        });
        that.mesWindow.setVisible(true);
        that.mesWindow.setText(core.MESSAGE_WAIT_COMMUNICATE);
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

    function emitSuccesEnterRoom() {
        that.mesWindow.setText(core.MESSAGE_WAIT_ENTERROOM);
        that.leaveRoomButton.setVisible(true);
    }

    function pushLeaveRoomButton(e) {
        that.leaveRoomButton.setVisible(false);
        emitLeaveRoom();
    }

    function onLeaveRoom(fn) {
        emitLeaveRoom = fn;
    }

    function emitSuccesLeaveRoom() {
        that.prevButton.setVisible(true);
        that.mesWindow.setVisible(false);
        that.enterRoomButtonArray.forEach(function(button){
            button.setVisible(true);
        });
    }
   
    return that;
}