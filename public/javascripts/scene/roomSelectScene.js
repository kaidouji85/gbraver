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
    that.refreshButton = {};
    that.onEnterRoom = onEnterRoom;
    that.onPushRefreshButton = onPushRefreshButton;
    that.onPushPrevButton = onPushPrevButton;
    that.emitSuccesEnterRoom = emitSuccesEnterRoom;
    that.onLeaveRoom = onLeaveRoom;
    that.emitEnterRoomError = emitEnterRoomError;
    
    var core = enchant.Core.instance;
    var emitEnterRoom;
    var emitPushPrevButton = function(){};
    var emitLeaveRoom = function(){};
    var emitPushRefreshButton = function(){};
    
    var CNT_MAX_ENTER_ROOM = 5;
    
    initSprite();
    function initSprite(){
        //背景
        that.background = new Sprite(core.SYSTEM_BG_WIDTH,core.SYSTEM_BG_HEIGHT);
        that.background.image = core.assets[core.PICT_BG_GROUND2];
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

        //更新ボタン
        that.refreshButton =  pictButton({
            text : '更新',
            pict : core.assets[core.PICT_BUTTON]
        });
        that.refreshButton.x = 8;
        that.refreshButton.y = 426;
        that.refreshButton.addEventListener(Event.TOUCH_END,pushRefreshButton);
        that.addChild(that.refreshButton);

        //戻るボタン
        that.prevButton = pictButton({
            text : '戻る',
            pict : core.assets[core.PICT_BUTTON]
        });
        that.prevButton.x = 168;
        that.prevButton.y = 426;
        that.prevButton.addEventListener(Event.TOUCH_END,function(e){
            pushPrevButton();
        });
        that.addChild(that.prevButton);

        //退室ボタン
        that.leaveRoomButton = pictButton({
            text : '退室',
            pict : core.assets[core.PICT_BUTTON]
        });
        that.leaveRoomButton.x = 88;
        that.leaveRoomButton.y = 426;
        that.leaveRoomButton.setVisible(false);
        that.leaveRoomButton.addEventListener(Event.TOUCH_END,pushLeaveRoomButton);
        that.addChild(that.leaveRoomButton);

        //OKボタン
        that.okButton = pictButton({
            text : 'OK',
            pict : core.assets[core.PICT_BUTTON]
        });
        that.okButton.x = 88;
        that.okButton.y = 426;
        that.okButton.setVisible(false);
        that.okButton.addEventListener(Event.TOUCH_END,pushOkButton);
        that.addChild(that.okButton);

        //画面タイトル
        that.title = titleWindow({
            pict : core.assets[core.PICT_BLACK_WINDOW],
            text : 'ルーム選択'
        });
        that.addChild(that.title);

        //メッセージウインドウ
        that.mesWindow = messageWindow({
            pict : core.assets[core.PICT_WINDOW]
        });
        that.mesWindow.x = 0;
        that.mesWindow.y = 180;
        that.mesWindow.setVisible(false);
        that.addChild(that.mesWindow);
    };

    that.addEventListener(Event.ENTER,function(){
        core.bgm.setBgm(core.assets[core.SOUND_CONFIG]);
    });

    function onEnterRoom(fn){
        emitEnterRoom = fn;
    };

    function pushEnterRoom(roomId){
        for(var i=0; i<that.enterRoomButtonArray.length; i++){
            that.enterRoomButtonArray[i].setVisible(false);
        }
        that.mesWindow.setVisible(true);
        that.mesWindow.setText(core.MESSAGE_WAIT_COMMUNICATE);
        that.prevButton.setVisible(false);
        that.refreshButton.setVisible(false);
        emitEnterRoom({
            roomId : roomId
        });
    }
    
    function onPushPrevButton(fn){
        emitPushPrevButton = fn;
    }

    function pushRefreshButton() {
        for(var i=0; i<that.enterRoomButtonArray.length; i++){
            that.enterRoomButtonArray[i].setVisible(false);
        }
        that.mesWindow.setVisible(true);
        that.mesWindow.setText(core.MESSAGE_GET_ROOMINFO);
        that.prevButton.setVisible(false);
        that.refreshButton.setVisible(false);
        emitPushRefreshButton();
    }

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

    function emitEnterRoomError(message){
        that.refreshButton.setVisible(false);
        that.prevButton.setVisible(false);
        that.leaveRoomButton.setVisible(false);
        that.enterRoomButtonArray.forEach(function(button){
            button.setVisible(false);
        });
        that.okButton.setVisible(true);
        that.mesWindow.setVisible(true);
        that.mesWindow.setText(message);
    }

    function pushOkButton() {
        that.mesWindow.setVisible(false);
        that.okButton.setVisible(false);
        that.enterRoomButtonArray.forEach(function(button){
            button.setVisible(true);
        });
        that.refreshButton.setVisible(true);
        that.prevButton.setVisible(true);
    }

    function onPushRefreshButton(fn){
        emitPushRefreshButton = fn;
    }
   
    return that;
}