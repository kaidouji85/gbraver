enchant();
//TODO : モバイル環境でTouch to Start から先に進まない不具合を回避するために追加
//       http://make-muda.weblike.jp/2014/04/1283/
enchant.ENV.SOUND_ENABLED_ON_MOBILE_SAFARI = false;
window.onload = attackByPlayer;

function attackByPlayer(){
    var assert = chai.assert;
    var testDataInst = testData();
    var statusArray = {
        'test002@gmail.com' : testDataInst.getPlayerData('test002@gmail.com').status,
        'test001@gmail.com' : testDataInst.getPlayerData('test001@gmail.com').status
    };
    var Game;
    initGame();

    function initGame(){
        Game = game({
            userId : 'test001@gmail.com',
            armdozerPict : 'GranBraver.PNG'
        });
        Game.start();
        Game.onload = function(){
            Game.changeBattleScene({
                statusArray : statusArray
            });
            waitPhase();
        };
    }

    function waitPhase(){
        var waitPhaseData = {
            phase : 'wait',
            atackUserId : 'test001@gmail.com',
            turn : 20,
            statusArray : {
                'test002@gmail.com' : {
                    hp : 4700,
                    battery : 5,
                    active : 3000,
                    skillPoint : 1,
                    overHeatFlag : false
                },
                'test001@gmail.com' : {
                    hp : 3200,
                    battery : 5,
                    active : 5000,
                    skillPoint : 1,
                    overHeatFlag : false
                }
            }
        };
        Game.emitServerResp('resp',waitPhaseData);
        Game.onSendMessage(function(message,data){
            Game.currentScene.tl.delay(30).then(atackCommandPhase);
        });
    }

    function atackCommandPhase(){
        var atackCommandPhaseData = {
            phase : 'atackCommand',
            statusArray : {
                'test001@gmail.com' : {
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
            }
        };
        Game.emitServerResp('resp',atackCommandPhaseData);
        Game.currentScene.tl.delay(40).then(assertOfAttackCommandPhase);
    }

    function assertOfAttackCommandPhase() {
        assert.equal(Game.currentScene.skillIcon.getVisible(),true,'スキルアイコンが表示される');
        selectCommand();
    }


    function selectCommand(){
        touch(Game.currentScene.skillIcon);
        Game.onSendMessage(sendCommandForAttackCommand);
    }

    function sendCommandForAttackCommand(message,data){
        var expect = {
            method : 'pilotSkill'
        };
        assert.equal(message,'command','パイロットスキル発動のサーバ送信メッセージ名が正しい');
        assert.deepEqual(expect,data,'パイロットスキル発動のサーバ送信データが正しい');
        Game.currentScene.tl.delay(30).then(pilotSkillPhase);
    }

    function pilotSkillPhase() {
        var pilotSkillData = {
            phase : 'pilotSkill',
            statusArray : {
                'test001@gmail.com' : {
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
            }
        };
        Game.emitServerResp('resp',pilotSkillData);
        Game.onSendMessage(sendCommandForPilotSkill);
    }

    function sendCommandForPilotSkill(message,data) {
        var expect = {
            method : 'ok'
        };
        assert.equal(message,'command','パイロットスキル発動のサーバ送信メッセージ名が正しい');
        assert.deepEqual(expect,data,'パイロットスキル発動のサーバ送信データが正しい');
        assert.equal(Game.currentScene.mesWindow.getVisible(),true,'メッセージウインドウが表示される');
        assert.equal(Game.currentScene.mesWindow.getText(),'通信待機中','メッセージが正しい');
        Game.currentScene.tl.delay(30).then(attackCommandPhase2);
    }

    function attackCommandPhase2() {
        var attackCommandPhase2Data = {
            phase : 'atackCommand',
            statusArray : {
                'test001@gmail.com' : {
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
            }
        };
        Game.emitServerResp('resp',attackCommandPhase2Data);
        Game.currentScene.tl.delay(40).then(assertOfAttackCommand2);
    }

    function assertOfAttackCommand2(){
        assert.equal(Game.currentScene.skillIcon.getVisible(),false,'スキルアイコンが表示されない');
        finishTest();
    }

}