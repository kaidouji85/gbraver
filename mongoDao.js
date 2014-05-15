var MongoClient = require('mongodb').MongoClient;

function mongoDao(spec, my) {
    var that = {};
    var url = spec.url;

    that.getPlayerData = function(userId, fn) {
        MongoClient.connect(url, function(err, db) {
            getOrCreateUserData(userId,db,function(err,user){
                var armdozerId = user.armdozerId;
                getArmdozerData(armdozerId,db,function(err,armdozer){
                    var playerData = createPlayerData(user,armdozer);
                    db.close();
                    fn(null,playerData);
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
            fn(null, data);
        });
    }
    
    function createUser(userId,db,fn){
        var collection = db.collection('users');
        var userData = {
            userId : userId,
            armdozerId : 'granBraver'
        };
        collection.insert(userData, function(err, data) {
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

    function createPlayerData(user,armdozer) {
        var playerData = {
            userId : user.userId,
            status : {
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
            }
        };

        return playerData;
    }
    
    function updateUserDate(updateDate,db,fn){
        
    }

    return that;
}

module.exports = mongoDao;