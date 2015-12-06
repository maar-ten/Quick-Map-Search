(function() {
    'use strict';

    describe('Loading the browser extension', function() {

        afterEach(function(){
          // unload the extension
          var eventPage = require.resolve('../scripts/eventPage');
          delete require.cache[eventPage];
        });

        it('should create a context menu with some text and an event listener', function() {
            var expectedParamsForCreate = {
                "id": "gis_button",
                "title": chrome.i18n.getMessage("search_in_google_maps"),
                "type": "normal",
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

        it('should open a new tab and load the Google Maps page', function() {
            var info, tab;
            info = {
                selectionText: 'foobar'
            };
            tab = jasmine.createSpy('tab');

            spyOn(chrome.tabs, 'create');
            require('../scripts/eventPage');

            chrome.contextMenus.click(info, tab);

            expect(chrome.tabs.create).toHaveBeenCalledWith({
                url: "https://www.google.com/maps/search/foobar"
            });
        });

    });

})();
