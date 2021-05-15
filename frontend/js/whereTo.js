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
          swal({
              icon: 'images/warning.png',
              text: 'Não foram encontrados resultados!',
          }).then(function(isConfirm) {
              document.getElementById("from").value = "";
              document.getElementById("to").value = "";
          });
        }
    });
}


var options = {
  types: ['(cities)']
}

var input1 = document.getElementById("from");
var input2 = document.getElementById("to");

if(input1 != "" && input2 != ""){

  var autocomplete1 = new google.maps.places.Autocomplete(input1, options);
  var autocomplete2 = new google.maps.places.Autocomplete(input2, options);

}

let info = document.getElementById("info");
let box = document.getElementById("box");
let box1 = document.getElementById("box1");
let helptxt = document.getElementById("helptxt");
let nextBtn = document.getElementById("next");
let click = 1;
let isShowing = false;

info.addEventListener("click", function () {

  if (isShowing == false) {
      box.style.display = "block";
      helptxt.style.display = "block";
      nextBtn.style.display = "block";
      isShowing = true;
  }

});

function next() {

  if (click == 1) {
      box.style.display = "none";
      box1.style.display = "block";
      helptxt.style.height = "12%";
      nextBtn.style.marginTop = "485px";
      helptxt.innerHTML = "Clica no icon amarelo para ver o forúm com publicações de criações, comentar e avaliar!"
      nextBtn.style.display = "block";
      click++;
  }else{
      box.style.display = "none";
      box1.style.display = "none";
      helptxt.style.display = "none";
      nextBtn.style.display = "none";
      helptxt.innerHTML = "Clica no icon laranja para veres um caminho de um sítio para o outro!";
      box1.style.marginTop = "220px";
      box.style.marginTop = "190px";
      helptxt.style.marginTop = "345px";
      helptxt.style.height = "10%";
      nextBtn.innerHTML = "Próxima";
      nextBtn.style.marginTop = "472px";
      click = 1;
      isShowing = false;
  }

}