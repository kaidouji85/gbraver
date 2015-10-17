module.exports = function(spec,my){
    var that = {};
    var bgm = null;

    that.setBgm = function(p_bgm) {
        if(p_bgm && p_bgm !== bgm){
            if(bgm!==null){
                bgm.stop();
            }
            bgm = p_bgm;
            bgm.play();
            bgm.src.loop = true;
        }
    }

    that.getBgm = function(){
        return bgm;
    }

    that.setMute = function(){
        if(bgm){
            bgm.stop();
            bgm = null;
        }
    }

    return that;
}