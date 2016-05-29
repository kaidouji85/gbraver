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
 * スプライトを生成する
 *
 * @param spec 本クラスに与えらたパラメータ
 * @retuns {Object} 生成したスプライト
 */
function createSprite(spec) {
    let table = tournamentTable({
        x: 160,
        y: 260,
        data: spec.data,
        master: spec.master
    });

    return {table};
}

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
    let core = enchant.Core.instance;

    that.addEventListener(Event.ENTER,()=>core.bgm.setMute());

    /**
     * シーンの初期化
     */
    (function(){
        that.backgroundColor = 'black';
        that.ee = new EventEmitter();
        
        that.sprites = createSprite(spec);
        __.each(that.sprites, item=>that.addChild(item));

        executeTournament();
    })();

    /** シーン名 */
    that.getName = ()=>'tournament';

    that.getState = function() {
        return ;
    }

    /**
     * 対戦相手を表示後、戦闘画面に遷移する
     */
    function executeTournament() {
        that.tl.delay(120).then(()=>{
            let oppenent = getOpponent(spec.data, PLAYER_ID);
            that.ee.emit('startBattle', oppenent);
        });
    }

    return that;
}