var PORT = process.env.PORT || 3000;
var BASE_URL = 'http://localhost:'+PORT;
var assert = require('chai').assert;
var webdriver = require('selenium-webdriver');
var test = require('selenium-webdriver/testing');
var testUtil = require('./testUtil.js');
var util;
var driver;

test.describe('シーン遷移', function() {
    test.before(function() {
        driver = new webdriver.Builder().
            withCapabilities(webdriver.Capabilities.chrome()).
            build();
        util = testUtil({
            baseUrl : BASE_URL,
            webdriver : driver
        });
    });

    test.after(function() {
        driver.quit();
    });
    
    test.it('トップメニューからルーム選択画面へ遷移', function(){
        util.doClientTest('/javascripts/changeSceneTest/topToRoomSelectTest.js');
    });

    test.it('トップメニューからアームドーザ選択画面へ遷移', function(){
        util.doClientTest('/javascripts/changeSceneTest/topToSetArmdozerTest.js');
    });

    test.it('アームドーザ選択画面から「ランドーザ」ボタンを押下してアームドーザ情報画面に遷移', function(){
        util.doClientTest('/javascripts/changeSceneTest/setArmdozerToArmdozerInfoTest.js');
    });

    test.it('アームドーザ選択画面から「戻る」ボタンを押下してトップ画面に遷移', function(){
        util.doClientTest('/javascripts/changeSceneTest/setArmdozerToTopTest_prev.js');
    });

    test.it('ルーム選択画面から戦闘画面に遷移', function(){
        util.doClientTest('/javascripts/changeSceneTest/roomSelectToBattleTest.js');
    });

    test.it('入室後に退室してトップ画面に遷移', function(){
        util.doClientTest('/javascripts/changeSceneTest/leaveRoomTest.js');
    });

    test.it('ルーム選択画面から「戻る」ボタンを押してトップ画面へ遷移', function(){
        util.doClientTest('/javascripts/changeSceneTest/roomSelectToTopTest.js');
    });

    test.it('敵を撃破してトップ画面へ戻る', function(){
        util.doClientTest('/javascripts/changeSceneTest/battleToTopTest_win.js');
    });

    test.it('撃破されてトップ画面へ戻る', function(){
        util.doClientTest('/javascripts/changeSceneTest/battleToTopTest_lose.js');
    });

    test.it('アームドーザ情報画面から「決定」を押してアームドーザ選択画面へ遷移する', function(){
        util.doClientTest('/javascripts/changeSceneTest/armdozerInfoToSetArmdozerTest.js');
    });

    test.it('アームドーザ情報画面から「戻る」を押してアームドーザ選択画面へ遷移する', function(){
        util.doClientTest('/javascripts/changeSceneTest/armdozerInfoToSetArmdozerForPushPrevButtonTest.js');
    });

    test.it('トップ画面からシングルプレイボタンを押して戦闘画面へ遷移', function(){
        util.doClientTest('/javascripts/changeSceneTest/topToSinglePlayTest.js');
    });
});