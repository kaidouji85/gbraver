function armdozerInfoScene(spec,my){
    var that = new Scene();
    var core = enchant.Core.instance;
    var armdozerInfo = spec.armdozerInfo;
    var emitPushOkButton = function(armdozerId){};
    var emitPrevButton = function(){};

    that.background = {};
    that.armdozerPict = {};
    that.armdozerNameLabel = {};
    that.hpLabel = {};
    that.hpValueLabel = {};
    that.speedLabel = {};
    that.speedValueLabel = {};
    that.okButton = {};
    that.powerLabel = {};
    that.powerValueLabel = {};
    that.mesWindow = {};
    that.title = {};
    that.infoWindow = {};
    that.onPushOkButton = onPushOkButton;
    that.onPushPrevButton = onPushPrevButton;

    initSprite();
    function initSprite(){
        //背景
        that.background = new Sprite(core.SYSTEM_BG_WIDTH,core.SYSTEM_BG_HEIGHT);
        that.background.image = core.assets[core.PICT_BG_GROUND];
        that.addChild(that.background);

        //アームドーザ情報ウインドウ
        that.infoWindow = gridWindow({
            pict : core.assets[core.PICT_WINDOW],
            width : 18,
            height : 10
        });
        that.infoWindow.x = 16;
        that.infoWindow.y = 70;
        that.addChild(that.infoWindow);

        //アームドーザ画像
        that.armdozerPict = new Sprite(128,128);
        that.armdozerPict.image = core.assets[core.PICT_PREFIX+armdozerInfo.pictName];
        that.armdozerPict.x = 20;
        that.armdozerPict.y = 90;
        that.addChild(that.armdozerPict);

        //アームドーザ名ラベル
        that.armdozerNameLabel = new Label(armdozerInfo.name);
        that.armdozerNameLabel.color = "white";
        that.armdozerNameLabel.x = 150;
        that.armdozerNameLabel.y = 100;
        that.addChild(that.armdozerNameLabel);

        //HPラベル
        that.hpLabel = new Label('HP');
        that.hpLabel.color = "white";
        that.hpLabel.x = 150;
        that.hpLabel.y = 120;
        that.addChild(that.hpLabel);

        //HPバリューラベル
        that.hpValueLabel = new Label(armdozerInfo.hp);
        that.hpValueLabel.color = "white";
        that.hpValueLabel.x = 220;
        that.hpValueLabel.y = 120;
        that.addChild(that.hpValueLabel);

        //攻撃力ラベル
        that.powerLabel = new Label('POWER');
        that.powerLabel.color = 'white';
        that.powerLabel.x = 150;
        that.powerLabel.y = 140;
        that.addChild(that.powerLabel);

        //攻撃力バリューラベル
        that.powerValueLabel = new Label(getPowerLabelValue(armdozerInfo.weapons));
        that.powerValueLabel.color = 'white';
        that.powerValueLabel.x = 220;
        that.powerValueLabel.y = 140;
        that.addChild(that.powerValueLabel);

        //機動力ラベル
        that.speedLabel = new Label('SPEED');
        that.speedLabel.color = "white";
        that.speedLabel.x = 150;
        that.speedLabel.y = 160;
        that.addChild(that.speedLabel);

        //機動力バリューラベル
        that.speedValueLabel = new Label(armdozerInfo.speed);
        that.speedValueLabel.color = "white";
        that.speedValueLabel.x = 220;
        that.speedValueLabel.y = 160;
        that.addChild(that.speedValueLabel);

        //決定ボタン
        that.okButton = pictButton({
            text : '決定',
            pict : core.assets[core.PICT_WINDOW]
        });
        that.okButton.addEventListener(Event.TOUCH_END,selectArmdozer);
        that.okButton.x = 88;
        that.okButton.y = 324;
        that.addChild(that.okButton);

        //戻るボタン
        that.prevButton = pictButton({
            text : '戻る',
            pict : core.assets[core.PICT_WINDOW]
        });
        that.prevButton.addEventListener(Event.TOUCH_END,prevArmdoerList);
        that.prevButton.x = 88;
        that.prevButton.y = 388;
        that.addChild(that.prevButton);

        //画面タイトル
        that.title = titleWindow({
            pict : core.assets[core.PICT_WINDOW],
            text : 'アームドーザ選択'
        });
        that.addChild(that.title);

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
        setWaitScene();
        emitPushOkButton(data);
    }

    function prevArmdoerList(){
        setWaitScene();
        emitPrevButton();
    }

    function getPowerLabelValue(weapons){
        //TODO : 攻撃力は基本固定値にしたが、内部的にはバッテリーごとの攻撃力差を残す
        return weapons['1'].power;
    }

    function setWaitScene(){
        that.armdozerPict.visible = false;
        that.armdozerNameLabel.visible = false;
        that.hpLabel.visible = false;
        that.hpValueLabel.visible = false;
        that.powerLabel.visible = false;
        that.speedLabel.visible = false;
        that.powerValueLabel.visible = false;
        that.speedValueLabel.visible = false;
        that.okButton.setVisible(false);
        that.prevButton.setVisible(false);
        that.infoWindow.setVisible(false);
        that.mesWindow.setVisible(true);
    }

    return that;
}