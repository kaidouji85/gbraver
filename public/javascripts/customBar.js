function customBar(spec, my) {
    var that = new Bar(0, 0);
    that.value = 0;
   
    var turn = 0;
    var speed = 0;
    that.plus = function(p_turn, p_speed) {
        turn = p_turn;
        speed = p_speed;
    };
    

    that.addEventListener('enterframe', function(e) {
        if (turn > 0) {
            that.value += speed;
            turn--;
        }
    });
   
    return that;
};