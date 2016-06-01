import __ from 'underscore';
import {assert} from 'chai';
import compressionBlock from '../../../../client/tournament/compressionBlock';
import {TOURNAMENT_STATE} from '../../../../client/tournament/const';


/**
 * トーナメントブロック圧縮テスト
 *
 */
describe('トーナメントブロックを圧縮する', function(){
    it('勝敗のついたブロックは圧縮する',()=>{
        let patterns = [
            {state: TOURNAMENT_STATE.LEFT_WIN, expect:{id: 'player'}},
            {state: TOURNAMENT_STATE.RIGHT_WIN, expect:{id: 'enemy'}}
        ];

        __.each(patterns, item => {
            let data = {
                left: {id: 'player'},
                right: {id: 'enemy'},
                state: item.state
            }

            let result = compressionBlock(data);
            assert.deepEqual(result, item.expect, 'ブロックを圧縮できる');
        });
    });

    it('勝敗のついていないブロックは圧縮されない', ()=>{
        let data = {
            left: {id: 'player'},
            right: {id: 'enemy'},
            state: TOURNAMENT_STATE.NO_RESULT
        }
        let expect = __.clone(data);

        let result = compressionBlock(data);
        assert.deepEqual(result, expect, 'ブロックが圧縮されない');
    });

    it('再帰的にブロックが圧縮される', ()=>{
        let data = {
            left:{
                left:{id: 'player'},
                right:{id: 'enemy01'},
                state: TOURNAMENT_STATE.LEFT_WIN
            },
            right:{
                left:{id: 'enemy02'},
                right:{id: 'enemy03'},
                state: TOURNAMENT_STATE.RIGHT_WIN
            },
            state: TOURNAMENT_STATE.NO_RESULT
        };

        let expect = {
            left: {id: 'player'},
            right: {id: 'enemy03'},
            state: TOURNAMENT_STATE.NO_RESULT
        };

        let result = compressionBlock(data);
        assert.deepEqual(result, expect, '再帰的にブロックが圧縮される');
    });

    it('3段トーナメントでも再帰的に圧縮される', ()=>{
        let data = {
            left: {
                left:{
                    left:{id: 'player'},
                    right:{id: 'enemy01'},
                    state: TOURNAMENT_STATE.LEFT_WIN
                },
                right:{
                    left:{id: 'enemy02'},
                    right:{id: 'enemy03'},
                    state: TOURNAMENT_STATE.RIGHT_WIN
                },
                state: TOURNAMENT_STATE.LEFT_WIN
            },
            right: {
                left:{
                    left:{id: 'enemy04'},
                    right:{id: 'enemy05'},
                    state: TOURNAMENT_STATE.LEFT_WIN
                },
                right:{
                    left:{id: 'enemy06'},
                    right:{id: 'boss'},
                    state: TOURNAMENT_STATE.RIGHT_WIN
                },
                state: TOURNAMENT_STATE.RIGHT_WIN
            },
            state: TOURNAMENT_STATE.NO_RESULT
        };

        let expect = {
            left: {id: 'player'},
            right: {id: 'boss'},
            state: TOURNAMENT_STATE.NO_RESULT
        };

        let result = compressionBlock(data);
        assert.deepEqual(result, expect, '再帰的にブロックが圧縮される');
    });
});