console.log("Hey guys!")

// Lara









// John









// Alfredo









// Shelsy

// experimenting with the map created using mapbox.js
L.mapbox.accessToken = `pk.eyJ1Ijoic2hlbGxzZWEzMSIsImEiOiJja2hiMnVsdzUwbThsMndrNDUyNnI0dDJuIn0.Fwya7JTKf9MQOsTVGMVwIg`
let map = L.mapbox.map('map')
.setView([40, -74.50], 9)
.addLayer(L.mapbox.styleLayer('mapbox://styles/mapbox/streets-v11'));

// experimenting with the geocoding api from mapbox website
// PLEASE DO NOT DELETE THIS SECRET KEY 
let myToken = 'sk.eyJ1Ijoic2hlbGxzZWEzMSIsImEiOiJja2hiMzBuemsxOHczMnNrODF6M2lveHc1In0.WXY65kiQoG9rDXMxzd5qEg'
let currentLocation = "San Jose, CA"
fetch (`https://api.mapbox.com/geocoding/v5/mapbox.places/${currentLocation}.json?access_token=${myToken}`)
.then(function(response) {
    return response.json();
})
.then (function(data){
    console.log(data);
})

