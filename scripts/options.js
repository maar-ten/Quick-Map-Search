(function(){
    // Map engines the user can select to search with.
    var mapEngines = function() {

        var engines = [
            {
                key: 'google',
                name: 'Google Maps',
                url: 'https://www.google.com/maps/search/'
            },

            {
                key: 'osm',
                name: 'OpenStreetMap',
                url: 'https://www.openstreetmap.org/search?query='
            },

        ];

        function findEngine(key, index) {
            index = typeof index !== 'undefined' ? index : 0;

            // catch index out of bounds
            if (index === engines.length) {
                return null;
            }

            var engine = engines[index];
            if (key === engine.key) {
                return engine;
            } else {
                return findEngine(key, ++index);
            }
        }

        return {
            getEngine: function(key) {
                return findEngine(key);
            }
        };
    };

    // Saves options to chrome.storage.sync.
    function save_options() {
      var mapEngineKey = document.getElementById('mapEngine').value;
      var mapEngine = mapEngines().getEngine(mapEngineKey);

      chrome.storage.sync.set({
        mapEngineKey: mapEngines.key,
        mapEngineName: mapEngines.name,
        mapEngineUrl: mapEngines.url
      }, function() {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function() {
          status.textContent = '';
        }, 750);
      });
    }

    // Restores select box using the preferences stored in chrome.storage.
    function restore_options() {
      // Use Google as default map engine
      var defaultEngine = mapEngines().getEngine('google');

      chrome.storage.sync.get({
        mapEngineKey: defaultEngine.key,
        mapEngineName: defaultEngine.name,
        mapEngineUrl: defaultEngine.url
      }, function(items) {
        document.getElementById('mapEngine').value = items.mapEngineKey;
      });
    }

    document.addEventListener('DOMContentLoaded', restore_options);
    document.getElementById('save').addEventListener('click', save_options);
})();