var assert = require('assert');
var webdriver = require('selenium-webdriver');
var test = require('selenium-webdriver/testing');

test.describe('Google Search', function() {
    var driver;

    test.before(function() {
        driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build();
    });

    test.it('should append query to title', function() {
        driver.get('http://www.google.com');
        driver.findElement(webdriver.By.name('q')).sendKeys('webdriver');
        driver.findElement(webdriver.By.name('btnG')).click();
        
        //wait関数について
        //第一引数のコールバック関数がtrueを返すまでこのステップで止まります。
        //必要な条件がそろうまで待つという使い方ができます。
        //第二引数で指定した秒数を過ぎても条件が整わない場合はエラーになります。
        //この場合はタイトルが「webdriver - Google Search」になるまで1秒間だけ待つというものです。
        //参考サイト　http://d.hatena.ne.jp/piglovesyou/20130426/1366935447
        driver.wait(function() {
            return driver.getTitle().then(function(title) {
                return 'webdriver - Google 検索'===title;
            });
        }, 1000);
        
        //ページ遷移実行後にこれらのコマンドが実行される
        var q = driver.findElement(webdriver.By.name('q'));
        var btnG = driver.findElement(webdriver.By.name('btnG'));
        for(var i=0; i<9; i++){
            q.sendKeys(webdriver.Key.BACK_SPACE);    
        }
        q.sendKeys('node.js');
        btnG.click();
    });

    test.after(function() {
        driver.quit();
    });
}); 