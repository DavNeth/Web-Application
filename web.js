let map;
let geocoder;
let marker;

function initMap() {
    // Initial map centered at Manolo Fortich, Bukidnon (Philippines)
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 8.3462, lng: 124.9092 },  // Coordinates for Manolo Fortich
        zoom: 12,  // Zoom level for a more focused view
    });
    geocoder = new google.maps.Geocoder();
}

function locateSpring() {
    const location = document.getElementById("searchInput").value;
    
    if (location === "") {
        alert("Please enter a location.");
        return;
    }

    geocodeLocation(location);
}

function geocodeLocation(address) {
    geocoder.geocode({ address: address }, function (results, status) {
        if (status === "OK") {
            // Center map on the found location
            map.setCenter(results[0].geometry.location);
            map.setZoom(12);

            // Place a marker on the map
            if (marker) {
                marker.setMap(null);
            }

            marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location,
                title: "Water Spring Location",
            });

            // You can add more logic here to show nearby water springs
            alert("Location found! Water springs near here can be displayed.");
        } else {
            alert("Geocode was not successful for the following reason: " + status);
        }
    });
}
