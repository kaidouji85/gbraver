var assert = require('chai').assert;
var mongoDao = require('../mongoDao.js');
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
                    battery : 3
                },
                {
                    id : 'akane',
                    name : '茜',
                    pict : 'akane.png',
                    shout : 'まだまだ、勝負はこれからよ。',
                    type : 'quickCharge',
                    battery : 3
                },
                {
                    id : 'iori',
                    name: '伊織',
                    pict: 'iori.png',
                    shout: 'この一撃に、全てを掛ける！！',
                    type: 'quickCharge',
                    battery: 3
                }
            ];
            assert.equal(err,null,'エラーが出ない');
            assert.deepEqual(masterData, expect, 'マスターデータが取得できた');
            done();
        }

    });
});
