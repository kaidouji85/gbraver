import CONST from '../../../../client/tournament/const';

/**
 * ダミーのトーナメントデータ
 * マスタにトーナメントを追加したら、このモジュールは削除する
 */
const DUMMY_TOURNAMNT = [{
        tournamentId: 'basic',

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
                    enemyId: 'landozer',
                    pilotId: 'iori',
                    routineId: 'zero'
                },
                right: {
                    id: 'enemy3',
                    enemyId: 'landozer',
                    pilotId: 'akira',
                    routineId: 'zero'
                },
                state: CONST.TOURNAMENT_STATE.NO_RESULT
            },
            state: CONST.TOURNAMENT_STATE.NO_RESULT
        },
        right: {
            left: {
                left: {
                    id: 'enemy4',
                    enemyId: 'landozer',
                    pilotId: 'akira',
                    routineId: 'zero'
                },
                right: {
                    pilotId: 'iori'
                },
                state: CONST.TOURNAMENT_STATE.NO_RESULT
            },
            right: {
                left: {
                    id: 'enemy5',
                    enemyId: 'landozer',
                    pilotId: 'akane',
                    routineId: 'zero'
                },
                right: {
                    id: 'boss',
                    enemyId: 'landozer',
                    pilotId: 'kyoko',
                    routineId: 'zero'
                },
                state: CONST.TOURNAMENT_STATE.NO_RESULT
            },
            state: CONST.TOURNAMENT_STATE.NO_RESULT
        },
        state: CONST.TOURNAMENT_STATE.NO_RESULT
}];

export default DUMMY_TOURNAMNT;