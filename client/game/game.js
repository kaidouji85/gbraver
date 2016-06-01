import __ from 'underscore';
import EventEmitter from 'event-emitter';
import gameBase from './gameBase';
import battleScene from '../scene/battleScene';
import roomSelectScene from '../scene/roomSelectScene';
import topScene from '../scene/topScene';
import selectPilotScene from '../scene/selectPilotScene';
import selectArmdozerScene from '../scene/selectArmdozerScene';
import tournamentScene from '../scene/tournamentScene';
import updateTableState from '../tournament/updateTableState';
import isFinishTournament from '../tournament/isFinishTournament';
import createTournamentTableData from '../tournament/createTournamentTableData';

/**
 * ゲームクラス
 *
 * @param spec パラメータ
 *         spec.userId ユーザID
 *         spec.armdozerId ユーザが選択しているアームドーザID
 *         spec.pilotId ユーザが選択しているパイロットID
 *         spec.armdozerList アームドーザマスタ
 *         spec.pilotList パイロットマスタ
 *         spec.tournamentList トーナメントデータ
 */
module.exports = function(spec) {
    /**
     * ゲームコア
     */
    let contentBaseUrl = spec&&spec.contentBaseUrl || location.origin;
    let that = gameBase({
        contentBaseUrl : contentBaseUrl
    });

    /**
     * ゲームの状態をまとめた変数。
     * 変則として変数値が変わるのは、これだけである。
     *
     * @type {Object}
     */
    let state = {
        armdozerId: spec.armdozerId,
        pilotId: spec.pilotId,
        battleMode: that.BATTLE_MODE_TWO_PLAY,
        tournamentState: {}
    }

    /**
     * 本クラスは外部とのイベントのやりとりを、このイベントエミッターを通して行う
     */
    that.ee = new EventEmitter();

    /**
     * 状態を更新する
     *
     * @param newState 新しいState
     */
    that.setState = (newState) => __.extend(state, newState);

    /**
     * 状態を取得する
     *
     * @returns 状態
     */
    that.getState = ()=>state;

    /**
     * シーン変更のヘルパー関数
     * @param scene 変更するシーン
     */
    function replaceScene(scene) {
        that.replaceScene(scene);
        that.ee.emit('changeScene', scene.getName());
    }

    /**
     * アームドーザIDを取得する
     * @returns {string} アームドーザID
     */
    that.getArmdozerId = function() {
        return state.armdozerId;
    }

    /**
     * パイロットIDを取得する
     * @returns {string} パイロットID
     */
    that.getPilotId = function(){
        return state.pilotId;
    }

    /**
     * 戦闘モードを取得する
     * @returns {string} 戦闘モード
     */
    that.getBattleMode = function(){
        return state.battleMode;
    }

    /**
     * 戦闘モードを設定する
     * @param battleMode 戦闘モード
     */
    that.setBattleMode = function(battleMode){
        that.setState({battleMode});
    }

    /**
     * 戦闘シーンに変更する
     *
     * @param param battleSceneに渡すspec
     */
    that.changeBattleScene = function(param){
        param.userId = spec.userId;
        var scene = battleScene(param);
        scene.onCommand(function(command){
            that.ee.emit('sendMessage', 'command',command);
        });
        scene.onPushBattleEndIcon(changeSceneFromBattle);
        replaceScene(scene);
    };

    /**
     * 戦闘シーンから次のシーンへ遷移する
     * 
     * @param isWin 戦闘に勝利したか否かのフラグ
     */
    function changeSceneFromBattle(isWin) {
        let map = {
            [that.BATTLE_MODE_TWO_PLAY]: ()=>that.ee.emit('sendMessage', 'getRoomInfo',null),
            [that.BATTLE_MODE_TOURNAMENT]: () => {
                let tournamentState = isWin ? updateTableState(state.tournamentState)
                    : state.tournamentState;
                that.setState({ tournamentState });
                isFinishTournament(tournamentState) ?
                    that.changeTopScene() : that.changeTournamentScene();
            }
        }

        map[state.battleMode] &&  map[state.battleMode]();
    }

    /**
     * ルームセレクトシーンに変更する
     *
     * @param roomInfo ルーム情報
     */
    that.changeRoomSelectScene = function(roomInfo){
        that.setState({battleMode: that.BATTLE_MODE_TWO_PLAY});

        var scene = roomSelectScene({
            roomInfo : roomInfo
        });
        scene.onEnterRoom(function(data){
            that.ee.emit('sendMessage', 'enterRoom',data);
        });
        scene.onPushPrevButton(function(data){
            that.changeTopScene();
        });
        scene.onLeaveRoom(function(){
            that.ee.emit('sendMessage', 'leaveRoom',null);
        });
        scene.onPushRefreshButton(function(){
            that.ee.emit('sendMessage', 'getRoomInfo',null);
        });
        replaceScene(scene);
    };

    /**
     * トップシーンに変更する
     *
     */
    that.changeTopScene = function(){
        var scene = topScene({
            armdozerId : state.armdozerId,
            pilotId : state.pilotId,
            armdozerList : spec.armdozerList,
            pilotList : spec.pilotList
        });
        scene.ee.on('pushTournamentButton', ()=>{
            // TODO 後でトーナメントデータを持ってくる方法を考える
            let playerData = __.pick(state, 'pilotId', 'armdozerId');
            let tournamentState = createTournamentTableData(spec.tournamentData, playerData);
            that.setState({tournamentState});
            that.changeTournamentScene();
        });
        scene.ee.on('pushSelectArmdozer',()=>that.changeSelectArmdozerScene());
        scene.ee.on('pushBattleRoomButton',()=>that.ee.emit('sendMessage', 'getRoomInfo',null));
        scene.ee.on('pushSelectPilotButton', ()=>that.changeSelectPilotScene());
        scene.ee.on('logOff', ()=>that.ee.emit('logOff'));
        replaceScene(scene);
    };

    /**
     * トーナメントシーンに遷移する
     */
    that.changeTournamentScene = function() {
        that.setState({battleMode: that.BATTLE_MODE_TOURNAMENT});

        let scene = tournamentScene({
            data: state.tournamentState,
            master: {
                armdozerList: spec.armdozerList,
                pilotList: spec.pilotList
            }
        });
        scene.ee.on('startBattle',(opponent)=>
            that.ee.emit('sendMessage', 'startSinglePlay',__.pick(opponent, 'enemyId','pilotId','routineId')));
        replaceScene(scene);
    }

    /**
     * パイロット選択シーンに変更する
     */
    that.changeSelectPilotScene = function() {
        var scene = selectPilotScene({
            pilotList : spec.pilotList,
            selectPilotId : state.pilotId
        });
        scene.onPushPrevButton(function(){
            that.changeTopScene();
        });
        scene.onPushOkButton(function(pilotId){
            var data = { pilotId };
            that.ee.emit('sendMessage', 'setPilot',data);
            that.setState({pilotId});
        });
        replaceScene(scene);
    }

    /**
     * アームドーザ選択シーンに変更する
     *
     */
    that.changeSelectArmdozerScene = function(){
        var scene = selectArmdozerScene({
            armdozerList : spec.armdozerList,
            selectArmdozerId : state.armdozerId
        });
        scene.onPushOkButton(function(armdozerId){
            var sendData = { armdozerId };
            that.ee.emit('sendMessage', 'setArmdozer',sendData);
            that.setState({ armdozerId });
        });
        scene.onPushPrevButton(function(){
            that.changeTopScene();
        });replaceScene(scene);
    }

    /**
     * サーバからgameStartが返された際のイベントハンドラ
     * @param data サーバレスポンス
     */
    function onGameStart(data) {
        that.changeBattleScene({
            timeOver : that.COMMAND_TIME_OVER,
            statusArray : __.mapObject(data,function(val, key){
                return val.status;
            })
        });
        that.ee.emit('sendMessage', 'command',{
            method : 'ready'
        });
    }

    /**
     * サーバからrespが返された際のイベントハンドラ
     * @param data サーバからのデータ
     */
    function onResp(data){
        __.chain({
            wait: 'doWaitPhase',
            atackCommand: 'doAtackCommandPhase',
            charge: 'doChargePhase',
            defenthCommand: 'doDefenthCommandPhase',
            damage: 'doDamagePhase',
            gameEnd: 'doGameEnd',
            pilotSkill: 'doPilotSkill',
            armdozerAbility: 'doArmdozerAbility'
        }).filter(function(val, key){
            return key === data.phase;
        }).each(function(val, key) {
            that.currentScene[val](data);
        });
    }

    /**
     * サーバからdissolveRoomが返された際のイベントハンドラ
     * @param data サーバからのデータ
     */
    function onDissolveRoom(data) {
        if(that.currentScene.getName()==='battle'){
            that.currentScene.doDissolveRoom();
        }
    }

    /**
     * サーバからsuccesEnterRoomが返された際のイベントハンドラ
     * @param data サーバからのデータ
     */
    function onSuccesEnterRoom(data) {
        if(that.currentScene.getName()==='selectRoom'){
            that.currentScene.emitSuccesEnterRoom();
        }
    }

    /**
     * サーバからsuccessLeaveRoomが返された際のイベントハンドラ
     * @param data サーバからのデータ
     */
    function onSuccessLeaveRoom() {
        that.ee.emit('sendMessage', 'getRoomInfo',null);
    }

    /**
     * サーバからenterRoomErrorが返された際のイベントハンドラ
     * @param data サーバからのデータ
     */
    function onEnterRoomError(data) {
        if(that.currentScene.getName()==='selectRoom') {
            that.currentScene.emitEnterRoomError(data);
        }
    }

    /**
     * サーバからbattleErrorが返された際のイベントハンドラ
     * @param data サーバからのデータ
     */
    function onBattleError(data) {
        if(that.currentScene.getName()==='battle'){
            that.changeTopScene();
        } else if(that.currentScene.getName()==='selectRoom') {
            that.currentScene.emitEnterRoomError('そのコネクションは既に入室しています。');
        }
    }

    /**
     * サーバからメッセージが来た際のイベントハンドラ
     * @param message メッセージ
     * @param data データ
     */
    that.ee.on('serverResp', function(message, data){
        __.chain({
            successSetArmdozer: that.changeTopScene,
            gameStart: onGameStart,
            resp: onResp,
            dissolveRoom: onDissolveRoom,
            succesEnterRoom: onSuccesEnterRoom,
            successLeaveRoom: onSuccessLeaveRoom,
            successGetRoomInfo: that.changeRoomSelectScene,
            enterRoomError: onEnterRoomError,
            successSetPilot: that.changeTopScene,
            battleError: onBattleError
        }).filter(function(val, key){
            return message === key;
        }).each(function(val, key){
            val(data);
        });
    });

    return that;
}
