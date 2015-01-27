var assert = require('chai').assert;
var mongoDao = require('../server/mongoDao.js');
var insertData = require('./testData.js').insertData;
var MongoClient = require('mongodb').MongoClient;

describe('Mongo DBからシングルブレイ用キャラクターデータをを取得する', function() {
    const mongoUrl = 'mongodb://localhost/gbraverTest';

    before(function(done) {
        insertData(mongoUrl, function(err, result) {
            done();
        });
    });

    it('シングルブレイ用キャラクターデータを取得できる', function(done) {
        var dao = mongoDao({
            url : mongoUrl
        });
        dao.getEnemyData('granBraver','kyoko', function(err, enemyData) {
            assertOfEnemyData(enemyData);
            done();
        });

        function assertOfEnemyData(enemyData) {
            var expect = {
                userId : 'nonePlayerCharacter',
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
                    pilot : {
                        name : '恭子',
                        pict : 'kyoko.png',
                        shout : 'やぁぁぁぁて、やるぜ！！    ……なんてね。',
                        type : 'quickCharge',
                        battery : 3
                    }
                }
            };
            assert.deepEqual(enemyData, expect, '正しいプレイヤー情報を取得出来た');
        }
    });
});
