// Mock object of the chrome browser
chrome = {
    contextMenus: (function() {
        var _this;

        _this = {
            create: function() {},

            click: function() {
                console.log('Context menu item was clicked, but there\'s no click handler');
            },

            onClicked: {
                // overwrites _this.click
                addListener: function(callbackFn) {
                    _this.click = callbackFn;
                }
            }
        }

        return _this;
    })(),

    i18n: {
        getMessage: function() {}
    },

    tabs: {
        create: function() {}
    }
}
