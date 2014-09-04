function roomSelectScene(spec,my){
    var that = new Scene();
    var roomInfo = spec.roomInfo;
    that.backgroundColor = 'black';
    that.background = {};
    that.enterRoomButtonArray = new Array();
    that.prevButton = {};
    that.leaveRoomButton = {};
    that.mesWindow = {};
    that.title = {};
    that.okButton = {};
    that.onEnterRoom = onEnterRoom;
    that.onPushPrevButton = onPushPrevButton;
    that.emitSuccesEnterRoom = emitSuccesEnterRoom;
    that.onLeaveRoom = onLeaveRoom;
    that.emitSuccesLeaveRoom = emitSuccesLeaveRoom;
    that.emitEnterRoomError = emitEnterRoomError;
    
    var core = enchant.Core.instance;
    var emitEnterRoom;
    var emitPushPrevButton = function(){};
    var emitLeaveRoom = function(){};
    
    var CNT_MAX_ENTER_ROOM = 5;
    
    initSprite();
    function initSprite(){
        //背景
        that.background = new Sprite(core.SYSTEM_BG_WIDTH,core.SYSTEM_BG_HEIGHT);
        that.background.image = core.assets[core.PICT_BG_GROUND];
        that.addChild(that.background);

        //入室ボタン
        for(var i=0; i<CNT_MAX_ENTER_ROOM; i++){
            var button = roomInfoWindow({
                pict : core.assets[core.PICT_WINDOW],
                subPict : core.assets[core.PICT_ACTIVE_WINDOW]
            });
            that.enterRoomButtonArray.push(button);
        }
        that.enterRoomButtonArray.forEach(function(button,i){
            var usersNum = roomInfo[i].length;
            button.x = 16;
            button.y = 56 + 72*i;
            button.setRoomName('ルーム'+i);
            button.setUsers(roomInfo[i]);
            if(usersNum === 1) {
                button.setStatus('対戦相手募集中');
            } else if(usersNum === 2){
                button.setStatus('対戦中');
            } else {
                button.setStatus('空き');
            }
            button.addEventListener(Event.TOUCH_END,function(e){
                pushEnterRoom(i);
            });
            that.addChild(button);

        });

        //戻るボタン
        that.prevButton = pictButton({
            text : '戻る',
            pict : core.assets[core.PICT_WINDOW],
            subPict : core.assets[core.PICT_ACTIVE_WINDOW]
        });
        that.prevButton.x = 88;
        that.prevButton.y = 426;
        that.prevButton.addEventListener(Event.TOUCH_END,function(e){
            pushPrevButton();
        });
        that.addChild(that.prevButton);

        //退室ボタン
        that.leaveRoomButton = pictButton({
            text : '退室',
            pict : core.assets[core.PICT_WINDOW],
            subPict : core.assets[core.PICT_ACTIVE_WINDOW]
        });
        that.leaveRoomButton.x = 88;
        that.leaveRoomButton.y = 426;
        that.leaveRoomButton.setVisible(false);
        that.leaveRoomButton.addEventListener(Event.TOUCH_END,pushLeaveRoomButton);
        that.addChild(that.leaveRoomButton);

        //OKボタン
        that.okButton = pictButton({
            text : 'OK',
            pict : core.assets[core.PICT_WINDOW],
            subPict : core.assets[core.PICT_ACTIVE_WINDOW]
        });
        that.okButton.x = 88;
        that.okButton.y = 426;
        that.okButton.setVisible(false);
        that.okButton.addEventListener(Event.TOUCH_END,pushOkButton);
        that.addChild(that.okButton);

        //画面タイトル
        that.title = titleWindow({
            pict : core.assets[core.PICT_WINDOW],
            text : 'ルーム選択'
        });
        that.addChild(that.title);

        //メッセージウインドウ
        that.mesWindow = messageWindow({
            pict : core.assets[core.PICT_WINDOW]
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
        that.mesWindow.setVisible(true);
        that.mesWindow.setText(core.MESSAGE_WAIT_COMMUNICATE);
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

    function emitEnterRoomError(message){
        that.mesWindow.setVisible(true);
        that.mesWindow.setText(message);
        that.prevButton.setVisible(false);
        that.leaveRoomButton.setVisible(false);
        that.enterRoomButtonArray.forEach(function(button){
            button.setVisible(false);
        });
        that.okButton.setVisible(true);
    }

    function pushOkButton() {
        that.mesWindow.setVisible(false);
        that.okButton.setVisible(false);
        that.enterRoomButtonArray.forEach(function(button){
            button.setVisible(true);
        });
        that.prevButton.setVisible(true);
    }
   
    return that;
}