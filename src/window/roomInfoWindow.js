var gridWindow = require('../window/gridWindow');

module.exports = function(spec,my) {
    var COLOR_WHITE = '#FFFFFF';
    var GRID_WIDTH = 9;
    var GRID_HEIGHT = 2;

    var that = new Group();
    var core = enchant.Core.instance;
    var pict = spec.pict;
    var subPict = spec.subPict;
    var baseWindow = gridWindow({
        pict : pict,
        width : GRID_WIDTH,
        height : GRID_HEIGHT,
        spriteWidth : 32,
        spriteHeight : 32
    });
    var roomNameLabel = new Label();
    var statusLabel = new Label();
    var usersLabel = new Label();
    var visible=true;

    init();
    function init() {
        that.addChild(baseWindow);

        roomNameLabel.color = COLOR_WHITE;
        roomNameLabel.x = 16;
        roomNameLabel.y = 12;
        that.addChild(roomNameLabel);

        statusLabel.color = COLOR_WHITE;
        statusLabel.x = 86;
        statusLabel.y = 12;
        that.addChild(statusLabel);

        usersLabel.color = COLOR_WHITE;
        usersLabel.x = 86;
        usersLabel.y = 28;
        that.addChild(usersLabel);
    }

    that.setRoomName = function(roomName) {
        roomNameLabel.text = roomName;
    }

    that.setStatus = function(status) {
        statusLabel.text = status;
    }

    that.getStatus = function() {
        return statusLabel.text;
    }

    that.setUsers = function(users) {
        var usersText = '';
        if(users.length === 0){
            usersText = 'None';
        }
        for(var i=0; i<users.length; i++){
            usersText += users[i];
            usersText += '<br>';
        }
        usersLabel.text = usersText;
    }

    that.getUsers = function() {
        return usersLabel.text;
    }

    that.setVisible = function(value){
        visible = value;
        baseWindow.setVisible(value);
        roomNameLabel.visible = value;
        statusLabel.visible = value;
        usersLabel.visible = value;
    }

    that.getVisible = function() {
        return visible;
    }

    that.addEventListener(Event.TOUCH_START,function(){
        baseWindow.setPict(subPict);
        core.assets[core.SOUND_PUSH_BUTTON].play();
    });

    that.addEventListener(Event.TOUCH_END,function(){
        baseWindow.setPict(pict);
    });

    return that;
}