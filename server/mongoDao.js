var MongoClient = require('mongodb').MongoClient;
var ce = require('cloneextend');

function mongoDao(spec, my) {
    var that = {};
    var url = spec.url;

    that.getPlayerData = function(userId, fn) {
        MongoClient.connect(url, function(err, db) {
            getOrCreateUserData(userId,db,function(err,user){
                var armdozerId = user.armdozerId;
                var pilotId = user.pilotId;
                getArmdozerData(armdozerId,db,function(err,armdozer){
                    getPilotData(pilotId,db,function(err,pilot){
                        var playerData = createPlayerData(user.userId,armdozer,pilot);
                        db.close();
                        fn(null,playerData);
                    });
                });
            });
        });
    };
    
    that.getUserData = function(userId,fn){
        MongoClient.connect(url, function(err, db) {
            getOrCreateUserData(userId,db,function(err,userData){
                db.close();
                fn(null,userData);
            });
        });        
    };
    
    that.setArmdozerId = function(userId,armdozerId,fn){
        MongoClient.connect(url, function(err, db) {
            var collection = db.collection('users');          
            collection.update({userId : userId}, {$set : {armdozerId : armdozerId}},{},function(err) {
                db.close();
                var result = err===null ? true : false;
                fn(err,result);
            });
        });
    };

    //TODO : 削除予定
    that.getCharacterInfo = function(armdozerId,fn){
        MongoClient.connect(url, function(err, db){
            var characterInfo = null;
            getArmdozerData(armdozerId,db,function(err,result){
                characterInfo = createArmdozerData(result);
                characterInfo.armdozerId = armdozerId;
                db.close();
                fn(null,characterInfo);
            });
        });
    }

    that.setPilotId = function(userId,pilotId,fn){
        MongoClient.connect(url, function(err, db){
            var collection = db.collection('users');
            collection.update({userId : userId}, {$set : {pilotId : pilotId}},{},function(err) {
                db.close();
                var result = err===null ? true : false;
                fn(err,result);
            });
        });
    }

    that.getMasterData = function(fn){
        MongoClient.connect(url, function(err, db){
            getPilotList(db,function(err,pilotList){
                getArmdozerList(db,function(err,armdozerList){
                    getStageData(db,function(err,stageData){
                        var data = {
                            pilotList : pilotList,
                            armdozerList :armdozerList,
                            stageData : stageData
                        };
                        db.close();
                        fn(null,data);
                    });
                })
            });
        });
    }

    that.getEnemyData = function(armdozerId,pilotId,fn){
        MongoClient.connect(url, function(err, db) {
            getArmdozerData(armdozerId,db,function(err,armdozer){
                getPilotData(pilotId,db,function(err,pilot){
                    var enemyData = createPlayerData('nonePlayerCharacter',armdozer,pilot);
                    db.close();
                    fn(null,enemyData);
                });
            });
        });
    }
    
    function getOrCreateUserData(userId, db, fn){
        getUserDataByMongoDb(userId, db, function(err,user){
            if(user!==null){
                fn(err,user);
            } else {
                createUser(userId,db,function(err,user){
                    fn(null,user);
                });
            }
        });
    }
    
    function getUserDataByMongoDb(userId, db, fn) {
        var collection = db.collection('users');
        collection.findOne({
            userId : userId
        }, function(err, data) {
            var userData = null;
            if(data!==null){
                userData = ce.clone(data);
                delete userData._id;
            }
            fn(null, userData);
        });
    }
    
    function createUser(userId,db,fn){
        var collection = db.collection('users');
        var userData = {
            userId : userId,
            armdozerId : 'granBraver',
            pilotId : 'kyoko'
        };
        var insertData = ce.clone(userData);
        collection.insert(insertData, function(err, data) {
            fn(null, userData);
        });   
    }

    function getArmdozerData(armdozerId, db, fn) {
        var collection = db.collection('armdozers');
        collection.findOne({
            armdozerId : armdozerId
        }, function(err, data) {
            fn(null, data);
        });
    }

    function getPilotData(pilotId, db, fn){
        var collection = db.collection('pilots');
        collection.findOne({
            id:pilotId
        },function(err,data){
            var pilotData = createPilotData(data);
            fn(null,pilotData);
        });
    }

    function createPlayerData(userId,armdozer,pilot) {
        var playerData = {
            userId : userId,
            status : createStatusData(armdozer,pilot)
        };

        return playerData;
    }

    function createStatusData(armdozer,pilot) {
        var statusData = createArmdozerData(armdozer);
        delete pilot.id;
        statusData.pilot = pilot;
        return statusData;
    }

    function getPilotList(db,fn){
        var pilotList = new Array();
        var pilot = null;
        var collection = db.collection('pilots');
        collection.find({}).toArray(function(err,result){
            for(var i in result){
                pilot = createPilotData(result[i]);
                pilotList.push(pilot);
            }
            fn(null,pilotList);
        });
    }

    function getArmdozerList(db,fn){
        var characterList = new Array();
        var characterRecord;
        var collection = db.collection('armdozers');
        collection.find().toArray(function(err,result){
            for(var i in result){
                if(result[i].cpuOnly === undefined){
                    characterRecord = createArmdozerData(result[i]);
                    characterRecord.armdozerId = result[i].armdozerId;
                    characterList.push(characterRecord)
                }
            }
            fn(null,characterList);
        });
    }

    function getStageData(db,fn){
        var stageDataArray = new Array();
        var stageDataRecord;
        var collection = db.collection('stages');
        collection.find().toArray(function(err,result){
            for(var i in result){
                stageDataRecord = ce.clone(result[i]);
                delete stageDataRecord._id;
                stageDataArray.push(stageDataRecord);
            }
            fn(null,stageDataArray);
        });
    }

    function createArmdozerData(armdozer){
        var armdozerData = ce.clone(armdozer);
        delete armdozerData._id;
        delete armdozerData.armdozerId;
        return armdozerData;
    }

    function createPilotData(data){
        var pilotData = ce.clone(data);
        delete pilotData._id;
        return pilotData;
    }

    //fo debug
    function getTime(){
        var time = new Date();
        return time.getHours()+':'+time.getMinutes()+':'+time.getSeconds()+':'+time.getMilliseconds();
    }

    return that;
}

module.exports = mongoDao;