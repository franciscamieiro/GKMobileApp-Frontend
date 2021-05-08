const id = localStorage.userloggedin;

window.onload = function(){
    const id = localStorage.userloggedin;
    fetch("http://localhost:80/api/favorite_places/users/" + id)
    .then((response) => response.json())
    .then((out) => {
        
        for(let i = 0; i<out.length; i++){
        console.log(out[i]);
        var row = document.getElementById("favPlaces").insertRow(i);
        
        row.innerHTML =
            `
                <td class="place">${out[i].address}</td>
                <td id="${out[i].coordinates}" class="marker" onclick="showMarker(this)"></td>
                <td id="${out[i].placeID}" class="trash" onclick="deleteMarker(this)"></td>
            
            `
        }

        document.getElementById("nfavorites").innerHTML = out.length + " locais marcados";
    });

}

x = navigator.geolocation;
const geocoder = new google.maps.Geocoder();

let position = null;

let favplacesTable = document.getElementById("favPlaces");

let nfav = document.getElementById("nfavorites");

let placefavMarkers = document.getElementsByClassName("marker");

function goBack() {
    window.history.back();
}

//code taken from google examples for developers - link: https://developers.google.com/maps/documentation/javascript/examples/geocoding-reverse
function geocodeLatLng(geocoder) {

    navigator.geolocation.getCurrentPosition(function(position) {
        const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
        };

        let lat = position.coords.latitude;
        let long = position.coords.longitude;

        
        geocoder.geocode({ location: pos }, (results, status) => {
            if (status === "OK") {
                if (results[0]) {
                    
                    // /api/favorite_places
                    let data = {};
                    data.address = results[0].formatted_address;
                    data.coordinates = lat + ',' + long;
                    data.userID = id;

                    fetch("http://localhost:80/api/favorite_places", {
                        headers: { 'Content-Type': 'application/json' },
                        method: 'POST',
                        body: JSON.stringify(data)
                    }).then(function(response) {

                        if (!response.ok) {
                            console.log(response.status); //=> number 100–599
                            console.log(response.statusText); //=> String
                            console.log(response.headers); //=> Headers
                            console.log(response.url); //=> String
                            if (response.status === 409) {
                                swal({
                                    icon: 'images/v237_21.png',
                                    title: 'Erro',
                                    text: 'Esse local favorito já está registado!',
                                    button: 'OK',
                                    className: "swalAlert"
                                    
                                });
                            }
                            else {
                                throw Error(response.statusText);
                            }
                        }
                        else {

                            document.getElementById("favPlaces").innerHTML = "";
                            fetch("http://localhost:80/api/favorite_places/users/" + id)
                            .then((response) => response.json())
                            .then((out) => {
                                
                                for(let i = 0; i<out.length; i++){
                                console.log(out[i]);
                                var row = document.getElementById("favPlaces").insertRow(i);
                                
                                row.innerHTML =
                                    `
                                        <td class="place">${out[i].address}</td>
                                        <td id="${out[i].coordinates}" class="marker" onclick="showMarker(this)"></td>
                                        <td id="${out[i].placeID}" class="trash" onclick="deleteMarker(this)"></td>
                                    
                                    `
                                }

                                document.getElementById("nfavorites").innerHTML = out.length + " locais marcados";
                            });

                            swal({
                                icon: 'images/v254_5.png',
                                title: 'Sucesso',
                                text: 'Local guardado!',
                                button: 'OK',
                                className: "swalAlert"
                                
                            });
                        }

                    }).then(function(result) {
                        console.log(result);
                    }).catch(function(err) {
                        swal({
                            icon: 'images/v237_21.png',
                            title: 'Erro',
                            text: 'Erro ao guardar.',
                            button: 'OK',
                            className: "swalAlert"
                            
                        })
                        console.error(err);
                    });
    
                } else {
                    swal({
                        icon: 'images/v237_21.png',
                        title: 'Erro',
                        text: 'Não foram encontrados resultados, queres tentar outra vez?',
                        className: "swalAlert2",
                        buttons: {
                        catch: {
                          text: "Sim",
                        },
                        cancel: "Não",
                      },
                    }).then(function(isConfirm) {
                        window.location.reload();
                    });
                }
            } else {
                swal({
                    icon: 'images/v237_21.png',
                    title: 'Erro',
                    text: 'Ocorreu um erro, queres tentar outra vez?',
                    className: "swalAlert2",
                    buttons: {
                        catch: {
                            text: "Sim",
                          },
                          cancel: "Não",
                        },
                      }).then(function(isConfirm) {
                          
                          window.location.reload();
                      });
            }
        });

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
    
}

btnMarkFP.addEventListener("click", function() {
    
    x.getCurrentPosition(sucess, failure);
    
});

function sucess() {

    geocodeLatLng(geocoder);

}

function failure() {
    swal({
        icon: 'images/v237_21.png',
        title: 'Erro',
        text: 'Ativa a tua localização',
        button: 'OK',
        className: "swalAlert"
        
    });
}

//see favorite place in map
function showMarker(element) {
   let latlong = element.id.toString();
   var pos = latlong.split(',', 2);
   let markersLat = pos[0];
   let markersLong = pos[1];
   localStorage.setItem("lat", markersLat);
   localStorage.setItem("long", markersLong);
   window.history.back();
}

function deleteMarker(element) {
    
    let placeid = element.id;
    fetch('http://localhost:80/api/favorite_places/' + placeid, {
        method: 'DELETE',
        })
        .then(res => res.text()) // or res.json()
        .then(res => console.log(res))
    
    
    element.closest('tr').remove();
    let table = document.getElementById("favPlaces");
    nFavs(table);
}

for(var i = 0; i < placefavMarkers.length; i++) {
    (function(index) {
        placefavMarkers[index].addEventListener("click", showMarker());
    })(i);
}

function nFavs(table){
    let number = document.getElementById("nfavorites");
    var Rows = table.getElementsByTagName('tr');
    var nRows = Rows.length;

    if(nRows == 1){
        number.innerHTML = nRows + " local marcado";
    }else{
        number.innerHTML = nRows + " locais marcados";
    }
}

let logout = document.getElementById("logout");

logout.addEventListener("click", function(){
    
    swal({
        icon: 'images/v254_5.png',
        title: 'Sucesso',
        text: 'Sessão terminada',
        button: 'OK',
        className: "swalAlert"
    }).then((isConfirm) => {
        localStorage.clear();
        window.location.replace("login.html");
    });
});