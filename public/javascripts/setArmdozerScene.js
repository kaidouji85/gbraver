function setArmdozerScene(){
    var that = new Scene();
    that.backgroundColor = "black";
    that.armdozerButtonArray = new Array(MAX_ARMDOZER_BUTTON);
    that.prevButton = {};
    that.onSelectArmdozer  = onSelectArmdozer;
    that.onPushPrevButton = onPushPrevButton;
    
    var core = enchant.Core.instance;
    var MAX_ARMDOZER_BUTTON = 2;
    var armdozerIdList = [
        {name:'グランブレイバー',id:'granBraver'},
        {name:'ランドーザ',id:'landozer'}
    ];
    var labelArmmdozerSelect;
    var labelWait;
    var emitSelectArmdozer = function(data){};
    var emitPushPrevButton = function(){};
    
    initSprite();
    function initSprite(){
        //キャラクター選択ボタン
        for(var i=0; i<MAX_ARMDOZER_BUTTON; i++){
            that.armdozerButtonArray[i] = new Button(armdozerIdList[i].name,'blue',40,200);
        }
        that.armdozerButtonArray.forEach(function(button,i){
            button.x = 50;
            button.y = 60+60*i;
            button.addEventListener(Event.TOUCH_END,function(e){
                pushArmdozerButton(i);
            }); 
            that.addChild(button);
        });
        
        //戻るボタン
        that.prevButton = new Button('戻る','blue',40,200);
        that.prevButton.x = 50;
        that.prevButton.y = 250;
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

        //待機中ラベル
        labelWait = new Label('待機中');
        labelWait.color = "white";
        labelWait.x = 10;
        labelWait.y = 10;
        labelWait.visible = false;
        that.addChild(labelWait);
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
        for(var i=0; i<MAX_ARMDOZER_BUTTON; i++){
            that.armdozerButtonArray[i].visible = false;
        }
        that.prevButton.visible = false;
        labelWait.visible = true;
        labelArmmdozerSelect.visible = false;
    }

    return that;
}
