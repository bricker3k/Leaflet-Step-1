var myMap = L.map("map", {
    center: [15.5994, -28.6731],
    zoom: 3
});

L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets-basic",
    accessToken: API_KEY
}).addTo(myMap);



d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson", createMarkers);

function createMarkers(response) {

    // Pull the "stations" property off of response.data
    var features = response.features;

    var earthquakes = [];


    for (var index = 0; index < feature.length; index++) {
        var features = features[index];

        // For each station, create a marker and bind a popup with the station's name
        var earthquakes = L.circle([features.geometry.lat, features.geometry.lon]{
            style: {
                color: "#fff",
                weight: 1,
                fillOpacity: 0.8
            },
            steps: 10,
            scale: ["f7fcfd","4d004b"],

            radius: markerSize(features[index].mag)
        }).bindPopup("<h3>Location" + features.place + "<h3><h3>Magnitude: " + features.mag + "</h3>");

        // Add the marker to the bikeMarkers array
        earthquakes.push(earthquakes);
    }

    // Set up the legend
    var legend = L.control({ position: "bottomright" });
    legend.onAdd = function () {
        var div = L.DomUtil.create("div", "info legend");
        var limits = geojson.options.limits;
        var colors = geojson.options.colors;
        var labels = [];

        // Add min & max
        var legendInfo = "<h1>Median Income</h1>" +
            "<div class=\"labels\">" +
            "<div class=\"min\">" + limits[0] + "</div>" +
            "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
            "</div>";

        div.innerHTML = legendInfo;

        limits.forEach(function (limit, index) {
            labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
        });

        div.innerHTML += "<ul>" + labels.join("") + "</ul>";
        return div;
    };

    // Adding legend to the map
    legend.addTo(myMap);

});
