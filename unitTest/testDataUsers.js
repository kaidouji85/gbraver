var ce = require('cloneextend');
var user = {};

function getUserData(userId){
    if((userId in user)===false){
       return null; 
    }
    
    var userData = ce.clone(user[userId]);
    return userData;
}

user[0] = {
    userId : 0,
    status : {
        name : 'ゼロブレイバー',
        pictName : 'GranBraver.PNG',
        hp : 4200,
        speed : 500,
        weapons : {
            1 : {
                name : 'ゼロナックル',
                power : 1200
            },
            2 : {
                name : 'ゼロナックル',
                power : 1200
            },
            3 : {
                name : 'ゼロナックル',
                power : 1700
            },
            4 : {
                name : 'ゼロナックル',
                power : 2700
            },
            5 : {
                name : 'ゼロナックル',
                power : 3700
            },
        }
    }
};

user[1] = {
    userId : 1,
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

user[2] = {
    userId : 2,
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