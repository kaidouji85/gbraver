describe('敵ルーチンのテスト',function(){
    describe('攻撃ルーチンのバリデーション',function(){
        var enemyRoutineAttackValidate = require('../../server/enemyRoutineAttackValidate.js');
        var assert = require('chai').assert;

        it('現在バッテリー以上で攻撃しようとすると、0攻撃になる',function(){
            var command = {
                method : 'atack',
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

            var ret = enemyRoutineAttackValidate(command,statusArray);
            var expect = {
                method : 'atack',
                param : {
                    battery : 0
                }
            };
            assert.deepEqual(expect,ret,'0攻撃になる');
        });

        it('パイロットポイントが0でスキル発動すると、0攻撃になる',function(){
            var command = {
                method : 'pilotSkill'
            };
            var statusArray = {
                'nonePlayerCharacter' : {
                    hp : 3200,
                    battery : 5,
                    active : 5000,
                    skillPoint : 0,
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

            var ret = enemyRoutineAttackValidate(command,statusArray);
            var expect = {
                method : 'atack',
                param : {
                    battery : 0
                }
            };
            assert.deepEqual(expect,ret,'0攻撃になる');
        });
    });
});