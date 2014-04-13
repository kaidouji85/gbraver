var core;
var PICT_PREFIX = location.origin + '/images/';
var PICT_ICON_ATACK = 'iconAtack.png';
var PICT_ICON_CHARGE = 'iconCharge.png';
var PICT_ICON_PLUS = 'iconPlus.png';
var PICT_ICON_MINUS = 'iconMinus.png';
var PICT_ICON_OK = 'iconOk.png';
var PICT_ICON_PREV = 'iconPrev.png';
enchant();
window.onload = function() {
    core = new Core(320, 320);
    core.fps = 60;
    core.rootScene.backgroundColor = "black";
    core.preload(PICT_PREFIX + PICT_ICON_ATACK);
    core.preload(PICT_PREFIX + PICT_ICON_CHARGE);
    core.preload(PICT_PREFIX + PICT_ICON_PLUS);
    core.preload(PICT_PREFIX + PICT_ICON_MINUS);
    core.preload(PICT_PREFIX + PICT_ICON_OK);
    core.preload(PICT_PREFIX + PICT_ICON_PREV);
    core.start();
    core.onload = function() {
        //攻撃コマンド
        var AtackCommand = atackCommand({
            atackImage : core.assets[PICT_PREFIX + PICT_ICON_ATACK],
            chargeImage : core.assets[PICT_PREFIX + PICT_ICON_CHARGE]
        });
        AtackCommand.x = 30;
        AtackCommand.y = 30;
        AtackCommand.onPushAtackButton(function() {
            alert('攻撃');
        });
        AtackCommand.onPushChargeButton(function() {
            alert('チャージ');
        });
        //AtackCommand.setVisible(false);
        core.rootScene.addChild(AtackCommand);

        //バッテリーコマンド
        var BatteryCommand = batteryCommand({
            plusImage : core.assets[PICT_PREFIX + PICT_ICON_PLUS],
            minusImage : core.assets[PICT_PREFIX + PICT_ICON_MINUS],
            okImage : core.assets[PICT_PREFIX + PICT_ICON_OK],
            prevImage : core.assets[PICT_PREFIX + PICT_ICON_PREV]
        });
        BatteryCommand.x = 200;
        BatteryCommand.y = 30;
        BatteryCommand.onPushPlusButton(function() {
            alert('+');
        });
        BatteryCommand.onPushMinuxButton(function() {
            alert('-');
        });
        BatteryCommand.onPushOkButton(function() {
            alert('OK');
        });
        BatteryCommand.onPushPrevButton(function() {
            alert('Prev');
        });
        BatteryCommand.setPrevButtonVisible(true);
        
        //BatteryCommand.setVisible(false);
        core.rootScene.addChild(BatteryCommand);

    };
};
