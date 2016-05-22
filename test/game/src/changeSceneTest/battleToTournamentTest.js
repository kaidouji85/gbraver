/**
 * 戦闘画面 -> トーナメント画面へ遷移するテスト
 *
 * バトルモードがトーナメントの場合、トーナメントが完了していない場合に
 * トーナメント画面に遷移する
 *
 */
import testData from '../testlib/testData';
import testUtil from '../testlib/testUtil';
import game from '../../../../client/game/game';
import CONST from '../../../../client/tournament/const';

enchant();
window.onload = initGame;

let assert = chai.assert;
let testDataInst = testData();
let Game = null;

let statusArray = {
    'test002@gmail.com' : testDataInst.getPlayerData('test002@gmail.com').status,
    'saikyou@gmail.com' : testDataInst.getPlayerData('saikyou@gmail.com').status
};
let tournamentData = {
    left: {
        left: {
            left: {
                id: 'player',
                pilotId: 'kyoko'
            },
            right: {
                id: 'enemy1',
                enemyId: 'landozer',
                pilotId: 'akane',
                routineId: 'zero'
            },
            state: CONST.TOURNAMENT_STATE.NO_RESULT
        },
        right: {
            left: {
                id: 'enemy2',
                pilotId: 'iori'
            },
            right: {
                id: 'enemy3',
                pilotId: 'akira'
            },
            state: CONST.TOURNAMENT_STATE.NO_RESULT
        },
        state: CONST.TOURNAMENT_STATE.NO_RESULT
    },
    right: {
        left: {
            left: {
                id: 'enemy4',
                pilotId: 'akira'
            },
            right: {
                pilotId: 'iori'
            },
            state: CONST.TOURNAMENT_STATE.NO_RESULT
        },
        right: {
            left: {
                id: 'enemy5',
                pilotId: 'akane'
            },
            right: {
                id: 'boss',
                pilotId: 'kyoko'
            },
            state: CONST.TOURNAMENT_STATE.NO_RESULT
        },
        state: CONST.TOURNAMENT_STATE.NO_RESULT
    },
    state: CONST.TOURNAMENT_STATE.NO_RESULT
};

function initGame(){
    Game = game({
        userId : 'saikyou@gmail.com',
        armdozerId : 'landozer',
        pilotId : 'kyoko',
        armdozerList : testDataInst.getMasterData().armdozerList,
        pilotList : testDataInst.getMasterData().pilotList
    });
    Game.start();
    Game.onload = onLoad;
}

function onLoad(){
    Game.setState({
        battleMode: Game.BATTLE_MODE_TOURNAMENT,
        tournamentState: tournamentData
    });
    Game.changeBattleScene({
        statusArray : statusArray
    });
    gameEnd();
}

function gameEnd(){
    let gameEndData = {
        phase : 'gameEnd',
        winner : 'saikyou@gmail.com',
        statusArray : {
            'saikyou@gmail.com' : {
                hp : 3200,
                battery : 2,
                active : 0,
                skillPoint : 1,
                overHeatFlag : false
            },
            'test002@gmail.com' : {
                hp : -300,
                battery : 3,
                active : 3000,
                skillPoint : 1,
                overHeatFlag : false
            }
        }
    };
    Game.ee.emit('serverResp', 'resp',gameEndData);
    Game.ee.once('sendMessage', assertOfGameEnd);
}

function assertOfGameEnd(message,data){
    let expectData = {
        method : 'ok'
    };
    assert.equal(message,'command','ゲーム終了時のサーバ送信メッセージが正しい');
    assert.deepEqual(data,expectData,'ゲーム終了時のサーバ送信データが正しい');
    Game.currentScene.tl.delay(30).then(doDissolveRoom);
}

function doDissolveRoom(){
    Game.ee.emit('serverResp', 'dissolveRoom',null);
    assert.equal(Game.currentScene.battleEndIcon.getVisible(),true,'戦闘終了ボタンが表示されている');
    Game.currentScene.tl.delay(30).then(pushBattleEndIcon);
}

function pushBattleEndIcon(){
    Game.ee.once('changeScene', assertOfChangeScne);
    testUtil.touch(Game.currentScene.battleEndIcon);
}

function assertOfChangeScne(sceneName) {
    assert.equal(sceneName, 'tournament', 'トーナメントシーンに遷移する');
    testUtil.finishTest();
}