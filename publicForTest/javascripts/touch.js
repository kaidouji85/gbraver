/**
 * タッチイベント発火関数
 * @param {Object} target タッチイベントが発火するオブジェクト
 */
function touch(target){
    var core = enchant.Core.instance;
    core.currentScene.tl.delay(20).then(function() {
        target.dispatchEvent(new Event(Event.TOUCH_START));
    }).delay(20).then(function() {
        target.dispatchEvent(new Event(Event.TOUCH_END));
    });
}