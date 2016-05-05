import tournamentTable from '../tournament/tournamentTable';
import getOpponent from '../tournament/getOpponent';
import __ from 'underscore';
import EventEmitter from 'event-emitter';

/**
 * プレイヤーキャラのトーナメント表でのID
 * 以下のIDを持つキャラクターを、トーナメントではプレイヤーとみなす
 */
const PLAYER_ID = 'player';

/**
 * トーナメントシーン
 *
 * @param spec パラメータ
 *        spec.data トーナメントのデータ
 *        spec.master Gブレイバーのマスタデータ
 * @returns {Object} トーナメントシーン
 */
export default function tournamentScene(spec) {
    let that = new Scene();

    /**
     * シーンの初期化
     */
    (function(){
        that.backgroundColor = 'black';
        that.ee = new EventEmitter();
        
        that.sprites = createSprite();
        __.each(that.sprites, item=>that.addChild(item));

        executeTournament();
    })();

    /** シーン名 */
    that.getName = ()=>'tournament';

    that.getState = function() {
        return ;
    }

    /**
     * スプライトを生成する
     */
    function createSprite() {
        let table = tournamentTable({
            x: 160,
            y: 260,
            data: spec.data,
            master: spec.master
        });

        return {table};
    }

    /**
     * 対戦相手を表示後、戦闘画面に遷移する
     */
    function executeTournament() {
        that.tl.delay(30).then(()=>{
            let oppenent = getOpponent(spec.data, PLAYER_ID);
            that.ee.emit('startBattle', oppenent);
        });
    }

    return that;
}