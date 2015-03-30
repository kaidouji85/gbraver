var ce = require('cloneextend');

function battleUnitData() {
    var that = {};
    var unitData = {};

    (function(){
        unitData['granBraver'] = {
            name: 'グランブレイバー',
            pictName: 'GranBraver.PNG',
            hp: 3200,
            defense : 1000,
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
                battery : 3,
                hp : 0,
                power : 0,
                defense : 0,
                speed : 0
            },
            ability: {
                type: 'none'
            }
        };

        unitData['granBraverSpeed1000'] = ce.clone(unitData['granBraver']);
        unitData['granBraverSpeed1000'].speed = 1000;

        unitData['granBraverQuickCharge'] = ce.clone(unitData['granBraver']);
        unitData['granBraverQuickCharge'].pilot =
        {
            type : 'quickCharge',
            battery : 3,
            hp : 0,
            power : 0,
            defense : 0,
            speed : 0
        };

        unitData['granBraverStunAttack'] = ce.clone(unitData['granBraver']);
        unitData['granBraverStunAttack'].pilot =
        {
            type : 'stunAttack',
            hp : 0,
            power : 0,
            defense : 0,
            speed : 0
        }

        unitData['granBraverGuardBreak'] = ce.clone(unitData['granBraver']);
        unitData['granBraverGuardBreak'].pilot =
        {
            type : 'guardBreak',
            value : 300,
            hp : 0,
            power : 0,
            defense : 0,
            speed : 0
        }

        unitData['granBraverSuperGuard'] = ce.clone(unitData['granBraver']);
        unitData['granBraverSuperGuard'].pilot =
        {
            type : 'superGuard',
            value : 0.5,
            hp : 0,
            power : 0,
            defense : 0,
            speed : 0
        }

        unitData['granBraverBoostBattery'] = ce.clone(unitData['granBraver']);
        unitData['granBraverBoostBattery'].ability =
        {
            type : 'boostBattery',
            battery: 5,
            threshold: 0.3
        }

        unitData['granBraverBoostActive'] = ce.clone(unitData['granBraver']);
        unitData['granBraverBoostActive'].ability =
        {
            type : 'boostActive',
            active : 0.3,
            threshold: 0.3
        }

        unitData['landozer'] = {
            name: 'ランドーザ',
            pictName: 'Landozer.PNG',
            hp: 4700,
            defense : 1000,
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
                battery : 3,
                hp : 0,
                power : 0,
                defense : 500,
                speed : 0
            },
            ability: {
                type: 'none'
            }
        };

        unitData['landozerRecoverHp'] = ce.clone(unitData['landozer']);
        unitData['landozerRecoverHp'].hp = 3500;
        unitData['landozerRecoverHp'].pilot =
        {
            type : 'recoverHp',
            value : 0.5,
            hp : 0,
            power : 0,
            defense : 0,
            speed : 0
        };

        unitData['zeroBraver'] = {
            name : 'ゼロブレイバー',
            pictName : 'ZeroBraver.PNG',
            hp : 4200,
            defense : 1000,
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
                battery : 3,
                hp : 0,
                power : 0,
                defense : 0,
                speed : 0
            },
            ability: {
                type: 'none'
            }
        };
    })()

    that.get = function(unitId){
        return ce.clone(unitData[unitId]);
    }

    return that;
}

module.exports = battleUnitData;