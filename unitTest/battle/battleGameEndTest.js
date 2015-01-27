describe('Battleクラス ゲーム終了', function() {
    var assert = require('chai').assert;
    var battle = require('../../server/battle.js');
    var battleUnitData = require('./../testData/battleUnitData.js')();

    it('HPが0になったのでゲームが終了する',function(){
        var testData = {};
        testData['test001@gmail.com'] = battleUnitData.get('granBraver');
        testData['test002@gmail.com'] = battleUnitData.get('landozer');
        testData['test002@gmail.com'].hp = 0;

        var Battle = battle({
            statusArray : testData
        });
        var endFlag = Battle.isEnd();
        var winPlayer = Battle.getWinPlayer();
        assert.equal(endFlag,true,'HPが0になったので、ゲーム終了フラグがtrueになる');
        assert.equal(winPlayer,'test001@gmail.com','勝利したプレイヤーのIDがリターンされる');
    });

    it('HPが0より小さくなってもゲームが終了する',function(){
        var testData = {};
        testData['test001@gmail.com'] = battleUnitData.get('granBraver');
        testData['test002@gmail.com'] = battleUnitData.get('landozer');
        testData['test002@gmail.com'].hp = -1200;

        var Battle = battle({
            statusArray : testData
        });
        var endFlag = Battle.isEnd();
        var winPlayer = Battle.getWinPlayer();
        assert.equal(endFlag,true,'HPが0より小さいので、ゲーム終了フラグがtrueになる');
        assert.equal(winPlayer,'test001@gmail.com','勝利したプレイヤーのIDがリターンされる');
    });

    it('両プレイヤーともにHPが0より大きいので、ゲーム終了フラグがfalseになる',function(){
        var testData = {};
        testData['test001@gmail.com'] = battleUnitData.get('granBraver');
        testData['test002@gmail.com'] = battleUnitData.get('landozer');

        var Battle = battle({
            statusArray : testData
        });
        var endFlag = Battle.isEnd();
        var winPlayer = Battle.getWinPlayer();
        assert.equal(endFlag,false,'両プレイヤーともにHPが0より大きいので、ゲーム終了フラグがfalseになる');
    });
});