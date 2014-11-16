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
                        var playerData = createPlayerData(user,armdozer,pilot);
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

    that.getArmdozerList = function(fn){
        MongoClient.connect(url, function(err, db){
            getArmdozerList(db,function(err,armdozerList){
                db.close();
                fn(null,armdozerList);
            });
        });
    }

    //TODO : 削除予定
    that.getCharacterList = function(fn){
        MongoClient.connect(url, function(err, db){
            var characterList = new Array();
            var characterRecord;
            var collection = db.collection('armdozers');
            collection.find().toArray(function(err,result){
                for(var i in result){
                    characterRecord = {
                        id : result[i].armdozerId,
                        name : result[i].name
                    };
                    characterList.push(characterRecord)
                }
                db.close();
                fn(null,characterList);
            });

        });
    }

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

    that.getPilotList = function(fn){
        MongoClient.connect(url, function(err, db){
            getPilotList(db,function(err,pilotList){
                db.close();
                fn(null,pilotList);
            });
        });
    }

    that.getPilotData = function(pilotId,fn){
        MongoClient.connect(url, function(err, db){
            getPilotData(pilotId,db,function(err,data){
                fn(err,data);
                db.close();
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
                    var data = {
                        pilotList : pilotList,
                        armdozerList :armdozerList
                    };
                    db.close();
                    fn(null,data);
                })
            });
        });
    }
    
    function getOrCreateUserData(userId, db, fn){
        getUserData(userId, db, function(err,user){
            if(user!==null){
                fn(err,user);
            } else {
                createUser(userId,db,function(err,user){
                    fn(null,user);
                });
            }
        });
    }
    
    function getUserData(userId, db, fn) {
        var collection = db.collection('users');
        collection.findOne({
            userId : userId
        }, function(err, data) {
            var userData = null;
            if(data!==null){
                userData = {
                    userId : data.userId,
                    armdozerId : data.armdozerId,
                    pilotId : data.pilotId
                };
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

    function createPlayerData(user,armdozer,pilot) {
        var playerData = {
            userId : user.userId,
            status : createStatusData(armdozer,pilot)
        };

        return playerData;
    }

    function createStatusData(armdozer,pilot) {
        var statusData = createArmdozerData(armdozer);
        delete pilot.id;
        statusData.skill = pilot;
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
                characterRecord = createArmdozerData(result[i]);
                characterRecord.armdozerId = result[i].armdozerId;
                characterList.push(characterRecord)
            }
            fn(null,characterList);
        });
    }

    function createArmdozerData(armdozer){
        var armdozerData = {
            name : armdozer.name,
            pictName : armdozer.pictName,
            hp : armdozer.hp,
            speed : armdozer.speed,
            weapons : {
                1 : {
                    name : armdozer.weapons['1'].name,
                    power : armdozer.weapons['1'].power
                },
                2 : {
                    name : armdozer.weapons['2'].name,
                    power : armdozer.weapons['2'].power
                },
                3 : {
                    name : armdozer.weapons['3'].name,
                    power : armdozer.weapons['3'].power
                },
                4 : {
                    name : armdozer.weapons['4'].name,
                    power : armdozer.weapons['4'].power
                },
                5 : {
                    name : armdozer.weapons['5'].name,
                    power : armdozer.weapons['5'].power
                }
            }
        };
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