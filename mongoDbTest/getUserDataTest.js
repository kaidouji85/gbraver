var assert = require('chai').assert;
var mongoDao = require('../mongoDao.js');
var insertData = require('./testData.js').insertData;

describe('Mongo DBからユーザ情報を取得する', function() {
    const mongoUrl = 'mongodb://localhost/gbraverTest';

    before(function(done) {
        insertData(mongoUrl,function(err, result) {
            done();
        });
    });

    it('存在するユーザの情報を取得したのでユーザ情報を取得することができる', function(done) {
        var dao = mongoDao({
            url : mongoUrl
        });
        dao.getPlayerData('take', function(err, userData) {
            assertOfUserData(userData);
            done();
        });

        function assertOfUserData(userData) {
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
                        },
                    }
                }
            };
            assert.deepEqual(userData, expect, '正しいユーザ情報を取得出来た');
        }
    });
    
    //TODO : DBに新規ユーザ登録されたことを確認するコードを追加する必要がある
    it('存在しないユーザ情報を取得したので、データベースにユーザが新規作成され、新規登録データを取得できる',function(done){
        var dao = mongoDao({
            url : mongoUrl
        });
        dao.getPlayerData('testuser8585@gmail.com', function(err, userData) {
            assertOfUserData(userData);
            done();
        });

        function assertOfUserData(userData) {
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
                        },
                    }
                }
            };
            assert.deepEqual(userData, expect, '正しいユーザ情報を取得出来た');
        }        
    });
});
