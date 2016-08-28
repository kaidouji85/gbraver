import __ from 'underscore';
import pictButton from '../button/pictButton';
import messageWindow from '../window/messageWindow';
import EventEmitter from 'event-emitter';
import {createRect} from '../util/surfUtil';

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

  /**
   * シーン名を取得する
   * @returns {string} シーン名
   */
  that.getName = function(){
    return 'top';
  }

  that.addEventListener(Event.ENTER,function(){
    core.bgm.setMute();
  });

  /**
   * ボタンを非表示にする
   */
  function invisibleButtons() {
    that.battleRoomButton.setVisible(false);
    that.tournamentButton.setVisible(false);
    that.selectArmdozerButton.setVisible(false);
    that.selectPilotButton.setVisible(false);
    that.logoutButton.visible = false;
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

  /**
   * オブジェクトを生成してシーンに追加する
   */
  (function(){
    //選択中アームドーザ
    let pictName = `${core.PICT_PREFIX}wakeUp${getArmdozerPictByArmdozerId(armdozerId)}`;
    console.log(pictName);
    that.selectArmdozerSprite = new Sprite(320,432);
    that.selectArmdozerSprite.image = core.assets[pictName];
    that.selectArmdozerSprite.x = 0;
    that.selectArmdozerSprite.y = 48;
    that.addChild(that.selectArmdozerSprite);

    //選択中パイロット
    let pilotData = getPilotData(pilotId);
    that.pilotSprite = new Sprite(256, 256);
    that.pilotSprite.image = core.assets[core.PICT_PREFIX + pilotData.pict];
    that.pilotSprite.x = 128;
    that.pilotSprite.y = 168;
    that.addChild(that.pilotSprite);

    //コマンドウインドウ
    that.commandWindow =  new Sprite(320,144);
    //that.commandWindow.image = core.assets[core.PICT_COMMAND_WINDOW];
    that.commandWindow.image = createRect(320, 144, 'rgba(32, 32, 32, 1)');
    that.commandWindow.x = 0;
    that.commandWindow.y = 364;
    that.addChild(that.commandWindow);

    //対戦ルーム入室ボタン
    that.battleRoomButton = pictButton({
      text : '対戦モード',
      pict : core.assets[core.PICT_BUTTON]
    });
    that.battleRoomButton.x = BUTTON_RIGHT_X;
    that.battleRoomButton.y = 372;
    that.battleRoomButton.addEventListener(Event.TOUCH_END,(e)=>{
      invisibleButtons();
      that.mesWindow.setText(core.MESSAGE_GET_ROOMINFO);
      that.mesWindow.setVisible(true);
      that.ee.emit('pushBattleRoomButton');
    });
    that.addChild(that.battleRoomButton);

    //トーナメントモード
    that.tournamentButton = pictButton({
      text : 'トーナメント',
      pict : core.assets[core.PICT_BUTTON]
    });
    that.tournamentButton.x = BUTTON_LEFT_X;
    that.tournamentButton.y = 372;
    that.tournamentButton.addEventListener(Event.TOUCH_END,
      ()=> that.ee.emit('pushTournamentButton'));
    that.addChild(that.tournamentButton);

    //アームドーザ選択ボタン
    that.selectArmdozerButton = pictButton({
      text : 'アームドーザ選択',
      pict : core.assets[core.PICT_BUTTON]
    });
    that.selectArmdozerButton.x = BUTTON_RIGHT_X;
    that.selectArmdozerButton.y = 428;
    that.selectArmdozerButton.addEventListener(Event.TOUCH_END,
      ()=>that.ee.emit('pushSelectArmdozer'));
    that.addChild(that.selectArmdozerButton);

    //パイロット選択ボタン
    that.selectPilotButton = pictButton({
      text : 'パイロット選択',
      pict : core.assets[core.PICT_BUTTON]
    });
    that.selectPilotButton.x = BUTTON_LEFT_X;
    that.selectPilotButton.y = 428;
    that.selectPilotButton.addEventListener(Event.TOUCH_END,()=>that.ee.emit('pushSelectPilotButton'));
    that.addChild(that.selectPilotButton);

    // ログアウトボタン
    that.logoutButton = new Sprite(64, 64);
    that.logoutButton.image = core.assets[core.PICT_LOGOUT_BUTTON];
    that.logoutButton.x = 256;
    that.addEventListener(Event.TOUCH_END, ()=>{
      invisibleButtons();
      that.mesWindow.setText(core.MESSAGE_LOGOFF);
      that.mesWindow.setVisible(true);
      that.ee.emit('logOff');
    });
    that.addChild(that.logoutButton);

    //メッセージウインドウ
    that.mesWindow = messageWindow({
      pict : core.assets[core.PICT_WINDOW]
    });
    that.mesWindow.x = 0;
    that.mesWindow.y = core.MESSAGE_WINDOW_Y;
    that.mesWindow.setVisible(false);
    that.addChild(that.mesWindow);
  })();

  return that;
}
