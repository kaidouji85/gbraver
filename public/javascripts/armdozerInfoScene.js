function armdozerInfoScene(spec,my){
    var that = new Scene();
    var core = enchant.Core.instance;
    var armdozerInfo = spec.armdozerInfo;
    var emitPushOkButton = function(armdozerId){};
    var emitPrevButton = function(){};

    that.backgroundColor = "black";
    that.armdozerPict = {};
    that.armdozerNameLabel = {};
    that.hpLabel = {};
    that.hpValueLabel = {};
    that.speedLabel = {};
    that.speedValueLabel = {};
    that.okButton = {};
    that.powerLabel = {};
    that.powerValueLabel = {};
    that.onPushOkButton = onPushOkButton;
    that.onPushPrevButton = onPushPrevButton;

    initSprite();
    function initSprite(){
        //アームドーザ画像
        that.armdozerPict = new Sprite(128,128);
        that.armdozerPict.image = core.assets[core.PICT_PREFIX+armdozerInfo.pictName];
        that.armdozerPict.x = 20;
        that.armdozerPict.y = 60;
        that.addChild(that.armdozerPict);

        //アームドーザ名ラベル
        that.armdozerNameLabel = new Label(armdozerInfo.name);
        that.armdozerNameLabel.color = "white";
        that.armdozerNameLabel.x = 150;
        that.armdozerNameLabel.y = 60;
        that.addChild(that.armdozerNameLabel);

        //HPラベル
        that.hpLabel = new Label('HP');
        that.hpLabel.color = "white";
        that.hpLabel.x = 150;
        that.hpLabel.y = 80;
        that.addChild(that.hpLabel);

        //HPバリューラベル
        that.hpValueLabel = new Label(armdozerInfo.hp);
        that.hpValueLabel.color = "white";
        that.hpValueLabel.x = 220;
        that.hpValueLabel.y = 80;
        that.addChild(that.hpValueLabel);

        //機動力ラベル
        that.speedLabel = new Label('SPEED');
        that.speedLabel.color = "white";
        that.speedLabel.x = 150;
        that.speedLabel.y = 100;
        that.addChild(that.speedLabel);

        //機動力バリューラベル
        that.speedValueLabel = new Label(armdozerInfo.speed);
        that.speedValueLabel.color = "white";
        that.speedValueLabel.x = 220;
        that.speedValueLabel.y = 100;
        that.addChild(that.speedValueLabel);

        //攻撃力ラベル
        that.powerLabel = new Label('POWER');
        that.powerLabel.color = 'white';
        that.powerLabel.x = 150;
        that.powerLabel.y = 120;
        that.addChild(that.powerLabel);

        //攻撃力バリューラベル
        that.powerValueLabel = new Label(getPowerLabelValue(armdozerInfo.weapons));
        that.powerValueLabel.color = 'white';
        that.powerValueLabel.x = 220;
        that.powerValueLabel.y = 120;
        that.addChild(that.powerValueLabel);

        //決定ボタン
        that.okButton = new Button('決定','blue',core.ICON_HEIGHT,core.ICON_WIDTH);
        that.okButton.addEventListener(Event.TOUCH_END,selectArmdozer);
        that.okButton.x = core.COMMAND_POX_X;
        that.okButton.y = core.COMMAND_POS_Y;
        that.addChild(that.okButton);

        //戻るボタン
        that.prevButton = new Button('戻る','blue',core.ICON_HEIGHT,core.ICON_WIDTH);
        that.prevButton.addEventListener(Event.TOUCH_END,prevArmdoerList);
        that.prevButton.x = core.COMMAND_POX_X + core.ICON_WIDTH + 32;
        that.prevButton.y = core.COMMAND_POS_Y;
        that.addChild(that.prevButton);
    }

    function onPushOkButton(fn){
        emitPushOkButton = fn;
    }

    function onPushPrevButton(fn){
        emitPrevButton = fn;
    }

    function selectArmdozer(){
        var armdozerId = armdozerInfo.armdozerId;
        var data = {
            armdozerId : armdozerId
        };
        emitPushOkButton(data);
    }

    function prevArmdoerList(){
        emitPrevButton();
    }

    function getPowerLabelValue(weapons){
        var text = '';
        for(var i=1; i<=5; i++){
            text += weapons[i].power + '<br>';
        }
        return text;
    }

    return that;
}