function storyScene(spec,my) {
    var core = enchant.Core.instance;
    var that = new Scene();
    var scenarioData  = spec.scenarioData;
    var storyIndex = 0;
    var emitProceedStory = function(index, scenario){};

    (function(){
        //背景色
        that.backgroundColor = "black";

        //メッセージウインドウ
        that.mesWindow = storyWindow({
            pict : core.assets[core.PICT_WINDOW],
            height : 144
        });
        that.mesWindow.x = 0;
        that.mesWindow.y = 336;
        that.addChild(that.mesWindow);

        //イベント
        that.addEventListener(Event.TOUCH_END,pushScreen);

        doStory(scenarioData[storyIndex]);
    })()

    that.getStoryIndex = function(){
        return storyIndex;
    }

    that.onProceedStory = function(fn){
        emitProceedStory = fn;
    }

    function doStory(scenario){
        switch(scenario.method){
            case 'mes' :
                that.mesWindow.setText(scenario.param);
                break;
            default:
                break;
        }
        emitProceedStory(storyIndex,scenarioData[storyIndex]);
    }

    function pushScreen(){
        storyIndex ++;
        doStory(scenarioData[storyIndex]);
    }

    return that;
}