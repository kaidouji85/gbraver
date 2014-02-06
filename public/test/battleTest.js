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
            assert.equal(ret.atackUserId,'1','ユーザID1のターンになる');
            assert.equal(ret.turn,Math.round(Battle.MAX_ACTIVE/statusArray[1].speed),'ターン経過数が取得できる');
            assert.isTrue(statusArray[1].active>=Battle.MAX_ACTIVE,"アクティブゲージが最大値以上になる"); 
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
            assert.equal(retWaitPhase.atackUserId,'1','ユーザID1のターンになる');
            assert.equal(retAtack.hit,Battle.ATACK_HIT,'攻撃ヒット判定になる');
            assert.equal(retAtack.damage,1600,'ダメージが通常通りになる');
            assert.equal(statusArray[1].battery,2,'ユーザID1の残バッテリー');
            assert.equal(statusArray[2].battery,4,'ユーザID2の残バッテリー');
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
            assert.equal(retWaitPhase.atackUserId,'1','ユーザID1のターンになる');
            assert.equal(retAtack.hit,Battle.ATACK_GUARD,'防御判定になる');
            assert.equal(retAtack.damage,2100/2,'ダメージが半減される');
            assert.equal(statusArray[1].battery,1,'攻撃側バッテリーが減る');
            assert.equal(statusArray[2].battery,1,'防御側バッテリーが減る');
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
            assert.equal(retWaitPhase.atackUserId,'1','ユーザID1のターンになる');
            assert.equal(retAtack.hit,Battle.ATACK_MISS,'攻撃ミスになる');
            assert.equal(retAtack.damage,0,'ダメージが0になる');
            assert.equal(statusArray[1].battery,3,'攻撃側バッテリーが減る');
            assert.equal(statusArray[2].battery,1,'防御側バッテリーが減る');
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
                atackBattery : 5,
                defenthBattery : 0
            });
            var statusArray = Battle.getStatusArray();
            assert.equal(retWaitPhase.atackUserId,'1','ユーザID1のターンになる');
            assert.equal(retAtack.hit,Battle.ATACK_CRITICAL,'クリィカルヒットになる');
            assert.equal(retAtack.damage,2800*2,'ダメージが2倍になる');
            assert.equal(statusArray[1].battery,0,'攻撃側バッテリーが減る');
            assert.equal(statusArray[2].battery,5,'防御側バッテリーが減る');
        });
    });
    
    describe('現在のステータスを取得', function() {
        it('ユーザ１IDを指定して、任意のキャラクターステータスを取り出す',function(){
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
        
        it('ステータスがコピーされている', function() {
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
            testData[1].hp = 100;
            assert.notEqual(testData[1].hp,statusArray[1].hp,'コピーされているのでHPは違う値になる');    
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
    });
}); 