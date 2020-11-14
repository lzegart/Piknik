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

// when user clicks "plan my piknik"
document.querySelector("#planPiknik").addEventListener("click", function (e) {
  e.preventDefault();
  // get values of all options they chose
  let startingPoint = input.value;
  console.log("This is the starting point input: " + startingPoint);
  let miles = mileInput.value;
  console.log("This is the miles converted into meters: " + miles);
  let food = foodInput.value;
  console.log("This is the users food stop preference category set: " + food);
  let place = placeInput.value;
  console.log(
    "This is the users destination preference category set: " + place
  );

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
      console.log("This is starting longitude: " + lon);
      console.log("This is starting latitude: " + lat);

      // find a restaurant near startingPoint
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

          // console.log("These are random food stops")
          // console.log(randomFoodArray);
          let randomFood = randomFoodArray[Math.floor(Math.random() * randomFoodArray.length)]
          console.log(randomFood)

          $(".foodName").append(randomFood.split(" at ")[0]);
          $(".foodAddress").append(randomFood.split(" at ")[1]);

        });

      // find a point of interest near startingPoint
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

          // console.log("These are random destination stops")
          // console.log(randomDestinationArray);
          let randomDestination =
            randomDestinationArray[
              Math.floor(Math.random() * randomDestinationArray.length)
            ];
          console.log(randomDestination);

          $(".destinationName").append(randomDestination.split(" at ")[0]);
          $(".destinationAddress").append(randomDestination.split(" at ")[1]);

          $(".startAddress").append(startingPoint);
        });
          


        // $('#modalID').on('shown.bs.modal', function() {
        //   map.resize();
        // });


         

        showMap();

        // this is the map info
      

      function showMap() {

        mapboxgl.accessToken = `pk.eyJ1Ijoic2hlbGxzZWEzMSIsImEiOiJja2hiMnVsdzUwbThsMndrNDUyNnI0dDJuIn0.Fwya7JTKf9MQOsTVGMVwIg`;
        let map = new mapboxgl.Map({
          container: "map",
          style: "mapbox://styles/mapbox/streets-v11",
          // coords of startingPoint
          center: [-122.486052, 37.830348],
          zoom: 15,
        });

  
        
        map.on("load", function () {
          map.addSource("route", {
            type: "geojson",
            data: {
              type: "Feature",
              properties: {},
              geometry: {
                type: "LineString",
                coordinates: [
                  // coords for startingPoint
                  [-122.48369693756104, 37.83381888486939],
                  // coords for randomFood
                  [-122.48348236083984, 37.83317489144141],
                  // coords for randomDestination
                  [-122.48339653015138, 37.83270036637107],
                  
                ],
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
     
    });
});



////////////////////////////////////////////////////////////////////////////////////////////// map for later
// experimenting with the map created using mapbox.js
// mapboxgl.accessToken = `pk.eyJ1Ijoic2hlbGxzZWEzMSIsImEiOiJja2hiMnVsdzUwbThsMndrNDUyNnI0dDJuIn0.Fwya7JTKf9MQOsTVGMVwIg`;

// let map = new mapboxgl.Map({
//   container: "map",
//   style: "mapbox://styles/mapbox/streets-v11",
//   center: [-122.486052, 37.830348],
//   zoom: 15,
// });

// map.on("load", function () {
//   map.addSource("route", {
//     type: "geojson",
//     data: {
//       type: "Feature",
//       properties: {},
//       geometry: {
//         type: "LineString",
//         coordinates: [
//           [-122.48369693756104, 37.83381888486939],
//           [-122.48348236083984, 37.83317489144141],
//           [-122.48339653015138, 37.83270036637107],
//           [-122.48356819152832, 37.832056363179625],
//           [-122.48404026031496, 37.83114119107971],
//           [-122.48404026031496, 37.83049717427869],
//           [-122.48348236083984, 37.829920943955045],
//           [-122.48356819152832, 37.82954808664175],
//           [-122.48507022857666, 37.82944639795659],
//           [-122.48610019683838, 37.82880236636284],
//           [-122.48695850372314, 37.82931081282506],
//           [-122.48700141906738, 37.83080223556934],
//           [-122.48751640319824, 37.83168351665737],
//           [-122.48803138732912, 37.832158048267786],
//           [-122.48888969421387, 37.83297152392784],
//           [-122.48987674713133, 37.83263257682617],
//           [-122.49043464660643, 37.832937629287755],
//           [-122.49125003814696, 37.832429207817725],
//           [-122.49163627624512, 37.832564787218985],
//           [-122.49223709106445, 37.83337825839438],
//           [-122.49378204345702, 37.83368330777276],
//         ],
//       },
//     },
//   });
//   map.addLayer({
//     id: "route",
//     type: "line",
//     source: "route",
//     layout: {
//       "line-join": "round",
//       "line-cap": "round",
//     },
//     paint: {
//       "line-color": "#888",
//       "line-width": 8,
//     },
//   });
// });
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

/////////////////////////////////////////////////// important info for tom tom api parameters

// testing tomtom api

// category sets
// 7315 indicates restaurant
// 9376 indicates Cafe/pub
// 9379004 indicates Bar
// 9362 indicates Park & Recreation Area
// 7376 indicates Tourist Attraction
// 7302 indicates trails

// miles in meters
// 10 miles is 16093.4
// 5 miles is 8046.72
