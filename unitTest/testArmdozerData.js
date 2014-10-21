var ce = require('cloneextend');
var armdozerList = {};

armdozerList['landozer'] = {
    id : 'landozer',
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
};

armdozerList['granBraver'] = {
    id : 'granBraver',
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
};


module.exports.getArmdozerData = function(armdozerId,fn) {
    var armdozerData = ce.clone(armdozerList[armdozerId]);
    delete armdozerData.id;
    fn(null,armdozerData);
}

module.exports.getArmdozerList = function(fn){
    var list = new Array();
    var data = null;
    for(var i in armdozerList){
        data = ce.clone(armdozerList[i]);
        list.push(data);
    }
    fn(null,list);
}