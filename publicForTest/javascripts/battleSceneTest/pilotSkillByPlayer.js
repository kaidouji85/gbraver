enchant();
//TODO : モバイル環境でTouch to Start から先に進まない不具合を回避するために追加
//       http://make-muda.weblike.jp/2014/04/1283/
enchant.ENV.SOUND_ENABLED_ON_MOBILE_SAFARI = false;
window.onload = attackByPlayer;

function attackByPlayer(){
    var assert = chai.assert;
    var statusArray = {
        'test002@gmail.com' : getTestPlayerData('test002@gmail.com'),
        'test001@gmail.com' : getTestPlayerData('test001@gmail.com')
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
                    skillPoint : 1
                },
                'test001@gmail.com' : {
                    hp : 3200,
                    battery : 5,
                    active : 5000,
                    skillPoint : 1
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
                    skillPoint : 1
                },
                'test002@gmail.com' : {
                    hp : 4700,
                    battery : 5,
                    active : 3000,
                    skillPoint : 1
                }
            }
        };
        Game.emitServerResp('resp',atackCommandPhaseData);
        assert.equal(Game.currentScene.mesWindow.getVisible(),false,'メッセージウインドウが表示されない');
        selectCommand();
    }

    function selectCommand(){
        touch(Game.currentScene.skillIcon);
        Game.onSendMessage(sendCommandForPilotSkill);
    }

    function sendCommandForPilotSkill(message,data){
        var expect = {
            method : 'pilotSkill'
        };
        assert.equal(message,'command','パイロットスキル発動のサーバ送信メッセージ名が正しい');
        assert.deepEqual(expect,data,'パイロットスキル発動のサーバ送信データが正しい');
    }



}