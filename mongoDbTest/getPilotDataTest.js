var assert = require('chai').assert;
var mongoDao = require('../mongoDao.js');
var insertData = require('./testData.js').insertData;
var MongoClient = require('mongodb').MongoClient;

describe('パイロットリストを取得することができる',function(){
    const mongoUrl = 'mongodb://localhost/gbraverTest';
    before(function(done) {
        insertData(mongoUrl, function(err, result) {
            done();
        });
    });

    it('指定したパイロットデータが取得できる',function(done){
        var dao = mongoDao({
            url : mongoUrl
        });
        dao.getPilotData('akane',assertOfPilotData);

        function assertOfPilotData(err,data) {
            var expect = {
                id : 'akane',
                name : '茜',
                pict : 'akane.png',
                shout : 'まだまだ、勝負はこれからよ。',
                type : 'recoverHp',
                value : 0.5
            };
            assert.deepEqual(data,expect,'パイロットデータが正しい');
            assert.deepEqual(err,null,'errorオブジェクトがnullである');
            done();
        }
    });
});
