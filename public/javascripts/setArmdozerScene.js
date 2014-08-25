function setArmdozerScene(spec,my){
    var that = new Scene();
    var core = enchant.Core.instance;
    var MAX_ARMDOZER_BUTTON = 4;
    var armdozerIdList = spec.armdozerIdList;
    var labelArmmdozerSelect;
    var emitSelectArmdozer = function(data){};
    var emitPushPrevButton = function(){};

    that.backgroundColor = 'black';
    that.background = {};
    that.armdozerButtonArray = new Array(MAX_ARMDOZER_BUTTON);
    that.prevButton = {};
    that.mesWindow = {};
    that.onSelectArmdozer  = onSelectArmdozer;
    that.onPushPrevButton = onPushPrevButton;

    initSprite();
    function initSprite(){
        //背景
        that.background = new Sprite(core.SYSTEM_BG_WIDTH,core.SYSTEM_BG_HEIGHT);
        that.background.image = core.assets[core.PICT_BG_GROUND];
        that.addChild(that.background);

        //キャラクター選択ボタン
        for(var i=0; i<MAX_ARMDOZER_BUTTON && i<armdozerIdList.length; i++){
            that.armdozerButtonArray[i] = pictButton({
                text : armdozerIdList[i].name,
                pict : core.assets[core.PICT_BULUE_BUTTON]
            });
        }
        that.armdozerButtonArray.forEach(function(button,i){
            button.x = 96;
            button.y = 200+40*i;
            button.addEventListener(Event.TOUCH_END,function(e){
                pushArmdozerButton(i);
            });
            that.addChild(button);
        });
        
        //戻るボタン
        that.prevButton = pictButton({
            text : '戻る',
            pict : core.assets[core.PICT_BULUE_BUTTON]
        });
        that.prevButton.x = 96;
        that.prevButton.y = 380;
        that.prevButton.visible = true;
        that.prevButton.addEventListener(Event.TOUCH_END,function(e){
            pushPrevButton();
        });
        that.addChild(that.prevButton);
        
        //アームドーザ選択ラベル
        labelArmmdozerSelect = new Label('アームドーザ選択');
        labelArmmdozerSelect.color = 'white';
        labelArmmdozerSelect.x = 100;
        labelArmmdozerSelect.y = 30;
        that.addChild(labelArmmdozerSelect);

        //メッセージウインドウ
        that.mesWindow = messageWindow({
            pict : core.assets[core.PICT_MESSAGE_WINDOW]
        });
        that.mesWindow.x = 0;
        that.mesWindow.y = core.MESSAGE_WINDOW_Y;
        that.mesWindow.setVisible(false);
        that.mesWindow.setText(core.MESSAGE_WAIT_COMMUNICATE);
        that.addChild(that.mesWindow);
    }
    
    function onSelectArmdozer(fn){
        emitSelectArmdozer = fn;
    };
    
    function onPushPrevButton(fn){
        emitPushPrevButton = fn;
    };
    
    function pushArmdozerButton(i){
        setWaitScene();
        var data = {
            armdozerId : armdozerIdList[i].id
        };
        emitSelectArmdozer(data);
    }
    
    function pushPrevButton(){
        emitPushPrevButton();
    }

    function setWaitScene(){
        for(var i=0; i<MAX_ARMDOZER_BUTTON && i<armdozerIdList.length; i++){
            that.armdozerButtonArray[i].setVisible(false);
        }
        that.prevButton.setVisible(false);
        that.mesWindow.setVisible(true);
        labelArmmdozerSelect.visible = false;
    }

    return that;
}
