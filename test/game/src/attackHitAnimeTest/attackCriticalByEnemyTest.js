import testData from '../testlib/testData';
import gameBase from '../../../../client/game/gameBase';
import battleSceneBase from '../../../../client/scene/battleSceneBase';
import attackAnime from '../../../../client/animation/attackAnime';
import Promise from 'bluebird';
import testUtil from '../testlib/testUtil';

let assert = chai.assert;
let testDataInst = testData();
let statusArray = {
  'test002@gmail.com' : testDataInst.getPlayerData('test002@gmail.com').status,
  'test001@gmail.com' : testDataInst.getPlayerData('test001@gmail.com').status
};
let testGame;
let testScene;
let AttackAnime;

/**
 * アニメの初期化のヘルパー関数
 *
 */
function initAnime(){
  testScene = battleSceneBase({
    userId : 'test002@gmail.com',
    statusArray : statusArray
  });
  testScene.refreshMertor({
    'test001@gmail.com' : {
      hp : 3200,
      battery : 5,
      active : 5000
    },
    'test002@gmail.com' : {
      hp : 4700,
      battery : 5,
      active : 3000
    }
  });
  testGame.pushScene(testScene);
}

/**
 * アニメ再生のヘルパー関数
 *
 * @return {Promise} 再生結果を返すPromise
 */
function playAnime(){
  var attackAnimeParam = {
    attackUserId : 'test001@gmail.com',
    hit : 4,
    damage : 3600,
    atackBattery : 3,
    defenthBattery : 0,
    statusArray : {
      'test001@gmail.com' : {
        hp : 3200,
        battery : 2,
        active : 0,
        skillPoint : 1
      },
      'test002@gmail.com' : {
        hp : 1100,
        battery : 5,
        active : 3000,
        skillPoint : 1
      }
    }
  }
  AttackAnime = attackAnime({
    battleScene : testScene
  });
  return new Promise(resolve => AttackAnime.play(attackAnimeParam, resolve));
}

enchant();

/**
 * テストのメイン関数
 */
window.onload = () => {
  testGame = gameBase();
  testGame.start();
  testGame.onload = () => {
    initAnime();
    playAnime()
      .then(()=>{
        let playerHp = testScene.merter.hpNumberArray['test002@gmail.com'].getValue();
        let playerBattery = testScene.merter.batteryMerterArray['test002@gmail.com'].getValue();
        let playerFrame = testScene.charaSpriteArray['test002@gmail.com'].frame;
        let enemyActive = testScene.merter.activeBarArray['test001@gmail.com'].getValue();
        let enemyBattery = testScene.merter.batteryMerterArray['test001@gmail.com'].getValue();
        let enemyFrame = testScene.charaSpriteArray['test001@gmail.com'].frame;

        assert.equal(playerHp,1100,'プレイヤーのHPが減っている');
        assert.equal(playerBattery,5,"プレイヤーのバッテリーが正しい");
        assert.equal(playerFrame,testGame.FRAME_STAND,"プレイヤーのモーションが「立ち」である");
        assert.equal(enemyActive,0,"敵のアクティブゲージが0である");
        assert.equal(enemyBattery,2,"敵のバッテリーが正しい");
        assert.equal(enemyFrame,testGame.FRAME_STAND,"敵のモーションが「立ち」である");

        testUtil.finishTest();
      });
  }


}