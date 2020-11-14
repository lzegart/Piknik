$(document).ready(function () {
  // gives modals functionality
  $(document).foundation();

  // key for mapbox api
  let myToken =
    "sk.eyJ1Ijoic2hlbGxzZWEzMSIsImEiOiJja2hiMzBuemsxOHczMnNrODF6M2lveHc1In0.WXY65kiQoG9rDXMxzd5qEg";
  // key for tom tom api
  let tomKey = "yrlw2N38GKc3iSGnqvnQNxPQUsVQuVAh";
  // target user address input
  let input = document.querySelector("input");
  // target user miles selection
  let mileInput = document.querySelector("#miles");
  // target user food preference selection
  let foodInput = document.querySelector("#foods");
  // target user place preference selection
  let placeInput = document.querySelector("#places");

  // empty array receives pushed values of lon, lat from startingPoint, randomFood address and randomDestination address
  let mapCoordinates = [];

  savedSearches = [];

function saveSearches() {
  
  console.log(saveSearches)

};

  // finds lat and lon of starting point. Called inside of click event to have access to user miles, food, and place preference
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

        let arr = [lon, lat];
        // push array of coordinates (startingPoint) to empty global array
        mapCoordinates.push(arr);

        findFood(miles, food, lat, lon);
        findDestination(miles, place, lat, lon);

        showMap(lat, lon);

        localStorage.setItem('starting', JSON.stringify(startingPoint));
      });
  }

  // run this function inside findFood and findDestination to get coordinates of argument (location)
  function findMapLatLon(location) {
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=${myToken}`
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        // set variables for lat and lon of argument (location)
        let lon = data.features[1].geometry.coordinates[0];
        let lat = data.features[1].geometry.coordinates[1];


        let arr = [lon, lat];
        // push array of coordinates (argument/location) to empty global array
        mapCoordinates.push(arr);
      });
  }

  // find a random restaurant near startingPoint and append name and address to the second modal
  // called inside of findLatLon to gain access to user preferences (miles, food)
  function findFood(miles, food, lat, lon) {
    fetch(
      `https://api.tomtom.com/search/2/nearbySearch/.json?lat=${lat}&lon=${lon}&radius=${miles}&limit=10&idxSet=POI&categorySet=${food}&key=${tomKey}`
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        let randomFoodArray = [];

        // loop through data for food points of interest
        for (let i = 0; i < data.results.length; i++) {
          let foodOptions = `${data.results[i].poi.name} at ${data.results[i].address.freeformAddress}`;
          // push list of name and address to randomFoodArray
          randomFoodArray.push(foodOptions);
        }

        // get a random food point of interest from the array
        let randomFood =
          randomFoodArray[Math.floor(Math.random() * randomFoodArray.length)];

        // append results name
        $(".foodName").append(randomFood.split(" at ")[0]);
        // append results address
        $(".foodAddress").append(randomFood.split(" at ")[1]);

        // find the random results lat an lon using this function
        findMapLatLon(randomFood.split(" at ")[1]);
        localStorage.setItem('food', JSON.stringify(randomFood));
      });
  }

  // find a random point of interest near startingPoint and append name and address to the second modal
  // called inside of findLatLon to gain access to user preferences (miles, place)
  function findDestination(miles, place, lat, lon) {
    fetch(
      `https://api.tomtom.com/search/2/nearbySearch/.json?lat=${lat}&lon=${lon}&radius=${miles}&limit=10&idxSet=POI&categorySet=${place}&key=${tomKey}`
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        let randomDestinationArray = [];

        // loop through data for destination points of interest
        for (let i = 0; i < data.results.length; i++) {
          let destinationOptions = `${data.results[i].poi.name} at ${data.results[i].address.freeformAddress}`;
          // push list of name and address to randomDestinationArray
          randomDestinationArray.push(destinationOptions);
        }

        // get a random destination point of interest from the array
        let randomDestination =
          randomDestinationArray[
            Math.floor(Math.random() * randomDestinationArray.length)
          ];

        // append result name
        $(".destinationName").append(randomDestination.split(" at ")[0]);
        // append result address
        $(".destinationAddress").append(randomDestination.split(" at ")[1]);

        // find the random results lat an lon using this function
        findMapLatLon(randomDestination.split(" at ")[1]);
        localStorage.setItem('destination', JSON.stringify(randomDestination));
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

    // run function to get lat and lon from findLatLon, findFood, and findDestination
    // run function to get random food and random destination
    findLatLon(startingPoint, miles, food, place);
    saveSearches();

    // append user starting point address
    $(".startAddress").append(startingPoint);
  });

  // plan to get local storage here
  document
    .querySelector("#previousPiknik")
    .addEventListener("click", function () {
      console.log("These are my saved pikniks");
    });


  // plan to set local storage here
  document.querySelector("#savePiknik").addEventListener("click", function (e) {
    console.log("save my piknik");
  });

  // when user clicks repack my piknik, page reloads
  document
    .querySelector("#repackPiknik")
    .addEventListener("click", function (e) {
      location.reload();
    });
  // function runs when findLatLon runs inside the event listener
  // this function shows map with center of lon, lat of starting point
  // coordinates are corresponding to randomFood lon/lat and randomPDestination lon/lat
  function showMap(lat, lon) {
    // proper format accepted for this api
    let startCoordinates = {
      lon: lon,
      lat: lat,
    };

    // private key
    mapboxgl.accessToken =
      "pk.eyJ1Ijoic2hlbGxzZWEzMSIsImEiOiJja2hiMnVsdzUwbThsMndrNDUyNnI0dDJuIn0.Fwya7JTKf9MQOsTVGMVwIg";

    var map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      // coordinates for starting point
      center: startCoordinates,
      zoom: 12,
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
});
