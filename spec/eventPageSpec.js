(function(){
  describe('Loading the browser extension', function(){

    it('should create a context menu with some text and an event listener', function(){
      var expectedParamsForCreate = {
        "id":       "gis_button",
        "title":    chrome.i18n.getMessage("search_in_google_maps"),
        "type":     "normal",
        "contexts": ["selection"]
      };

      spyOn(chrome.i18n, 'getMessage');
      spyOn(chrome.contextMenus, 'create');
      spyOn(chrome.contextMenus.onClicked, 'addListener');

      require('../scripts/eventPage');
      
      expect(chrome.i18n.getMessage).toHaveBeenCalledWith("search_in_google_maps");
      expect(chrome.contextMenus.create).toHaveBeenCalledWith(expectedParamsForCreate);
      expect(chrome.contextMenus.onClicked.addListener).toHaveBeenCalled();
    });

  });

  describe('Clicking the context menu item', function(){

    it('should open a new tab and load the Google Maps page', function(){
      spyOn(chrome.tabs, 'create');

      require('../scripts/eventPage');

      expect(chrome.tabs.create).toHaveBeenCalled();

      pending('figure out how to execute the onClick handler');
    });

  });

})();