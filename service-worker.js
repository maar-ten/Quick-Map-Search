const BASE_URL = 'https://www.google.com';

/**
 * Open another browser tab and load the Google Maps query.
 */
function onClickHandler({selectionText}) {
    chrome.tabs.create({url: createUrl(selectionText)});
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
chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        'id':       'quick-map-search-button',
        'title':    chrome.i18n.getMessage('search_in_google_maps'),
        'type':     'normal',
        'contexts': ['selection']
    });
});
chrome.contextMenus.onClicked.addListener(onClickHandler);
