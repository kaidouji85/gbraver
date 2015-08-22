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
                type : 'hyperShield',
                value : 1500
            }
        });
        testGame.currentScene.addChild(testMerter);
        assertOfMerter();
    }

    function assertOfMerter(){
        assert.equal(testMerter.getMaxValue(),1500,'最大値が正しい');
        assert.equal(testMerter.number.getVisible(),true,'数字が表示されいる');
        assert.equal(testMerter.number.getValue(),1500,'初期値が正しい');
        finishTest();
    }
}