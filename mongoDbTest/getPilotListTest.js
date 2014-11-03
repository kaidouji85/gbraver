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

    it('全パイロットデータが取得できる',function(done){
        var dao = mongoDao({
            url : mongoUrl
        });
        dao.getPilotList(assertOfPilotList);

        function assertOfPilotList(err,data) {
            var expect = [
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
                    type : 'recoverHp',
                    value : 0.5
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
            assert.deepEqual(expect,data,'パイロットリストが正しい');
            assert.deepEqual(err,null,'errorオブジェクトがnullである');
            done();
        }

    });

});
