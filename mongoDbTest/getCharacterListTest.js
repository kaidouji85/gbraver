var assert = require('chai').assert;
var mongoDao = require('../mongoDao.js');
var insertData = require('./testData.js').insertData;
var MongoClient = require('mongodb').MongoClient;

describe('Mongo DBからキャラクターリストを取得する', function() {
    const mongoUrl = 'mongodb://localhost/gbraverTest';

    before(function(done) {
        insertData(mongoUrl, function(err, result) {
            done();
        });
    });

    it('キャラクターリストを取得することができる',function(done){
        var dao = mongoDao({
            url : mongoUrl
        });
        dao.getCharacterList(function(err,characterList){
            var expect = [
                'granBraver',
                'landozer'
            ];
            assert.deepEqual(characterList,expect,'キャラクターリストが正しく取得できる');
            done();
        });
    });
});