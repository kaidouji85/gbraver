var MongoClient = require('mongodb').MongoClient;

var take = {
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

var uchi = {
    userId : 'uchi',
    status : {
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
    }
};

var testData = [take,uchi];

function insertData(mongoUrl,fnc) {
    MongoClient.connect(mongoUrl, function(err, db) {
        var collection = db.collection('users');
        collection.remove({}, {}, function(err, deletes) {
            collection.insert(testData, function(err, data) {
                db.close();
                fnc(null, true);
            });
        });
    });
}

module.exports.insertData = insertData;