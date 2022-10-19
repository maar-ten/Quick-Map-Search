const BASE_URL = 'https://www.google.com';

/**
 * Open another browser tab and load the Google Maps query.
 */
function onClickHandler({selectionText}) {
    browser.tabs.create({url: createUrl(selectionText)});
}

function createUrl(selectionText) {
    const query = selectionText.replace(/\n/g, ', '); // remove new line characters
    return createGoogleMapsUrl(query);
}

function createGoogleMapsUrl(query) {
    return `${BASE_URL}/maps/search${query}`;
}

/**
 * Create a context menu which will only show up for selected text.
 */
 browser.contextMenus.create({
    "id":       "gis_button",
    "title":    browser.i18n.getMessage("search_in_google_maps"),
    "type":     "normal",
    "contexts": ["selection"]
});
browser.contextMenus.onClicked.addListener(onClickHandler);
