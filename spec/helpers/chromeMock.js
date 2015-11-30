// Mock object of the chrome browser
chrome = {

  contextMenus: {
    create: function() {},
    onClicked: {
     addListener: function(callbackFn) {
      //noop yet, have to find out how to do something with the callback function
     }
    }
  },

  i18n: {
    getMessage: function() {}
  },

  tabs: {
    create: function() {}
  }
  
};