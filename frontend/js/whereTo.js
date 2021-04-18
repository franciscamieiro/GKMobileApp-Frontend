//IR BUSCAR AS COORDENADAS DA CIDADE DO PUTO À BD E PÔR AQUI
//qnd se for buscar as coordenadas deve ter q se fazer um parseFloat() delas.

let latc = 41.5518;
let longc = -8.4229;

var myLatLng = {lat: latc, lng: longc};

var mapOptions = {
  center: myLatLng,
  zoom: 10,
  mapTypeId: google.maps.MapTypeId.ROADMAP
};

var map = new google.maps.Map(document.getElementById("googleMap"), mapOptions);

var directionsService = new google.maps.DirectionsService();

var directionsDisplay = new google.maps.DirectionsRenderer();

directionsDisplay.setMap(map);

function calcRoute(){
  var request = {
     origin: document.getElementById("from").value,
     destination: document.getElementById("to").value,
     travelMode: google.maps.TravelMode.WALKING,
     unitSystem: google.maps.UnitSystem.IMPERIAL
  }

  directionsService.route(request, (result, status) => {
    if(status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(result);
    }else{
      directionsDisplay.setDirections({ routes: []});
    }
  })
  
}

var options = {
  types: ['(cities)']
}

var input1 = document.getElementById("from");
var autocomplete1 = new google.maps.places.Autocomplete(input1, options);

var input2 = document.getElementById("to");
var autocomplete2 = new google.maps.places.Autocomplete(input2, options);