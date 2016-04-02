var assert = require('chai').assert;
var mongoDao = require('../../server/mongoDao.js');
var insertData = require('./testData.js').insertData;
var MongoClient = require('mongodb').MongoClient;
var mongoUrl = 'mongodb://localhost/gbraverTest';

describe('ユーザ情報を変更することができる',function(){
    beforeEach(function(done) {
        insertData(mongoUrl, function(err, result) {
            done();
        });
    });
    
    it('選択したアームドーザを変更することができる',function(done){
        var dao = mongoDao({
            url : mongoUrl
        });
        dao.setArmdozerId('take','landozer',checkSuccessUpdate);
        
        function checkSuccessUpdate(err,result){
            assert.equal(err,null,'エラーが発生していない');
            assert.equal(result,true,'データ更新が成功している');
            MongoClient.connect(mongoUrl, function(err, db) {
                var collection = db.collection('users');
                collection.findOne({
                    userId : 'take'
                },function(err,userData){
                    assert.equal(userData.userId,'take','ユーザIDが正しい');
                    assert.equal(userData.armdozerId,'landozer','アームドーザIDが更新されている');
                    done();
                });
            });
        }
    });

    it('選択したパイロットを変更することができる',function(done){
        var dao = mongoDao({
            url : mongoUrl
        });
        dao.setPilotId('uchi','iori',checkSuccessUpdate);

        function checkSuccessUpdate(err,result){
            assert.equal(err,null,'エラーが発生していない');
            assert.equal(result,true,'データ更新が成功している');
            MongoClient.connect(mongoUrl, function(err, db) {
                var collection = db.collection('users');
                collection.findOne({
                    userId : 'uchi'
                },function(err,userData){
                    assert.equal(userData.userId,'uchi','ユーザIDが正しい');
                    assert.equal(userData.pilotId,'iori','パイロットIDが更新されている');
                    done();
                });
            });
        }
    });
    
});
