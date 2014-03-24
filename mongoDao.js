var mongoose = require('mongoose');

function mongoDao(spec, my) {
    var that = {};
    var db;
    var usersSchema = mongoose.Schema({
        userId : String,
        password : String,
        status : {
            name : String,
            pictName : String,
            hp : Number,
            speed : Number,
            weapons : {
                1 : {
                    name : String,
                    power : Number
                },
                2 : {
                    name : String,
                    power : Number
                },
                3 : {
                    name : String,
                    power : Number
                },
                4 : {
                    name : String,
                    power : Number
                },
                5 : {
                    name : String,
                    power : Number
                }
            }
        }
    });

    that.User = mongoose.model('Users', usersSchema);

    that.connect = function(url) {
        mongoose.connect(url);
        db = mongoose.connection;
    };

    that.getUserData = function(userId, fn) {
        that.User.findOne({
            userId : userId
        }, function(err, respUser) {
            var userInfo = crateUserInfo(respUser);
            fn(null, userInfo);
        });
    };

    function crateUserInfo(userData) {
        var userInfo = {
            userId : userData.userId,
            status : {
                name : userData.status.name,
                pictName : userData.status.pictName,
                hp : userData.status.hp,
                speed : userData.status.speed,
                weapons : {
                    1 : {
                        name : userData.status.weapons['1'].name,
                        power : userData.status.weapons['1'].power
                    },
                    2 : {
                        name : userData.status.weapons['2'].name,
                        power : userData.status.weapons['2'].power
                    },
                    3 : {
                        name : userData.status.weapons['3'].name,
                        power : userData.status.weapons['3'].power
                    },
                    4 : {
                        name : userData.status.weapons['4'].name,
                        power : userData.status.weapons['4'].power
                    },
                    5 : {
                        name : userData.status.weapons['5'].name,
                        power : userData.status.weapons['5'].power
                    }
                }
            }
        };
        return userInfo;
    }

    return that;
}

module.exports = mongoDao;