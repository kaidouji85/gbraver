var pictButton = require('../button/pictButton');
var pilotIcon = require('../button/pilotIcon');
var messageWindow = require('../window/messageWindow');
var titleWindow = require('../window/titleWindow');

const BUTTON_RIGHT_X = 8;
const BUTTON_LEFT_X = 168;

module.exports = function(spec,my){
    var that = new Scene();
    var armdozerId = spec.armdozerId;
    var pilotId = spec.pilotId;
    var armdozerList = spec.armdozerList;
    var pilotList = spec.pilotList;

    that.backgroundColor = "black";
    that.onPushBattleRoom = onPushBattleRoom;
    that.onPushSelectPilotButton = onPushSelectPilotButton;
    that.onPushSelectArmdozerButton = onPushSelectArmdozerButton;
    that.onPushSelectStageButton = onPushSelectStageButton;
    that.onPushLogOffButton = onPushLogOffButton;
    
    var core = enchant.Core.instance;
    var emitPushBattleRoom = function(){};
    var emitPushSelectPilotButton = function(){};
    var emitPushSelectArmdozerButton = function(){};
    var emitPushSelectStageButton = function(){};
    var emitPushLogOffButton = function(){};
    
    initSprite();
    function initSprite(){
        //背景
        that.background = new Sprite(core.SYSTEM_BG_WIDTH,core.SYSTEM_BG_HEIGHT);
        that.background.image = core.assets[core.PICT_BG_GROUND2];
        that.addChild(that.background);

        //選択中アームドーザ
        that.selectArmdozerSprite = new Sprite(160,160);
        that.selectArmdozerSprite.image = core.assets[core.PICT_PREFIX+getArmdozerPictByArmdozerId(armdozerId)];
        that.selectArmdozerSprite.x = (320-160)/2;
        that.selectArmdozerSprite.y = 110;
        that.addChild(that.selectArmdozerSprite);

        //選択中パイロット
        var pilotData = getPilotData(pilotId)
        that.pilotSprite = pilotIcon({
            windowPict : core.assets[core.PICT_BLACK_WINDOW],
            pilotPict : core.assets[core.PICT_PREFIX + pilotData.pict],
            pictTopMargin : pilotData.pictTopMargin,
            pictLeftMargin : pilotData.pictLeftMargin
        });
        that.pilotSprite.x = 230;
        that.pilotSprite.y = 100;
        that.addChild(that.pilotSprite);

        //対戦ルーム入室ボタン
        that.battleRoomButton = pictButton({
            text : '対戦モード',
            pict : core.assets[core.PICT_BUTTON]
        });
        that.battleRoomButton.x = BUTTON_RIGHT_X;
        that.battleRoomButton.y = 300;
        that.battleRoomButton.addEventListener(Event.TOUCH_END,function(e){
            that.battleRoomButton.setVisible(false);
            that.selectArmdozerButton.setVisible(false);
            that.selectStageButton.setVisible(false);
            that.selectPilotButton.setVisible(false);
            that.logOffButton.setVisible(false);
            that.mesWindow.setText(core.MESSAGE_GET_ROOMINFO);
            that.mesWindow.setVisible(true);
            emitPushBattleRoom();
        });
        that.addChild(that.battleRoomButton);

        //ステージセレクトボタン
        that.selectStageButton = pictButton({
            text : '練習モード',
            pict : core.assets[core.PICT_BUTTON]
        });
        that.selectStageButton.x = BUTTON_LEFT_X;
        that.selectStageButton.y = 300;
        that.selectStageButton.addEventListener(Event.TOUCH_END,function(){
            emitPushSelectStageButton();
        });
        that.addChild(that.selectStageButton);

        //アームドーザ選択ボタン
        that.selectArmdozerButton = pictButton({
            text : 'アームドーザ選択',
            pict : core.assets[core.PICT_BUTTON]
        });
        that.selectArmdozerButton.x = BUTTON_RIGHT_X;
        that.selectArmdozerButton.y = 364;
        that.selectArmdozerButton.addEventListener(Event.TOUCH_END,function(e){
            emitPushSelectArmdozerButton();
        });
        that.addChild(that.selectArmdozerButton);

        //パイロット選択ボタン
        that.selectPilotButton = pictButton({
            text : 'パイロット選択',
            pict : core.assets[core.PICT_BUTTON]
        });
        that.selectPilotButton.x = BUTTON_LEFT_X;
        that.selectPilotButton.y = 364;
        that.selectPilotButton.addEventListener(Event.TOUCH_END,function(e){
            emitPushSelectPilotButton();
        });
        that.addChild(that.selectPilotButton);

        //ログオフボタン
        that.logOffButton = pictButton({
            text : 'ログオフ',
            pict : core.assets[core.PICT_OVERHEAT_BUTTON]
        });
        that.logOffButton.x = BUTTON_LEFT_X;
        that.logOffButton.y = 428;
        that.logOffButton.addEventListener(Event.TOUCH_END,function(){
            that.battleRoomButton.setVisible(false);
            that.selectArmdozerButton.setVisible(false);
            that.selectStageButton.setVisible(false);
            that.selectPilotButton.setVisible(false);
            that.logOffButton.setVisible(false);
            that.mesWindow.setText(core.MESSAGE_LOGOFF);
            that.mesWindow.setVisible(true);
            emitPushLogOffButton();
        });
        that.addChild(that.logOffButton);

        //画面タイトル
        that.title = titleWindow({
            pict : core.assets[core.PICT_BLACK_WINDOW],
            text : 'メニュー'
        });
        that.addChild(that.title);

        //メッセージウインドウ
        that.mesWindow = messageWindow({
            pict : core.assets[core.PICT_WINDOW]
        });
        that.mesWindow.x = 0;
        that.mesWindow.y = core.MESSAGE_WINDOW_Y;
        that.mesWindow.setVisible(false);
        that.addChild(that.mesWindow);
    }

    that.getName = function(){
        return 'top';
    }

    that.addEventListener(Event.ENTER,function(){
        core.bgm.setMute();
    });

    function onPushBattleRoom(fn){
        emitPushBattleRoom = fn;
    }

    function onPushSelectPilotButton(fn){
        emitPushSelectPilotButton = fn;
    }

    function onPushSelectArmdozerButton(fn){
        emitPushSelectArmdozerButton = fn;
    }

    function onPushSelectStageButton(fn){
        emitPushSelectStageButton = fn;
    }

    function getArmdozerPictByArmdozerId(armdozerId){
        for(var i in armdozerList){
            if(armdozerList[i].armdozerId === armdozerId) {
                return armdozerList[i].pictName;
            }
        }
    }

    function getPilotData(pilotId){
        for(var i in pilotList){
            if(pilotList[i].id === pilotId){
                return pilotList[i];
            }
        }
    }

    function onPushLogOffButton(fn) {
        emitPushLogOffButton = fn;
    }
    
    return that;
}
