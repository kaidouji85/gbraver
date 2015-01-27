var ce = require('cloneextend');

function battleUnitData() {
    var that = {};
    var unitData = {};

    (function(){
        unitData['granBraver'] = {
            name: 'グランブレイバー',
            pictName: 'GranBraver.PNG',
            hp: 3200,
            defense : 0,
            speed: 230,
            active: 0,
            battery: 5,
            overHeatFlag : false,
            skillPoint : 1,
            weapons: {
                1: {name: 'バスターナックル', power: 800},
                2: {name: 'バスターナックル', power: 1100},
                3: {name: 'バスターナックル', power: 1600},
                4: {name: 'バスターナックル', power: 2100},
                5: {name: 'バスターナックル', power: 2800}
            },
            pilot : {
                type : 'quickCharge',
                battery : 3
            }
        };

        unitData['granBraverSpeed1000'] = ce.clone(unitData['granBraver']);
        unitData['granBraverSpeed1000'].speed = 1000;

        unitData['granBraverQuickCharge'] = ce.clone(unitData['granBraver']);
        unitData['granBraverQuickCharge'].pilot =
        {
            type : 'quickCharge',
            battery : 3
        };

        unitData['granBraverStunAttack'] = ce.clone(unitData['granBraver']);
        unitData['granBraverStunAttack'].pilot =
        {
            type : 'stunAttack'
        }

        unitData['granBraverGuardBreak'] = ce.clone(unitData['granBraver']);
        unitData['granBraverGuardBreak'].pilot =
        {
            type : 'guardBreak',
            value : 300
        }

        unitData['landozer'] = {
            name: 'ランドーザ',
            pictName: 'Landozer.PNG',
            hp: 4700,
            defense : 0,
            speed: 150,
            active: 0,
            battery: 5,
            overHeatFlag : false,
            skillPoint : 1,
            weapons: {
                1: {name: 'ブレイクパンチ', power: 1200},
                2: {name: 'ブレイクパンチ', power: 1700},
                3: {name: 'ブレイクパンチ', power: 2300},
                4: {name: 'ブレイクパンチ', power: 2900},
                5: {name: 'ブレイクパンチ', power: 3800}
            },
            pilot : {
            type : 'quickCharge',
                battery : 3
        }
        };

        unitData['landozerDefense200'] = ce.clone(unitData['landozer']);
        unitData['landozerDefense200'].defense = 200;

        unitData['landozerRecoverHp'] = ce.clone(unitData['landozer']);
        unitData['landozerRecoverHp'].hp = 3500;
        unitData['landozerRecoverHp'].pilot =
        {
            type : 'recoverHp',
            value : 0.5
        };

        unitData['zeroBraver'] = {
            name : 'ゼロブレイバー',
            pictName : 'ZeroBraver.PNG',
            hp : 4200,
            defense : 0,
            speed : 230,
            active : 0,
            battery : 5,
            overHeatFlag : false,
            skillPoint : 1,
            weapons : {
                1 : {name : 'バスターナックル',power : 800},
                2 : {name : 'バスターナックル',power : 1100},
                3 : {name : 'バスターナックル',power : 1600},
                4 : {name : 'バスターナックル',power : 2100},
                5 : {name : 'バスターナックル',power : 2800}
            },
            pilot : {
                type : 'quickCharge',
                battery : 3
            }
        };
    })()

    that.get = function(unitId){
        return ce.clone(unitData[unitId]);
    }

    return that;
}

module.exports = battleUnitData;