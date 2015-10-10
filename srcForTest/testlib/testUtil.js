module.exports = {
    /**
     * タッチイベント発火関数
     * @param {Object} target タッチイベントが発火するオブジェクト
     */
    touch: function(target){
        var core = enchant.Core.instance;
        core.currentScene.tl.delay(20).then(function() {
            target.dispatchEvent(new Event(Event.TOUCH_START));
        }).delay(20).then(function() {
            target.dispatchEvent(new Event(Event.TOUCH_END));
        });
    },

    /**
     * 画面系テスト終了時に呼ぶ関数
     */
    finishTest: function(){
        console.log('finish');
        $('title').text('finish');
    }
};