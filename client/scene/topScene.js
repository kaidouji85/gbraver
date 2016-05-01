import __ from 'underscore';
import pictButton from '../button/pictButton';
import pilotIcon from '../button/pilotIcon';
import messageWindow from '../window/messageWindow';
import titleWindow from '../window/titleWindow';
import EventEmitter from 'event-emitter';

const BUTTON_RIGHT_X = 8;
const BUTTON_LEFT_X = 168;

module.exports = function(spec,my){
    let that = new Scene();
    let core = enchant.Core.instance;
    let armdozerId = spec.armdozerId;
    let pilotId = spec.pilotId;
    let armdozerList = spec.armdozerList;
    let pilotList = spec.pilotList;

    that.backgroundColor = "black";
    that.ee = new EventEmitter();

    that.getName = function(){
        return 'top';
    }

    that.addEventListener(Event.ENTER,function(){
        core.bgm.setMute();
    });
    
    (function(){
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
        let pilotData = getPilotData(pilotId)
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
        that.battleRoomButton.addEventListener(Event.TOUCH_END,(e)=>{
            invisibleButtons();
            that.mesWindow.setText(core.MESSAGE_GET_ROOMINFO);
            that.mesWindow.setVisible(true);
            that.ee.emit('pushBattleRoomButton');
        });
        that.addChild(that.battleRoomButton);
        
        // トーナメントモード
        that.tournamentButton = pictButton({
            text : 'トーナメント',
            pict : core.assets[core.PICT_BUTTON]
        });
        that.tournamentButton.x = BUTTON_LEFT_X;
        that.tournamentButton.y = 300;
        that.tournamentButton.addEventListener(Event.TOUCH_END,
            ()=> that.ee.emit('pushTournamentButton'));
        that.addChild(that.tournamentButton);

        //アームドーザ選択ボタン
        that.selectArmdozerButton = pictButton({
            text : 'アームドーザ選択',
            pict : core.assets[core.PICT_BUTTON]
        });
        that.selectArmdozerButton.x = BUTTON_RIGHT_X;
        that.selectArmdozerButton.y = 364;
        that.selectArmdozerButton.addEventListener(Event.TOUCH_END,
            ()=>that.ee.emit('pushSelectArmdozer'));
        that.addChild(that.selectArmdozerButton);

        //パイロット選択ボタン
        that.selectPilotButton = pictButton({
            text : 'パイロット選択',
            pict : core.assets[core.PICT_BUTTON]
        });
        that.selectPilotButton.x = BUTTON_LEFT_X;
        that.selectPilotButton.y = 364;
        that.selectPilotButton.addEventListener(Event.TOUCH_END,()=>that.ee.emit('pushSelectPilotButton'));
        that.addChild(that.selectPilotButton);

        //ログオフボタン
        that.logOffButton = pictButton({
            text : 'ログオフ',
            pict : core.assets[core.PICT_OVERHEAT_BUTTON]
        });
        that.logOffButton.x = BUTTON_LEFT_X;
        that.logOffButton.y = 428;
        that.logOffButton.addEventListener(Event.TOUCH_END, ()=>{
            invisibleButtons();
            that.mesWindow.setText(core.MESSAGE_LOGOFF);
            that.mesWindow.setVisible(true);
            that.ee.emit('logOff');
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
    }());

    /**
     * ボタンを非表示にする
     */
    function invisibleButtons() {
        that.tournamentButton.setVisible(false);
        that.battleRoomButton.setVisible(false);
        that.selectArmdozerButton.setVisible(false);
        that.selectPilotButton.setVisible(false);
        that.logOffButton.setVisible(false);
    }

    /**
     * アームドーザの画像名を取得する
     *
     * @param armdozerId アームドーザID
     * @returns {String} アームドーザの画像名
     */
    function getArmdozerPictByArmdozerId(armdozerId){
        let data = __.find(armdozerList, data=>data.armdozerId === armdozerId);
        return data.pictName;
    }

    /**
     * パイロットデータを取得
     *
     * @param pilotId パイロットID
     * @returns {Objevt} パイロットデータ
     */
    function getPilotData(pilotId){
        return __.find(pilotList, pilot=>pilot.id === pilotId);
    }
    
    return that;
}
