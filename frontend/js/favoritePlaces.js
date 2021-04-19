window.onload = function(){
    fetch("http://localhost:80/api/favorite_places/users/" + "3")
    .then((response) => response.json())
    .then((out) => {
        
        for(let i = 0; i<out.length; i++){
        console.log(out[i]);
        var row = document.getElementById("favPlaces").insertRow(i);
        
        row.innerHTML =
            `
                <td class="place">${out[i].coordinates}</td>
                <td id="${out[i].coordinates}" class="marker" onclick="showMarker(this)"></td>
                <td class="trash" onclick="deleteMarker(this)"></td>
            
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
        
        geocoder.geocode({ location: pos }, (results, status) => {
            if (status === "OK") {
                if (results[0]) {

                    var row = favplacesTable.insertRow(0);

                    row.innerHTML = '<td class="place"></td><td class="marker" onclick="showMarker(this)"></td><td class="trash" onclick="deleteMarker(this)"></td>'
                    //var cell1 = row.insertCell(0);
                    //var cell2 = row.insertCell(1);
                    //var cell3 = row.insertCell(2);

                    let cells = row.getElementsByTagName("td");

                    //fazer o POST aqui, POST da adress, lat e long
                    let lat = position.coords.latitude;
                    let long = position.coords.longitude;
                    //cell1.innerHTML = results[0].formatted_address;
                    //cell1.classList.add("place");
                    //cell2.classList.add("marker");
                    //cell3.classList.add("trash");
                    //cell2.id= lat + ',' + long; 
                    for(var i=0;i<cells.length;i++) {
                        cells[0].innerHTML = results[0].formatted_address;
                        cells[1].id= lat + ',' + long;
                    }
                    
                    nFavs(favplacesTable);
                    
                    // /api//api/favorite_places
                    let data = {};
                    data.address = results[0].formatted_address;
                    data.coordinates = lat + ',' + long;
                    data.latitude = lat;
                    data.longitude = long;

                    /* fetch("http://localhost:80/api/favorite_places", {
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
                    }); */

                    swal({
                        icon: 'images/v254_5.png',
                        title: 'Sucesso',
                        text: 'Local guardado!',
                        button: 'OK',
                        className: "swalAlert"
                        
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
