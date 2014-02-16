var ce = require('cloneextend');
var assert = require('chai').assert;

describe('extendのテスト',function(){
    it('子クラスのメンバを編集しても親クラスには影響がない',function(){
        var parent = {
            x : 10,
            y : 10
        };
        var child = ce.clone(parent);
        child.x = 100;
        
        assert.deepEqual(parent,{x:10,y:10},'親クラスには変更が反映されない');
        assert.deepEqual(child,{x:100,y:10},'子クラスには変更が反映される');
    });
    
    it('子クラスにメンバを追加しても親クラスに影響はない',function(){
        var parent = {
            x : 10,
            y : 10
        };
        var child = ce.clone(parent);
        child.z = 10;
        
        assert.deepEqual(parent,{x:10,y:10},'親クラスには変更が反映されない');
        assert.deepEqual(child,{x:10,y:10,z:10},'子クラスには変更が反映される');
    });
});
