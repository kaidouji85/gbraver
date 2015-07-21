var ce = require('cloneextend');

function battleUnitData() {
    var that = {};
    var unitData = {};

    function addData(id,data){
        data.active = 0;
        data.battery = 5;
        data.overHeatFlag = false;
        data.skillPoint = 1;
        data.specialPoint = 0;
        unitData[id] = data;
    }

    (function(){
        var granBraver = {
            name: 'グランブレイバー',
            pictName: 'GranBraver.PNG',
            hp: 3200,
            defense : 1000,
            speed: 230,
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
        }
        addData('granBraver',granBraver);

        addData('granBraverSpeed1000',ce.cloneextend(granBraver,{
            speed : 1000
        }));

        addData('granBraverQuickCharge',ce.cloneextend(granBraver,{
            pilot : {
                type : 'quickCharge',
                battery : 3,
                hp : 0,
                power : 0,
                defense : 0,
                speed : 0
            }
        }));

        addData('granBraverStunAttack',ce.cloneextend(granBraver,{
            pilot : {
                type : 'stunAttack',
                hp : 0,
                power : 0,
                defense : 0,
                speed : 0
            }
        }));

        addData('granBraverGuardBreak',ce.cloneextend(granBraver,{
            pilot : {
                type : 'guardBreak',
                value : 300,
                hp : 0,
                power : 0,
                defense : 0,
                speed : 0
            }
        }));

        addData('granBraverSuperGuard',ce.cloneextend(granBraver,{
            pilot : {
                type : 'superGuard',
                value : 0.5,
                hp : 0,
                power : 0,
                defense : 0,
                speed : 0
            }
        }));

        addData('granBraverBoostBattery',ce.cloneextend(granBraver,{
            ability: {
                type : 'boostBattery',
                battery: 5,
                threshold: 0.3
            }
        }));

        addData('granBraverBoostActive',ce.cloneextend(granBraver,{
            ability : {
                type : 'boostActive',
                active : 0.3,
                threshold: 0.3
            }
        }));

        addData('granBraverBoostPower',ce.cloneextend(granBraver,{
            ability: {
                type : 'boostPower',
                power : 100,
                threshold: 0.3
            }
        }));

        var landozer =  {
            name: 'ランドーザ',
            pictName: 'Landozer.PNG',
            hp: 4700,
            defense : 1000,
            speed: 150,
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
        }
        addData('landozer',landozer);

        addData('landozerRecoverHp',ce.cloneextend(landozer,{
            hp : 3500,
            pilot: {
                type : 'recoverHp',
                value : 0.5,
                hp : 0,
                power : 0,
                defense : 0,
                speed : 0
            }
        }));

        addData('landozerHyperArmor',ce.cloneextend(landozer,{
            ability : {
                type: 'hyperArmor',
                value : 0
            }
        }));

        addData('landozerHyperShield',ce.cloneextend(landozer,{
            ability: {
                type: 'hyperShield',
                value : 1000
            }
        }));

        var zeroBraver = {
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
        addData('zeroBraver',zeroBraver);
    })()

    that.get = function(unitId){
        return ce.clone(unitData[unitId]);
    }

    return that;
}

module.exports = battleUnitData;