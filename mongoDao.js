var MongoClient = require('mongodb').MongoClient;

function mongoDao(spec, my) {
    var that = {};
    var url = spec.url;

    that.getPlayerData = function(userId, fn) {
        MongoClient.connect(url, function(err, db) {
            getUserData(userId,db,function(err,user){
                var armdozerId = user.armdozerId;
                getArmdozerData(armdozerId,db,function(err,armdozer){
                    var playerData = createPlayerData(user,armdozer);
                    db.close();
                    fn(null,playerData);
                });
            });
        });
    };
    
    function getUserData(userId, db, fn) {
        var collection = db.collection('users');
        collection.findOne({
            userId : userId
        }, function(err, data) {
            fn(null, data);
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

    return that;
}

module.exports = mongoDao;