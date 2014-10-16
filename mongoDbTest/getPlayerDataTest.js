var assert = require('chai').assert;
var mongoDao = require('../mongoDao.js');
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
            done();
        });

        function assertOfPlayerData(playerData) {
            var expect = {
                userId : 'take',
                status : {
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
                    },
                    skill : {
                        type : 'quickCharge',
                        battery : 3
                    }
                }
            };
            assert.deepEqual(playerData, expect, '正しいプレイヤー情報を取得出来た');
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
                    },
                    skill : {
                        type : 'quickCharge',
                        battery : 3
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
