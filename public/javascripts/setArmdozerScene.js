function setArmdozerScene(){
    var that = new Scene();
    that.backgroundColor = "black";
    
    var MAX_ARMDOZER_BUTTON = 2;
    var armdozerButtonArray = new Array(MAX_ARMDOZER_BUTTON);
    var armdozerIdList = [
        {name:'グランブレイバー',id:'granBraver'},
        {name:'ランドーザ',id:'landozer'}
    ];
    var prevButton;
    var labelArmmdozerSelect;
    var emitSelectArmdozer;
    
    initSprite();
    function initSprite(){
        //キャラクター選択ボタン
        for(var i=0; i<MAX_ARMDOZER_BUTTON; i++){
            armdozerButtonArray[i] = new Button(armdozerIdList[i].name,'blue',40,200);
        }
        armdozerButtonArray.forEach(function(button,i){
            button.x = 50;
            button.y = 60+60*i;
            button.addEventListener(Event.TOUCH_END,function(e){
                pushArmdozerButton(i);
            }); 
            that.addChild(button);
        });
        
        //戻るボタン
        prevButton = new Button('戻る','blue',40,200);
        prevButton.x = 50;
        prevButton.y = 250;
        that.addChild(prevButton);
        
        //アームドーザ選択ラベル
        labelArmmdozerSelect = new Label('アームドーザ選択');
        labelArmmdozerSelect.color = 'white';
        labelArmmdozerSelect.x = 100;
        labelArmmdozerSelect.y = 30;
        that.addChild(labelArmmdozerSelect);
    }
    
    that.onSelectArmdozer = function(fn){
        emitSelectArmdozer = fn;
    };
    
    function pushArmdozerButton(i){
        var data = {
            armdozerId : armdozerIdList[i].id
        };
        emitSelectArmdozer(data);
    }
    
    return that;
}
