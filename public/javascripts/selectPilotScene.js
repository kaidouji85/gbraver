function selectPilotScene(spec,my) {
    var MAX_PILOT = 3;

    var that = new Scene();
    var core = enchant.Core.instance;
    var pilotList = spec.pilotList;
    var selectPilotId = spec.selectPilotId;
    var emitPushButton = function(){};
    var emitPushOkButton = function(pilotId,pilotPict){};

    that.backgroundColor = "black";
    that.pilotButtonArray = new Array(MAX_PILOT);

    initSprite();
    function initSprite(){
        //背景
        that.background = new Sprite(core.SYSTEM_BG_WIDTH,core.SYSTEM_BG_HEIGHT);
        that.background.image = core.assets[core.PICT_BG_GROUND2];
        that.addChild(that.background);

        //選択中のパイロット画像
        that.selectPilotSprite = new Sprite(256,256);
        that.selectPilotSprite.x = -64;
        that.selectPilotSprite.y = 48;
        that.addChild(that.selectPilotSprite);

        //パイロット情報ウインドウ
        that.infoWindow = gridWindow({
            pict : core.assets[core.PICT_WINDOW],
            width : 10,
            height : 8
        });
        that.infoWindow.x = 150;
        that.infoWindow.y = 120;
        that.addChild(that.infoWindow);

        //パイロット名ラベル
        that.pilotLabel = new Label("登志脳京子");
        that.pilotLabel.color = "white";
        that.pilotLabel.x = 170;
        that.pilotLabel.y = 140;
        that.addChild(that.pilotLabel);

        //スキルラベル
        that.skillLabel = new Label("クイックチャージ");
        that.skillLabel.color = "white";
        that.skillLabel.x = 170;
        that.skillLabel.y = 160;
        that.addChild(that.skillLabel);

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
                var pilotId = pilotList[pid].id;
                selectPilotId = pilotId;
                pushPilotButton(pilotId);
            });
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
        that.prevButton.x = 168;
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
        that.okButton.x = 8;
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

        refreshInformation(selectPilotId);
    }

    that.onPushPrevButton = function(fn){
        emitPushButton = fn;
    }

    that.onPushOkButton = function(fn){
        emitPushOkButton = fn;
    }

    function pushPilotButton(pid) {
        refreshInformation(pid);
    }

    function invisibleButton(){
        that.okButton.setVisible(false);
        that.prevButton.setVisible(false);
        for(var i in that.pilotButtonArray){
            that.pilotButtonArray[i].setVisible(false);
        }
    }

    function refreshInformation(id){
        var pilotData = getPilotData(id);
        that.pilotLabel.text = pilotData.name;
        that.skillLabel.text = pilotData.type;
        that.selectPilotSprite.image = core.assets[core.PICT_PREFIX+pilotData.pict];
    }

    function getPilotData(id){
        for(var pid=0; pid<pilotList.length; pid++){
            if(pilotList[pid].id === id){
                return pilotList[pid];
            }
        }
    }

    return that;
}