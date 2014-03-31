var MongoClient = require('mongodb').MongoClient;

/**
 * ユーザデータ
 */
var take = {
    userId : 'take',
    armdozerId : 'granBraver'
};

var uchi = {
    userId : 'uchi',
    armdozerId : 'landozer'
};

/**
 * アームドーザデータ
 */
var granBraver = {
    armdozerId : 'granBraver',
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
};

var landozer = {
    armdozerId : 'landozer',
    name : 'ランドーザ',
    pictName : 'Landozer.PNG',
    hp : 4700,
    speed : 150,
    weapons : {
        1 : {
            name : 'ブレイクパンチ',
            power : 1200
        },
        2 : {
            name : 'ブレイクパンチ',
            power : 1700
        },
        3 : {
            name : 'ブレイクパンチ',
            power : 2300
        },
        4 : {
            name : 'ブレイクパンチ',
            power : 2900
        },
        5 : {
            name : 'ブレイクパンチ',
            power : 3800
        }
    }
};

var userData = [take,uchi];
var armdozerData = [granBraver,landozer];

function insertData(mongoUrl,fnc) {
    MongoClient.connect(mongoUrl, function(err, db) {
        insertUserData(userData,db,function(err,result){
            insertArmdozerData(armdozerData,db,function(err,result){
                db.close();
                fnc(null,true);
            });
        });
    });
}

function insertUserData(userData,db,fnc) {
    var collection = db.collection('users');
    collection.remove({}, {}, function(err, deletes) {
        collection.insert(userData, function(err, data) {
            fnc(null, true);
        });
    });
}

function insertArmdozerData(armdozerData,db,fnc) {
    var collection = db.collection('armdozers');
    collection.remove({}, {}, function(err, deletes) {
        collection.insert(armdozerData, function(err, data) {
            fnc(null, true);
        });
    });
}

module.exports.insertData = insertData;