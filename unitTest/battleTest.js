describe('Battleクラスのテスト', function() {
    var assert = require('chai').assert;
    var battle = require('../battle.js');
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
            assert.equal(ret.atackUserId,'1','ユーザID1のターンになる');
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
            assert.equal(ret.atackUserId,'2','ユーザID2のターンになる');
            assert.isTrue(statusArray[5].active>=Battle.MAX_ACTIVE,"ユーザID5のアクティブゲージが最大値以上になる");
            assert.isTrue(statusArray[2].active>=Battle.MAX_ACTIVE,"ユーザID2のアクティブゲージが最大値以上になる");
            
        });
        
        it('自分のターンになったらバッテリーが1回復する',function(){
            var testData = {};
            testData[1] = {
                name : 'グランブレイバー',
                pictName : 'GranBraver.PNG',
                hp : 3200,
                speed : 230,
                active : 0,
                battery : 3,
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
                battery : 2,
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
            assert.equal(ret.atackUserId,'1','ユーザID1のターンになる');
            assert.equal(4,statusArray[1].battery,'バッテリーが1回復する');
            assert.isTrue(statusArray[1].active>=Battle.MAX_ACTIVE,"アクティブゲージが最大値以上になる"); 
        });        

        it('ウェイトフェイズのターン数を取得できる',function(){
            var testData = {};
            testData[1] = {
                name : 'グランブレイバー',
                pictName : 'GranBraver.PNG',
                hp : 3200,
                speed : 230,
                active : 0,
                battery : 3,
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
                battery : 2,
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
            assert.equal(ret.turn,Math.round(Battle.MAX_ACTIVE/statusArray[1].speed),'ターン経過数が取得できる');
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
                atackBattery : 2,
                defenthBattery : 1
            });
            var statusArray = Battle.getStatusArray();
            assert.equal(retAtack.hit,Battle.ATACK_HIT,'攻撃ヒット判定になる');
            assert.equal(retAtack.damage,1100,'ダメージが通常通りになる');
            assert.equal(statusArray[2].hp,3600,'HPが減っている');
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
            assert.equal(retAtack.hit,Battle.ATACK_GUARD,'防御判定になる');
            assert.equal(retAtack.damage,2100/2,'ダメージが半減される');
            assert.equal(statusArray[2].hp,3650,'HPが減っている');
        });
        
         it('防御側が多くバッテリーを出したので攻撃ミスになりダメージが0になる',function(){
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
                atackBattery : 2,
                defenthBattery : 4
            });
            var statusArray = Battle.getStatusArray();
            assert.equal(retAtack.hit,Battle.ATACK_MISS,'攻撃ミスになる');
            assert.equal(retAtack.damage,0,'ダメージが0になる');
            assert.equal(statusArray[2].hp,4700,'HPが減っていない');
        });
        
         it('防御側がバッテリーに0を指定したので、クリティカルヒットになる',function(){
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
                atackBattery : 1,
                defenthBattery : 0
            });
            var statusArray = Battle.getStatusArray();
            assert.equal(retAtack.hit,Battle.ATACK_CRITICAL,'クリィカルヒットになる');
            assert.equal(retAtack.damage,800*2,'ダメージが2倍になる');
            assert.equal(statusArray[2].hp,3100,'HPが減っている');
        });
        
        it('攻撃後にアクティブゲージが0になっている',function(){
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
            assert.equal(statusArray[1].active,0,'アクティブゲージが0になる');
        });
        
        it('攻撃後に攻撃側、防御側のバッテリーが減っている',function(){
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
            
            Battle.doWaitPhase();
            var retAtack = Battle.atack({
                atackBattery : 3,
                defenthBattery : 1
            });
            var statusArray = Battle.getStatusArray();
            assert.equal(statusArray[1].battery,2,'攻撃側バッテリーが減る');
            assert.equal(statusArray[2].battery,4,'防御側バッテリーが減る');
        });

        it('攻撃側が相手よりも2多くバッテリーを出したのでダメージボーナスがある',function(){
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

            Battle.doWaitPhase();
            var retAtack = Battle.atack({
                atackBattery : 3,
                defenthBattery : 1
            });
            var statusArray = Battle.getStatusArray();
            assert.equal(retAtack.hit,Battle.ATACK_HIT,'攻撃ヒット判定になる');
            assert.equal(retAtack.damage,1700,'ダメージに+100ボーナスが入る');
            assert.equal(statusArray[2].hp,3000,'HPが減っている');
        });

        it('0で攻撃したので攻撃は絶対にミスする',function(){
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

            Battle.doWaitPhase();
            var retAtack = Battle.atack({
                atackBattery : 0,
                defenthBattery : 0
            });
            var statusArray = Battle.getStatusArray();
            assert.equal(retAtack.hit,Battle.ATACK_MISS,'攻撃ミス判定になる');
            assert.equal(retAtack.damage,0,'ダメージが0である');
            assert.equal(statusArray[2].hp,4700,'HPに変化がない');
        });
    });
    
    describe('現在のステータスを取得', function() {
        it('ユーザIDを指定して、任意のキャラクターステータスを取り出す',function(){
            var testData = {};
            testData[8] = {
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
            testData[12] = {
                name : 'ゼロブレイバー',
                pictName : 'ZeroBraver.PNG',
                hp : 4200,
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
            
            var Battle = battle({
                statusArray : testData
            });
            var ret = Battle.getStatusArray();
            assert.deepEqual(testData[12],ret[12],'ユーザID12のステータスが取得できる');
        });
    });
    
    describe('チャージ',function(){
        it('チャージしてバッテリーが全回復する',function(){
            var testData = {};
            testData[1] = {
                name : 'グランブレイバー',
                pictName : 'GranBraver.PNG',
                hp : 3200,
                speed : 230,
                active : 0,
                battery : 1,
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
            
            Battle.doWaitPhase();
            Battle.charge();
            
            var statusArray = Battle.getStatusArray();
            assert.equal(statusArray[1].battery,5,'バッテリーが回復している');
        });
        
        it('チャージしてアクティブゲージが0になる',function(){
            var testData = {};
            testData[1] = {
                name : 'グランブレイバー',
                pictName : 'GranBraver.PNG',
                hp : 3200,
                speed : 230,
                active : 0,
                battery : 1,
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
            
            Battle.doWaitPhase();
            Battle.charge();
            
            var statusArray = Battle.getStatusArray();
            assert.equal(statusArray[1].active,0,'アクティブゲージが0になる');
        });

        it('2回連続でチャージするとアクティブゲージが1ターン分マイナスになる',function(){
            var testData = {};
            testData[1] = {
                name : 'グランブレイバー',
                pictName : 'GranBraver.PNG',
                hp : 3200,
                speed : 1000,
                active : 0,
                battery : 1,
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

            Battle.doWaitPhase();
            Battle.charge();
            Battle.doWaitPhase();
            Battle.charge();

            var statusArray = Battle.getStatusArray();
            assert.equal(statusArray[1].active,-Battle.MAX_ACTIVE,'アクティブゲージが1ターン分マイナスになる');
        });
    });
    
    describe('オブジェクトコピー',function(){
        it('オブジェクトがコピーされている',function(){
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
            
            Battle.doWaitPhase();
            var statusArray = Battle.getStatusArray();
            var expect = {
                1:{
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
                },
                2:{
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
                }
            };
            assert.deepEqual(testData,expect,'ステータスがコピーされている');
        });        
    });

    describe('ゲーム終了判定',function(){
        it('HPが0になったのでゲームが終了する',function(){
            var testData = {};
            testData['test001@gmail.com'] = {
                name : 'グランブレイバー',
                pictName : 'GranBraver.PNG',
                hp : 3200,
                speed : 230,
                active : 0,
                battery : 1,
                weapons : {
                    1 : {name : 'バスターナックル',power : 800},
                    2 : {name : 'バスターナックル',power : 1100},
                    3 : {name : 'バスターナックル',power : 1600},
                    4 : {name : 'バスターナックル',power : 2100},
                    5 : {name : 'バスターナックル',power : 2800}
                }
            };
            testData['test002@gmail.com'] = {
                name : 'ランドーザ',
                pictName : 'Landozer.PNG',
                hp : 0,
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
            var endFlag = Battle.isEnd();
            var winPlayer = Battle.getWinPlayer();
            assert.equal(endFlag,true,'HPが0になったので、ゲーム終了フラグがtrueになる');
            assert.equal(winPlayer,'test001@gmail.com','勝利したプレイヤーのIDがリターンされる');
        });

        it('HPが0より小さくなってもゲームが終了する',function(){
            var testData = {};
            testData['test001@gmail.com'] = {
                name : 'グランブレイバー',
                pictName : 'GranBraver.PNG',
                hp : 3200,
                speed : 230,
                active : 0,
                battery : 1,
                weapons : {
                    1 : {name : 'バスターナックル',power : 800},
                    2 : {name : 'バスターナックル',power : 1100},
                    3 : {name : 'バスターナックル',power : 1600},
                    4 : {name : 'バスターナックル',power : 2100},
                    5 : {name : 'バスターナックル',power : 2800}
                }
            };
            testData['test002@gmail.com'] = {
                name : 'ランドーザ',
                pictName : 'Landozer.PNG',
                hp : -1200,
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
            var endFlag = Battle.isEnd();
            var winPlayer = Battle.getWinPlayer();
            assert.equal(endFlag,true,'HPが0より小さいので、ゲーム終了フラグがtrueになる');
            assert.equal(winPlayer,'test001@gmail.com','勝利したプレイヤーのIDがリターンされる');
        });

        it('両プレイヤーともにHPが0より大きいので、ゲーム終了フラグがfalseになる',function(){
            var testData = {};
            testData['test001@gmail.com'] = {
                name : 'グランブレイバー',
                pictName : 'GranBraver.PNG',
                hp : 3200,
                speed : 230,
                active : 0,
                battery : 1,
                weapons : {
                    1 : {name : 'バスターナックル',power : 800},
                    2 : {name : 'バスターナックル',power : 1100},
                    3 : {name : 'バスターナックル',power : 1600},
                    4 : {name : 'バスターナックル',power : 2100},
                    5 : {name : 'バスターナックル',power : 2800}
                }
            };
            testData['test002@gmail.com'] = {
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
            var endFlag = Battle.isEnd();
            var winPlayer = Battle.getWinPlayer();
            assert.equal(endFlag,false,'両プレイヤーともにHPが0より大きいので、ゲーム終了フラグがfalseになる');
        });
    });

    describe('パイロットスキル発動',function(){
        it('クイックチャージでバッテリーを回復する',function(){
            var testData = {};
            testData['test001@gmail.com'] = {
                name : 'グランブレイバー',
                pictName : 'GranBraver.PNG',
                hp : 2000,
                speed : 250,
                active : 5000,
                battery : 0,
                skillPoint : 1,
                weapons : {
                    1 : {name : 'バスターナックル',power : 800},
                    2 : {name : 'バスターナックル',power : 1100},
                    3 : {name : 'バスターナックル',power : 1600},
                    4 : {name : 'バスターナックル',power : 2100},
                    5 : {name : 'バスターナックル',power : 2800}
                },
                skill : {
                    type : 'quickCharge',
                    battery : 3
                }
            };
            testData['test002@gmail.com'] = {
                name : 'ランドーザ',
                pictName : 'Landozer.PNG',
                hp : 4700,
                speed : 150,
                active : 0,
                battery : 5,
                pilotSKillPoint : 1,
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
            Battle.doWaitPhase(); //test001@gmail.comのバッテリーがターン経過で1回復する
            Battle.doPilotSkill();
            var statusArray = Battle.getStatusArray();
            assert.equal(statusArray['test001@gmail.com'].battery,4,'test001@gmail.comのHPが3回復する。');
            assert.equal(statusArray['test001@gmail.com'].skillPoint,0,'test001@gmail.comのスキルポイントが-1される。');
            assert.equal(statusArray['test002@gmail.com'].battery,5,'test002@gmail.comのバッテリーが回復しない。');
        });

        it('クイックチャージでもバッテリー上限を超えて回復しない',function(){
            var testData = {};
            testData['test001@gmail.com'] = {
                name : 'グランブレイバー',
                pictName : 'GranBraver.PNG',
                hp : 2000,
                speed : 250,
                active : 5000,
                battery : 2,
                skillPoint : 1,
                weapons : {
                    1 : {name : 'バスターナックル',power : 800},
                    2 : {name : 'バスターナックル',power : 1100},
                    3 : {name : 'バスターナックル',power : 1600},
                    4 : {name : 'バスターナックル',power : 2100},
                    5 : {name : 'バスターナックル',power : 2800}
                },
                skill : {
                    type : 'quickCharge',
                    battery : 3
                }
            };
            testData['test002@gmail.com'] = {
                name : 'ランドーザ',
                pictName : 'Landozer.PNG',
                hp : 4700,
                speed : 150,
                active : 0,
                battery : 5,
                pilotSKillPoint : 1,
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
            Battle.doWaitPhase(); //test001@gmail.comのバッテリーがターン経過で1回復する
            Battle.doPilotSkill();
            var statusArray = Battle.getStatusArray();
            assert.equal(statusArray['test001@gmail.com'].battery,5,'test001@gmail.comのHPが5以上にはならない。');
            assert.equal(statusArray['test001@gmail.com'].skillPoint,0,'test001@gmail.comのスキルポイントが-1される。');
            assert.equal(statusArray['test002@gmail.com'].battery,5,'test002@gmail.comのバッテリーが回復しない。');
        });
    });
}); 