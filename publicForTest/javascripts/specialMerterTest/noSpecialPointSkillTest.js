enchant();
window.onload = doTest;

function doTest() {
    var assert = chai.assert;
    var testMerter = null;
    var testGame = gameBase();

    testGame.start();
    testGame.onload = viewSpecialMerter;

    function viewSpecialMerter() {
        testMerter = specialMerter({
            isPlayer : true,
            ability : {
                type : 'boostActive',
                value : 0.3
            }
        });
        testGame.currentScene.addChild(testMerter);
        assertOfMerter();
    }

    function assertOfMerter(){
        assert.equal(testMerter.getMaxValue(),0,'最大値が正しい');
        assert.equal(testMerter.number.getVisible(),false,'数字が表示されていない');
        finishTest();
    }
}