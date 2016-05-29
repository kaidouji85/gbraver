import touranmentBlock from './tournamentBlock';
import pilotIcon from '../button/pilotIcon';
import getOpponent from './getOpponent';
import __ from 'underscore';
import {ID_TYPE} from './const';

const BLOCK3_WIDTH = 48;
const BLOCK3_HEIGHT = 8;
const BLOCK2_WIDTH = 8;
const BLOCK2_HEIGHT = 184;
const BLOCK1_WIDTH = 56;
const BLOCK1_HEIGHT = 88;
const PILOT_ICON_SIZE = 64;
const LINE_WIDTH = 8;
const DIRECTION_RIGHT = 'DIRECTION_RIGHT';
const DIRECTION_LEFT = 'DIRECTION_LEFT';

/**
 * トーナメントブロック
 * @param spec 初期化パラメータ
 *        spec.x x座標
 *        spec.y y座標
 *        spec.data トーナメントデータ
 *        spec.master マスタデータ
 * @returns {Group} トーナメントブロック
 */
module.exports = function tournamentTable(spec) {
    let core = enchant.Core.instance;
    let opponent = getOpponent(spec.data, ID_TYPE.PLAYER);
    let that = new Group();

    (function() {
        var x = spec.x - BLOCK3_WIDTH/2;
        var y = spec.y - BLOCK3_HEIGHT/2;
        var table = [].concat([touranmentBlock({
            x: x,
            y: y,
            image: core.assets[core.PICT_TOURNAMENT_BLOCK_3],
            width: BLOCK3_WIDTH,
            height: BLOCK3_HEIGHT,
            state: spec.data.state
        })]).concat(createBlock2({
            x: x,
            y: y,
            data: spec.data.left,
            direction: DIRECTION_LEFT
        })).concat(createBlock2({
            x: x + BLOCK3_WIDTH,
            y: y,
            data: spec.data.right,
            direction: DIRECTION_RIGHT
        }));

        table.forEach(function(val){
            that.addChild(val);
        });
    })();

    /**
     * ブロック2を生成する
     * @param param パラメータ
     *        param.x x座標
     *        param.y y座標
     *        param.data トーナメントデータ
     *        param.direction トーナメントブロックの方向
     * @returns {Object[]} Node配列
     */
    function createBlock2(param) {
        var isLeft = param.direction === DIRECTION_LEFT;
        var x = isLeft ? (param.x - BLOCK2_WIDTH) : (param.x + BLOCK2_WIDTH - LINE_WIDTH);
        var y = param.y - BLOCK2_HEIGHT/2 + BLOCK3_HEIGHT/2;
        return [touranmentBlock({
            x: x,
            y: y,
            image: core.assets[core.PICT_TOURNAMENT_BLOCK_2],
            width: BLOCK2_WIDTH,
            height: BLOCK2_HEIGHT,
            scaleX: param.direction === DIRECTION_LEFT ? 1 : -1,
            state: param.data.state
        })].concat(createBlock1({
            x: x,
            y: y + LINE_WIDTH/2,
            direction: param.direction,
            data: param.data.left
        })).concat(createBlock1({
            x: x,
            y: y + BLOCK2_HEIGHT - LINE_WIDTH/2,
            direction: param.direction,
            data: param.data.right
        }));
    }

    /**
     * ブロック1を生成する
     * @param param
     *        param.x x座標
     *        param.y y座標
     *        param.data トーナメントデータ
     *        param.direction トーナメントブロックの方向
     * @returns {Object[]} Node配列
     */
    function createBlock1(param) {
        var isLeft = param.direction === DIRECTION_LEFT;
        var x = isLeft ? (param.x - BLOCK1_WIDTH) : (param.x + LINE_WIDTH);
        var y = param.y - BLOCK1_HEIGHT/2;
        return [touranmentBlock({
            x: x,
            y: y,
            image: core.assets[core.PICT_TOURNAMENT_BLOCK_1],
            width: BLOCK1_WIDTH,
            height: BLOCK1_HEIGHT,
            scaleX: param.direction === DIRECTION_LEFT ? 1 : -1,
            state: param.data.state
        })].concat([
            createPilotIcon({
                x: x,
                y: y,
                direction: param.direction,
                data: param.data.left
            }),
            createPilotIcon({
                x: x,
                y: y + BLOCK1_HEIGHT,
                direction: param.direction,
                data: param.data.right
            })
        ]);
    }

    /**
     * パイロットアイコンを生成する
     * @param param パラメータ
     *        param.x x座標
     *        param.y y座標
     *        param.direction パイロットの向いてる方向
     *        param.data キャラクターノードのデータ
     * @returns {Object} パイロットアイコン
     */
    function createPilotIcon(param) {
        let isLeft = param.direction === DIRECTION_LEFT;
        let pilotData = __.find(spec.master.pilotList,
            (item)=>item.id === param.data.pilotId);
        let isPlayer = param.data.id === ID_TYPE.PLAYER;
        let opponentId = opponent ? opponent.id : null;
        let isOpponent = param.data.id === opponentId;
        return pilotIcon({
            x: isLeft ? (param.x - PILOT_ICON_SIZE) : (param.x + BLOCK1_WIDTH),
            y: param.y - PILOT_ICON_SIZE/2,
            windowPict: core.assets[core.PICT_BLACK_WINDOW],
            pilotPict: core.assets[core.PICT_PREFIX+pilotData.pict],
            pictTopMargin: pilotData.pictTopMargin,
            pictLeftMargin: pilotData.pictLeftMargin,
            width: 4,
            height: 4,
            scaleX: isLeft ? -1 : 1,
            opacity: (isPlayer || isOpponent) ? 1.0 : 0.4
        });
    }

    return that;
}