//variables declaration

let chosenCity = "";
let myLat = "";
let myLong = "";
let favsPlaces = document.getElementById("favorites");
x = navigator.geolocation;
let markersLat = localStorage.getItem("lat");
let markersLong = localStorage.getItem("long");

window.onload = function start() {

    if(markersLat != null){

        const pos = {
            lat: parseFloat(markersLat),
            lng: parseFloat(markersLong),
        }

        map = new google.maps.Map(document.getElementById("map"), {
            center: { lat: parseFloat(markersLat), lng: parseFloat(markersLong) },
            zoom: 10,
        });

        infoWindow = new google.maps.InfoWindow();
        infoWindow.setPosition(pos);
        infoWindow.setContent("O teu local favorito é aqui");
        infoWindow.open(map);
        var marker = new google.maps.Marker({map:map, position:pos});

        showMyLocation();

        localStorage.removeItem("lat");
        localStorage.removeItem("long");

    }else{

        //fetch à base de dados para ver se o puto tem cidade registada,
        //if cidadeDaBasedeDados != null => diz-se que a chosenCity é igual a essa
        //e depois chama-se a função initMap(chosenCity);
        //else{ } => código a baixo

        swal({
            icon: 'images/Usure_icon.png',
            text: 'Qual é a tua cidade?',
            content: {
                element: "input",
            },
            button: 'OK',
            className: "swalAlert1",
            closeOnClickOutside: false,
            closeOnClick: false,
        }).then(function(inputValue) {
            if (inputValue === false) return false;
        
            else if (inputValue === "") {
                
                swal({
                    icon: 'images/warning.png',
                    text: 'Escreve uma cidade!',
                }).then(function(isConfirm) {
                    start();
                });
            
                
            }else{
                chosenCity = inputValue;
                
                initMap(chosenCity);
            }
        });
    }
}


function initMap(city){

        var geocoder =  new google.maps.Geocoder();
        geocoder.geocode( { 'address': '' + city + ''+ ', portugal'}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            myLat = results[0].geometry.location.lat();
            myLong = results[0].geometry.location.lng();

            map = new google.maps.Map(document.getElementById("map"), {
                center: { lat: myLat, lng: myLong },
                zoom: 10,
            });

            //code taken from google examples for developers:
            //link: https://developers.google.com/maps/documentation/javascript/examples/map-geolocation#maps_map_geolocation-javascript

            showMyLocation();
        
        } else {

            swal({
                icon: 'images/v237_21.png',
                title: 'Erro',
                text: 'Ocorreu um erro no sistema, queres recarregar a aplicação?',
                className: "swalAlert2",
                buttons: {
                catch: {
                  text: "Não",
                  value: "catch",
                },
                cancel: "Sim",
              },
            }).then((value) => {
                switch (value) {
             
                    case "catch":
                        window.close();
                
                    default:
                        window.location.reload();
                }
        
            });
        }
    });

}


function showMyLocation() {

        infoWindow = new google.maps.InfoWindow();
        const locationButton = document.createElement("button");
        locationButton.textContent = "Ver a minha localização";
        locationButton.classList.add("custom-map-control-button");
        map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
        locationButton.addEventListener("click", () => {
            // Try HTML5 geolocation.
            if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                const pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };
                infoWindow.setPosition(pos);
                infoWindow.setContent("Estás aqui!");
                infoWindow.open(map);
                map.setCenter(pos);
                var marker1 = new google.maps.Marker({map:map, position:pos});
                },
                () => {
                    swal({
                        icon: 'images/v237_21.png',
                        title: 'Erro',
                        text: 'Ativa a tua localização',
                        button: 'OK',
                        className: "swalAlert"
                        
                    });
                }
            );
            } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, infoWindow, map.getCenter());
            }
        });

}