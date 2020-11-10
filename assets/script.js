console.log("Hey guys!");

// Lara

// John

// Alfredo

// Shelsy

// experimenting with the geocoding api from mapbox website
// PLEASE DO NOT DELETE THIS SECRET KEY
let myToken =
  "sk.eyJ1Ijoic2hlbGxzZWEzMSIsImEiOiJja2hiMzBuemsxOHczMnNrODF6M2lveHc1In0.WXY65kiQoG9rDXMxzd5qEg";

// experiment with different addresses. Very case sensitive.
// entering an address will render its geographic coords (AKA forward geocoding)
// entering coords will render its varying address (AKA reverse geocoding)
let currentLocation = "San Francisco, California";

fetch(
  `https://api.mapbox.com/geocoding/v5/mapbox.places/${currentLocation}.json?access_token=${myToken}`
)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });

// experimenting with the map created using mapbox.js
L.mapbox.accessToken = `pk.eyJ1Ijoic2hlbGxzZWEzMSIsImEiOiJja2hiMnVsdzUwbThsMndrNDUyNnI0dDJuIn0.Fwya7JTKf9MQOsTVGMVwIg`

let geocoder = L.mapbox.geocoder('mapbox.places');

let map = L.mapbox.map('map').addLayer(L.mapbox.styleLayer('mapbox://styles/mapbox/streets-v11'));

geocoder.query(`${currentLocation}`, showMap);

function showMap(err, data) {
    // The geocoder can return an area, like a city, or a
    // point, like an address. Here we handle both cases,
    // by fitting the map bounds to an area or zooming to a point.
    if (data.lbounds) {
        map.fitBounds(data.lbounds);
    } else if (data.latlng) {
        map.setView([data.latlng[0], data.latlng[1]], 13);
    }
}

// testing yelp search nearby API
// limited to 50,000 requests/day
let yelpKey = `ytDk4GR7Z6GFdMRl7u6s8qUXBnFuOvn4omYmLMXGa_FN5j-dDkYpo_HutHr64jzEV9lXuQfdigZq9LizgiHf4Q4QZxVJ9lekMCzbmmvZ126X7EFdfJnuf1MhnuGpX3Yx`;
fetch(`https://api.yelp.com/v3/businesses/search`)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });
