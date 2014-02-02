describe('Battleクラスのテスト', function() {
    describe('ウェイトフェイズ', function() {
        it('素早いキャラクターのターンになる', function() {
            var testData = {};
            testData[1] = {
                name : 'グランブレイバー',
                pictName : 'GranBraver.PNG',
                hp : 3200,
                speed : 230,
                active : 0,
                battery : 5,
                weapons : {
                    1 : {name : 'バスターナックル',power : 800},
                    2 : {name : 'バスターナックル',power : 1100},
                    3 : {name : 'バスターナックル',power : 1600},
                    4 : {name : 'バスターナックル',power : 2100},
                    5 : {name : 'バスターナックル',power : 2800}
                }
            };
            testData[2] = {
                name : 'ランドーザ',
                pictName : 'Landozer.PNG',
                hp : 4700,
                speed : 150,
                active : 0,
                battery : 5,
                weapons : {
                    1 : {name:'ブレイクパンチ',power:1200},
                    2 : {name:'ブレイクパンチ',power:1700},
                    3 : {name:'ブレイクパンチ',power:2300},
                    4 : {name:'ブレイクパンチ',power:2900},
                    5 : {name:'ブレイクパンチ',power:3800}
                }
            }; 
            
            var Battle = battle({
                statusArray : testData    
            });
            
            var ret = Battle.doWaitPhase();
            var statusArray = Battle.getStatusArray();
            assert.equal('1',ret);
            assert.isTrue(statusArray[1].active>=Battle.MAX_ACTIVE,"アクティブゲージが最大値以上になる");
        });
        
        it('素早さが同じ場合は、インデックスが若いキャラクターのターンになる',function(){
            var testData = {};
            testData[5] = {
                name : 'グランブレイバー',
                pictName : 'GranBraver.PNG',
                hp : 3200,
                speed : 230,
                active : 0,
                battery : 5,
                weapons : {
                    1 : {name : 'バスターナックル',power : 800},
                    2 : {name : 'バスターナックル',power : 1100},
                    3 : {name : 'バスターナックル',power : 1600},
                    4 : {name : 'バスターナックル',power : 2100},
                    5 : {name : 'バスターナックル',power : 2800}
                }
            };
            testData[2] = {
                name : 'ゼロブレイバー',
                pictName : 'Landozer.PNG',
                hp : 4700,
                speed : 230,
                active : 0,
                battery : 5,
                weapons : {
                    1 : {name:'ブレイクパンチ',power:1200},
                    2 : {name:'ブレイクパンチ',power:1700},
                    3 : {name:'ブレイクパンチ',power:2300},
                    4 : {name:'ブレイクパンチ',power:2900},
                    5 : {name:'ブレイクパンチ',power:3800}
                }
            }; 
            
            var Battle = battle({
                statusArray : testData    
            });
            
            var ret = Battle.doWaitPhase();
            var statusArray = Battle.getStatusArray();
            assert.equal('2',ret);
            assert.isTrue(statusArray[5].active>=Battle.MAX_ACTIVE,"アクティブゲージが最大値以上になる");
            assert.isTrue(statusArray[2].active>=Battle.MAX_ACTIVE,"アクティブゲージが最大値以上になる");
            
        });
    });
    
    describe('攻撃', function() {
        it('攻撃側のバッテリーが多いので攻撃がヒットする',function(){
            var testData = {};
            testData[1] = {
                name : 'グランブレイバー',
                pictName : 'GranBraver.PNG',
                hp : 3200,
                speed : 230,
                active : 0,
                battery : 5,
                weapons : {
                    1 : {name : 'バスターナックル',power : 800},
                    2 : {name : 'バスターナックル',power : 1100},
                    3 : {name : 'バスターナックル',power : 1600},
                    4 : {name : 'バスターナックル',power : 2100},
                    5 : {name : 'バスターナックル',power : 2800}
                }
            };
            testData[2] = {
                name : 'ランドーザ',
                pictName : 'Landozer.PNG',
                hp : 4700,
                speed : 150,
                active : 0,
                battery : 5,
                weapons : {
                    1 : {name:'ブレイクパンチ',power:1200},
                    2 : {name:'ブレイクパンチ',power:1700},
                    3 : {name:'ブレイクパンチ',power:2300},
                    4 : {name:'ブレイクパンチ',power:2900},
                    5 : {name:'ブレイクパンチ',power:3800}
                }
            }; 
            
            var Battle = battle({
                statusArray : testData    
            });
            
            var retWaitPhase = Battle.doWaitPhase();
            var retAtack = Battle.atack({
                atackBattery : 3,
                defenthBattery : 1
            });
            var statusArray = Battle.getStatusArray();
            assert.equal('1',retWaitPhase);
            assert.equal(Battle.ATACK_HIT,retAtack.hit);
            assert.equal(1600,retAtack.damage);
            assert.equal(2,statusArray[1].battery);
            assert.equal(4,statusArray[2].battery);
        });
        
         it('攻撃・防御側が同じバッテリーを出したので防御判定になりダメージが半減される',function(){
            var testData = {};
            testData[1] = {
                name : 'グランブレイバー',
                pictName : 'GranBraver.PNG',
                hp : 3200,
                speed : 230,
                active : 0,
                battery : 5,
                weapons : {
                    1 : {name : 'バスターナックル',power : 800},
                    2 : {name : 'バスターナックル',power : 1100},
                    3 : {name : 'バスターナックル',power : 1600},
                    4 : {name : 'バスターナックル',power : 2100},
                    5 : {name : 'バスターナックル',power : 2800}
                }
            };
            testData[2] = {
                name : 'ランドーザ',
                pictName : 'Landozer.PNG',
                hp : 4700,
                speed : 150,
                active : 0,
                battery : 5,
                weapons : {
                    1 : {name:'ブレイクパンチ',power:1200},
                    2 : {name:'ブレイクパンチ',power:1700},
                    3 : {name:'ブレイクパンチ',power:2300},
                    4 : {name:'ブレイクパンチ',power:2900},
                    5 : {name:'ブレイクパンチ',power:3800}
                }
            }; 
            
            var Battle = battle({
                statusArray : testData    
            });
            
            var retWaitPhase = Battle.doWaitPhase();
            var retAtack = Battle.atack({
                atackBattery : 4,
                defenthBattery : 4
            });
            var statusArray = Battle.getStatusArray();
            assert.isTrue('1'===retWaitPhase,'ユーザID1のターンになる');
            assert.isTrue(Battle.ATACK_GUARD===retAtack.hit,'防御判定になる');
            assert.isTrue(2100/2===retAtack.damage,'ダメージが半減される');
            assert.isTrue(1===statusArray[1].battery,'攻撃側バッテリーが減る');
            assert.isTrue(1===statusArray[2].battery,'防御側バッテリーが減る');
        });
    });
}); 