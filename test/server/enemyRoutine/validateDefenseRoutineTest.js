describe('敵ルーチンのテスト',function(){
    describe('防御ルーチンのバリデーション',function(){
        var enemyRoutineDefenseValidate = require('../../../server/enemyRoutineDefenseValidate.js');
        var assert = require('chai').assert;

        it('現在バッテリー以上で防御しようとすると、1防御になる',function(){
            var command = {
                method : 'defenth',
                param : {
                    battery : 3
                }
            };
            var statusArray = {
                'nonePlayerCharacter' : {
                    hp : 3200,
                    battery : 1,
                    active : 5000,
                    skillPoint : 1,
                    overHeatFlag : false
                },
                'test002@gmail.com' : {
                    hp : 4700,
                    battery : 5,
                    active : 3000,
                    skillPoint : 1,
                    overHeatFlag : false
                }
            };

            var ret = enemyRoutineDefenseValidate(command,statusArray);
            var expect = {
                method : 'defenth',
                param : {
                    battery : 1
                }
            };
            assert.deepEqual(ret,expect,'1防御になる');
        });

        it('バッテリーが0の時に1以上で防御しても、0防御になる',function(){
            var command = {
                method : 'defenth',
                param : {
                    battery : 3
                }
            };
            var statusArray = {
                'nonePlayerCharacter' : {
                    hp : 3200,
                    battery : 0,
                    active : 5000,
                    skillPoint : 1,
                    overHeatFlag : false
                },
                'test002@gmail.com' : {
                    hp : 4700,
                    battery : 5,
                    active : 3000,
                    skillPoint : 1,
                    overHeatFlag : false
                }
            };

            var ret = enemyRoutineDefenseValidate(command,statusArray);
            var expect = {
                method : 'defenth',
                param : {
                    battery : 0
                }
            };
            assert.deepEqual(ret,expect,'0防御になる');
        });

        it('マイナスで防御すると、0防御になる',function(){
            var command = {
                method : 'defenth',
                param : {
                    battery : -2
                }
            };
            var statusArray = {
                'nonePlayerCharacter' : {
                    hp : 3200,
                    battery : 5,
                    active : 5000,
                    skillPoint : 1,
                    overHeatFlag : false
                },
                'test002@gmail.com' : {
                    hp : 4700,
                    battery : 5,
                    active : 3000,
                    skillPoint : 1,
                    overHeatFlag : false
                }
            };

            var ret = enemyRoutineDefenseValidate(command,statusArray);
            var expect = {
                method : 'defenth',
                param : {
                    battery : 0
                }
            };
            assert.deepEqual(ret,expect,'0防御になる');
        });

        it('5を超えて防御すると、0防御になる',function(){
            var command = {
                method : 'defenth',
                param : {
                    battery : 7
                }
            };
            var statusArray = {
                'nonePlayerCharacter' : {
                    hp : 3200,
                    battery : 5,
                    active : 5000,
                    skillPoint : 1,
                    overHeatFlag : false
                },
                'test002@gmail.com' : {
                    hp : 4700,
                    battery : 5,
                    active : 3000,
                    skillPoint : 1,
                    overHeatFlag : false
                }
            };

            var ret = enemyRoutineDefenseValidate(command,statusArray);
            var expect = {
                method : 'defenth',
                param : {
                    battery : 0
                }
            };
            assert.deepEqual(ret,expect,'0防御になる');
        });
    });
});