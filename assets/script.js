console.log("Hey guys!");

// Lara

// John

// Alfredo

$(document).foundation();

// Shelsy

// experiment with different addresses. Very case sensitive.
// entering an address will render its geographic coords (AKA forward geocoding)
// entering coords will render its varying address (AKA reverse geocoding)
let currentLocation = "633 Sinclair Dr, San Jose, CA";

// // experimenting with the map created using mapbox.js
// L.mapbox.accessToken = `pk.eyJ1Ijoic2hlbGxzZWEzMSIsImEiOiJja2hiMnVsdzUwbThsMndrNDUyNnI0dDJuIn0.Fwya7JTKf9MQOsTVGMVwIg`

// let geocoder = L.mapbox.geocoder('mapbox.places');

// let map = L.mapbox.map('map').addLayer(L.mapbox.styleLayer('mapbox://styles/mapbox/streets-v11'));

// geocoder.query(`${currentLocation}`, showMap);

// function showMap(err, data) {
//     // The geocoder can return an area, like a city, or a
//     // point, like an address. Here we handle both cases,
//     // by fitting the map bounds to an area or zooming to a point.
//     if (data.lbounds) {
//         map.fitBounds(data.lbounds);
//     } else if (data.latlng) {
//         map.setView([data.latlng[0], data.latlng[1]], 13);
//     }
// }

// experimenting with the geocoding api from mapbox website
// PLEASE DO NOT DELETE THIS SECRET KEY
let myToken =
  "sk.eyJ1Ijoic2hlbGxzZWEzMSIsImEiOiJja2hiMzBuemsxOHczMnNrODF6M2lveHc1In0.WXY65kiQoG9rDXMxzd5qEg";

function getCoords(){
  fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${currentLocation}.json?access_token=${myToken}`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
  
      // set variables for lat and lon of currentLocation
      let lon = data.features[1].geometry.coordinates[0]
      let lat = data.features[1].geometry.coordinates[1]
      console.log(lon);
      console.log(lat);
      return lat, lon;
    });
}

getCoords()





// testing tomtom api

// category sets
// 7315 indicates restaurant
// 9376 indicates Cafe/pub
// 9379004 indicates Bar
// 9362 indicates Park & Recreation Area
// 7376 indicates Tourist Attraction
// 7302 indicates trails

// 10 miles is 16093.4
// 5 miles is 8046.72


  fetch(
    `https://api.tomtom.com/search/2/poiSearch/pizza.json?lat=${lat}&lon=${lon}&radius=16093&categorySet=7315&key=yrlw2N38GKc3iSGnqvnQNxPQUsVQuVAh`
  )
  .then(function(response) {
    return response.json();
  })
  .then(function(data){
    console.log(data)
  });




