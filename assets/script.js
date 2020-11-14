// Lara

// John

// Alfredo

// gives modals functionality
$(document).foundation();

// Shelsy

// key from mapbox api
let myToken =
  "sk.eyJ1Ijoic2hlbGxzZWEzMSIsImEiOiJja2hiMzBuemsxOHczMnNrODF6M2lveHc1In0.WXY65kiQoG9rDXMxzd5qEg";
let tomKey = "yrlw2N38GKc3iSGnqvnQNxPQUsVQuVAh";
// target user address
let input = document.querySelector("input");
// target user miles
let mileInput = document.querySelector("#miles");
// target user food preference
let foodInput = document.querySelector("#foods");
// target user place preference
let placeInput = document.querySelector("#places");

let mapCoordinates = [];

// finds lat and lon of starting point
function findLatLon(startingPoint, miles, food, place) {
  fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${startingPoint}.json?access_token=${myToken}`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // set variables for lat and lon of startingPoint
      let lon = data.features[1].geometry.coordinates[0];
      let lat = data.features[1].geometry.coordinates[1];

      // let arr = [lon, lat];

      findFood(miles, food, lat, lon);
      findDestination(miles, place, lat, lon);
    });
}

function findMapLatLon(startingPoint) {
  fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${startingPoint}.json?access_token=${myToken}`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // set variables for lat and lon of startingPoint
      let lon = data.features[1].geometry.coordinates[0];
      let lat = data.features[1].geometry.coordinates[1];

      let arr = [lon, lat];

      mapCoordinates.push(arr);

      showMap(lat, lon);
    });
}

// find a restaurant near startingPoint
function findFood(miles, food, lat, lon) {
  fetch(
    `https://api.tomtom.com/search/2/nearbySearch/.json?lat=${lat}&lon=${lon}&radius=${miles}&limit=10&idxSet=POI&categorySet=${food}&key=${tomKey}`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      let randomFoodArray = [];

      for (let i = 0; i < data.results.length; i++) {
        let foodOptions = `${data.results[i].poi.name} at ${data.results[i].address.freeformAddress}`;
        randomFoodArray.push(foodOptions);
      }

      let randomFood =
        randomFoodArray[Math.floor(Math.random() * randomFoodArray.length)];

      $(".foodName").append(randomFood.split(" at ")[0]);
      $(".foodAddress").append(randomFood.split(" at ")[1]);

      findMapLatLon(randomFood.split(" at ")[1]);
    });
}

// find a point of interest near startingPoint
function findDestination(miles, place, lat, lon) {
  fetch(
    `https://api.tomtom.com/search/2/nearbySearch/.json?lat=${lat}&lon=${lon}&radius=${miles}&limit=10&idxSet=POI&categorySet=${place}&key=${tomKey}`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      let randomDestinationArray = [];

      for (let i = 0; i < data.results.length; i++) {
        let destinationOptions = `${data.results[i].poi.name} at ${data.results[i].address.freeformAddress}`;
        randomDestinationArray.push(destinationOptions);
      }

      let randomDestination =
        randomDestinationArray[
          Math.floor(Math.random() * randomDestinationArray.length)
        ];

      $(".destinationName").append(randomDestination.split(" at ")[0]);
      $(".destinationAddress").append(randomDestination.split(" at ")[1]);

      findMapLatLon(randomDestination.split(" at ")[1]);
    });
}

// when user clicks "plan my piknik"
document.querySelector("#planPiknik").addEventListener("click", function (e) {
  e.preventDefault();

  // get values of all options they chose
  let startingPoint = input.value;

  let miles = mileInput.value;

  let food = foodInput.value;

  let place = placeInput.value;

  findLatLon(startingPoint, miles, food, place);
});

function showMap(lat, lon) {
  let startCoordinates = {
    lon: lon,
    lat: lat,
  };

  mapboxgl.accessToken =
    "pk.eyJ1Ijoic2hlbGxzZWEzMSIsImEiOiJja2hiMnVsdzUwbThsMndrNDUyNnI0dDJuIn0.Fwya7JTKf9MQOsTVGMVwIg";
  var map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v11",
    // coordinates for starting point
    center: startCoordinates,
    zoom: 10,
  });

  map.on("load", function () {
    map.addSource("route", {
      type: "geojson",
      data: {
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: mapCoordinates,
        },
      },
    });
    map.addLayer({
      id: "route",
      type: "line",
      source: "route",
      layout: {
        "line-join": "round",
        "line-cap": "round",
      },
      paint: {
        "line-color": "#888",
        "line-width": 8,
      },
    });
  });
}

//         showMap();

// function showMap()
// {
//   mapboxgl.accessToken = `pk.eyJ1Ijoic2hlbGxzZWEzMSIsImEiOiJja2hiMnVsdzUwbThsMndrNDUyNnI0dDJuIn0.Fwya7JTKf9MQOsTVGMVwIg`;

//   let map = new mapboxgl.Map({
//     container: "map",
//     style: "mapbox://styles/mapbox/streets-v11",
//     center: mapCoordinates[0],
//     zoom: 15,
//   });

//   map.on("load", function () {
//     console.log(mapCoordinates);
//     map.addSource("route", {
//       type: "geojson",
//       data: {
//         type: "Feature",
//         properties: {},
//         geometry: {
//           type: "LineString",
//           coordinates: mapCoordinates,
//         },
//       },
//     });
//     map.addLayer({
//       id: "route",
//       type: "line",
//       source: "route",
//       layout: {
//         "line-join": "round",
//         "line-cap": "round",
//       },
//       paint: {
//         "line-color": "#888",
//         "line-width": 8,
//       },
//     });
//   });
// }

////////////////////////////////////////////////////////////////////////////////////////////// map for later
// experimenting with the map created using mapbox.js

// let geocoder = L.mapbox.geocoder('mapbox.places');

// let map = L.mapbox.map('mapBox').addLayer(L.mapbox.styleLayer('mapbox://styles/mapbox/streets-v11'));

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
