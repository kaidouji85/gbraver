var core;
var PICT_PREFIX = location.origin + '/images/';
var PICT_ICON_ATACK = 'iconAtack.png';
var PICT_ICON_CHARGE = 'iconCharge.png';
enchant();
window.onload = function() {
    core = new Core(320, 320);
    core.fps = 60;
    core.rootScene.backgroundColor = "black";
    core.preload(PICT_PREFIX+PICT_ICON_ATACK);
    core.preload(PICT_PREFIX+PICT_ICON_CHARGE);
    core.start();
    core.onload = function(){
       var AtackCommand = atackCommand({
           atackImage : core.assets[PICT_PREFIX+PICT_ICON_ATACK],
           chargeImage : core.assets[PICT_PREFIX+PICT_ICON_CHARGE]
       });
       AtackCommand.x = 30;
       AtackCommand.y = 30;
       AtackCommand.onPushChargeButton(function(){
           alert('チャージ');
       });
       core.rootScene.addChild(AtackCommand);     
    };
};
