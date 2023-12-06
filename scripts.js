var map = L.map('map').setView([45, -123.5], 5.5);

var Esri_OceanBasemap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Sources: GEBCO, NOAA, CHS, OSU, UNH, CSUMB, National Geographic, DeLorme, NAVTEQ, and Esri',
    maxZoom: 20
}).addTo(map);

var USGS_USImageryTopo = L.tileLayer('https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryTopo/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 20,
    attribution: 'Tiles courtesy of the <a href="https://usgs.gov/">U.S. Geological Survey</a>'
});

// Create a layer control with base and overlay layers
var baseMaps = {
    "Esri Ocean Basemap": Esri_OceanBasemap,
    "USGS Imagery Topography Basemap": USGS_USImageryTopo
};

var stellerSeaLionLayer = createGeoJSONLayer('SeaLionSteller_WesternDPS_19940615.json', 'brown', 0, "Steller Sea Lion Habitat", 'steller_sea_lion.jpg', '"The Steller (or northern) sea lion (Eumetopias jubatus) is the largest member of the family Otariidae, the “eared seals,” which includes all sea lions and fur seals. Steller sea lions are named for Georg Wilhelm Steller, the German surgeon and naturalist on the Bering expedition who first described and wrote about the species in 1742. Steller sea lions impressive low-frequency vocalizations sound more like roars than California sea lions’ barks. Historically, Steller sea lions were highly abundant throughout many parts of the coastal North Pacific Ocean. Indigenous peoples and settlers hunted them for their meat, hides, oil, and other products, and today sea lions are an important subsistence resource for Alaska Natives." - IUCN');
var snowyPloverLayer = createGeoJSONLayer('Snowy_Plover_Range_-_CWHR_B154_[ds929].geojson', 'blue', 0, "Snowy Plover Habitat", 'plover.jpg', '"An inconspicuous, pale little bird, easily overlooked as it runs around on white sand beaches, or on the salt flats around lakes in the arid west. Where it lives on beaches, its nesting attempts are often disrupted by human visitors who fail to notice that they are keeping the bird away from its nest; as a result, the Snowy Plover populations have declined in many coastal regions. Formerly considered to belong to the same species as the Kentish Plover of the Old World." - Audobon field guide');
var seaTurtleLayer = createGeoJSONLayer('SeaTurtleLeatherback_20120126.json', 'darkgreen', 0, "Leatherback Sea Turtle Habitat", '750x500-leatherback-sea-turtle.jpg', '"The leatherback sea turtle is the largest turtle in the world. They are the only species of sea turtle that lack scales and a hard shell. They are named for their tough rubbery skin and have existed in their current form since the age of the dinosaurs. Leatherbacks are highly migratory, some swimming over 10,000 miles a year between nesting and foraging grounds. They are also accomplished divers with the deepest recorded dive reaching nearly 4,000 feet—deeper than most marine mammals." - NOAA Fisheries');
var humpbackWhaleLayer = createGeoJSONLayer('WhaleHumpback_MexicoDPS_20210421.json', 'purple', 0, "Humpback Whale Habitat", 'whale.jpg', '"Before a final moratorium on commercial whaling in 1985, all populations of humpback whales were greatly reduced, most by more than 95 percent. The species is increasing in abundance throughout much of its range but faces threats from entanglement in fishing gear, vessel strikes, vessel-based harassment, and underwater noise. Humpback whales live in all oceans around the world. They travel great distances every year and have one of the longest migrations of any mammal on the planet. Some populations swim 5,000 miles from tropical breeding grounds to colder, more productive feeding grounds. Humpback whales feed on shrimp-like crustaceans (krill) and small fish, straining huge volumes of ocean water through their baleen plates, which act like a sieve.The humpback whale gets its common name from the distinctive hump on its back." - NOAA Fisheries');

Promise.all([stellerSeaLionLayer, snowyPloverLayer, seaTurtleLayer, humpbackWhaleLayer])
    .then(layers => {
        var overlayLayers = {
            "Habitat of the Steller Sea Lion": layers[0],
            "Habitat of the Snowy Plover": layers[1],
            "Habitat of the Leatherback Sea Turtle": layers[2],
            "Habitat of the Humpback Whale": layers[3]
        };

        // Create a layer control with base and overlay layers
        
   
    var layerControl = L.control.layers(baseMaps, overlayLayers).addTo(map);


    layers.forEach(layer => layer.addTo(map));
 });
// ... rest of your code ...

function createGeoJSONLayer(url, color, minZoom, layerName, imageUrl, popupText) {
    return fetch(url)
        .then(response => response.json())
        .then(data => {
            var geoJsonLayer = L.geoJSON(data, {
                style: {
                    color: color,
                    fillColor: color,
                    weight: 2,
                    opacity: 1,
                    fillOpacity: 0.5
                },
                onEachFeature: function (feature, layer) {
                    var popupContent = "<strong>" + (layerName || 'No Name') + "</strong>";

                    // Check if the feature has an imageUrl property
                    if (imageUrl) {
                        // Add an image to the popup
                        popupContent += "<br/><img src='" + imageUrl + "' alt='Image' style='max-width: 100%; max-height: 150px;'/>";
                    }

                    layer.bindPopup(popupContent);

                    // Display custom text on the left when the layer is added
                    layer.on('add', function () {
                        infoDiv.update(popupText);
                    });

                    // Remove the custom text when the layer is removed
                    layer.on('remove', function () {
                        infoDiv.update();
                    });
                },
                minZoom: minZoom
            });

            // Add custom properties to the layer
            geoJsonLayer.layerName = layerName;
            geoJsonLayer.imageUrl = imageUrl;

            return geoJsonLayer;
        });
}

// Custom div for displaying text on the left
var infoDiv = L.control({ position: 'topleft' });

infoDiv.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
};

infoDiv.update = function (content) {
    this._div.innerHTML = content || 'Try turning on a habitat layer!';
};

infoDiv.addTo(map);



// Create and add GeoJSON layers to the map



    var linkElement = document.createElement('a');

        // Set the href attribute to your desired link
        linkElement.href = 'https://www.fisheries.noaa.gov/';

        // Set the link text
        linkElement.textContent = 'Visit NOAA Fisheries';

        // Get the body element and append the link to it
        document.body.appendChild(linkElement);