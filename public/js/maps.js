let map, service, infoWindow;

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
        const marker = new google.maps.Marker({
            map,
            icon,
            title: place.name,
            position: place.geometry.location,
        })

        // Add marker to marker list
        markers.push(
          marker
        );
  
        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }

        // Creates listeners for each marker, opens info window when clicked
        google.maps.event.addListener(marker, "click", function () {
            infoWindow.setContent(
              "<div><strong>" +
                place.name +
                "</strong><br>" +
                place.formatted_address +
                "</div>" +
                place.geometry.location
            );
            infoWindow.open(map, this);
        });
      });
      map.fitBounds(bounds);
    });
  }