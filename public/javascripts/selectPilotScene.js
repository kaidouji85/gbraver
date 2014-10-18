function selectPilotScene(spec,my) {
    var MAX_PILOT = 3;

    var that = new Scene();
    var core = enchant.Core.instance;
    var pilotPict = spec.pilotPict;
    var pilotList = spec.pilotList;
    var selectPilotId = null;
    var emitPushButton = function(){};
    var emitPushOkButton = function(pilotId){};

    that.background = {};
    that.tile = {};
    that.prevButton = {};
    that.okButton = {};
    that.selectPilotSprite = {};
    that.mesWindow = {};
    that.pilotButtonArray = new Array(MAX_PILOT);

    initSprite();
    function initSprite(){
        //背景
        that.background = new Sprite(core.SYSTEM_BG_WIDTH,core.SYSTEM_BG_HEIGHT);
        that.background.image = core.assets[core.PICT_BG_GROUND];
        that.addChild(that.background);

        //選択中のパイロット画像
        that.selectPilotSprite = new Sprite(256,256);
        that.selectPilotSprite.x = 32;
        that.selectPilotSprite.y = 40;
        that.selectPilotSprite.image = core.assets[core.PICT_PREFIX+pilotPict];
        that.addChild(that.selectPilotSprite);

        //画面タイトル
        that.title = titleWindow({
            pict : core.assets[core.PICT_WINDOW],
            text : 'パイロット選択'
        });
        that.addChild(that.title);

        //パイロットボタン
        for(var pid=0; pid<MAX_PILOT; pid++) {
            that.pilotButtonArray[pid] = pilotIcon({
                windowPict : core.assets[core.PICT_WINDOW],
                pilotPict : core.assets[core.PICT_PREFIX + pilotList[pid].pict]
            });
        }

        that.pilotButtonArray.forEach(function(button,pid){
            button.x = 20 + 100*pid;
            button.y = 320;
            button.addEventListener(Event.TOUCH_END,function(){

                pushPilotButton(pid);
            })
            that.addChild( button);
        });

        pilotList.forEach(function(){
            emitPushOkButton();
        });

        //戻るボタン
        that.prevButton = pictButton({
            text : '戻る',
            pict : core.assets[core.PICT_WINDOW],
            subPict : core.assets[core.PICT_ACTIVE_WINDOW]
        });
        that.prevButton.addEventListener(Event.TOUCH_END,function(){
            emitPushButton();
        });
        that.prevButton.x = 8;
        that.prevButton.y = 420;
        that.addChild(that.prevButton);

        //決定ボタン
        that.okButton = pictButton({
            text : '決定',
            pict : core.assets[core.PICT_WINDOW],
            subPict : core.assets[core.PICT_ACTIVE_WINDOW]
        });
        that.okButton.addEventListener(Event.TOUCH_END,function(){
            invisibleButton();
            that.mesWindow.setVisible(true);
            emitPushOkButton(selectPilotId);
        });
        that.okButton.x = 168;
        that.okButton.y = 420;
        that.addChild(that.okButton);

        //メッセージウインドウ
        that.mesWindow = messageWindow({
            pict : core.assets[core.PICT_WINDOW]
        });
        that.mesWindow.x = 0;
        that.mesWindow.y = core.MESSAGE_WINDOW_Y;
        that.mesWindow.setVisible(false);
        that.mesWindow.setText(core.MESSAGE_WAIT_COMMUNICATE);
        that.addChild(that.mesWindow);
    }

    that.onPushPrevButton = function(fn){
        emitPushButton = fn;
    }

    that.onPushOkButton = function(fn){
        emitPushOkButton = fn;
    }

    function pushPilotButton(pid) {
        pilotPict = pilotList[pid].pict;
        selectPilotId = pilotList[pid].id;
        that.selectPilotSprite.image = core.assets[core.PICT_PREFIX + pilotPict];
    }

    function invisibleButton(){
        that.okButton.setVisible(false);
        that.prevButton.setVisible(false);
        for(var i in that.pilotButtonArray){
            that.pilotButtonArray[i].setVisible(false);
        }
    }

    return that;
}