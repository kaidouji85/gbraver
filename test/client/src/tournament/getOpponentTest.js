import {assert} from 'chai';
import getOpopenet from '../../../../client/tournament/getOpponent';
import * as CONST from '../../../../client/tournament/const';

/**
 * 対戦相手取得処理のテスト
 *
 */
describe('対戦相手の取得', function(){
    describe('1回戦目の対戦相手が取得できる', ()=> {
        let data = {
            left: {
                left: {
                    left: { id:'player' },
                    right: { id:'enemy001'},
                    state: CONST.TOURNAMENT_STATE.NO_RESULT
                },
                right: {
                    left: { id:'enemy002'},
                    right: { id:'enemy003'},
                    state: CONST.TOURNAMENT_STATE.NO_RESULT
                },
                state: CONST.TOURNAMENT_STATE.NO_RESULT
            },
            right: {
                left: {
                    left: { id:'enemy004' },
                    right: { id:'enemy005' },
                    state: CONST.TOURNAMENT_STATE.NO_RESULT
                },
                right: {
                    left: { id:'enemy006' },
                    right: { id:'boss' },
                    state: CONST.TOURNAMENT_STATE.NO_RESULT
                },
                state: CONST.TOURNAMENT_STATE.NO_RESULT
            },
            state: CONST.TOURNAMENT_STATE.NO_RESULT
        };

        let patterns = [
            {id: 'player', expected: data.left.left.right},
            {id: 'enemy001', expected: data.left.left.left},
            {id: 'enemy002', expected: data.left.right.right},
            {id: 'enemy003', expected: data.left.right.left},
            {id: 'enemy004', expected: data.right.left.right},
            {id: 'enemy005', expected: data.right.left.left},
            {id: 'enemy006', expected: data.right.right.right},
            {id: 'boss', expected: data.right.right.left},
        ];

        patterns.forEach(item => it(item.id+'の対戦相手のデータがただしく取得できている', ()=>{
            let result = getOpopenet(data, item.id);
            assert.deepEqual(result, item.expected);
        }));
    });

    describe('2回戦目の対戦相手が取得できる', ()=> {
        let data = {
            left: {
                left: {
                    left: { id:'player' },
                    right: { id:'enemy001'},
                    state: CONST.TOURNAMENT_STATE.LEFT_WIN
                },
                right: {
                    left: { id:'enemy002'},
                    right: { id:'enemy003'},
                    state: CONST.TOURNAMENT_STATE.RIGHT_WIN
                },
                state: CONST.TOURNAMENT_STATE.NO_RESULT
            },
            right: {
                left: {
                    left: { id:'enemy004' },
                    right: { id:'enemy005' },
                    state: CONST.TOURNAMENT_STATE.RIGHT_WIN
                },
                right: {
                    left: { id:'enemy006' },
                    right: { id:'boss' },
                    state: CONST.TOURNAMENT_STATE.RIGHT_WIN
                },
                state: CONST.TOURNAMENT_STATE.NO_RESULT
            },
            state: CONST.TOURNAMENT_STATE.NO_RESULT
        };

        let patterns = [
            // 勝利したパイロットで検索すると対戦相手を返す
            {id: 'player', expected: data.left.right.right},
            {id: 'enemy003', expected: data.left.left.left},
            {id: 'enemy005', expected: data.right.right.right},
            {id: 'boss', expected: data.right.left.right},

            // 負けたパイロットで検索した場合はnullを返す
            {id: 'enemy001', expected: null},
            {id: 'enemy002', expected: null},
            {id: 'enemy004', expected: null},
            {id: 'enemy006', expected: null},
        ];

        patterns.forEach(item => it(item.id+'の対戦相手のデータがただしく取得できている', ()=>{
            let result = getOpopenet(data, item.id);
            assert.deepEqual(result, item.expected);
        }));
    });

    describe('3回戦目の対戦相手が取得できる', ()=> {
        let data = {
            left: {
                left: {
                    left: { id:'player' },
                    right: { id:'enemy001'},
                    state: CONST.TOURNAMENT_STATE.LEFT_WIN
                },
                right: {
                    left: { id:'enemy002'},
                    right: { id:'enemy003'},
                    state: CONST.TOURNAMENT_STATE.RIGHT_WIN
                },
                state: CONST.TOURNAMENT_STATE.LEFT_WIN
            },
            right: {
                left: {
                    left: { id:'enemy004' },
                    right: { id:'enemy005' },
                    state: CONST.TOURNAMENT_STATE.RIGHT_WIN
                },
                right: {
                    left: { id:'enemy006' },
                    right: { id:'boss' },
                    state: CONST.TOURNAMENT_STATE.RIGHT_WIN
                },
                state: CONST.TOURNAMENT_STATE.RIGHT_WIN
            },
            state: CONST.TOURNAMENT_STATE.NO_RESULT
        };

        let patterns = [
            // 勝利したパイロットで検索すると対戦相手を返す
            {id: 'player', expected: data.right.right.right},
            {id: 'boss', expected: data.left.left.left},

            // 負けたパイロットで検索した場合はnullを返す
            {id: 'enemy001', expected: null},
            {id: 'enemy002', expected: null},
            {id: 'enemy003', expected: null},
            {id: 'enemy004', expected: null},
            {id: 'enemy005', expected: null},
            {id: 'enemy006', expected: null},
        ];

        patterns.forEach(item => it(item.id+'の対戦相手のデータがただしく取得できている', ()=>{
            let result = getOpopenet(data, item.id);
            assert.deepEqual(result, item.expected);
        }));
    });
});