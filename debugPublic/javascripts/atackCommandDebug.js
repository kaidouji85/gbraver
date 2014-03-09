var core;
enchant();
window.onload = function() {
    core = new Core(320, 320);
    core.fps = 60;
    core.rootScene.backgroundColor = "black";
    core.start();
    core.onload = function(){
               
    };
};
