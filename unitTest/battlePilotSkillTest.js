describe('Battleクラス パイロットスキル', function() {
    var assert = require('chai').assert;
    var battle = require('../server/battle.js');

    it('クイックチャージでバッテリーを回復する',function(){
        var testData = {};
        testData['test001@gmail.com'] = {
            name : 'グランブレイバー',
            pictName : 'GranBraver.PNG',
            hp : 2000,
            defense : 0,
            speed : 250,
            active : 5000,
            battery : 0,
            skillPoint : 1,
            overHeatFlag : false,
            weapons : {
                1 : {name : 'バスターナックル',power : 800},
                2 : {name : 'バスターナックル',power : 1100},
                3 : {name : 'バスターナックル',power : 1600},
                4 : {name : 'バスターナックル',power : 2100},
                5 : {name : 'バスターナックル',power : 2800}
            },
            skill : {
                type : 'quickCharge',
                battery : 3
            }
        };
        testData['test002@gmail.com'] = {
            name : 'ランドーザ',
            pictName : 'Landozer.PNG',
            hp : 4700,
            defense : 0,
            speed : 150,
            active : 0,
            battery : 5,
            skillPoint : 1,
            overHeatFlag : false,
            weapons : {
                1 : {name:'ブレイクパンチ',power:1200},
                2 : {name:'ブレイクパンチ',power:1700},
                3 : {name:'ブレイクパンチ',power:2300},
                4 : {name:'ブレイクパンチ',power:2900},
                5 : {name:'ブレイクパンチ',power:3800}
            }
        };

        var Battle = battle({
            statusArray : testData
        });
        Battle.doWaitPhase(); //test001@gmail.comのバッテリーがターン経過で1回復する
        Battle.doPilotSkill();
        var statusArray = Battle.getStatusArray();
        assert.equal(statusArray['test001@gmail.com'].battery,4,'test001@gmail.comのHPが3回復する。');
        assert.equal(statusArray['test001@gmail.com'].skillPoint,0,'test001@gmail.comのスキルポイントが-1される。');
        assert.equal(statusArray['test002@gmail.com'].battery,5,'test002@gmail.comのバッテリーが回復しない。');
    });

    it('クイックチャージでもバッテリー上限を超えて回復しない',function(){
        var testData = {};
        testData['test001@gmail.com'] = {
            name : 'グランブレイバー',
            pictName : 'GranBraver.PNG',
            hp : 2000,
            defense : 0,
            speed : 250,
            active : 5000,
            battery : 2,
            skillPoint : 1,
            overHeatFlag : false,
            weapons : {
                1 : {name : 'バスターナックル',power : 800},
                2 : {name : 'バスターナックル',power : 1100},
                3 : {name : 'バスターナックル',power : 1600},
                4 : {name : 'バスターナックル',power : 2100},
                5 : {name : 'バスターナックル',power : 2800}
            },
            skill : {
                type : 'quickCharge',
                battery : 3
            }
        };
        testData['test002@gmail.com'] = {
            name : 'ランドーザ',
            pictName : 'Landozer.PNG',
            hp : 4700,
            defense : 0,
            speed : 150,
            active : 0,
            battery : 5,
            skillPoint : 1,
            overHeatFlag : false,
            weapons : {
                1 : {name:'ブレイクパンチ',power:1200},
                2 : {name:'ブレイクパンチ',power:1700},
                3 : {name:'ブレイクパンチ',power:2300},
                4 : {name:'ブレイクパンチ',power:2900},
                5 : {name:'ブレイクパンチ',power:3800}
            }
        };

        var Battle = battle({
            statusArray : testData
        });
        Battle.doWaitPhase(); //test001@gmail.comのバッテリーがターン経過で1回復する
        Battle.doPilotSkill();
        var statusArray = Battle.getStatusArray();
        assert.equal(statusArray['test001@gmail.com'].battery,5,'test001@gmail.comのHPが5以上にはならない。');
        assert.equal(statusArray['test001@gmail.com'].skillPoint,0,'test001@gmail.comのスキルポイントが-1される。');
        assert.equal(statusArray['test002@gmail.com'].battery,5,'test002@gmail.comのバッテリーが回復しない。');
    });

    it('HP回復スキルで最大HPの50%分回復する',function(){
        var testData = {};
        testData['test001@gmail.com'] = {
            name : 'グランブレイバー',
            pictName : 'GranBraver.PNG',
            hp : 3000,
            defense : 0,
            speed : 110,
            active : 0,
            battery : 5,
            skillPoint : 1,
            overHeatFlag : false,
            weapons : {
                1 : {name : 'バスターナックル',power : 2200},
                2 : {name : 'バスターナックル',power : 2200},
                3 : {name : 'バスターナックル',power : 2200},
                4 : {name : 'バスターナックル',power : 2200},
                5 : {name : 'バスターナックル',power : 2200}
            }
        };
        testData['test002@gmail.com'] = {
            name : 'ランドーザ',
            pictName : 'Landozer.PNG',
            hp : 3500,
            defense : 0,
            speed : 100,
            active : 0,
            battery : 5,
            skillPoint : 1,
            overHeatFlag : false,
            weapons : {
                1 : {name:'ブレイクパンチ',power:1700},
                2 : {name:'ブレイクパンチ',power:1700},
                3 : {name:'ブレイクパンチ',power:1700},
                4 : {name:'ブレイクパンチ',power:1700},
                5 : {name:'ブレイクパンチ',power:1700}
            },
            skill : {
                type : 'recoverHp',
                value : 0.5
            }
        };

        var Battle = battle({
            statusArray : testData
        });

        //グランブレイバーが2200ダメージを与える
        Battle.doWaitPhase();
        Battle.getStatusArray();
        Battle.atack({
            atackBattery : 2,
            defenthBattery : 1
        });

        //ランドーザがスキルを使いHPを回復
        Battle.doWaitPhase();
        Battle.doPilotSkill();
        Battle.getStatusArray();

        var statusArray = Battle.getStatusArray();
        assert.equal(statusArray['test002@gmail.com'].hp,3050,'test002@gmail.comのHPが1750回復する。');
        assert.equal(statusArray['test002@gmail.com'].skillPoint,0,'test002@gmail.comのスキルポイントが-1される。');
    });

    it('HP回復スキルでは最大HP以上は回復しない',function(){
        var testData = {};
        testData['test001@gmail.com'] = {
            name : 'グランブレイバー',
            pictName : 'GranBraver.PNG',
            hp : 3000,
            defense : 0,
            speed : 110,
            active : 0,
            battery : 5,
            skillPoint : 1,
            overHeatFlag : false,
            weapons : {
                1 : {name : 'バスターナックル',power : 1000},
                2 : {name : 'バスターナックル',power : 1000},
                3 : {name : 'バスターナックル',power : 1000},
                4 : {name : 'バスターナックル',power : 1000},
                5 : {name : 'バスターナックル',power : 1000}
            }
        };
        testData['test002@gmail.com'] = {
            name : 'ランドーザ',
            pictName : 'Landozer.PNG',
            hp : 3500,
            defense : 0,
            speed : 100,
            active : 0,
            battery : 5,
            skillPoint : 1,
            overHeatFlag : false,
            weapons : {
                1 : {name:'ブレイクパンチ',power:1700},
                2 : {name:'ブレイクパンチ',power:1700},
                3 : {name:'ブレイクパンチ',power:1700},
                4 : {name:'ブレイクパンチ',power:1700},
                5 : {name:'ブレイクパンチ',power:1700}
            },
            skill : {
                type : 'recoverHp',
                value : 0.5
            }
        };

        var Battle = battle({
            statusArray : testData
        });

        //グランブレイバーが1000ダメージを与える
        Battle.doWaitPhase();
        Battle.getStatusArray();
        Battle.atack({
            atackBattery : 2,
            defenthBattery : 1
        });

        //ランドーザがスキルを使いHPを回復
        Battle.doWaitPhase();
        Battle.doPilotSkill();
        Battle.getStatusArray();

        var statusArray = Battle.getStatusArray();
        assert.equal(statusArray['test002@gmail.com'].hp,3500,'test002@gmail.comは最大HPまでしか回復しない。');
        assert.equal(statusArray['test002@gmail.com'].skillPoint,0,'test002@gmail.comのスキルポイントが-1される。');
    });

    it('スタンスキルを使い、攻撃ヒット時にアクティブゲージが-5000になる',function(){
        var testData = {};
        testData['test001@gmail.com'] = {
            name : 'グランブレイバー',
            pictName : 'GranBraver.PNG',
            hp : 3000,
            defense : 0,
            speed : 1000,
            active : 0,
            battery : 5,
            skillPoint : 1,
            overHeatFlag : false,
            weapons : {
                1 : {name : 'バスターナックル',power : 2200},
                2 : {name : 'バスターナックル',power : 2200},
                3 : {name : 'バスターナックル',power : 2200},
                4 : {name : 'バスターナックル',power : 2200},
                5 : {name : 'バスターナックル',power : 2200}
            },
            skill : {
                type : 'stunAttack'
            }
        };
        testData['test002@gmail.com'] = {
            name : 'ランドーザ',
            pictName : 'Landozer.PNG',
            hp : 3500,
            defense : 0,
            speed : 100,
            active : 0,
            battery : 5,
            skillPoint : 1,
            overHeatFlag : false,
            weapons : {
                1 : {name:'ブレイクパンチ',power:1700},
                2 : {name:'ブレイクパンチ',power:1700},
                3 : {name:'ブレイクパンチ',power:1700},
                4 : {name:'ブレイクパンチ',power:1700},
                5 : {name:'ブレイクパンチ',power:1700}
            }
        };

        var Battle = battle({
            statusArray : testData
        });

        //グランブレイバーがスタン攻撃スキルを発動
        Battle.doWaitPhase();
        Battle.doPilotSkill();
        Battle.atack({
            atackBattery : 2,
            defenthBattery : 1
        });

        var statusArray = Battle.getStatusArray();
        assert.equal(statusArray['test002@gmail.com'].hp,1300,'test002@gmail.comが2200ダメージを受ける');
        assert.equal(statusArray['test002@gmail.com'].active,-2500,'test002@gmail.comのアクティブゲージが-2500になる');
        assert.equal(statusArray['test001@gmail.com'].skillPoint,0,'test001@gmail.comのスキルポイントが-1される。');
    });

    it('防御されたのでスタンスキルは無効',function(){
        var testData = {};
        testData['test001@gmail.com'] = {
            name : 'グランブレイバー',
            pictName : 'GranBraver.PNG',
            hp : 3000,
            defense : 0,
            speed : 1000,
            active : 0,
            battery : 5,
            skillPoint : 1,
            overHeatFlag : false,
            weapons : {
                1 : {name : 'バスターナックル',power : 2200},
                2 : {name : 'バスターナックル',power : 2200},
                3 : {name : 'バスターナックル',power : 2200},
                4 : {name : 'バスターナックル',power : 2200},
                5 : {name : 'バスターナックル',power : 2200}
            },
            skill : {
                type : 'stunAttack'
            }
        };
        testData['test002@gmail.com'] = {
            name : 'ランドーザ',
            pictName : 'Landozer.PNG',
            hp : 3500,
            defense : 0,
            speed : 100,
            active : 0,
            battery : 5,
            skillPoint : 1,
            overHeatFlag : false,
            weapons : {
                1 : {name:'ブレイクパンチ',power:1700},
                2 : {name:'ブレイクパンチ',power:1700},
                3 : {name:'ブレイクパンチ',power:1700},
                4 : {name:'ブレイクパンチ',power:1700},
                5 : {name:'ブレイクパンチ',power:1700}
            }
        };

        var Battle = battle({
            statusArray : testData
        });

        //グランブレイバーがスタン攻撃スキルを発動
        Battle.doWaitPhase();
        Battle.doPilotSkill();
        Battle.atack({
            atackBattery : 1,
            defenthBattery : 1
        });

        var statusArray = Battle.getStatusArray();
        assert.equal(statusArray['test002@gmail.com'].hp,2400,'test002@gmail.comが1100ダメージを受ける');
        assert.equal(statusArray['test002@gmail.com'].active,500,'test002@gmail.comのアクティブゲージが減らない');
        assert.equal(statusArray['test001@gmail.com'].skillPoint,0,'test001@gmail.comのスキルポイントが-1される。');
    });

    it('回避されたのでスタンスキルは無効',function(){
        var testData = {};
        testData['test001@gmail.com'] = {
            name : 'グランブレイバー',
            pictName : 'GranBraver.PNG',
            hp : 3000,
            defense : 0,
            speed : 1000,
            active : 0,
            battery : 5,
            skillPoint : 1,
            overHeatFlag : false,
            weapons : {
                1 : {name : 'バスターナックル',power : 2200},
                2 : {name : 'バスターナックル',power : 2200},
                3 : {name : 'バスターナックル',power : 2200},
                4 : {name : 'バスターナックル',power : 2200},
                5 : {name : 'バスターナックル',power : 2200}
            },
            skill : {
                type : 'stunAttack'
            }
        };
        testData['test002@gmail.com'] = {
            name : 'ランドーザ',
            pictName : 'Landozer.PNG',
            hp : 3500,
            defense : 0,
            speed : 100,
            active : 0,
            battery : 5,
            skillPoint : 1,
            overHeatFlag : false,
            weapons : {
                1 : {name:'ブレイクパンチ',power:1700},
                2 : {name:'ブレイクパンチ',power:1700},
                3 : {name:'ブレイクパンチ',power:1700},
                4 : {name:'ブレイクパンチ',power:1700},
                5 : {name:'ブレイクパンチ',power:1700}
            }
        };

        var Battle = battle({
            statusArray : testData
        });

        //グランブレイバーがスタン攻撃スキルを発動
        Battle.doWaitPhase();
        Battle.doPilotSkill();
        Battle.atack({
            atackBattery : 1,
            defenthBattery : 3
        });

        var statusArray = Battle.getStatusArray();
        assert.equal(statusArray['test002@gmail.com'].hp,3500,'test002@gmail.comがダメージを受けない');
        assert.equal(statusArray['test002@gmail.com'].active,500,'test002@gmail.comのアクティブゲージが減らない');
        assert.equal(statusArray['test001@gmail.com'].skillPoint,0,'test001@gmail.comのスキルポイントが-1される。');
    });

    it('2回目攻撃以降はスタン攻撃スキルは無効(1回目に攻撃ミス)',function(){
        var testData = {};
        testData['test001@gmail.com'] = {
            name : 'グランブレイバー',
            pictName : 'GranBraver.PNG',
            hp : 3000,
            defense : 0,
            speed : 1000,
            active : 0,
            battery : 5,
            skillPoint : 1,
            overHeatFlag : false,
            weapons : {
                1 : {name : 'バスターナックル',power : 2200},
                2 : {name : 'バスターナックル',power : 2200},
                3 : {name : 'バスターナックル',power : 2200},
                4 : {name : 'バスターナックル',power : 2200},
                5 : {name : 'バスターナックル',power : 2200}
            },
            skill : {
                type : 'stunAttack'
            }
        };
        testData['test002@gmail.com'] = {
            name : 'ランドーザ',
            pictName : 'Landozer.PNG',
            hp : 3500,
            defense : 0,
            speed : 100,
            active : 0,
            battery : 5,
            skillPoint : 1,
            overHeatFlag : false,
            weapons : {
                1 : {name:'ブレイクパンチ',power:1700},
                2 : {name:'ブレイクパンチ',power:1700},
                3 : {name:'ブレイクパンチ',power:1700},
                4 : {name:'ブレイクパンチ',power:1700},
                5 : {name:'ブレイクパンチ',power:1700}
            }
        };

        var Battle = battle({
            statusArray : testData
        });

        //グランブレイバーがスタン攻撃スキルを発動
        Battle.doWaitPhase();
        Battle.doPilotSkill();
        Battle.atack({
            atackBattery : 1,
            defenthBattery : 2
        });

        //もう一度グランブレイバーが攻撃
        Battle.doWaitPhase();
        Battle.atack({
            atackBattery : 1,
            defenthBattery : 1
        });

        var statusArray = Battle.getStatusArray();
        assert.equal(statusArray['test002@gmail.com'].active,1000,'test002@gmail.comのアクティブゲージが減らない');
    });

    it('2回目攻撃以降はスタン攻撃スキルは無効(1回目に攻撃ヒット)',function(){
        var testData = {};
        testData['test001@gmail.com'] = {
            name : 'グランブレイバー',
            pictName : 'GranBraver.PNG',
            hp : 3000,
            defense : 0,
            speed : 1000,
            active : 0,
            battery : 5,
            skillPoint : 1,
            overHeatFlag : false,
            weapons : {
                1 : {name : 'バスターナックル',power : 2200},
                2 : {name : 'バスターナックル',power : 2200},
                3 : {name : 'バスターナックル',power : 2200},
                4 : {name : 'バスターナックル',power : 2200},
                5 : {name : 'バスターナックル',power : 2200}
            },
            skill : {
                type : 'stunAttack'
            }
        };
        testData['test002@gmail.com'] = {
            name : 'ランドーザ',
            pictName : 'Landozer.PNG',
            hp : 3500,
            defense : 0,
            speed : 100,
            active : 0,
            battery : 5,
            skillPoint : 1,
            overHeatFlag : false,
            weapons : {
                1 : {name:'ブレイクパンチ',power:1700},
                2 : {name:'ブレイクパンチ',power:1700},
                3 : {name:'ブレイクパンチ',power:1700},
                4 : {name:'ブレイクパンチ',power:1700},
                5 : {name:'ブレイクパンチ',power:1700}
            }
        };

        var Battle = battle({
            statusArray : testData
        });

        //グランブレイバーがスタン攻撃スキルを発動
        Battle.doWaitPhase();
        Battle.doPilotSkill();
        Battle.atack({
            atackBattery : 2,
            defenthBattery : 1
        });

        //もう一度グランブレイバーが攻撃
        Battle.doWaitPhase();
        Battle.atack({
            atackBattery : 1,
            defenthBattery : 1
        });

        var statusArray = Battle.getStatusArray();
        assert.equal(statusArray['test002@gmail.com'].active,-2000,'test002@gmail.comのアクティブゲージが減らない');
    });

    it('ガードブレイクスキルで防御しても通常通りダメージを受ける',function(){
        var testData = {};
        testData['test001@gmail.com'] = {
            name : 'グランブレイバー',
            pictName : 'GranBraver.PNG',
            hp : 3000,
            defense : 0,
            speed : 1000,
            active : 0,
            battery : 5,
            skillPoint : 1,
            overHeatFlag : false,
            weapons : {
                1 : {name : 'バスターナックル',power : 2200},
                2 : {name : 'バスターナックル',power : 2200},
                3 : {name : 'バスターナックル',power : 2200},
                4 : {name : 'バスターナックル',power : 2200},
                5 : {name : 'バスターナックル',power : 2200}
            },
            skill : {
                type : 'guardBreak'
            }
        };
        testData['test002@gmail.com'] = {
            name : 'ランドーザ',
            pictName : 'Landozer.PNG',
            hp : 3500,
            defense : 0,
            speed : 100,
            active : 0,
            battery : 5,
            skillPoint : 1,
            overHeatFlag : false,
            weapons : {
                1 : {name:'ブレイクパンチ',power:1700},
                2 : {name:'ブレイクパンチ',power:1700},
                3 : {name:'ブレイクパンチ',power:1700},
                4 : {name:'ブレイクパンチ',power:1700},
                5 : {name:'ブレイクパンチ',power:1700}
            }
        };

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
        assert.equal(statusArray['test002@gmail.com'].hp,1300,'test002@gmail.comが2200ダメージを受ける');
        assert.equal(statusArray['test001@gmail.com'].skillPoint,0,'test001@gmail.comのスキルポイントが-1される。');
        assert.equal(attackResult.hit,1,'通常ヒット判定になる');
    });

    it('2回目以降はガードブレイクスキルが無効(1回目は攻撃ヒット)',function(){
        var testData = {};
        testData['test001@gmail.com'] = {
            name : 'グランブレイバー',
            pictName : 'GranBraver.PNG',
            hp : 3000,
            defense : 0,
            speed : 1000,
            active : 0,
            battery : 5,
            skillPoint : 1,
            overHeatFlag : false,
            weapons : {
                1 : {name : 'バスターナックル',power : 2200},
                2 : {name : 'バスターナックル',power : 2200},
                3 : {name : 'バスターナックル',power : 2200},
                4 : {name : 'バスターナックル',power : 2200},
                5 : {name : 'バスターナックル',power : 2200}
            },
            skill : {
                type : 'guardBreak'
            }
        };
        testData['test002@gmail.com'] = {
            name : 'ランドーザ',
            pictName : 'Landozer.PNG',
            hp : 3500,
            defense : 0,
            speed : 100,
            active : 0,
            battery : 5,
            skillPoint : 1,
            overHeatFlag : false,
            weapons : {
                1 : {name:'ブレイクパンチ',power:1700},
                2 : {name:'ブレイクパンチ',power:1700},
                3 : {name:'ブレイクパンチ',power:1700},
                4 : {name:'ブレイクパンチ',power:1700},
                5 : {name:'ブレイクパンチ',power:1700}
            }
        };

        var Battle = battle({
            statusArray : testData
        });

        //グランブレイバーがガードブレイクスキルを発動
        //ランドーザが2200ダメージを受ける
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
        assert.equal(statusArray['test002@gmail.com'].hp,200,'test002@gmail.comが1100ダメージを受ける');
    });

    it('2回目以降はガードブレイクスキルが無効(1回目は攻撃ミス)',function(){
        var testData = {};
        testData['test001@gmail.com'] = {
            name : 'グランブレイバー',
            pictName : 'GranBraver.PNG',
            hp : 3000,
            defense : 0,
            speed : 1000,
            active : 0,
            battery : 5,
            skillPoint : 1,
            overHeatFlag : false,
            weapons : {
                1 : {name : 'バスターナックル',power : 2200},
                2 : {name : 'バスターナックル',power : 2200},
                3 : {name : 'バスターナックル',power : 2200},
                4 : {name : 'バスターナックル',power : 2200},
                5 : {name : 'バスターナックル',power : 2200}
            },
            skill : {
                type : 'guardBreak'
            }
        };
        testData['test002@gmail.com'] = {
            name : 'ランドーザ',
            pictName : 'Landozer.PNG',
            hp : 3500,
            defense : 0,
            speed : 100,
            active : 0,
            battery : 5,
            skillPoint : 1,
            overHeatFlag : false,
            weapons : {
                1 : {name:'ブレイクパンチ',power:1700},
                2 : {name:'ブレイクパンチ',power:1700},
                3 : {name:'ブレイクパンチ',power:1700},
                4 : {name:'ブレイクパンチ',power:1700},
                5 : {name:'ブレイクパンチ',power:1700}
            }
        };

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
        assert.equal(statusArray['test002@gmail.com'].hp,2400,'test002@gmail.comが1100ダメージを受ける');
    });
}); 