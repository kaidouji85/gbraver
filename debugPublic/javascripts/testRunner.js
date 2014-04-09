describe('テスト',function(){
    it('別ウインドウ呼び出し',function(done){
        var subWin = window.open('chargeTest.html',"sub","width=320,height=240");
        subWin.onload = function(){
            subWin.firstTurnPlayerCharge_asFirstTurnplayer(function(){
                subWin.close();
                done();
            });
        };
    });
});
