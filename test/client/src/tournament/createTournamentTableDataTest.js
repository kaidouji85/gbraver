import {assert} from 'chai';
import __ from 'underscore';
import {TOURNAMENT_STATE} from '../../../../client/tournament/const';
import createTournamentTableData from '../../../../client/tournament/createTournamentTableData';

describe('トーナメント表のデータを生成する', ()=>{
    it('トーナメントデータを生成できる', ()=>{
        // トーナメントのデータ
        let enemies = [
            {pilotId: 'teki01'},
            {pilotId: 'teki02'},
            {pilotId: 'teki03'},
            {pilotId: 'teki04'},
            {pilotId: 'teki05'},
            {pilotId: 'teki06'},
            // 配列の最後の要素がボスになる
            {pilotId: 'bossDaze'}
        ];

        // プレイヤーのデータ
        let playerData = {
            pilotId: 'kyoko'
        };

        // トーナメント表を生成する
        let result = createTournamentTableData(enemies, playerData);

        // 期待するデータ
        let expect = {
            left: {
                left: {
                    left: {
                        id: 'player',
                        pilotId: 'kyoko'
                    },
                    right: {
                        id: 'enemy1',
                        pilotId: 'teki01'
                    },
                    state: TOURNAMENT_STATE.NO_RESULT
                },
                right: {
                    left: {
                        id: 'enemy2',
                        pilotId: 'teki02'
                    },
                    right: {
                        id: 'enemy3',
                        pilotId: 'teki03'
                    },
                    state: TOURNAMENT_STATE.NO_RESULT
                },
                state: TOURNAMENT_STATE.NO_RESULT
            },
            right: {
                left: {
                    left: {
                        id: 'enemy4',
                        pilotId: 'teki04'
                    },
                    right: {
                        id: 'enemy5',
                        pilotId: 'teki05'
                    },
                    state: TOURNAMENT_STATE.NO_RESULT
                },
                right: {
                    left: {
                        id: 'enemy6',
                        pilotId: 'teki06'
                    },
                    right: {
                        id: 'boss',
                        pilotId: 'bossDaze'
                    },
                    state: TOURNAMENT_STATE.NO_RESULT
                },
                state: TOURNAMENT_STATE.NO_RESULT
            },
            state: TOURNAMENT_STATE.NO_RESULT
        };

        assert.deepEqual(result, expect, 'トーナメント表を正しく作る');

    });
});