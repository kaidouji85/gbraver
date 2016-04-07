var assert = require('chai').assert;
var mongoDao = require('../../server/mongoDao.js');
var insertData = require('./testData.js').insertData;
var MongoClient = require('mongodb').MongoClient;

describe('Mongo DBからプレイヤー情報を取得する', function() {
    const mongoUrl = 'mongodb://localhost/gbraverTest';

    before(function(done) {
        insertData(mongoUrl, function(err, result) {
            done();
        });
    });

    it('存在するユーザIDを指定したのでプレイヤー情報を取得することができる', function(done) {
        var dao = mongoDao({
            url : mongoUrl
        });
        dao.getPlayerData('take', function(err, playerData) {
            assertOfPlayerData(playerData);
        });

        function assertOfPlayerData(playerData) {
            var expect = {
                userId : 'take',
                status : {
                    name : 'グランブレイバー',
                    pictName : 'GranBraver.PNG',
                    hp : 3300,      //パイロットのステータス補正でHP+100
                    speed : 330,    //パイロットのステータス補正で機動+100,
                    defense : 100,   //パイロットのステータス補正で防御-50
                    weapons : {     //パイロットのステータス補正で各武器の攻撃力+100
                        1 : {
                            name : 'バスターナックル',
                            power : 900
                        },
                        2 : {
                            name : 'バスターナックル',
                            power : 1200
                        },
                        3 : {
                            name : 'バスターナックル',
                            power : 1700
                        },
                        4 : {
                            name : 'バスターナックル',
                            power : 2200
                        },
                        5 : {
                            name : 'バスターナックル',
                            power : 2900
                        }
                    },
                    pilot : {
                        name : '恭子',
                        pict : 'kyoko.png',
                        shout : 'やぁぁぁぁて、やるぜ！！    ……なんてね。',
                        type : 'quickCharge',
                        battery : 3,
                        hp : 100,
                        power : 100,
                        defense : -50,
                        speed : 100
                    }
                }
            };
            assert.deepEqual(playerData, expect, '正しいプレイヤー情報を取得出来た');
            done();
        }
    });

    it('存在しないユーザIDを指定したので、データベースにユーザが新規作成され、新規登録データを取得できる', function(done) {
        var dao = mongoDao({
            url : mongoUrl
        });
        dao.getPlayerData('testuser8585@gmail.com', function(err, playerData) {
            assertOfPlayerData(playerData);
            assertOfMongoDbCollection(mongoUrl, function() {
                done();
            });
        });

        function assertOfPlayerData(playerData) {
            var expect = {
                userId : 'testuser8585@gmail.com',
                status : {
                    name : 'グランブレイバー',
                    pictName : 'GranBraver.PNG',
                    hp : 3300,      //パイロットのステータス補正でHP+100
                    speed : 330,    //パイロットのステータス補正で機動+100,
                    defense : 100,   //パイロットのステータス補正で防御-50
                    weapons : {     //パイロットのステータス補正で各武器の攻撃力+100
                        1 : {
                            name : 'バスターナックル',
                            power : 900
                        },
                        2 : {
                            name : 'バスターナックル',
                            power : 1200
                        },
                        3 : {
                            name : 'バスターナックル',
                            power : 1700
                        },
                        4 : {
                            name : 'バスターナックル',
                            power : 2200
                        },
                        5 : {
                            name : 'バスターナックル',
                            power : 2900
                        }
                    },
                    pilot : {
                        name : '恭子',
                        pict : 'kyoko.png',
                        shout : 'やぁぁぁぁて、やるぜ！！    ……なんてね。',
                        type : 'quickCharge',
                        battery : 3,
                        hp : 100,
                        power : 100,
                        defense : -50,
                        speed : 100
                    }
                }
            };
            assert.deepEqual(playerData, expect, '正しいプレイヤー情報を取得出来た');
        }

        function assertOfMongoDbCollection(mongoUrl, done) {
            MongoClient.connect(mongoUrl, function(err, db) {
                var collection = db.collection('users');
                collection.findOne({
                    userId : 'testuser8585@gmail.com'
                }, function(err, user) {
                    assert.equal(user.userId, 'testuser8585@gmail.com', '新規ユーザが追加されている');
                    assert.equal(user.armdozerId, 'granBraver', '新規ユーザはデフォルト選択キャラクターがranBraverになっている');
                    assert.equal(user.pilotId, 'kyoko', '新規ユーザはデフォルト選択パイロットがkyokoになっている');
                    done();
                });
            });
        }
    });
});
