let map, service, infoWindow;

// function initMap() {
//     let default_pos = {
//         lat: 40.745,
//         lng: -74.025, // defaults to Stevens' coordinates
//     }

//     map = new google.maps.Map(document.getElementById("map"), {
//         center: default_pos,
//         zoom: 15,
//     });

//     const request = {
//         query: "covid testing",
//         fields: ['name', 'geometry', 'opening_hours'],
//         location: default_pos,
//         radius: 10000,
//         type: ['hospital', 'doctor', 'pharmacy', 'health'],
//     };
//     service = new google.maps.places.PlacesService(map);
//     service.textSearch(request, callback);

//     infoWindow = new google.maps.InfoWindow();

//     // button to locate user
//     const locationButton = document.createElement("button");
//     locationButton.textContent = "Find nearest testing center!";
//     locationButton.classList.add("custom-map-control-button");
//     map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
//     locationButton.addEventListener("click", () => {
//         // Try HTML5 geolocation.
//         if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(
//             (position) => {
//             const pos = {
//                 lat: position.coords.latitude,
//                 lng: position.coords.longitude,
//             };
//             infoWindow.setPosition(pos);
//             infoWindow.setContent("Location found.");
//             infoWindow.open(map);
//             map.setCenter(pos);

//             const request2 = {
//                 query: "covid testing",
//                 fields: ['name', 'geometry', 'opening_hours'],
//                 location: pos,
//                 radius: 10000,
//                 type: ['hospital', 'doctor', 'pharmacy', 'health'],
//             };
//             service = new google.maps.places.PlacesService(map);
//             service.textSearch(request2, callback);
        
//             infoWindow = new google.maps.InfoWindow()
//             },
//             () => {
//             handleLocationError(true, infoWindow, map.getCenter());
//             }
//         );
//         } else {
//         // Browser doesn't support Geolocation
//         handleLocationError(false, infoWindow, map.getCenter());
//         }
//     });
// }

// function callback(results, status) {
//     if (status == google.maps.places.PlacesServiceStatus.OK) {
//         for (var i = 0; i < results.length; i++) {
//             createMarker(results[i]);
//         }
//     }
//     console.log(results)
// }

// function createMarker(place) {
//     const marker = new google.maps.Marker({
//         position: place.geometry.location,
//         map: map,
//         icon: "/public/img/health.png",
//     });
//     marker.setmap(null) // should remove old markers
//     google.maps.event.addListener(marker, 'click', function() {
//         infoWindow.setContent(place.name, place.geometry.location, place.opening_hours);
//         infoWindow.open(map, this);
//       });
// }

// function handleLocationError(browserHasGeolocation, infoWindow, pos) {
//     infoWindow.setPosition(pos);
//     infoWindow.setContent(
//         browserHasGeolocation
//         ? "Error: The Geolocation service failed."
//         : "Error: Your browser doesn't support geolocation."
//     );
//     infoWindow.open(map);
// }

function initAutocomplete() {
    const map = new google.maps.Map(document.getElementById("map"), {
      center: {
            lat: 40.745,
            lng: -74.025, // defaults to Stevens' coordinates
        },
        zoom: 13,
        mapTypeId: "roadmap",
    });
    // Create the info window to display info on selected elements.
    infoWindow = new google.maps.InfoWindow();
    // Create the search box and link it to the UI element.
    const input = document.getElementById("pac-input");
    const searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    // Bias the SearchBox results towards current map's viewport.
    map.addListener("bounds_changed", () => {
      searchBox.setBounds(map.getBounds());
    });
    let markers = [];
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener("places_changed", () => {
      const places = searchBox.getPlaces();
  
      if (places.length == 0) {
        return;
      }
      // Clear out the old markers.
      markers.forEach((marker) => {
        marker.setMap(null);
      });
      markers = [];
      // For each place, get the icon, name and location.
      const bounds = new google.maps.LatLngBounds();
      places.forEach((place) => {
        if (!place.geometry) {
          console.log("Returned place contains no geometry");
          return;
        }
        const icon = {
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25),
        };
        // Create a marker for each place.
        markers.push(
          new google.maps.Marker({
            map,
            icon,
            title: place.name,
            position: place.geometry.location,

          })
        );
  
        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }

        google.maps.event.addListener(marker, 'click', function() {
            infoWindow.setContent(place.name, place.geometry.location, place.opening_hours);
            infoWindow.open(map, this);
        });
      });
      map.fitBounds(bounds);
    });
  }