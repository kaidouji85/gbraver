var assert = require('chai').assert;
var mongoDao = require('../server/mongoDao.js');
var insertData = require('./testData.js').insertData;
var MongoClient = require('mongodb').MongoClient;

describe('Mongo DBからキャラクター情報を取得する', function() {
    const mongoUrl = 'mongodb://localhost/gbraverTest';

    before(function(done) {
        insertData(mongoUrl, function(err, result) {
            done();
        });
    });

    it('キャラクター情報を取得することができる',function(done){
        var dao = mongoDao({
            url : mongoUrl
        });
        dao.getCharacterInfo('granBraver',function(err,characterInfo){
            var expect = {
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
            };
            assert.deepEqual(characterInfo,expect,'キャラクター情報が正しく取得できる');
            done();
        });
    });
});