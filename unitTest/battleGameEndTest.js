describe('Battleクラス ゲーム終了', function() {
    var assert = require('chai').assert;
    var battle = require('../server/battle.js');

    it('HPが0になったのでゲームが終了する',function(){
        var testData = {};
        testData['test001@gmail.com'] = {
            name : 'グランブレイバー',
            pictName : 'GranBraver.PNG',
            hp : 3200,
            defense : 0,
            speed : 230,
            active : 0,
            battery : 1,
            overHeatFlag : false,
            weapons : {
                1 : {name : 'バスターナックル',power : 800},
                2 : {name : 'バスターナックル',power : 1100},
                3 : {name : 'バスターナックル',power : 1600},
                4 : {name : 'バスターナックル',power : 2100},
                5 : {name : 'バスターナックル',power : 2800}
            }
        };
        testData['test002@gmail.com'] = {
            name : 'ランドーザ',
            pictName : 'Landozer.PNG',
            hp : 0,
            defense : 0,
            speed : 150,
            active : 0,
            battery : 5,
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
        var endFlag = Battle.isEnd();
        var winPlayer = Battle.getWinPlayer();
        assert.equal(endFlag,true,'HPが0になったので、ゲーム終了フラグがtrueになる');
        assert.equal(winPlayer,'test001@gmail.com','勝利したプレイヤーのIDがリターンされる');
    });

    it('HPが0より小さくなってもゲームが終了する',function(){
        var testData = {};
        testData['test001@gmail.com'] = {
            name : 'グランブレイバー',
            pictName : 'GranBraver.PNG',
            hp : 3200,
            defense : 0,
            speed : 230,
            active : 0,
            battery : 1,
            overHeatFlag : false,
            weapons : {
                1 : {name : 'バスターナックル',power : 800},
                2 : {name : 'バスターナックル',power : 1100},
                3 : {name : 'バスターナックル',power : 1600},
                4 : {name : 'バスターナックル',power : 2100},
                5 : {name : 'バスターナックル',power : 2800}
            }
        };
        testData['test002@gmail.com'] = {
            name : 'ランドーザ',
            pictName : 'Landozer.PNG',
            hp : -1200,
            defense : 0,
            speed : 150,
            active : 0,
            battery : 5,
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
        var endFlag = Battle.isEnd();
        var winPlayer = Battle.getWinPlayer();
        assert.equal(endFlag,true,'HPが0より小さいので、ゲーム終了フラグがtrueになる');
        assert.equal(winPlayer,'test001@gmail.com','勝利したプレイヤーのIDがリターンされる');
    });

    it('両プレイヤーともにHPが0より大きいので、ゲーム終了フラグがfalseになる',function(){
        var testData = {};
        testData['test001@gmail.com'] = {
            name : 'グランブレイバー',
            pictName : 'GranBraver.PNG',
            hp : 3200,
            defense : 0,
            speed : 230,
            active : 0,
            battery : 1,
            overHeatFlag : false,
            weapons : {
                1 : {name : 'バスターナックル',power : 800},
                2 : {name : 'バスターナックル',power : 1100},
                3 : {name : 'バスターナックル',power : 1600},
                4 : {name : 'バスターナックル',power : 2100},
                5 : {name : 'バスターナックル',power : 2800}
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
        var endFlag = Battle.isEnd();
        var winPlayer = Battle.getWinPlayer();
        assert.equal(endFlag,false,'両プレイヤーともにHPが0より大きいので、ゲーム終了フラグがfalseになる');
    });
});