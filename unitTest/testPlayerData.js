//TODO : palyerDataとは、usersコレクションとarmdozersを結合したものである
//       データ構造はdbShell/createDB.jsを参照
var ce = require('cloneextend');
var user = {};

//TODO : 関数名をgetPlayerDataに変更したい。
function getUserData(userId){
    if((userId in user)===false){
       return null; 
    }
    
    var userData = ce.clone(user[userId]);
    return userData;
}

user['test001@gmail.com'] = {
    userId : 'test001@gmail.com',
    status : {
        name : 'グランブレイバー',
        pictName : 'GranBraver.PNG',
        hp : 3200,
        speed : 500,
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

user['test002@gmail.com'] = {
    userId : 'test002@gmail.com',
    status : {
        name : 'ランドーザ',
        pictName : 'Landozer.PNG',
        hp : 4700,
        speed : 300,
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
module.exports.getUserData = getUserData;