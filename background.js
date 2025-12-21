const BASE_URL = 'https://www.google.com';

if (typeof browser === "undefined") {
  // Chrome does not support the browser namespace yet.
  globalThis.browser = chrome;
}

/**
 * Open a new browser tab to the right of the current tab and load the Google Maps query.
 */
function onClickHandler({selectionText}, tab) {
    browser.tabs.create({
        url: createUrl(selectionText),
        index: tab.index + 1
    });
}

function createUrl(selectionText) {
    const query = selectionText.replace(/\n/g, ', '); // remove new line characters
    return createGoogleMapsUrl(query);
}

function createGoogleMapsUrl(query) {
    return `${BASE_URL}/maps/search/${query}`;
}

/**
 * When bootstrapping the extension create a context menu that will only show up for selected text.
 */
browser.runtime.onInstalled.addListener(() => {
    browser.contextMenus.create({
        'id':       'quick-map-search-button',
        'title':    browser.i18n.getMessage('search_in_google_maps'),
        'type':     'normal',
        'contexts': ['selection']
    });
});
browser.contextMenus.onClicked.addListener(onClickHandler);
