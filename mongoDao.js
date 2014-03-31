var MongoClient = require('mongodb').MongoClient;

function mongoDao(spec, my) {
    var that = {};
    var url = spec.url;

    that.getUserData = function(userId, fn) {
        MongoClient.connect(url, function(err, db) {
            var collection = db.collection('users');
            collection.findOne({
                userId : userId
            }, function(err, data) {
                userData = createUserData(data);
                fn(null, userData);
                db.close();
            });
        });
    };

    function createUserData(data) {
        var userData = {
            userId : data.userId,
            status : {
                name : data.status.name,
                pictName : data.status.pictName,
                hp : data.status.hp,
                speed : data.status.speed,
                weapons : {
                    1 : {
                        name : data.status.weapons['1'].name,
                        power : data.status.weapons['1'].power
                    },
                    2 : {
                        name : data.status.weapons['2'].name,
                        power : data.status.weapons['2'].power
                    },
                    3 : {
                        name : data.status.weapons['3'].name,
                        power : data.status.weapons['3'].power
                    },
                    4 : {
                        name : data.status.weapons['4'].name,
                        power : data.status.weapons['4'].power
                    },
                    5 : {
                        name : data.status.weapons['5'].name,
                        power : data.status.weapons['5'].power
                    }
                }
            }
        };

        return userData;
    }

    return that;
}

module.exports = mongoDao;