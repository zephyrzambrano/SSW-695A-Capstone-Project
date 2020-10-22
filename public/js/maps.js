let map, service, infoWindow;

function initMap() {
    let default_pos = {
        lat: 40.745,
        lng: -74.025, // defaults to Stevens' coordinates
    }

    // I can't get the below to actually set pos properly.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                default_pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };
            }
        )
    }

    map = new google.maps.Map(document.getElementById("map"), {
        center: default_pos,
        zoom: 15,
    });

    const request = {
        query: "covid testing",
        fields: ['name', 'geometry', 'opening_hours'],
        location: default_pos,
        radius: 10000,
        type: ['hospital', 'doctor', 'pharmacy', 'health'],
    };
    service = new google.maps.places.PlacesService(map);
    service.textSearch(request, callback);

    infoWindow = new google.maps.InfoWindow();

    // button to locate user
    const locationButton = document.createElement("button");
    locationButton.textContent = "Find nearest testing center!";
    locationButton.classList.add("custom-map-control-button");
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
    locationButton.addEventListener("click", () => {
        // Try HTML5 geolocation.
        if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
            const pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            };
            infoWindow.setPosition(pos);
            infoWindow.setContent("Location found.");
            infoWindow.open(map);
            map.setCenter(pos);

            const request2 = {
                query: "covid testing",
                fields: ['name', 'geometry', 'opening_hours'],
                location: pos,
                radius: 10000,
                type: ['hospital', 'doctor', 'pharmacy', 'health'],
            };
            service = new google.maps.places.PlacesService(map);
            service.textSearch(request2, callback);
        
            infoWindow = new google.maps.InfoWindow()
            },
            () => {
            handleLocationError(true, infoWindow, map.getCenter());
            }
        );
        } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
        }
    });
}

function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
        }
    }
    console.log(results)
}

function createMarker(place) {
    const marker = new google.maps.Marker({
        position: place.geometry.location,
        map: map,
        icon: "/public/img/health.png",
    });
    google.maps.event.addListener(marker, 'click', function() {
        infoWindow.setContent(place.name, place.geometry.location, place.opening_hours);
        infoWindow.open(map, this);
      });
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
        browserHasGeolocation
        ? "Error: The Geolocation service failed."
        : "Error: Your browser doesn't support geolocation."
    );
    infoWindow.open(map);
}
