import tournamentTable from '../tournament/tournamentTable';

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
    that.backgroundColor = 'black';

    that.getName = ()=>'tournament';

    /**
     * オブジェクトを生成してシーンに追加する
     */
    (function(){
        that.table = tournamentTable({
            x: 160,
            y: 260,
            data: spec.data,
            master: spec.master
        });
        that.addChild(that.table);
    })();

    return that;
}