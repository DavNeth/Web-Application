class LeafletMap {
    constructor(containerId, center, zoom) {
        this.map = L.map(containerId).setView(center, zoom);
        this.initTileLayer();
    }

    initTileLayer() {
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map);
    }

    addMarker(lat, lng, message, image, description) {
        // Using a working placeholder icon URL
        const pinIcon = L.icon({
            iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Location_pin_icon.svg/120px-Location_pin_icon.svg.png', // A working icon URL
            iconSize: [32, 32], // Adjust the size if necessary
            iconAnchor: [16, 32], // Adjust the anchor position
            popupAnchor: [0, -32] // Adjust the popup position relative to the icon
        });

        const marker = L.marker([lat, lng], { icon: pinIcon }).addTo(this.map);
        marker.bindPopup(message);

        // Add click event to show spring details when marker is clicked
        marker.on('click', () => {
            this.showSpringInfo(image, description);
        });
    }

    loadMarkersFromJson(url) {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                data.forEach(marker => {
                    // Pass image and description when adding markers
                    this.addMarker(marker.latitude, marker.longitude, marker.message, marker.image, marker.description);
                });
            })
            .catch(error => console.error('Error loading markers:', error));
    }

    // Function to update the spring info section and scroll to it
    showSpringInfo(image, description) {
        // Update the content of the spring info section
        document.getElementById("springImage").src = image;
        document.getElementById("springDescription").textContent = description;
        
        // Show the spring info section
        document.getElementById("springInfo").style.display = "block";
        
        // Scroll smoothly to the spring info section
        window.scrollTo({
            top: document.getElementById("springInfo").offsetTop,
            behavior: 'smooth'
        });
    }
}
