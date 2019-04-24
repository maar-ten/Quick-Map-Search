(function(){
    /**
     * Map engines the user can select to search with.
     */
    var mapEngines = {
        google: {
            key: 'google',
            name: 'Google Maps',
            url: 'https://www.google.com/maps/search/'
        },

        osm: {
            key: 'osm',
            name: 'OpenStreetMap',
            url: 'https://www.openstreetmap.org/search?query='
        }
    };

    return mapEngines;

})();