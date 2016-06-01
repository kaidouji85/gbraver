import {TOURNAMENT_STATE} from './const';

/**
 * トーナメントが終了したか否かを判定する
 * 
 * @param table トーナメントのデータ
 * @returns {boolean} 判定結果
 */
export default function isFinishTournament(table) {
    return table.state !== TOURNAMENT_STATE.NO_RESULT;
}