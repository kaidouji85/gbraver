var assert = require('chai').assert;
var mongoDao = require('../server/mongoDao.js');
var insertData = require('./testData.js').insertData;
var MongoClient = require('mongodb').MongoClient;

describe('Mongo DBからマスタデータを取得', function() {
    const mongoUrl = 'mongodb://localhost/gbraverTest';

    before(function(done) {
        insertData(mongoUrl, function(err, result) {
            done();
        });
    });

    it('マスターデータが取得できる', function(done) {
        var dao = mongoDao({
            url : mongoUrl
        });
        dao.getMasterData(assertOfMasterData);

        function assertOfMasterData(err, masterData) {
            var expect = {};
            expect.armdozerList = [
                {
                    armdozerId : 'granBraver',
                    name : 'グランブレイバー',
                    pictName : 'GranBraver.PNG',
                    hp : 3200,
                    speed : 230,
                    defense : 150,
                    weapons : {
                        1 : {
                            name : 'バスターナックル',
                            power : 800
                        },
                        2 : {
                            name : 'バスターナックル',
                            power : 1100
                        },
                        3 : {
                            name : 'バスターナックル',
                            power : 1600
                        },
                        4 : {
                            name : 'バスターナックル',
                            power : 2100
                        },
                        5 : {
                            name : 'バスターナックル',
                            power : 2800
                        }
                    }
                },
                {
                    armdozerId : 'landozer',
                    name : 'ランドーザ',
                    pictName : 'Landozer.PNG',
                    hp : 4700,
                    speed : 150,
                    defense : 200,
                    weapons : {
                        1 : {
                            name : 'ブレイクパンチ',
                            power : 1200
                        },
                        2 : {
                            name : 'ブレイクパンチ',
                            power : 1700
                        },
                        3 : {
                            name : 'ブレイクパンチ',
                            power : 2300
                        },
                        4 : {
                            name : 'ブレイクパンチ',
                            power : 2900
                        },
                        5 : {
                            name : 'ブレイクパンチ',
                            power : 3800
                        }
                    }
                }
            ];
            expect.pilotList = [
                {
                    id : 'kyoko',
                    name : '恭子',
                    pict : 'kyoko.png',
                    shout : 'やぁぁぁぁて、やるぜ！！    ……なんてね。',
                    type : 'quickCharge',
                    battery : 3,
                    hp : 100,
                    power : 100,
                    defense : -50,
                    speed : 100
                },
                {
                    id : 'akane',
                    name : '茜',
                    pict : 'akane.png',
                    shout : 'まだまだ、勝負はこれからよ。',
                    type : 'recoverHp',
                    value : 0.5,
                    hp : 0,
                    power : 0,
                    defense : 0,
                    speed : 0
                },
                {
                    id : 'iori',
                    name: '伊織',
                    pict: 'iori.png',
                    shout: 'この一撃に、全てを掛ける！！',
                    type: 'quickCharge',
                    battery: 3,
                    hp : 0,
                    power : 0,
                    defense : 0,
                    speed : 0
                }
            ];
            expect.stageData = [
                {
                    title : '初級',
                    enemyId : 'landozer',
                    routineId : 'attack3'
                },
                {
                    title : '中級',
                    enemyId : 'granBraver',
                    routineId : 'attack3'
                },
                {
                    title : '上級',
                    enemyId : 'zeroBraver',
                    routineId : 'attack3'
                }
            ];
            expect.scenarioData = [
                {
                    id : 'mesTest',
                    data :     [
                        {
                            method : 'mes',
                            param :
                            '春日野高校の恭子よ<br>'+
                            'アームドーザの操縦には、結構自信があるんだ<br>'+
                            'お互いにベストを尽くしましょう'
                        },
                        {
                            method : 'mes',
                            param :
                            'でかい口叩けるのも、今のうちよ<br>'+
                            '私のランドーザが最強なんだから'
                        }
                    ]
                },
                {
                    id : 'pilotLeftTest',
                    data :    [
                        {
                            method : 'pilot',
                            param : {
                                id : 'kyoko',
                                dir : 'left'
                            }
                        }
                    ]
                }
            ];
            assert.equal(err,null,'エラーが出ない');
            assert.deepEqual(masterData, expect, 'マスターデータが取得できた');
            done();
        }

    });
});
