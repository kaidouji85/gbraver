function roomInfoWindow(spec,my) {
    var COLOR_WHITE = '#FFFFFF';
    var GRID_WIDTH = 18;
    var GRID_HEIGHT = 4;
    var GRID_SIZE = 16;

    var that = new Group();
    var pict = spec.pict;
    var baseWindow = gridWindow({
        pict : pict,
        width : GRID_WIDTH,
        height : GRID_HEIGHT
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
        roomNameLabel.y = 10;
        that.addChild(roomNameLabel);

        statusLabel.color = COLOR_WHITE;
        statusLabel.x = 86;
        statusLabel.y = 10;
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

    return that;
}