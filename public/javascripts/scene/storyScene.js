function storyScene(spec,my) {
    var core = enchant.Core.instance;
    var that = new Scene();
    var scenarioArray  = spec.scenarioData;
    var pilotList = spec.pilotList;
    var storyIndex = 0;
    var emitProceedStory = function(){};
    var methodMap = {
        mes : doMes,
        pilot : doPilot
    };

    that.pilotSpriteArray = {
        right : null,
        left : null
    };

    (function(){
        //背景色
        that.backgroundColor = "black";

        //パイロットスプライト
        for(var pid in that.pilotSpriteArray){
            that.pilotSpriteArray[pid] = new Sprite(256,256);
            that.pilotSpriteArray[pid].visible = false;
            that.pilotSpriteArray[pid].x = pid==='left' ? -64 : 128;;
            that.pilotSpriteArray[pid].y = 100;
            that.pilotSpriteArray[pid].scaleX = pid==='left' ? -1 : 1;
            that.addChild(that.pilotSpriteArray[pid]);
        }

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
        doStory();
    })()

    that.getStoryIndex = function(){
        return storyIndex;
    }

    that.onProceedStory = function(fn){
        emitProceedStory = fn;
    }

    function doStory(){
        if(scenarioArray.length <= storyIndex){
            return;
        }

        var scenario = scenarioArray[storyIndex];
        var ret = methodMap[scenario.method](scenario.param);
        storyIndex ++;
        emitProceedStory();
        if(ret) {
            doStory();
        }
    }

    function doMes(param) {
        that.mesWindow.setText(param);
        return false;
    }

    function doPilot(param){
        var dir = param.dir;
        var pilotData = getPilotData(param.id);
        var pict = core.assets[core.PICT_PREFIX+pilotData.pict];
        that.pilotSpriteArray[dir].visible = true;
        that.pilotSpriteArray[dir].image = pict;
        return true;
    }

    function pushScreen(){
        var scenario = scenarioArray[storyIndex];
        if( scenario.method === 'mes' ){
            doStory();
        }
    }

    function getPilotData(pilotId){
        for(var i=0; i<pilotList.length; i++){
            if(pilotList[i].id === pilotId){
                return pilotList[i];
            }
        }
    }

    return that;
}