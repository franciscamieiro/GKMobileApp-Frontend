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
    nFavs(favplacesTable);
}



for(var i = 0; i < placefavMarkers.length; i++) {
    (function(index) {
        placefavMarkers[index].addEventListener("click", showMarker());
    })(i);
}

function nFavs(table){
    var Rows = table.getElementsByTagName('tr');
    var nRows = Rows.length;

    if(nRows == 1){
        nfav.innerHTML = nRows + " local marcado";
    }else{
        nfav.innerHTML = nRows + " locais marcados";
    }
}
