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
        that.selectPilotSprite.x = 32;
        that.selectPilotSprite.y = 48;
        that.addChild(that.selectPilotSprite);

        //パイロット情報ウインドウ
        that.infoWindow = gridWindow({
            pict : core.assets[core.PICT_WINDOW],
            width : 18,
            height : 4
        });
        that.infoWindow.x = (320-18*16)/2;
        that.infoWindow.y = 240;
        that.addChild(that.infoWindow);

        //パイロット名ラベル
        that.pilotLabel = new Label();
        that.pilotLabel.color = "white";
        that.pilotLabel.x = 38;
        that.pilotLabel.y = 252;
        that.addChild(that.pilotLabel);

        //スキルラベル
        that.skillLabel = new Label();
        that.skillLabel.color = "white";
        that.skillLabel.x = 38;
        that.skillLabel.y = 270;
        that.addChild(that.skillLabel);

        //画面タイトル
        that.title = titleWindow({
            pict : core.assets[core.PICT_WINDOW],
            text : 'パイロット選択'
        });
        that.addChild(that.title);

        //パイロットボタン
        for(var i=0; i<MAX_PILOT; i++) {
            that.pilotButtonArray[i] = pilotIcon({
                windowPict : core.assets[core.PICT_WINDOW],
                pilotPict : core.assets[core.PICT_PREFIX + pilotList[i].pict]
            });
        }

        that.pilotButtonArray.forEach(function(button,i){
            button.x = 20 + 100*i;
            button.y = 320;
            button.addEventListener(Event.TOUCH_END,function(){
                var pilotId = pilotList[i].id;
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

    function pushPilotButton(pilotId) {
        refreshInformation(pilotId);
    }

    function invisibleButton(){
        that.okButton.setVisible(false);
        that.prevButton.setVisible(false);
        for(var i in that.pilotButtonArray){
            that.pilotButtonArray[i].setVisible(false);
        }
    }

    function refreshInformation(pilotId){
        var pilotData = getPilotData(pilotId);
        that.pilotLabel.text = pilotData.name;
        that.skillLabel.text = getSkillDescription(pilotData);
        that.selectPilotSprite.image = core.assets[core.PICT_PREFIX+pilotData.pict];
    }

    function getPilotData(pilotId){
        for(var i=0; i<pilotList.length; i++){
            if(pilotList[i].id === pilotId){
                return pilotList[i];
            }
        }
    }

    function getSkillDescription(pilotData){
        var ret = "";
        switch(pilotData.type){
            case 'quickCharge' :
                ret = 'バッテリーを'+pilotData.battery+'回復する';
                break;
            case 'recoverHp':
                ret = 'HPを'+pilotData.value*100+'%回復する'
                break;
            case 'guardBreak':
                ret = 'ガードを無効化する';
                break;
            default :
                ret = '不明スキル';
                break;
        }
        return ret;
    }

    return that;
}