import {assert} from 'chai';
import __ from 'underscore';
import updateTableState from '../../../../client/tournament/updateTableState';
import {TOURNAMENT_STATE} from '../../../../client/tournament/const';

describe('トーナメント表の更新', ()=>{
    it('1回戦目の状態を更新できる', ()=>{
        let data = {
            left: {
                left: {
                    left: { id:'player' },
                    right: { id:'enemy001'},
                    state: TOURNAMENT_STATE.NO_RESULT
                },
                right: {
                    left: { id:'enemy002'},
                    right: { id:'enemy003'},
                    state: TOURNAMENT_STATE.NO_RESULT
                },
                state: TOURNAMENT_STATE.NO_RESULT
            },
            right: {
                left: {
                    left: { id:'enemy004' },
                    right: { id:'enemy005' },
                    state: TOURNAMENT_STATE.NO_RESULT
                },
                right: {
                    left: { id:'enemy006' },
                    right: { id:'boss' },
                    state: TOURNAMENT_STATE.NO_RESULT
                },
                state: TOURNAMENT_STATE.NO_RESULT
            },
            state: TOURNAMENT_STATE.NO_RESULT
        };

        let result = updateTableState(data, true);

        // 第3ブロック
        assert.equal(result.state, TOURNAMENT_STATE.NO_RESULT, '第3ブロックは更新されない');

        // 第2ブロック
        assert.equal(result.left.state, TOURNAMENT_STATE.NO_RESULT, '第2ブロックは更新されない');
        assert.equal(result.right.state, TOURNAMENT_STATE.NO_RESULT, '第2ブロックは更新されない');

        // 第1ブロック
        assert.equal(result.left.left.state, TOURNAMENT_STATE.LEFT_WIN, 'プレイヤーが絶対に勝つ');
        assert.isTrue(__.contains([TOURNAMENT_STATE.LEFT_WIN, TOURNAMENT_STATE.RIGHT_WIN],
            result.left.right.state), 'ボス以外の敵はいずれかランダムで勝つ');
        assert.isTrue(__.contains([TOURNAMENT_STATE.LEFT_WIN, TOURNAMENT_STATE.RIGHT_WIN],
            result.right.left.state), 'ボス以外の敵はいずれかランダムで勝つ');
        assert.equal(result.right.right.state, TOURNAMENT_STATE.RIGHT_WIN, 'ボスが絶対に勝つ');
    });
});