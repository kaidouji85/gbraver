var assert = require('chai').assert;
var mongoDao = require('../mongoDao.js');
var insertData = require('./testData.js').insertData;
var MongoClient = require('mongodb').MongoClient;

describe('Mongo DBからユーザ情報を取得する', function() {
    const mongoUrl = 'mongodb://localhost/gbraverTest';

    before(function(done) {
        insertData(mongoUrl, function(err, result) {
            done();
        });
    });

    it('ユーザ情報を取得することができる',function(done){
        var dao = mongoDao({
            url : mongoUrl
        });
        dao.getUserData('uchi',function(err,userData){
            var expect = {
                userId : 'uchi',
                armdozerId : 'landozer',
                pilotId : 'akane'
            };
            assert.deepEqual(userData,expect,'ユーザデータが正しく取得できる');
            done();
        });
    });
});
