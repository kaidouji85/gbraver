var assert = require('chai').assert;
var mongoDao = require('../../server/mongoDao.js');
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
            assert.deepEqual(enemyData, expect, '正しいプレイヤー情報を取得出来た');
        }
    });
});
