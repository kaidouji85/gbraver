//TODO : palyerDataとは、usersコレクションとarmdozersを結合したものである
//       データ構造はdbShell/createDB.jsを参照
var ce = require('cloneextend');
var player = {};

function getPlayerData(userId,fn){
    if((userId in player)===false){
       fn(new Error('user not exist.'),null);
    } else {
        var playerData = ce.clone(player[userId]);
        fn(null,playerData);
    }
}

player['test001@gmail.com'] = {
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
            }
        }
    }
};

player['test002@gmail.com'] = {
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

player['test003@gmail.com'] = {
    userId : 'test003@gmail.com',
    status : {
        name : '最強ブレイバー',
        pictName : 'Landozer.PNG',
        hp : 4700,
        speed : 1000,
        weapons : {
            1 : {
                name : 'ブレイクパンチ',
                power : 5000
            },
            2 : {
                name : 'ブレイクパンチ',
                power : 5000
            },
            3 : {
                name : 'ブレイクパンチ',
                power : 5000
            },
            4 : {
                name : 'ブレイクパンチ',
                power : 5000
            },
            5 : {
                name : 'ブレイクパンチ',
                power : 5000
            }
        }
    }
};

player['test004@gmail.com'] = {
    userId : 'test004@gmail.com',
    status : {
        name : 'グランブレイバー(クイックチャージ)',
        pictName : 'GranBraver.PNG',
        hp : 3200,
        speed : 1000,
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
            }
        },
        skill : {
            type : 'quickCharge',
            battery : 3
        }
    }
};

module.exports.getPlayerData = getPlayerData;