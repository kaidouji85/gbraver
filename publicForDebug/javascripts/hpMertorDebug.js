var core;

enchant();
window.onload = function() {
    core = new Core(320, 320);
    core.fps = 60;
    core.rootScene.backgroundColor = "black";
    core.start();
    core.onload = function() {
        var test1 = hpMertor();
        test1.x = 30;
        test1.y = 30;
        test1.setValue(1000);
        core.rootScene.addChild(test1);
        
        var test2 = hpMertor();
        test2.x = 30;
        test2.y = 60;
        test2.setValue(100);
        core.rootScene.addChild(test2);
        
        var test3 = hpMertor();
        test3.x = 30;
        test3.y = 90;
        test3.setValue(10);
        core.rootScene.addChild(test3);
        
        var test4 = hpMertor();
        test4.x = 30;
        test4.y = 120;
        test4.setValue(1);
        core.rootScene.addChild(test4);     
    };
};
