(function() {
    'use strict';

    /**
     * Copied and modified from Cheng Lee's MapMe extension. Here is his statement:
     *
     * Copyright (c) 2012 Cheng Lee. All rights reserved.  Use of this
     * source code is governed by a BSD-style license that can be found in the
     * LICENSE file.
     *
     */

    /**
     * Returns a handler which will open a new window when activated.
     */
    function onClickHandler(info, tab) {
        var selected, url = "https://www.google.com/maps/search/";
        if (info.selectionText) {
            selected = info.selectionText;

            // Join multiple lines into one separated with comma
            selected = selected.replace(/\n/g, ', ');
            url += selected;
        }

        // Create a new tab to the info page.
        chrome.tabs.create({
            url: url
        });
    }

    /**
     * Create a context menu which will only show up for selected text.
     */
    chrome.contextMenus.create({
        "id": "gis_button",
        "title": chrome.i18n.getMessage("search_in_google_maps"),
        "type": "normal",
        "contexts": ["selection"]
    });
    chrome.contextMenus.onClicked.addListener(onClickHandler);

})();
