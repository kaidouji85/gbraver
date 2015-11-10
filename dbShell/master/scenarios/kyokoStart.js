db.scenarios.insert({
    id : 'kyokoStart',
    data :[
        storyUtil.pilot('untensyu','left'),   //代役
        storyUtil.mes('着いたよ、お嬢ちゃん'),
        storyUtil.pilot('kyoko', 'right'),
        storyUtil.mes('いつもありがとう、お姉さん'),
        storyUtil.activePilot('left'),
        storyUtil.mes('いいって、ことよ。にしても、お嬢ちゃんも今日から晴れて機動倶楽部の仲間入りか。時の流れは早いものねえ。'),
        storyUtil.activePilot('right'),
        storyUtil.mes('見ててね、すぐに有名になってみせるから。'),


        // 暗転的なものを入れたい
        storyUtil.pilot('uketuke','left'),
        storyUtil.activePilot('left'),
        storyUtil.mes('いらっしゃい響子ちゃん。今日は何の用かしら？'),
        storyUtil.pilot('kyoko','right'),
        storyUtil.activePilot('right'),
        storyUtil.mes('私も晴れて高校生になったので、機動倶楽部の登録に来ました。必要書類は、これでいいですよね。'),
        storyUtil.activePilot('left'),
        storyUtil.mes('確認しますので、少々お待ち下さい。<br>・・・・・・、はい、問題なしです、大丈夫です。<br>これで今日からあなたも機動倶楽部の一員よ。'),

        // 暗転的なものを入れたい
        storyUtil.pilot('akane','left'),
        storyUtil.mes('あんなところに、いいカモが。<br>今日はなんて運がいいのかしら。'),

        storyUtil.mes('はじめまして、私は茜。あなた機動倶楽部は初めて。もし良かったら、私が色々教えてあげようか。'),
        storyUtil.activePilot('right'),
        storyUtil.mes('本当ですか。茜先輩、よろしくお願いします。'),
        storyUtil.activePilot('left'),
        storyUtil.mes('先輩・・・・・・、悪くない響きね。'),
        storyUtil.activePilot('right'),
        storyUtil.mes('自己紹介が遅れましたが、私は春日野高校の響子といいます。'),
        storyUtil.activePilot('left'),
        storyUtil.mes('よろしくね、響子ちゃん。'),
        storyUtil.activePilot('right'),
        storyUtil.mes('ところで先輩、私はまず何から始めたらいいでしょうか。'),
        storyUtil.activePilot('left'),
        storyUtil.mes('そうね、しのごの言わずに、まずは実戦あるのみね。まずは私と模擬戦よ。'),
        storyUtil.activePilot('right'),
        storyUtil.mes('いきなり模擬戦なんて、大丈夫なんでしょういか。'),
        storyUtil.activePilot('left'),
        storyUtil.mes('私が精一杯サポートするから、心配無用よ。'),
        storyUtil.activePilot('right'),
        storyUtil.mes('なら先輩、お手柔らかに頼みます。'),

        storyUtil.nextScenario('kyokoSecond'),
        storyUtil.moveBattle('landozer', 'akane', 'attack3-defense1')
    ]
});