describe('Battleクラス パイロットスキル ガードブレイク', function() {
    var assert = require('chai').assert;
    var battle = require('../../server/battle.js');
    var battleUnitData = require('./../testData/battleUnitData.js')();


    it('ガードブレイクスキルによりガードが無効になり追加ダメージが入る',function(){
        var testData = {};
        testData['test001@gmail.com'] = battleUnitData.get('granBraverGuardBreak');
        testData['test002@gmail.com'] = battleUnitData.get('landozer');

        var Battle = battle({
            statusArray : testData
        });

        //グランブレイバーがガードブレイクスキルを発動
        Battle.doWaitPhase();
        Battle.doPilotSkill();
        var attackResult = Battle.atack({
            atackBattery : 1,
            defenthBattery : 1
        });

        var statusArray = Battle.getStatusArray();
        assert.equal(statusArray['test002@gmail.com'].hp,3600,'test002@gmail.comが800+300=1100ダメージを受ける');
        assert.equal(statusArray['test001@gmail.com'].skillPoint,0,'test001@gmail.comのスキルポイントが-1される。');
        assert.equal(attackResult.hit,1,'通常ヒット判定になる');
    });

    it('ガードブレイクスキルにより追加ダメージが入る',function(){
        var testData = {};
        testData['test001@gmail.com'] = battleUnitData.get('granBraverGuardBreak');
        testData['test002@gmail.com'] = battleUnitData.get('landozer');

        var Battle = battle({
            statusArray : testData
        });

        //グランブレイバーがガードブレイクスキルを発動
        Battle.doWaitPhase();
        Battle.doPilotSkill();
        var attackResult = Battle.atack({
            atackBattery : 3,
            defenthBattery : 1
        });

        var statusArray = Battle.getStatusArray();
        assert.equal(statusArray['test002@gmail.com'].hp,2800,'test002@gmail.comが1600+300=1900ダメージを受ける');
    });

    it('2回目以降はガードブレイクスキルが無効(1回目は攻撃ヒット)',function(){
        var testData = {};
        testData['test001@gmail.com'] = battleUnitData.get('granBraverGuardBreak');
        testData['test001@gmail.com'].speed = 1000;
        testData['test002@gmail.com'] = battleUnitData.get('landozer');

        var Battle = battle({
            statusArray : testData
        });

        //グランブレイバーがガードブレイクスキルを発動
        //ランドーザが1100ダメージを受ける
        Battle.doWaitPhase();
        Battle.doPilotSkill();
        Battle.atack({
            atackBattery : 1,
            defenthBattery : 1
        });

        //グランブレイバー2回目の攻撃
        Battle.doWaitPhase();
        Battle.atack({
            atackBattery : 1,
            defenthBattery : 1
        });

        var statusArray = Battle.getStatusArray();
        assert.equal(statusArray['test002@gmail.com'].hp,3200,'test002@gmail.comが400ダメージを受ける');
    });

    it('2回目以降はガードブレイクスキルが無効(1回目は攻撃ミス)',function(){
        var testData = {};
        testData['test001@gmail.com'] = battleUnitData.get('granBraverGuardBreak');
        testData['test001@gmail.com'].speed = 1000;
        testData['test002@gmail.com'] = battleUnitData.get('landozer');

        var Battle = battle({
            statusArray : testData
        });

        //グランブレイバーがガードブレイクスキルを発動
        Battle.doWaitPhase();
        Battle.doPilotSkill();
        Battle.atack({
            atackBattery : 1,
            defenthBattery : 2
        });

        //グランブレイバー2回目の攻撃
        Battle.doWaitPhase();
        Battle.atack({
            atackBattery : 1,
            defenthBattery : 1
        });

        var statusArray = Battle.getStatusArray();
        assert.equal(statusArray['test002@gmail.com'].hp,4300,'test002@gmail.comが400ダメージを受ける');
    });
});